import { AppThunk } from "../../store";
import { hideNotification, showNotification } from "./notificationSlice";

type GlobalModal = {
  message: string;
  isOpen: boolean;
  type?: string;
  onYes:()=>void,
  onNo:()=>void
};

export const setVisibleNotification =
  (modal: Partial<GlobalModal>): AppThunk =>
  (dispatch) => {
    dispatch(showNotification(modal));
  };

export const setHideNotification = (): AppThunk => (dispatch) => {
  dispatch(hideNotification());
};
