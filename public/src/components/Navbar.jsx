import React, { useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./Navbar.css";
import VerifyAdminLogin from "./VerifyAdminLogin";

function Navbar() {

  VerifyAdminLogin()

  const navigate = useNavigate();
  const [cookies, setcookie, removeCookie] = useCookies([]);

  const handleLogout = () => {
    removeCookie("jwtAdmin");
    navigate("/admin/login");
  };
  
  return (
    <>
      <nav className="w-full dark-theme relative flex items-center min-w-screen align-center pb-5">
        <ul className="hidden p-4 w-full h-20 gap-4 md:px-8 lg:px-12 xl:px-16 2xl:px-20 items-center justify-between sm:flex">
          <li className="flex gap-8 justify-between items-center rounded-lg">
          <Link to="/admin" className="px-4 py-2 rounded-lg Link">
              Dashboard
            </Link>
            <Link to="/admin/users" className="px-4 py-2 rounded-lg Link">
              Users
            </Link>
          </li>
          <li className="flex gap-8 justify-between items-center rounded-lg">
            <button onClick={handleLogout}>Logout</button>
          </li>
        </ul>
      </nav>
    </>
  );
}

export default Navbar;
