import React, { useState } from "react";
import "./AdminStudentListAddStd.scss";
import axios from "axios";
import Swal from "sweetalert2";
export const AdminStudentListAddStd = ({
  setAddNewStudentMode,
  setReload,
  setStudentList,
  baseUrl,
}) => {
  const [addedStudent, setAddedStudent] = useState({
    id: "",
    name: "",
  });



  const getDataFromInputs = (e) => {
    let id = e.target.id;
    let value = e.target.value;
    let newObj = { ...addedStudent };
    newObj[id] = value;
    setAddedStudent(newObj);
  };
  const token = localStorage.getItem("myToken");


  const addNewStudentToSystem = async () => {
    if (addedStudent.id !== "" && addedStudent.name !== "") {
      try {
        const myRespone = await axios.post(baseUrl + "students", addedStudent, {
          headers: {
            Authorization: `Bearer ${token}`,

            "ngrok-skip-browser-warning": "true", // Set any value
          },
        });
        setAddNewStudentMode(false);
        setStudentList([]);
        console.log(myRespone);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Warning",
        text: "Please  Fill All Student Data",
        icon: "warning",
      });
    }
  };
  return (
    <div className="studentListAddStudent">
      <div className="headerOfCard">
        <h4>Add Student</h4>
        <div onClick={() => setAddNewStudentMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="addNewStudent">
        <label htmlFor="name">student Name</label>
        <input
          onChange={getDataFromInputs}
          type="text"
          id="name"
          placeholder="Use PascalCase"
        />
        <label htmlFor="id">student Id</label>
        <input
          onChange={getDataFromInputs}
          type="number"
          id="id"
          placeholder="Ex : 42020161"
        />
      </div>
      <div className="addingButton">
        <button onClick={addNewStudentToSystem} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
