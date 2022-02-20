import { createSlice } from "@reduxjs/toolkit";
import importanceService from "../services/importance.service";

const importancesSlice = createSlice({
  name: "importances",
  initialState: {
    entities: null,
    isLoading: true,
    error: null,
  },
  reducers: {
    importancesRequested: (state) => {
      state.isLoading = true;
    },
    importancesReceved: (state, action) => {
      state.entities = action.payload;
      state.isLoading = false;
    },
    importancesRequestFiled: (state, action) => {
      state.error = action.payload;
      state.isLoading = false;
    },
  },
});

const { reducer: importancesReducer, actions } = importancesSlice;
const { importancesRequested, importancesReceved, importancesRequestFiled } =
  actions;

export const loadimportancesList = () => async (dispatch) => {
  dispatch(importancesRequested());
  try {
    const { content } = await importanceService.get();
    dispatch(importancesReceved(content));
  } catch (error) {
    dispatch(importancesRequestFiled(error.message));
  }
};

export const getImportances = () => (state) => state.importances.entities;

export const getImprtanceById = (imp) => (state) => {
  if (state.importances.entities) {
    return state.importances.entities.find((i) => i._id === imp);
  }
};

export default importancesReducer;
