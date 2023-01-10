import React, { useState, useEffect } from "react";
import { BACKEND_URL } from "../config/config";

function EditUserForm({ id }) {
  const [name, setname] = useState();
  const [email, setemail] = useState();

  useEffect(() => {
    const getUserData = async () => {
      const { data } = await axios.get(BACKEND_URL + "/admin/edit-user/" + id, {
        withCredentials: true,
      });
    };

    const verifyAdmin = async () => {
      if (!cookies.jwtAdmin) navigate("/admin/login");
      else {
        const { data } = await axios.get(PORT_PATH + "/admin/edit-user/" + id, {
          withCredentials: true,
        });
        if (!data.verifiedAdmin) navigate("/admin/login");
        else {
          if (data.error) generateError(data.error);
          else {
            setEdit(data.user);
            setuserDetails(data.user);
          }
        }
      }
    };
    verifyAdmin();
  }, []);

  console.log(id);

  return (
    <div className="w-full max-w-xs align-center">
      <form className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
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
          />
        </div>
        <div className="flex items-center justify-between">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button"
          >
            Sign In
          </button>
        </div>
      </form>
    </div>
  );
}

export default EditUserForm;
