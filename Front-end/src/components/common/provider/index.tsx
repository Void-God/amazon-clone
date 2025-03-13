import { ReactNode, useEffect } from "react";
import Modal from "react-modal";
import { useDispatch, useSelector } from "react-redux";
import notificationService from "../../../app/service/notification/notification";
import { RootState } from "../../../app/store";

interface AppProviderProps {
  children: ReactNode;
}

const AppProvider: React.FC<AppProviderProps> = ({ children }) => {

  const dispatch = useDispatch();
  const { message, isOpen } = useSelector((state: RootState) => state.notification)

  useEffect(() => {
    notificationService.dispatch = dispatch;
  }, [dispatch])


  return (
    <>
      {children}
      <Modal
        isOpen={isOpen}
        style={{
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)", // Dimmed background
          },
          content: {
            width: "400px",
            height: "200px",
            margin: "auto",
            padding: "20px",
            borderRadius: "10px",
            backgroundColor: "#fff",
            boxShadow: "0 4px 10px rgba(0, 0, 0, 0.2)", // Soft shadow
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
      </Modal>

    </>
  );
};

export default AppProvider;
