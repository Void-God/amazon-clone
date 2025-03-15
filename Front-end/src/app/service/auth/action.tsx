
import { AppThunk } from "../../store";
import { changePasswordApi, forgotPasswordApi, loginUser, profile, resendOtpApi, signupUser, verifyOtpApi } from "./api";
import { forgotPassword, forgotPasswordToken, login } from "./authSlice";

export const loginAction = (email: string, password: string): AppThunk => (dispatch) =>
  loginUser(email, password).then((userData) => {
    localStorage.setItem("user", userData.token);
    dispatch(login(userData));
    return userData;
  })
    .catch(() => {return 0 })
    .finally(() => {
    });


export const signupAction = (name: string, email: string, password: string, phoneNumber: number): AppThunk => () =>
  signupUser(name, email, password, phoneNumber)
    .then((userData) => {
      return userData;
    })
    .catch(() => {
      return null
    })
    .finally(() => {
    });


export const profileAction = (token: string | null): AppThunk => (dispatch) =>
  profile(token)
    .then((userData) => {
      dispatch(login(userData));
    })
    .catch(() => {
      return null
    })
    .finally(() => {
    });

export const forgotPasswordAction = (email: string): AppThunk => () =>
  forgotPasswordApi(email).then(() => {
    return 1;
  })
    .catch(() => { return 0 })
    .finally(() => {
    });

export const verifyOtpAction = (email: string, otp: string): AppThunk => (dispatch) =>
  verifyOtpApi(email, otp).then((resp) => {
    dispatch<any>(forgotPasswordToken(resp.token))
    return 1;
  })
    .catch(() => { return 0 })
    .finally(() => {
    });
export const resendOtpAction = (email: string): AppThunk => () =>
  resendOtpApi(email).then(() => {
    return 1;
  })
    .catch(() => { return 0 })
    .finally(() => {
    });
export const changePasswordAction = (password: string, confirmPassword: string, token: string): AppThunk => () =>
  changePasswordApi(password, confirmPassword, token).then(() => {
    return 1;
  })
    .catch(() => { return 0 })
    .finally(() => {
    });
export const forgotPasswordEmailAction = (email: string): AppThunk => (dispatch) => {
  dispatch<any>(forgotPassword(email))
}

