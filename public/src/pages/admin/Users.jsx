import axios from "axios";
import React, { useEffect, useState } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { confirmAlert } from "react-confirm-alert";
import "react-confirm-alert/src/react-confirm-alert.css";
import { BACKEND_URL } from "../../config/config.js";
import Navbar from "../../components/Navbar";

function Users() {
  const navigate = useNavigate();

  const [userList, setUserList] = useState();
  const [render, setrender] = useState(0);

  //EDIT USER
  const editUser = (userId) => {
    navigate("/admin/users/edit/" + userId);
  };

  //DELETE USER
  const deleteUser = (userId) => {
    confirmAlert({
      title: "Confirm to delete",
      message: "Are you sure to do this.",
      buttons: [
        {
          label: "Yes",
          onClick: () => {
            deleteUserBackend(userId);
          },
        },
        {
          label: "No",
          onClick: () => console.log("Don't delete"),
        },
      ],
    });
  };

  const deleteUserBackend = async (userId) => {
    try {
      const result = await axios.post(
        "http://localhost:4000/admin/users/delete/" + userId,
        {
          withCredentials: true,
        }
      );
      if (result.status) {
        setrender(++render);
      }
    } catch (error) {
      //  console.log(error);
    }
  };

  //GET USER DATA
  useEffect(() => {
    const getData = async () => {
      const { data } = await axios.get(BACKEND_URL + "/admin/users", {
        withCredentials: true,
      });
      setUserList(data);
    };
    getData();
  }, [render]);

  return (
    <>
      <div className="private">
        <Navbar />
        <div className="flex flex-col">
          <div className="overflow-x-auto">
            <div className="p-1.5 w-full inline-block align-middle">
              <div className="flex justify-evenly mt-20">
                <button
                  onClick={() => navigate("/admin/create-user")}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Create User
                </button>
                <div>
                  <input
                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                    id="search"
                    type="text"
                    placeholder="Search"
                  />
                </div>
              </div>
              <div className="mx-auto w-full max-w-screen-md mt-20 overflow-hidden border rounded-lg">
                <table className="w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        ID
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Name
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-left text-gray-500 uppercase "
                      >
                        Email
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Edit
                      </th>
                      <th
                        scope="col"
                        className="px-6 py-3 text-xs font-bold text-right text-gray-500 uppercase "
                      >
                        Delete
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {userList
                      ? userList.users.map((user, index) => {
                          return (
                            <tr key={user._id}>
                              <td className="px-6 py-4 text-sm font-medium text-gray-800 whitespace-nowrap">
                                {++index}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {user.name}
                              </td>
                              <td className="px-6 py-4 text-sm text-gray-800 whitespace-nowrap">
                                {user.email}
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <div
                                  id={user._id}
                                  onClick={() => editUser(user._id)}
                                  className="text-green-500 hover:text-green-700"
                                >
                                  edit
                                </div>
                              </td>
                              <td className="px-6 py-4 text-sm font-medium text-right whitespace-nowrap">
                                <div
                                  className="text-red-500 hover:text-red-700"
                                  id={user._id}
                                  onClick={() => deleteUser(user._id)}
                                >
                                  Delete
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      : ""}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Users;
