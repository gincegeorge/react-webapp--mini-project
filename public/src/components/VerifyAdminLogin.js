import React, { useEffect, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";

function VerifyAdminLogin() {
  const navigate = useNavigate();
  const [cookies, setcookie, removeCookie] = useCookies([]);

  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwtAdmin) {
        navigate("/admin/login");
      } else {
        
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);
}

export default VerifyAdminLogin;
