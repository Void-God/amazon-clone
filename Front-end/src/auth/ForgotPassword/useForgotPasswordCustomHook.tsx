import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { changePasswordAction, forgotPasswordAction, forgotPasswordEmailAction, resendOtpAction, verifyOtpAction } from "../../app/service/auth/action";
import { useDispatch, useSelector } from "react-redux";
import notificationService from "../../app/service/notification/notification";
import { RootState } from "../../app/store";


const useForgotPasswordCustomHook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()
  const { email, token } = useSelector((state: RootState) => state.auth?.forgotPassword ?? {});

  const handleSendOTP = async (email: string) => {
    setLoading(true);
    try {
      const response = await dispatch<any>(forgotPasswordAction(email))
      if (response) {
        dispatch<any>(forgotPasswordEmailAction(email))
        notificationService.showNotification({ message: "OTP sent successfully to your email!", isOpen: true })
        navigate('/verify-otp')
      }
      else {
        notificationService.showNotification({ message: "Failed to send OTP. Try again.!", isOpen: true })
      }
    } catch (error) {
      notificationService.showNotification({ message: "Failed to send OTP. Try again.!", isOpen: true })
    }
    setLoading(false);

  };

  const handleVerifyOTP = async (otp: string) => {
    setLoading(true);
    try {
      const response = await dispatch<any>(verifyOtpAction(email as any, otp))
      if (response) {
        notificationService.showNotification({ message: "OTP Verified successfully", isOpen: true })
        navigate('/change-password')
      }
      else {
        notificationService.showNotification({ message: "Failed to verify OTP. Try again.!", isOpen: true })
      }
    } catch (error) {
      notificationService.showNotification({ message: "Failed to verify OTP. Try again.!", isOpen: true })
    }
    setLoading(false);
  };

  const handleResendOTP = async () => {
    setLoading(true);
    try {
      const response = await dispatch<any>(resendOtpAction(email as any))
      if (response) {
        notificationService.showNotification({ message: "OTP Resend successfully", isOpen: true })
        navigate('/verify-otp')
      }
      else {
        notificationService.showNotification({ message: "Failed to resend OTP. Try again.!", isOpen: true })
      }
    } catch (error) {
      notificationService.showNotification({ message: "Failed to resend OTP. Try again.!", isOpen: true })
    }
    setLoading(false);
  }

  const handleChangePassword = async (password: string, confirmPassword: string) => {
    setLoading(true);
    try {

      const response = await dispatch<any>(changePasswordAction(password, confirmPassword, token as any))
      if (response) {
        notificationService.showNotification({ message: "Password changed successfully", isOpen: true })
        navigate('/')
      }
      else {
        notificationService.showNotification({ message: "Failed to  change Passoword. Try again.!", isOpen: true })
        navigate('/')
      }
    } catch (error) {
      notificationService.showNotification({ message: "Failed to  change Passoword. Try again.!", isOpen: true })
    }
    setLoading(false);

  }

  return {
    loading,
    handleSendOTP,
    handleVerifyOTP,
    navigate,
    handleResendOTP,
    handleChangePassword
  };
};

export default useForgotPasswordCustomHook;
