import axios from "axios";
import React, { useEffect, useState } from "react";
import Swal from "sweetalert2";
import "./AdminSelectSubjectToDoctor.scss";
export const AdminSelectSubjectToDoctor = ({
  setAddSubjectMode,
  professor,
  setAllProfessors,
  baseUrl,
  getProfessorData,
}) => {
  const [allSubjects, setAllSubjects] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
  const [updatedDoctor, setUpdatedDoctor] = useState({
    doctorId: "",
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
      await setAllSubjects(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getAllGroupsToAdd = async () => {
    try {
      const myResponse = await axios.get(baseUrl + "group", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      await setAllGroups(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addNewCourseToDoctor = async () => {
    // setAddSubjectMode(false);
    if (
      updatedDoctor.courseId !== "" &&
      updatedDoctor.groupId !== "" &&
      updatedDoctor.doctorId !== ""
    ) {
      try {
        let myResponse = await axios.post(
          baseUrl + "doctors/courseToDoctor",
          updatedDoctor,
          {
            headers: {
              Authorization: `Bearer ${token}`,

              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );
        console.log(myResponse);
        await setAllProfessors([]);
        await setAddSubjectMode(false);
        await getProfessorData();
        // console.log(myResponse);
      } catch (error) {
        console.log(error);
      }
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please Fill All Subject Data",
        icon: "warning",
      });
    }
  };

  const getSelectedData = async (e) => {
    try {
      let myCourseId = e.target.value;
      let id = e.target.id;
      let myobj = { ...updatedDoctor };
      // console.log(professor);
      let professorId = +professor.doctorId;
      myobj[id] = +myCourseId;
      myobj.doctorId = +professorId;
      setUpdatedDoctor(myobj);
      console.log(myobj);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllSubjectsToAdd();
    getAllGroupsToAdd();
  }, []);
  return (
    <div className="selectSubjectsBoxToDoctor">
      <div className="headerOfCard">
        <h4>Add Subject</h4>
        <div onClick={() => setAddSubjectMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <div className="body">
        <div className="select">
          <label htmlFor="">Course Name</label>

          <select
            className="form-select"
            onChange={getSelectedData}
            name=""
            id="courseId"
          >
            <option value="">Subjects</option>
            {allSubjects.map((subject, index) => (
              <option key={index} className="courseDetails" value={subject?.id}>
                {subject?.courseName} ({subject?.code})
              </option>
            ))}
          </select>
          <label htmlFor="">Course Group</label>

          <select
            className="form-select"
            onChange={getSelectedData}
            name=""
            id="groupId"
          >
            <option value="" defaultValue>
              Groups
            </option>
            {allGroups.map((group, index) => (
              <option key={index} value={group?.id}>
                {group?.groupName}
              </option>
            ))}
          </select>
        </div>
        <button onClick={addNewCourseToDoctor} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
