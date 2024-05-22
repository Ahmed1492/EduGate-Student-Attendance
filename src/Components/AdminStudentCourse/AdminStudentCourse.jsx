import React, { useEffect, useState } from "react";
import "./AdminStudentCourse.scss";
import axios from "axios";
import { AdminSelectSubjectToStudent } from "../AdminSelectSubjectToStudent/AdminSelectSubjectToStudent";
import { AdminStudentCourseAddMode } from "../AdminStudentCourseAddMode/AdminStudentCourseAddMode";
import { AdminStudentCourseDeleteSubject } from "../AdminStudentCourseDeleteSubject/AdminStudentCourseDeleteSubject";
export const AdminStudentCourse = (props) => {
  const [isSelectSubjectToStudent, SetIsSelectSubjectToStudent] =
    useState(false);
  let baseUrl = props.baseUrl;
  const [studentWithGroups, setStudentWithGroups] = useState([]);
  const [reload, setreload] = useState(false);
  const [currentStudent, setCurrentStudent] = useState();
  const [addNewStudentMode, setAddNewStudentMode] = useState(false);
  const [isDeleteSubjectMode, setIsDeleteSubjectMode] = useState(false);
  const [targetStudentToDelete, setTargetStudentToDelete] = useState([]);

  const getData = async () => {
    setreload(true);
    try {
      const myResponse = await axios.get(baseUrl + "studentCourseGroup", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setStudentWithGroups(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const addSubjectToStudent = (student) => {
    setIsDeleteSubjectMode(false);
    setAddNewStudentMode(false);
    SetIsSelectSubjectToStudent(true);
    setCurrentStudent(student);
    console.log(student);
  };
  const token = localStorage.getItem("myToken");
  const handleAdding = () => {
    setAddNewStudentMode(true);
    setIsDeleteSubjectMode(false);
    SetIsSelectSubjectToStudent(false);
  };
  const deleteCourseFromStudent = (student) => {
    setAddNewStudentMode(false);
    setIsDeleteSubjectMode(true);
    SetIsSelectSubjectToStudent(false);
    setTargetStudentToDelete(student);
    console.log(student);
  };
  useEffect(() => {
    getData();
    console.log("dd");
  }, [isSelectSubjectToStudent, reload]);
  return studentWithGroups.length === 0 ? (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  ) : (
    <div className="studentCourses">
      {addNewStudentMode === true && (
        <AdminStudentCourseAddMode
          setStudentWithGroups={setStudentWithGroups}
          setAddNewStudentMode={setAddNewStudentMode}
          SetIsSelectSubjectToStudent={SetIsSelectSubjectToStudent}
          setIsDeleteSubjectMode={setIsDeleteSubjectMode}
          baseUrl={baseUrl}
          getData={getData}
        />
      )}
      <div className=" bg-white">
        <div className="studentCoursesHeader mb-2 d-flex justify-content-between align-items-center">
          <h1> Students Courses</h1>
          <div>
            <input type="text" placeholder="Search For Students" />
            <button onClick={handleAdding}>+ Add New Student</button>
          </div>
        </div>
        {isSelectSubjectToStudent === true && (
          <AdminSelectSubjectToStudent
            setStudentWithGroups={setStudentWithGroups}
            currentStudent={currentStudent}
            setAddNewStudentMode={setAddNewStudentMode}
            SetIsSelectSubjectToStudent={SetIsSelectSubjectToStudent}
            setIsDeleteSubjectMode={setIsDeleteSubjectMode}
            setreload={setreload}
            baseUrl={baseUrl}
            getData={getData}
          />
        )}
        {isDeleteSubjectMode === true && (
          <AdminStudentCourseDeleteSubject
            baseUrl={baseUrl}
            targetStudentToDelete={targetStudentToDelete}
            setAddNewStudentMode={setAddNewStudentMode}
            SetIsSelectSubjectToStudent={SetIsSelectSubjectToStudent}
            setIsDeleteSubjectMode={setIsDeleteSubjectMode}
            getData={getData}
          />
        )}

        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Courses</th>
            </tr>
          </thead>
          <tbody>
            {studentWithGroups.map((student, index) => (
              <tr key={index}>
                <td>{student.studentname}</td>
                <td>{student.studentid}</td>
                <td>
                  <div>
                    <div className="studentDetails">
                      <div className="allCourses">
                        {student.courses.map((singleCourse, index) => (
                          <div key={index} className="singelCourse">
                            <p>
                              {singleCourse.coursename}, {singleCourse.group}{" "}
                            </p>
                          </div>
                        ))}
                      </div>
                      <div className="buttonsAddandDelete d-flex align-items-center justify-content-center">
                        <button
                          onClick={() => addSubjectToStudent(student)}
                          className="addCourseToStudent "
                        >
                          + Add
                        </button>
                        <button
                          onClick={() => deleteCourseFromStudent(student)}
                          className="deleteCourseFromStudent "
                        >
                          Delete
                        </button>
                      </div>
                    </div>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
