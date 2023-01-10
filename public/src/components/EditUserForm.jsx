import React, { useState, useEffect } from "react";
import axios from "axios";
import { BACKEND_URL } from "../config/config";
import { useNavigate } from "react-router-dom";

function EditUserForm({ id }) {
  const navigate = useNavigate();
  const [user, setUser] = useState({
    id: "",
    name: "",
    email: "",
  });

  //GET DATA FROM DB
  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(
        BACKEND_URL + "/admin/users/edit/" + id,
        {
          withCredentials: true,
        }
      );
      if (data.error) {
        console.log(data.error);
      } else {
        setUser(data.user);
      }
    };
    getUserData();
  }, []);

  //HANDLE SUBMIT
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(user);
    try {
      const { data } = await axios.post(
        "http://localhost:4000/admin/users/edit/" + user._id,
        {
          ...user,
        },
        {
          withCredentials: true,
        }
      );
      if (data) {
        if (data.error) {
          console.log(data.errors);
        } else {
          navigate("/admin/users");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="w-full max-w-xs align-center">
      <form
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
        onSubmit={handleSubmit}
      >
        <div className="mb-4">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="name"
          >
            Name
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name"
            type="text"
            name="name"
            required
            value={user.name}
            onChange={(e) => {
              setUser({
                ...user,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div className="mb-6">
          <label
            className="block text-gray-700 text-sm font-bold mb-2"
            htmlFor="email"
          >
            Email
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
            id="email"
            type="email"
            name="email"
            required
            value={user.email}
            onChange={(e) => {
              setUser({
                ...user,
                [e.target.name]: e.target.value,
              });
            }}
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="submit"
          >
            submit
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
