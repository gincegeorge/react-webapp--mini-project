import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast,  } from "react-toastify";
import axios from "axios";

function Login() {
  const navigate = useNavigate();
  const [values, setvalues] = useState({
    name: "",
    email: "",
    password: "",
  });

  const generateError = (err) => {
    toast.error(err, {
      position: "bottom-right",
    }); 
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const { data } = await axios.post(
        "http://localhost:4000/login",
        {
          ...values,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.errors) {
          const { email, password } = data.errors;
          if (email) generateError(email);
          else if (password) generateError(password);
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="email">Email</label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            onChange={(e) => {
              setvalues({ ...values, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div>
          <label htmlFor="password">Password</label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => {
              setvalues({ ...values, [e.target.name]: e.target.value });
            }}
          />
        </div>
        <div>
          <button type="submit">Login</button>
        </div>
        <div>
          Don't have an account? <Link to="/register">Register</Link>
        </div>
      </form>
      <ToastContainer />
    </div>
  );
}

export default Login;
