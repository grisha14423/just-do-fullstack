import React, { useState } from "react";
import { useParams } from "react-router";
import LoginForm from "../components/ui/loginForm";
import RegisterForm from "../components/ui/registerForm";

const Login = () => {
  //const params = useParams();
  const { type } = useParams();
  const [formType, setFormType] = useState(
    type === "register" ? type : "login"
  );
  const toggleFormType = () => {
    setFormType((prevState) =>
      prevState === "register" ? "login" : "register"
    );
  };

  return (
    <div className="container mt-5">
      <div className="row">
        <div className="col-md-6 offset-md-3 shadow p-4 ">
          {formType === "register" ? (
            <>
              <h3 className="mb-4 text-center">Регистрация</h3>
              <RegisterForm />
              <p className="text-center">
                Уже есть аккаунт?{" "}
                <a
                  role="button"
                  onClick={toggleFormType}
                  className="text"
                  href="#"
                >
                  {" "}
                  <b>Войти</b>
                </a>
              </p>
            </>
          ) : (
            <>
              <h3 className="mb-4 text-center">Вход</h3>
              <LoginForm />
              <p className="text-center">
                Нет аккаунта?{" "}
                <a
                  role="button"
                  onClick={toggleFormType}
                  className="text"
                  href="#"
                >
                  {" "}
                  <b>Зарегистрироваться</b>
                </a>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
export default Login;
