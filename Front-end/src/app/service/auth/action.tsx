
import { AppThunk } from "../../store";
import { loginUser, profile, signupUser } from "./api";
import { login } from "./authSlice";

export const loginAction = (email: string, password: string): AppThunk => (dispatch) =>
  loginUser(email, password).then((userData) => {
    localStorage.setItem("user",userData.token);
    dispatch(login(userData));
    return userData;
  })
    .catch(() => { })
    .finally(() => {
    });


export const signupAction = (name:string, email: string, password: string, phoneNumber: number): AppThunk => () =>
  signupUser(name,email, password, phoneNumber)
    .then((userData) => {
      return userData;
    })
    .catch(() => {
      return null
    })
    .finally(() => {
    });


export const profileAction = (token:string | null): AppThunk => (dispatch) =>
  profile(token)
    .then((userData) => {
      dispatch(login(userData));
    })
    .catch(() => {
      return null
    })
    .finally(() => {
    });

