import React from "react";
import { useNavigate } from "react-router-dom";

export default function Secret() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/login");
  };
  return (
    <div className="private">
      <h1>User dashboard</h1>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}
