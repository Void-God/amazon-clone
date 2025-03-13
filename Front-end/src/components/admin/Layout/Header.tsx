import { FiLogOut } from "react-icons/fi";
import { useSelector } from "react-redux";
import '../../../StyleSheet/header.css';
const Header = () => {
  const { user } = useSelector((state: any) => state.auth);
  return (

    <>
      <header className="header">
        <div className="title">Admin Dashboard</div>
        <div className="user-actions">
          <span className="role-badge">{user.role.toUpperCase()}</span>
          <button className="logout-btn">
            <FiLogOut size={18} />
            Logout
          </button>
        </div>
      </header>
    </>
  )

}

export default Header;