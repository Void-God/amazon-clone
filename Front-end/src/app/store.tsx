import { Action, configureStore, ThunkAction } from "@reduxjs/toolkit";
import authReducer from "./service/auth/authSlice";
import notificationReducer from "./service/notification/notificationSlice";
import businessreducer from "./service/business/businessSlice";
export const store = configureStore({
  reducer: {
    auth: authReducer,
    notification: notificationReducer,
    business: businessreducer
  },
});

export default store;
export type AppThunk = ThunkAction<void, unknown, unknown, Action<string>>;
export type RootState = ReturnType<typeof store.getState>;

