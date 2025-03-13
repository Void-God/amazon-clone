import { useState } from "react";
import { FiBriefcase, FiHome, FiSettings } from "react-icons/fi";
import "./../../../StyleSheet/sidebar.css"; // Import CSS file
import { useNavigate } from "react-router-dom";

const Sidebar = () => {
  const [activeTab, setActiveTab] = useState("dashboard");
  const navigate = useNavigate();
  return (
    <aside className="sidebar">
      <div className="sidebar-header">Admin Panel</div>

      <ul className="sidebar-menu">
        <li
          className={activeTab === "dashboard" ? "active" : ""}
          onClick={() => { setActiveTab("dashboard"), navigate('/admin/dashboard') }}
        >
          <FiHome className="icon" /> Dashboard
        </li>

        <li
          className={activeTab === "business" ? "active" : ""}
          onClick={() => { setActiveTab("business"), navigate('/admin/business') }}
        >
          <FiBriefcase className="icon" /> Business
        </li>

        <li
          className={activeTab === "settings" ? "active" : ""}
          onClick={() => setActiveTab("settings")}
        >
          <FiSettings className="icon" /> Settings
        </li>
      </ul>
    </aside>
  );
};

export default Sidebar;
