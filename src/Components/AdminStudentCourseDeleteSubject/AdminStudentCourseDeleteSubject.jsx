import React, { useState } from "react";
import "./AdminStudentCourseDeleteSubject.scss";
import axios from "axios";
import Swal from "sweetalert2";
export const AdminStudentCourseDeleteSubject = ({
  targetStudentToDelete,
  baseUrl,
  setIsDeleteSubjectMode,
  setAddNewStudentMode,
  getData,
}) => {
  const [deletedCourse, setDeletedCourse] = useState({
    studentId: "",
    courseId: "",
    groupId: "",
  });
  const studentCourses = targetStudentToDelete.courses;

  const deleteCourseDetails = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const courseId = selectedOption.value;
    const groupId = selectedOption.getAttribute("data-id");
    const newObj = { ...deletedCourse };
    newObj.courseId = courseId;
    newObj.groupId = groupId;
    newObj.studentId = targetStudentToDelete.studentid;
    setDeletedCourse(newObj);
    console.log(newObj);
  };
  const token = localStorage.getItem("myToken");
  const deleteSubject = async () => {
    if (
      deletedCourse.courseId !== "" &&
      deletedCourse.studentId !== "" &&
      deletedCourse.groupId !== ""
    ) {
      try {
        let myResponse = await axios.post(
          baseUrl + "StudentCourseGroup/DeleteCourseFromStudent",
          deletedCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );
        await setIsDeleteSubjectMode(false);
        await getData();
        console.log(myResponse);
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
    <div className="deleteSubjectsBox">
      <div className="headerOfCard">
        
        <h4>Delete Subjects</h4>
        <div onClick={() => setIsDeleteSubjectMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>

      <h5 className="text-center fs-4 my-3"> Subject</h5>
      <div className="body">
        <div className="select">
          <select onChange={deleteCourseDetails} className="form-select">
            <option value="" defaultValue>
              Subjects
            </option>
            {studentCourses.map((course, index) => (
              <option
                key={index}
                data-id={course.groupid}
                value={course.courseId}
              >
                {course.coursename} 
              </option>
            ))}
          </select>
        </div>
        <button onClick={deleteSubject} className="add">
          Delete
        </button>
      </div>
    </div>
  );
};
