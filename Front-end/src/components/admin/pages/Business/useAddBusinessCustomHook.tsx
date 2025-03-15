import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import notificationService from "../../../../app/service/notification/notification";
import { addBusinessAction, deleteBusinessAction } from "../../../../app/service/business/action";

const useAddBusinessCustomHook = () => {
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch()

  const handleSubmit = async (data: any) => {
    console.log("i am ca");

    setLoading(true);
    try {
      const token = localStorage.getItem('user')
      const response = await dispatch<any>(addBusinessAction(token as any, data))
      if (response) {
        notificationService.showNotification({ message: "Business Added successfully", isOpen: true })
      }
      else {
        notificationService.showNotification({ message: "Failed to Add Business. Try again.!", isOpen: true })
      }
    } catch (error) {
      notificationService.showNotification({ message: "Failed to Add Business. Try again.!", isOpen: true })
    }
    setLoading(false);

  }

  const deleteBusiness = async (businessId: string) => {

    setLoading(true);
    try {

      const token = localStorage.getItem('user')
      const response = await dispatch<any>(deleteBusinessAction(token as any, businessId))
      if (response) {
        notificationService.showNotification({ message: "Business Deleted!", isOpen: true })
      }
      else {
        notificationService.showNotification({ message: "Failed to delete Business. Try again.!", isOpen: true })
      }
    }
    catch (error) {
      notificationService.showNotification({ message: "Failed to delete Business. Try again.!", isOpen: true })
    }
    setLoading(false);



  }

  return {
    loading,
    handleSubmit,
    deleteBusiness,

  };
}

export default useAddBusinessCustomHook;