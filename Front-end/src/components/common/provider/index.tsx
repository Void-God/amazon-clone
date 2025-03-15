import { ReactNode, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import notificationService from "../../../app/service/notification/notification";
import { RootState } from "../../../app/store";
import { setHideNotification } from "../../../app/service/notification/action";

interface AppProviderProps {
  children: ReactNode;
}

// Ensure ReactModal is properly initialized
Modal.setAppElement("#root");

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {
  const dispatch = useDispatch();
  const { message, isOpen, type, onYes, onNo } = useSelector(
    (state: RootState) => state.notification
  );

  useEffect(() => {
    notificationService.dispatch = dispatch;
  }, [dispatch]);

  const handleClose = () => {
    dispatch<any>(setHideNotification());
  };

  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        onRequestClose={handleClose}
        shouldCloseOnOverlayClick={true}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
          content: {
            width: "400px",
            height: "200px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            textAlign: "center",
          },
        }}
      >
        <p style={{ fontSize: "16px", fontWeight: "bold", color: "#333" }}>
          {message}
        </p>

        {type === "confirmation" ? (
          <div style={{ marginTop: "20px", display: "flex", gap: "10px" }}>
            <button
              onClick={() => {
                if (onYes) onYes();
                handleClose();
              }}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#28a745",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Yes
            </button>

            <button
              onClick={() => {
                if (onNo) onNo();
                handleClose();
              }}
              style={{
                padding: "8px 16px",
                fontSize: "14px",
                backgroundColor: "#dc3545",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              No
            </button>
          </div>
        ) : (
          <button
            onClick={handleClose}
            style={{
              marginTop: "10px",
              padding: "8px 16px",
              fontSize: "14px",
              backgroundColor: "#007bff",
              color: "#fff",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Close
          </button>
        )}
      </Modal>
    </>
  );
};

export default AppProvider;
