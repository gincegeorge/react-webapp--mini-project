import React from "react";
import Navbar from "../../components/Navbar";

export default function AdminDashboard() {
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     if (!cookies.jwtAdmin) {
  //       navigate("/adminlogin");
  //     } else {
  //       const { data } = await axios.post(
  //         "http://localhost:4000/admin",
  //         {},
  //         { withCredentials: true }
  //       );
  //       if (!data.status) {
  //         removeCookie("jwtAdmin");
  //         navigate("/admin/login");
  //       } else {
  //         setName(data.user.name);
  //       }
  //     }
  //   };
  //   verifyUser();
  // }, [cookies, navigate, removeCookie]);

  // const handleLogout = () => {
  //   removeCookie("jwtAdmin");
  //   navigate("/admin/login");
  // };

  return (
    <>
      <div className="private">
        <Navbar />
        <h1>Admin dashboard!</h1>
      </div>
    </>
  );
}
