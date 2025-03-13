
import { AppThunk } from "../../store";
import { hideNotification, visibleNotification } from "./notificationSlice";

type GlobalModal={
  message: string,
  isOpen: boolean,
}

export const setVisibleNotification= (modal: Partial<GlobalModal>): AppThunk => (dispatch) => {
  dispatch(visibleNotification(modal))
}
export const setHideNotification = (modal: Partial<GlobalModal>): AppThunk => (dispatch) => {
  dispatch(hideNotification(modal))
} 

