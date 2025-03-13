import { useState } from "react";

const useAddBusinessCustomHook = () => {

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
  });

  const handleChange = (e: any) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    console.log("Business Added:", formData);
  };


  return {
    handleChange,
    handleSubmit,
    formData,
  };
}

export default useAddBusinessCustomHook;