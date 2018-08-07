import { combineReducers } from "redux";
import authReducer from "./authReducer";
import errorReducers from "./errorReducers";
import profileReduder from "./profileReduder";
export default combineReducers({
  auth: authReducer,
  errors: errorReducers,
  profile: profileReduder
});
