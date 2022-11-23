import { GET_MAIN, GET_SUB, IS_ADMIN, SAMPLE_ERROR } from "../types";


function getToDoList() {
  return new Promise((resolve, reject) => {
    if(localStorage.getItem("token")){
      axios.get("http://localhost:1453/api/task", {
        headers: {
          "x-access-token": localStorage.getItem("token")
        }
      })
        .then(res => resolve(res.data))
        .catch(err => reject(err));
    }else{
      resolve([])
    }
  });
};

export const getMainData = () => async (dispatch) => {
  getToDoList().then(function(toDoList) {
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
  });
};

export const getSubData = () => async (dispatch) => {
  getToDoList().then(function(toDoList) {
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
  });
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