"use client";
import React, { Dispatch, createContext, useReducer } from "react";

const initialState = {
  formGlobal: {
    search: "",
    searchDataset: "",
    searchOrganization: "",
    searchCategory: "",
    searchNews: "",
    searchInfoGraphic: "",

    setSectorAffair: {
      label: "Pilih Semua",
      value: "",
    },
    setYear: {
      label: new Date().getFullYear(),
      value: new Date().getFullYear(),
    },

    sortDataset: "",
    sortOrganization: "",
    sortCategory: "",
    sortNews: "",
    sortInfoGraphic: "",
  },
  count: 0,
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case "FORM_GLOBAL":
      return {
        ...state,
        formGlobal: {
          ...state.formGlobal,
          [action.formType]: action.formValue,
        },
      };
    case "INCREMENT":
      return { ...state, count: state.count + 1 };
    case "DECREMENT":
      return { ...state, count: state.count - 1 };
    case "RESET":
      return { ...state, count: 0 };
    default:
      return state;
  }
};

export const GlobalContext = createContext({
  state: initialState,
  dispatch: () => null,
});

export const GlobalContextProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <GlobalContext.Provider value={{ state, dispatch }}>
      {children}
    </GlobalContext.Provider>
  );
};

export const setFormGlobal = (formType, formValue) => {
  return { type: "FORM_GLOBAL", formType, formValue };
};
