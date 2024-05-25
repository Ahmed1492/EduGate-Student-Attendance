import React, { useState } from "react";
import "./AdminProfessorCourseDeleteSubject.scss";
import Swal from "sweetalert2";
import axios from "axios";
export const AdminProfessorCourseDeleteSubject = ({
  baseUrl,
  getProfessorData,
  targetProfToDeleteCourses,
  setIsDeleteCourseMode,
}) => {
  const [deletedCourse, setDeletedCourse] = useState({
    doctorId: "",
    courseId: "",
    groupId: "",
  });
  const profCourses = targetProfToDeleteCourses?.courses;

  const deleteCourseDetails = (event) => {
    const selectedOption = event.target.options[event.target.selectedIndex];
    const courseId = selectedOption.value;
    const groupId = selectedOption.getAttribute("data-id");
    const newObj = { ...deletedCourse };
    newObj.courseId = courseId;
    newObj.groupId = groupId;
    newObj.doctorId = targetProfToDeleteCourses.doctorId;
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
          baseUrl + "Doctors/DeleteCourseFromDoctor",
          deletedCourse,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "true", // Set any value
            },
          }
        );
        await setIsDeleteCourseMode(false)
        await getProfessorData()
        // await setIsDeleteSubjectMode(false);
        // await setStudentWithGroups([]);
        // await setIsEmptyInp(true);
        // await getProfessorData();
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
    <div className="deleteSubjectsBoxProf">
      <div className="headerOfCard">
        <h4>Delete Subjects</h4>
        <div onClick={() => setIsDeleteCourseMode(false)}>
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
            {profCourses?.map((course, index) => (
              <option
                key={index}
                data-id={course.groupId}
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
