import axios from "axios";
import React, { useState } from "react";
import Swal from "sweetalert2";

export const AdminAddNewSubjectMode = (props) => {
  const baseUrl = props.baseUrl;
  const [getDataFromInputs, setDataFromIputs] = useState({
    code: "",
    courseName: "",
  });
  const setAddingSubjectMode = props.setAddingSubjectMode;
  const createNewSubject = (e) => {
    sendNewCourseToApi();
  };
  const token = localStorage.getItem("myToken");

  const getDataFromUser = (e) => {
    let newArr = { ...getDataFromInputs };
    let newValue = e.target.value;
    let currentInput = e.target.name;
    newArr[currentInput] = newValue;
    setDataFromIputs(newArr);
    console.log(newArr);
  };
  const sendNewCourseToApi = async () => {
    if (getDataFromInputs.code !== "" && getDataFromInputs.courseName !== "") {
      try {
        setAddingSubjectMode(false);
        let myRespone = await axios.post(
          baseUrl + "course",
          getDataFromInputs,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );
        console.log(myRespone);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please Make Sure You Filled All Data",
        icon: "warning",
      });
    }
  };
  return (
    <div className="addingNewSubject">
      <div className="subjectsBox">
        <div className="subjectBoxHeader">
          <h4>Adding Subject</h4>
        </div>

        <div className="addedCourseDetails">
          <label htmlFor="courseName">Subject Name</label>
          <input
            onChange={getDataFromUser}
            type="text"
            name="courseName"
            id="courseName"
            placeholder="Use Pascal Case "
          />
          <label htmlFor="code">Subject Code</label>
          <input
            onChange={getDataFromUser}
            type="text"
            name="code"
            id="code"
            placeholder="Use Pascal Case "
          />
          <label htmlFor="subjectGroup">Groups</label>
          <input
            type="text"
            name="subjectGroup"
            id="subjectGroup"
            placeholder="EX Group 1"
          />
          <button onClick={createNewSubject}> Add New Subject</button>
        </div>
      </div>
    </div>
  );
};
