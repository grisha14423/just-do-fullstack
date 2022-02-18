const express = require("express");
const router = express.Router({ mergeParams: true });
const Note = require("../models/Note");
const auth = require("../middleware/auth.middleware");

router.patch("/:noteId", auth, async (req, res) => {
  try {
    const { noteId } = req.params;

    const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {
      new: true,
    });
    res.send(updatedNote);

    //    const {noteId} = req.params

    //     if(noteId === req.note._id) {
    //         const updatedNote = await Note.findByIdAndUpdate(noteId, req.body, {new: true})
    //         res.send(updatedNote)

    //     }else {
    //         res.status(400).json({message:'Unauthorized'})
    //     }
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

router.get("/", auth, async (req, res) => {
  try {
    // console.log(req.note);
    const list = await Note.find();
    res.send(list);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

router.post("/", async (req, res) => {
  try {
    const newNote = await Note.create({
      ...req.body,
      userId: req.user._id,
    });

    res.status(201).send(newNote);
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

router.delete("/:noteId", auth, async (req, res) => {
  try {
    const { noteId } = req.params;
    const removedNote = await Note.findById(noteId);

    if (removedNote.userId.toString() === req.user._id) {
      removedNote.remove();
      return res.send(null);
    } else {
      return res.status(400).json({ message: "Unauthorized" });
    }
  } catch (e) {
    res.status(500).json({
      message: "Ошибка на сервере, попробуйте позже",
    });
  }
});

module.exports = router;