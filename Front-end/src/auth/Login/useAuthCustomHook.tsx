import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { loginAction } from "../../app/service/auth/action";


const useAuthCustomHook = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // const [email, setEmail] = useState("");
  // const [password, setPassword] = useState("");

  const handleLogin = async (email: string, password: string) => {
    if (email && password) {
      const resposne = await dispatch<any>(loginAction(email, password))
      if (resposne.role === 'buyer') {
        navigate("/user/dashboard");
      }
      else if (resposne?.role === "SUPERADMIN") {
        navigate("/admin/dashboard");
      }
    } else {
      alert("Please enter email and password");
    }
  };

  return {
    // email,
    // setEmail,
    // password,
    // setPassword,
    handleLogin,
    navigate,
  };
};

export default useAuthCustomHook;
