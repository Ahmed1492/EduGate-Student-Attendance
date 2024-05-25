import React, { useEffect, useState } from "react";
import "./AdminStudentCourseAddMode.scss";
import axios from "axios";
import Swal from "sweetalert2";
export const AdminStudentCourseAddMode = ({
  setAddNewStudentMode,
  baseUrl,
  getData,
  setStudentWithGroups,
}) => {
  const [addGroups, setAllGroups] = useState([]);
  const [addSubjects, setAllSubjects] = useState([]);
  const [selectedData, setSelectedData] = useState({
    studentId: "",
    courseId: "",
    groupId: "",
  });
  const token = localStorage.getItem("myToken");

  const getAllSubjectsToAdd = async () => {
    try {
      const myResponse = await axios.get(baseUrl + "Course", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setAllSubjects(myResponse.data);
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGroups = async () => {
    try {
      let myResponse = await axios.get(baseUrl + "group", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setAllGroups(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getCourseId = (e) => {
    let newObj = { ...selectedData };
    newObj.courseId = e.target.value;
    setSelectedData(newObj);
    console.log(newObj);
  };
  const getGroupId = (e) => {
    let newObj = { ...selectedData };
    newObj.groupId = e.target.value;
    setSelectedData(newObj);
    console.log(newObj);
  };
  const getStudentId = (e) => {
    let newObj = { ...selectedData };
    newObj.studentId = e.target.value;
    setSelectedData(newObj);
    console.log(newObj);
  };
  const addNewStudent = async () => {
    if (
      selectedData.courseId !== "" &&
      selectedData.groupId !== "" &&
      selectedData.studentId !== ""
    ) {
      try {
        let myResponse = await axios.post(
          baseUrl + "studentCourseGroup",
          selectedData,
          {
            headers: {
              Authorization: `Bearer ${token}`,

              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );

        console.log(myResponse);
        await setAddNewStudentMode(false);
        await setStudentWithGroups([]);
        await getData();
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
  useEffect(() => {
    getAllGroups();
    getAllSubjectsToAdd();
  }, []);
  return (
    <div className="studentCourseAddStudent">
      <div className="headerOfCard">
        <h4>Add Student</h4>
        <div onClick={() => setAddNewStudentMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="addNewStudent">
        <label htmlFor="name">student Id</label>
        <input
          onChange={getStudentId}
          type="text"
          id="name"
          placeholder="Please Enter Student Id"
        />
        <label htmlFor="id">Course </label>
        <select
          onChange={getCourseId}
          id="id"
          className="form-select"
          aria-label="Default select example"
        >
          <option defaultValue>All Subjects</option>
          {addSubjects.map((subject, index) => (
            <option key={index} name="courseId" value={subject?.id}>
              {subject.courseName}
            </option>
          ))}
        </select>
        <label htmlFor="id">Group </label>
        <select
          onChange={getGroupId}
          className="form-select"
          aria-label="Default select example"
        >
          <option defaultValue>All Groups</option>

          {addGroups.map((group, index) => (
            <option key={index} name="groupId" value={group.id}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>
      <div className="addingButton">
        <button onClick={addNewStudent} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
