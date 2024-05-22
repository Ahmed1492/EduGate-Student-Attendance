import React, { useEffect, useState } from "react";
import "./AdminHomePageProCourseAddMode.scss";
import axios from "axios";
import Swal from "sweetalert2";
export const AdminHomePageProCourseAddMode = ({
  setIsAddNewProfessorMode,
  baseUrl, 
  getProfessorData,
  setAllProfessors,
}) => {
  const [allDoctorsData, setAllDoctorsData] = useState([]);
  const [addGroups, setAllGroups] = useState([]);
  const [addSubjects, setAllSubjects] = useState([]);
  const [addedProfessor, setAddProfessor] = useState({
    doctorId: "",
    courseId: "",
    groupId: "",
  });
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
      // console.log(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getDoctorId = (e) => {
    let newObj = { ...addedProfessor };
    newObj.doctorId = e.target.value;
    setAddProfessor(newObj);
    console.log(newObj);
  };
  const getCourseId = (e) => {
    let newObj = { ...addedProfessor };
    newObj.courseId = e.target.value;
    setAddProfessor(newObj);
    console.log(newObj);
  };
  const getGroupId = (e) => {
    let newObj = { ...addedProfessor };
    newObj.groupId = e.target.value;
    setAddProfessor(newObj);
    console.log(newObj);
  };
  const token = localStorage.getItem("myToken");

  const addNewDoctorToCourse = async () => {
    try {
      let myRespone = await axios.post(
        baseUrl + "doctors/courseToDoctor",
        addedProfessor,
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
  };
  const addNewProfessorToCourseInSystem = async () => {
    // setIsAddNewProfessorMode(false);
    if (
      addedProfessor.courseId !== "" &&
      addedProfessor.groupId !== "" &&
      addedProfessor.doctorId !== ""
    ) {
      try {
        await addNewDoctorToCourse();
        await setIsAddNewProfessorMode(false);
        await setAllProfessors([]);
        await getProfessorData();
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please Fill All Doctor Data",
        icon: "warning",
      });
    }
  };
  const getAllDoctors = async () => {
    try {
      let myResponse = await axios.get(baseUrl + "doctors", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setAllDoctorsData(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllGroups();
    getAllSubjectsToAdd();
    getAllDoctors();
    // console.log(allDoctorsData);
  }, []);
  return (
    <div className="professorCourseAdd">
      <div className="headerOfCard">
        <h4>Add Doctor</h4>
        <div onClick={() => setIsAddNewProfessorMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="addNewStudent">
        <label htmlFor="name">Doctor Name</label>
        <select
          onChange={getDoctorId}
          id="id"
          className="form-select"
          aria-label="Default select example"
        >
          <option value="">All Doctors</option>
          {allDoctorsData.map((doctor, index) => (
            <option key={index} name="courseId" value={doctor?.id}>
              {doctor.name}
            </option>
          ))}
        </select>
        <label htmlFor="id">Course </label>
        <select
          onChange={getCourseId}
          id="id"
          className="form-select"
          aria-label="Default select example"
        >
          <option value="">All Subjects</option>
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
          <option value="">All Groups</option>

          {addGroups.map((group, index) => (
            <option key={index} name="groupId" value={group?.id}>
              {group.groupName}
            </option>
          ))}
        </select>
      </div>
      <div className="addingButton">
        <button onClick={addNewProfessorToCourseInSystem} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
