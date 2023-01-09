import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCookies } from "react-cookie";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

export default function Secret() {
  const navigate = useNavigate();
  const [cookies, setcookie, removeCookie] = useCookies([]);
  const [name, setName] = useState([]);
  useEffect(() => {
    const verifyUser = async () => {
      if (!cookies.jwt) {
        navigate("/login");
      } else {
        const { data } = await axios.post(
          "http://localhost:4000/",
          {},
          { withCredentials: true }
        );
        if (!data.status) {
          removeCookie("jwt");
          navigate("/login");
        } else {
          setName(data.user.name);
            // toast(`Hi ${data.user.name}`, {
            //   theme: "dark",
            // });
        }
      }
    };
    verifyUser();
  }, [cookies, navigate, removeCookie]);

  const handleLogout = () => {
    removeCookie("jwt");
    navigate("/login");
  };

  return (
    <>
      <div className="private">
        <h1>Hi {name}, welcome!</h1>
        <button onClick={handleLogout}>Logout</button>
      </div>
      {/* <ToastContainer /> */}
    </>
  );
}
