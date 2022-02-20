import { createAction, createSlice } from "@reduxjs/toolkit";
import authService from "../services/auth.service";
import localStorageService from "../services/localStorage.service";
import userService from "../services/user.service";
import { generetaAuthError } from "../utils/generateAuthError";
import history from "../utils/history";

const initialState = localStorageService.getAccessToken()
  ? {
      entities: null,
      isLoading: true,
      error: null,
      auth: { userId: localStorageService.getUserId() },
      isLoggedIn: true,
    }
  : {
      entities: null,
      isLoading: false,
      error: null,
      auth: null,
      isLoggedIn: false,
    };

const usersSlice = createSlice({
  name: "users",
  initialState,
  reducers: {
    usersRequested: (state) => {
      state.isLoading = true;
    },
    usersReceved: (state, action) => {
      state.entities = action.payload;

      state.isLoading = false;
    },
    usersRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
    authRequestSuccess: (state, action) => {
      state.auth = action.payload;
      state.isLoggedIn = true;
    },
    authRequestFailed: (state, action) => {
      state.error = action.payload;
    },
    userCreated: (state, action) => {
      state.entities.push(action.payload);
    },
    userLoggedOut: (state) => {
      state.entities = null;
      state.isLoggedIn = false;
      state.auth = null;
    },
    authRequested: (state) => {
      state.error = null;
    },
  },
});

const { reducer: usersReducer, actions } = usersSlice;
const {
  authRequestFailed,
  authRequestSuccess,
  userLoggedOut,
  // userCreated,
  usersRequested,
  usersReceved,
  usersRequestFiled,
} = actions;

const authRequested = createAction("users/authRequested");
// const userCreatRequested = createAction("users/userCreatRequested");
// const createUserFailed = createAction("users/createUserFailed");

export const loadUsersList = () => async (dispatch) => {
  dispatch(usersRequested());
  try {
    const { content } = await userService.get();
    dispatch(usersReceved(content));
  } catch (error) {
    dispatch(usersRequestFiled(error.message));
  }
};

export const login =
  ({ payload, redirect }) =>
  async (dispatch) => {
    const { email, password } = payload;
    dispatch(authRequested());
    try {
      const data = await authService.login({ email, password });
      localStorageService.setTokens(data);
      dispatch(authRequestSuccess({ userId: data.userId }));
      history.push(redirect);
    } catch (error) {
      const { status, statusText } = error.response;
      if (status === 400) {
        const errorMessage = generetaAuthError(statusText);
        dispatch(authRequestFailed(errorMessage));
      } else {
        dispatch(authRequestFailed(error.message));
      }
    }
  };

export const signUp = (payload) => async (dispatch) => {
  dispatch(authRequested());
  try {
    const data = await authService.register(payload);
    localStorageService.setTokens(data);
    dispatch(authRequestSuccess({ userId: data.userId }));
    history.push("notes");

    // dispatch(
    //   createUser({
    //     _id: data.localId,
    //     email,
    //     image: `https://avatars.dicebear.com/api/avataaars/${(
    //       Math.random() + 1
    //     )
    //       .toString(36)
    //       .substring(7)}.svg`,
    //     ...rest,
    //   })
    // );

    //history.push(redirect);
  } catch (error) {
    dispatch(authRequestFailed(error.message));
  }
};

// function createUser(payload) {
//   return async function (dispatch) {
//     dispatch(userCreatRequested());
//     try {
//       const { content } = await userService.create(payload);
//       dispatch(userCreated(content));
//     } catch (error) {
//       dispatch(createUserFailed(error.message));
//     }
//   };
// }

export const logOut = () => (dispatch) => {
  localStorageService.removeAuthData();
  dispatch(userLoggedOut());
  history.push("/");
};

export const getIsLoggedIn = () => (state) => {
  return state.users.isLoggedIn;
};
export const getCurrentUserData = () => (state) => {
  return state.users.entities
    ? state.users.entities.find((u) => u._id === state.users.auth.userId)
    : null;
};
export const getUsersList = () => (state) => state.users.entities;
export const getAuthErrors = () => (state) => state.users.error;
export const getUsersLoadingStatus = () => (state) => state.users.isLoading;

export default usersReducer;
