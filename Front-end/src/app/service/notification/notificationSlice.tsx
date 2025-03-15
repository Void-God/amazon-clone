import { createSlice } from "@reduxjs/toolkit";

interface NotificationState {
  message: string;
  isOpen: boolean;
  type?: "normal" | "confirmation";
  onYes?: () => void;
  onNo?: () => void;
}

const initialState: NotificationState = {
  message: "",
  isOpen: false,
};

const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    showNotification: (state, action) => {
      return { ...state, ...action.payload };
    },
    hideNotification: (state) => {
      return { ...initialState };
    },
  },
});

export const { showNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
