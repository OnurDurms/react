import { combineReducers } from "redux";
import {isAdminReducer, mainReducer, subReducer} from "./reducer";

export default combineReducers({
  mainData: mainReducer,
  subData: subReducer,
  isAdmin: isAdminReducer,
});