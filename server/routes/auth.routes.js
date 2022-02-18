const express = require("express");
const User = require("../models/User");
const router = express.Router({ mergeParams: true });
const bcrypt = require("bcryptjs");
const tokenService = require("../services/token.service");
const { check, validationResult } = require("express-validator");
const { generateUserData } = require("../utils/helpers");

router.post("/signUp", [
  check("email", "Incorrect email").isEmail(),
  check("password", "Minimum 8 symb").isLength({ min: 8 }),

  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
            errors: errors.array(),
          },
        });
      }

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (existingUser) {
        return res.status(400).json({
          error: {
            message: "EMAIL_EXISTS",
            code: 400,
          },
        });
      }

      const hashedPassword = await bcrypt.hash(password, 12);

      const newUser = await User.create({
        ...generateUserData(),
        ...req.body,
        password: hashedPassword,
      });

      const tokens = tokenService.generate({ _id: newUser._id });
      await tokenService.save(newUser._id, tokens.refreshToken);

      res.status(201).send({ ...tokens, userId: newUser._id });
    } catch (e) {
      res.status(500).json({
        message: "Ошибка на сервере, попробуйте позже",
      });
    }
  },
]);

router.post("/signInWithPassword", [
  check("email", "email incorrect").isEmail(),
  check("password", "password could not be empty").exists(),
  async (req, res) => {
    try {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: {
            message: "INVALID_DATA",
            code: 400,
          },
        });
      }

      // console.log(req.body);

      const { email, password } = req.body;

      const existingUser = await User.findOne({ email });

      if (!existingUser) {
        return res.status(400).send({
          error: {
            message: "EMAIL_NOT_FOUND",
            code: 400,
          },
        });
      }

      const isPassEqual = await bcrypt.compare(password, existingUser.password);

      if (!isPassEqual) {
        return res.status(400).send({
          error: {
            message: "INVALID_PASSWORD",
            code: 400,
          },
        });
      }

      const tokens = tokenService.generate({ _id: existingUser._id });
      await tokenService.save(existingUser._id, tokens.refreshToken);

      res.status(200).send({ ...tokens, userId: existingUser._id });
    } catch (e) {
      console.log(e);
      res.status(500).json({
        message: "Ошибка на сервере, попробуйте позже",
      });
    }
  },
]);

function isTokenInvalid(data, dbToken) {
  return !data || !dbToken || data._id !== dbToken?.user?.toString();
}

router.post("/token", async (req, res) => {
  try {
    const { refresh_token: refreshToken } = req.body;
    const data = await tokenService.validateRefresh(refreshToken);
    const dbToken = await tokenService.findToken(refreshToken);

    //res.status(200).send({ data });
    // res.status(200).send({dbToken})

    if (isTokenInvalid(data, dbToken)) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    const tokens = await tokenService.generate({
      _id: data._id,
    });
    await tokenService.save(data._id, tokens.refreshToken);

    res.status(200).send({ ...tokens, userId: data._id });
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

module.exports = router;
