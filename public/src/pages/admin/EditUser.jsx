import React from "react";
import { useParams } from "react-router-dom";
import EditUserForm from "../../components/EditUserForm";
import Navbar from "../../components/Navbar";

function EditUser() {
  const { id } = useParams();
  return (
    <>
      <Navbar />
      <EditUserForm id={id} />
    </>
  );
}

export default EditUser;
