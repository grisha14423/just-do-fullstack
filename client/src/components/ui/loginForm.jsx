import React, { useState, useEffect } from "react";
import TextField from "../common/form/textField";
import CheckBoxField from "../common/form/checkBoxField";
// import { useAuth } from "../../hooks/useAuth";
import { useHistory } from "react-router-dom";
import * as yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { getAuthErrors, login } from "../../store/users";

const LoginForm = () => {
  // const { logIn } = useAuth();
  const dispatch = useDispatch();
  const loginError = useSelector(getAuthErrors());
  const history = useHistory();
  const [data, setData] = useState({
    email: "",
    password: "",
    stayOn: false,
  });
  const [errors, setErrors] = useState({});

  const validationScheme = yup.object().shape({
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
  });

  const handleChange = (target) => {
    setData((prevState) => ({
      ...prevState,
      [target.name]: target.value,
    }));
  };

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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const isValid = validate();
    if (!isValid) return;
    const redirect = history.location.state
      ? history.location.state.from.pathname
      : "/";

    dispatch(login({ payload: data, redirect }));

    // try {
    //   await logIn(data);
    //   history.push(
    //     history.location.state ? history.location.state.from.pathname : "/"
    //   );
    // } catch (error) {
    //   errorCatcher(error);
    // }

    // function errorCatcher(error) {
    //   console.log(error);
    //   const { message } = error;
    //   setErrors(message);
    // }
  };

  return (
    <form onSubmit={handleSubmit}>
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
      <CheckBoxField value={data.stayOn} onChange={handleChange} name="stayOn">
        Оставаться в системе
      </CheckBoxField>
      {loginError && <p className="text-danger">{loginError}</p>}
      <button
        type="submit"
        disabled={!isValid}
        className="btn btn-primary w-100 mx-auto"
      >
        Войти
      </button>
    </form>
  );
};

export default LoginForm;
