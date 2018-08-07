import axios from "axios";
import {
  GET_PROFILE,
  PROFILE_LOADING,
  PROFILE_NOT_FOUND,
  GET_PROFILES,
  GET_ERRORS
} from "./types";

// get current profile
export const getCurrentProfile = () => dispatch => {
  dispatch(setProfileLoading());
  axios
    .get("/api/profile")
    .then(res =>
      dispatch({
        type: GET_PROFILE,
        payload: res.data
      })
    )
    .catch(err =>
      dispatch({
        type: GET_PROFILE,
        payload: {}
      })
    )
    .finally(console.log("hello"));
};
export const setProfileLoading = () => {
  return {
    type: PROFILE_LOADING
  };
};
