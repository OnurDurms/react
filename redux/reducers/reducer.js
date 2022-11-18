import { GET_MAIN, GET_SUB, IS_ADMIN, SAMPLE_ERROR } from "../types";

const initialState = {
  main: [],
  sub: [],
  isAdmin: 0,
  loading: true,
};

export const mainReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_MAIN:
      return {
        ...state,
        main: action.payload,
        loading: false,
      };
    case SAMPLE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const subReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUB:
      return {
        ...state,
        sub: action.payload,
        loading: false,
      };
    case SAMPLE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};

export const isAdminReducer = (state = initialState, action) => {
  switch (action.type) {
    case IS_ADMIN:
      return {
        ...state,
        isAdmin: action.payload,
        loading: false,
      };
    case SAMPLE_ERROR:
      return {
        loading: false,
        error: action.payload,
      };

    default:
      return state;
  }
};
