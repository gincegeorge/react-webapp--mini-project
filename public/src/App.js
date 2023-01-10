import { BrowserRouter, Routes, Route } from "react-router-dom";
import "./App.css";
import "react-toastify/dist/ReactToastify.css";

//components -user
import Register from "./pages/user/Register";
import Login from "./pages/user/Login";
import Secret from "./pages/user/Secret";
//components user
import Admin from "./pages/admin/AdminDashboard";
import AdminLogin from "./pages/admin/AdminLogin";
import Users from "./pages/admin/Users";
import EditUser from "./pages/admin/EditUser";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route exact path="/" element={<Secret />} />
        <Route exact path="/register" element={<Register />} />
        <Route exact path="/login" element={<Login />} />

        <Route exact path="/admin" element={<Admin />} />
        <Route exact path="/admin/login" element={<AdminLogin />} />
        <Route exact path="/admin/users" element={<Users />} />
        <Route exact path="/admin/users/edit/:id" element={<EditUser />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
