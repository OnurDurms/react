import { GET_MAIN, GET_SUB, IS_ADMIN, SAMPLE_ERROR } from "../types";
import { toDoList } from '../../data/data';

export const getMainData = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_MAIN,
      payload: toDoList,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: "error message",
    });
  }
};

export const getSubData = () => async (dispatch) => {
  try {
    dispatch({
      type: GET_SUB,
      payload: toDoList,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: "error message",
    });
  }
};

export const isAdmin = () => async (dispatch) => {
  try {
    dispatch({
      type: IS_ADMIN,
      payload: 0,
    });
  } catch (error) {
    dispatch({
      type: SAMPLE_ERROR,
      payload: "error message",
    });
  }
};