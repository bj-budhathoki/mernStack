import { GET_ERRORS, SET_CURRENT_USER } from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";
import setAuthToken from "../utils/setAuthToken";
//Register user
export const registerUser = (userData, history) => dispatch => {
  axios
    .post("/api/users/register", userData)
    .then(res => history.push("/login"))
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};
//login
export const loginUser = userData => dispatch => {
  axios
    .post("/api/users/login", userData)
    .then(res => {
      //save to localStorage
      const { token } = res.data;
      //set token to localstorege
      localStorage.setItem("jwtToken", token);
      //set teken to auth header
      setAuthToken(token);
      const decoded = jwt_decode(token);
      //set the current user
      dispatch(setCurrentUser(decoded));
    })
    .catch(err =>
      dispatch({
        type: GET_ERRORS,
        payload: err.response.data
      })
    );
};

//set the current user
export const setCurrentUser = decoded => {
  return {
    type: SET_CURRENT_USER,
    payload: decoded
  };
};
//logout
export const logoutUser = () => dispatch => {
  localStorage.removeItem("jwtToken");
  // remove toke from the future request
  setAuthToken(false);
  dispatch(setCurrentUser({}));
};
