import importancesReducer from "./importances";
import usersReducer from "./users";

const { combineReducers, configureStore } = require("@reduxjs/toolkit");

const rootReducer = combineReducers({
  users: usersReducer,
  importances: importancesReducer,
});

export function createStore() {
  return configureStore({
    reducer: rootReducer,
  });
}
