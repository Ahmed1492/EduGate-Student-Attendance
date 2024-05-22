import axios from "axios";
import React, { useState } from "react";
import "./AdminProfessorStatusAdd.scss";
import Swal from "sweetalert2";
export const AdminProfessorStatusAdd = ({
  seIsAddDoctorMode,
  setProfessorAccount,
  seIsReload,
  baseUrl,
}) => {
  const [addedProfessor, setAddedProfessor] = useState({
    name: "",
    isActive: true,
    userId: "",
  });
  const getDataFromInputs = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    let newObj = { ...addedProfessor };
    newObj[id] = value;
    console.log(newObj);
    setAddedProfessor(newObj);
  };
  const token = localStorage.getItem("myToken");

  const addNewDoctorToSystem = async () => {
    if (addedProfessor.name !== "" && addedProfessor.userId !== "") {
      try {
        const myRespone = await axios.post(
          baseUrl + "doctors",
          addedProfessor,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );
        await setProfessorAccount([]);
        await seIsReload({});
        seIsAddDoctorMode(false);
        console.log(myRespone);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please  Fill All Doctor Data",
        icon: "warning",
      });
    }
  };
  return (
    <div className="professorStatueAdd">
      <div className="headerOfCard">
        <h4>Add Professor</h4>
        <div onClick={() => seIsAddDoctorMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="addNewProfessor">
        <label htmlFor="name">Professor Name</label>
        <input
          onChange={getDataFromInputs}
          type="text"
          id="name"
          placeholder="Use PascalCase"
        />
        <label htmlFor="userId">Professor Id</label>
        <input
          onChange={getDataFromInputs}
          type="text"
          id="userId"
          placeholder="Ex : 42020161"
        />
      </div>
      <div className="addingButton">
        <button onClick={addNewDoctorToSystem} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
