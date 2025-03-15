import { useEffect, useState } from "react";
import { businessAction, deleteBusinessAction } from "../../../../app/service/business/action";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const useBusinessListCustomHook = () => {



  const dispatch = useDispatch();
  const { data } = useSelector((state: any) => state.business);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("user");
    if (token) {
      dispatch<any>(businessAction(token)).finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  const addBusiness = () => {
    navigate('/admin/business/addbusiness')
  }

  return {
    data,
    loading,
    addBusiness,
  };
}

export default useBusinessListCustomHook;