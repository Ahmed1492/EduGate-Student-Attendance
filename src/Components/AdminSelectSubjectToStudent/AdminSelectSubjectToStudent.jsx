import React, { useEffect, useState } from "react";
import "./AdminSelectSubjectToStudent.scss";
import axios from "axios";
import Swal from "sweetalert2";
export const AdminSelectSubjectToStudent = ({
  SetIsSelectSubjectToStudent,
  currentStudent,
  setStudentWithGroups,
  setreload,
  baseUrl,
}) => {
  // const baseUrl = "https://7877-196-129-112-238.ngrok-free.app/";
  const [allSubjects, setAllSubjects] = useState([]);
  const [allGroups, setAllGroups] = useState([]);
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
      setAllGroups(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [selectedData, setSelectedData] = useState({
    studentId: "",
    courseId: "",
    groupId: "",
  });
  const getSelectedData = (e) => {
    console.log(e.target.id);
    let courseId = e.target.id;
    let selectedCourse = e.target.value;
    let newObj = { ...selectedData };
    newObj[courseId] = selectedCourse;
    let studentId = currentStudent.studentid;

    newObj.studentId = studentId;
    setSelectedData(newObj);
    console.log(newObj);
  };
  const addNewSubjectToStudent = async () => {
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
    } catch (error) {
      console.log(error);
    }
  };
  const addNewCourseToStd = async () => {
    if (
      selectedData.courseId !== "" &&
      selectedData.groupId !== "" &&
      selectedData.studentId !== ""
    ) {
      try {
        await setStudentWithGroups([]);
        await addNewSubjectToStudent();
        await SetIsSelectSubjectToStudent(false);

        setreload(false);
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
    getAllSubjectsToAdd();
    getAllGroupsToAdd();
  }, []);
  return (
    <div className="selectSubjectsBox">
      <div className="headerOfCard">
        <h4>Add Subject</h4>
        <div onClick={() => SetIsSelectSubjectToStudent(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="searchForSubject">
        <input type="text" placeholder="search By Subject Name" />
      </div>
      <h5 className="text-center fs-4 my-3">Subjects</h5>
      <div className="body">
        <div className="select">
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

          <select
            className="form-select form2"
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
        <button onClick={addNewCourseToStd} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
