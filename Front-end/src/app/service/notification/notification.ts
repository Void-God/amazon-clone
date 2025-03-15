import { Dispatch } from "redux";
import { setHideNotification, setVisibleNotification } from "./action";

class NotificationService {
  public dispatch: Dispatch | null = null;

  showNotification(payload: { message: string; isOpen: boolean }) {
    if (this.dispatch) {
      this.dispatch<any>(setVisibleNotification(payload));

      setTimeout(() => {
        if (this.dispatch) {
          this.dispatch<any>(setHideNotification());
        }
      }, 2000);
    } else {
      console.error("Dispatch function is not initialized yet.");
    }
  }

  showConfirmationNotification(
    payload: { message: string; isOpen: boolean },
    onYes: () => void,
    onNo: () => void
  ) {
    if (this.dispatch) {
      this.dispatch<any>(
        setVisibleNotification({
          ...payload,
          type: "confirmation",
          onYes,
          onNo,
        })
      );
    } else {
      console.error("Dispatch function is not initialized yet.");
    }
  }
}

// ✅ Export a singleton instance
const notificationService = new NotificationService();
export default notificationService;
