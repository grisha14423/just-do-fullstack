import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import userService from "../services/user.service";
import localStorageService, {
  setTokens,
} from "../services/localStorage.service";
import { useHistory } from "react-router-dom";
import authService from "../services/auth.service";

export const httpAuth = axios.create({
  baseURL: "https://identitytoolkit.googleapis.com/v1/",
  params: {
    key: process.env.REACT_APP_FIREBASE_KEY,
  },
});

const AuthContext = React.createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const history = useHistory();

  const [error, setError] = useState(null);
  const [currentUser, setUser] = useState();
  const [isLoading, setLoading] = useState(true);

  async function getUserData() {
    try {
      const { content } = await userService.getCurrentUser();
      setUser(content);
    } catch (error) {
      errorCatcher(error);
    } finally {
      setLoading(false);
    }
  }

  async function logIn({ email, password }) {
    try {
      const { data } = await httpAuth.post(`accounts:signInWithPassword`, {
        email,
        password,
        returnSecureToken: true,
      });
      setTokens(data);
      await getUserData();
    } catch (error) {
      errorCatcher(error);
      const { code, message } = error.response;
      console.log(code, message);
      if (code === 400) {
        switch (message) {
          case "INVALID_PASSWORD":
            setError("Email или пароль введены некорректно");
            break;

          default:
            setError("Слишком много попыток входа. Попробуйте позднее");
        }
      }
    }
  }

  async function signUp(payload) {
    try {
      const data = await authService.register(payload);

      // const { data } = await httpAuth.post(`accounts:signUp`, {
      //   email,
      //   password,
      //   returnSecureToken: true,
      // });
      setTokens(data);

      // await createUser({
      //   _id: data.localId,
      //   email,
      //   image: `https://avatars.dicebear.com/api/avataaars/${(Math.random() + 1)
      //     .toString(36)
      //     .substring(7)}.svg`,
      //   ...rest,
      // });
    } catch (error) {
      errorCatcher(error);
      console.log(error.response);
      const { status, statusText } = error.response;
      console.log(status, statusText);
      if (status === 400) {
        if (statusText === "EMAIL_EXISTS") {
          const errorObject = {
            email: "Пользователь с таким Email уже существует",
          };
          throw errorObject;
        }
      }
    }
  }

  // async function createUser(data) {
  //   try {
  //     const { content } = await userService.create(data);
  //     //   console.log(content);
  //     setUser(content);
  //   } catch (error) {
  //     errorCatcher(error);
  //   }
  // }

  function errorCatcher(error) {
    console.log(error);
    const { message } = error.response;
    setError(message);
  }

  useEffect(() => {
    if (localStorageService.getAccessToken()) {
      getUserData();
    } else {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (error !== null) {
      setError(null);
    }
  }, [error]);

  function logOut() {
    localStorageService.removeAuthData();
    setUser(null);
    history.push("/");
  }

  return (
    <AuthContext.Provider value={{ signUp, logIn, currentUser, logOut }}>
      {!isLoading ? (
        children
      ) : (
        <div className="d-flex justify-content-center mt-5">
          <div className="spinner-border text-info " role="status">
            <span className="sr-only">Loading...</span>
          </div>
        </div>
      )}
    </AuthContext.Provider>
  );
};
