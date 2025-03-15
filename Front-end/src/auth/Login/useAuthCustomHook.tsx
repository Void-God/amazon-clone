import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../app/service/auth/action";
import notificationService from "../../app/service/notification/notification";


const useAuthCustomHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (email: string, password: string) => {
    if (email && password) {
      const resposne = await dispatch<any>(loginAction(email, password))
      if (resposne) {
        if (resposne.role === 'buyer') {
          navigate("/user/dashboard");
        }
        else if (resposne?.role === "SUPERADMIN") {
          navigate("/admin/dashboard");
        }
      }
      else {
        notificationService.showNotification({ message: "Failed to login", isOpen: true })
      }
    } else {
      notificationService.showNotification({ message: "Failed to login", isOpen: true })
    }
  };

  return {
    handleLogin,
    navigate,
  };
};

export default useAuthCustomHook;
