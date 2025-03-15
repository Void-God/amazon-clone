import { FiLogOut } from "react-icons/fi";
import { useDispatch, useSelector } from "react-redux";
import '../../../StyleSheet/header.css';
import { useNavigate } from "react-router-dom";
import { LOGOUT } from "../../../app/store";
import { showNotification } from "../../../app/service/notification/notificationSlice";
const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleYes = () => {
    console.log("I am called");
    dispatch({ type: LOGOUT });
    navigate('/');
  };
  
  const handleLogout = () => {
    dispatch(
      showNotification({
        message: "Are you sure you want to logout?",
        isOpen: true,
        type: "confirmation",
        onYes: handleYes, // ✅ Direct function reference
        onNo: () => {},
      })
    );
  };
  


  return (

    <>
      <header className="header">
        <div className="title">Admin Dashboard</div>
        <div className="user-actions">
          <span className="role-badge">{user.role.toUpperCase()}</span>
          <button className="logout-btn" onClick={handleLogout}>
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </header>
    </>
  )

}

export default Header;