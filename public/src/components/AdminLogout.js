import React from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import "../pages/admin/VerifyAdminLogin"

function AdminLogout() {
  const navigate = useNavigate();
  const [removeCookie] = useCookies([]);
  const handleLogout = () => {
    removeCookie("jwtAdmin");
    navigate("/admin/login");
  };
  return <button onClick={handleLogout}>Logout</button>;
}

export default AdminLogout;
