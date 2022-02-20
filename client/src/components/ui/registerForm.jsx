import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch } from "react-redux";
import { signUp } from "../../store/users";

const RegisterForm = () => {
  // const { signUp } = useAuth();
  const dispatch = useDispatch();

  // const history = useHistory();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    licence: false,
  });

  const [errors, setErrors] = useState({});

  const validationScheme = yup.object().shape({
    licence: yup.boolean().required("Подтвердите лицензионное соглашение"),
    password: yup
      .string()
      .required("Пароль обязателен для заполнения")
      .matches(/(?=.*[A-Z])+/, "Пароль должен содержать одну залгавную букву")
      .matches(/(?=.*[0-9])/, "Пароль должен содержать одно число")
      .matches(/(?=.{8,})/, "Пароль должен содержать не менее 8 символов"),
    email: yup
      .string()
      .required("Электронная почта обязательна к заполнению")
      .email("Email введен некорректно"),
    name: yup
      .string()
      .required("Имя обязательно к заполнению")
      .matches(/(?=.{2,})/, "Имя должено содержать не менее 2 символов"),
  });

  useEffect(() => {
    validate();
  }, [data]);

  const validate = () => {
    validationScheme
      .validate(data)
      .then(() => setErrors({}))
      .catch((err) => setErrors({ [err.path]: err.message }));
    return Object.keys(errors).length === 0;
  };

  const isValid = Object.keys(errors).length === 0;

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const newData = {
      ...data,
    };
    console.log(newData);
    dispatch(signUp(newData));
    // signUp(newData);
    // history.push("/");
  };

  return (
    <form onSubmit={handleSubmit}>
      <TextField
        label="Имя"
        name="name"
        value={data.name}
        onChange={handleChange}
        error={errors.name}
      />
      <TextField
        label="Электронная почта"
        name="email"
        value={data.email}
        onChange={handleChange}
        error={errors.email}
      />
      <TextField
        label="Пароль"
        type="password"
        name="password"
        value={data.password}
        onChange={handleChange}
        error={errors.password}
      />
      <CheckBoxField
        value={data.licence}
        onChange={handleChange}
        name="licence"
        error={errors.licence}
      >
        Подтвердить <a href="#">лицензионное соглашение</a>
      </CheckBoxField>
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Зарегистрироваться
      </button>
    </form>
  );
};

export default RegisterForm;
