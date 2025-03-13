import { configureStore, ThunkAction, Action, combineReducers } from "@reduxjs/toolkit";
import authReducer from "./service/auth/authSlice";
import notificationReducer from "./service/notification/notificationSlice";
import businessReducer from "./service/business/businessSlice";

// Define logout action type
export const LOGOUT = "auth/logout";

// Combine reducers
const appReducer = combineReducers({
  auth: authReducer,
  notification: notificationReducer,
  business: businessReducer,
});


const rootReducer = (state: any, action: Action) => {
  if (action.type === LOGOUT) {
    state = undefined; // Reset the state on logout
  }
  return appReducer(state, action);
};

// Configure store with rootReducer
export const store = configureStore({
  reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

export default store;
