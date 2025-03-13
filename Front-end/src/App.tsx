import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import { NotFound } from "./components/authGuard/NotFoundpage";
import AuthGuard from "./components/authGuard/authguards";
import Login from "./auth/Login/Login";
import SignUp from "./auth/SignUp/SignUp";
import Layout from "./components/admin/Layout/Layout";
import BuyerLayout from "./components/buyer/Layout/BuyerLayout";
import DashBoard from "./components/admin/pages/DashBoard";
import BuyerDashBoard from "./components/buyer/pages/BuyerDashBoard";
import BusinessList from "./components/admin/pages/Business/BusinessList";
import AddBusiness from "./components/admin/pages/Business/AddBusiness";




function App() {


  return (
    <Router>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/admin" element={<AuthGuard role={"SUPERADMIN"}><Layout /></AuthGuard>}>
          <Route path="dashboard" element={<DashBoard />} />
          <Route path="business" element={<BusinessList />} />
          <Route path="business/addbusiness" element={<AddBusiness />} />
        </Route>

        <Route path="/buyer" element={<AuthGuard role={"buyer"}><BuyerLayout /></AuthGuard>}>
          <Route path="dashboard" element={<BuyerDashBoard />} />
          {/* <Route path="details" element={<Details />} /> */}
        </Route>
        <Route path="*" element={<NotFound />} />
      </Routes>
    </Router>
  );
}

export default App;
