import { createSlice } from "@reduxjs/toolkit";
interface NotificationState {
  message: string;
  isOpen: boolean;
}
const initialState: NotificationState = {
  message: "",
  isOpen: false,
};
const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    visibleNotification: (state, action) => {
      const { message, isOpen } = action.payload
      state.isOpen = isOpen
      state.message = message
    },
    hideNotification: (state, action) => {
      const { message, isOpen } = action.payload
      state.isOpen = isOpen
      state.message = message
    },
  },
});

export const { visibleNotification, hideNotification } = notificationSlice.actions;
export default notificationSlice.reducer;
