import { useNavigate } from "react-router-dom";
import { signupAction } from "../../app/service/auth/action";
import { useDispatch } from "react-redux";
import notificationService from "../../app/service/notification/notification";



const useSignUpCustomHook = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();


  const handleSignup = async (email: string, password: string, name: string, phone: string) => {
    try {
      const phoneNumber = Number(phone);
      const response = await dispatch<any>(signupAction(name,email, password, phoneNumber));
      if (response) {
        notificationService.showNotification({
          message: "User Registered Successfully",
          isOpen: true,
          // type: "success",
        });
        navigate("/");
      } else {
        notificationService.showNotification({
          message: "Signup failed",
          isOpen: true,
          // type: "error",
        });
      }
    } catch (error) {
      notificationService.showNotification({
        message: "Something went wrong. Please try again.",
        isOpen: true,
        // type: "error",
      });
    }
  };

  return {
    handleSignup,
    navigate,
  };
};

export default useSignUpCustomHook;
