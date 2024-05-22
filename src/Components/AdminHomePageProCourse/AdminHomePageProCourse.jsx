import React, { useEffect, useState } from "react";
import "./AdminHomePageProCourse.scss";
import axios from "axios";
import { AdminSelectSubjectToStudent } from "../AdminSelectSubjectToStudent/AdminSelectSubjectToStudent";
import { AdminSelectSubjectToDoctor } from "../AdminSelectSubjectToDoctor/AdminSelectSubjectToDoctor";
import { AdminHomePageProCourseAddMode } from "../AdminHomePageProCourseAddMode/AdminHomePageProCourseAddMode";
export const AdminHomePageProCourse = ({ baseUrl }) => {
  const [allProfessors, setAllProfessors] = useState([]);
  const [addSubjectMode, setAddSubjectMode] = useState(false);
  const [professor, setProfessor] = useState({});
  const [isAddNewProfessorMode, setIsAddNewProfessorMode] = useState(false);
  const token = localStorage.getItem("myToken");
  const getProfessorData = async () => {
    try {
      let myResponse = await axios.get(baseUrl + "doctors/doctorCourse", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setAllProfessors(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const oppenFormAdd = () => {
    setAddSubjectMode(false);
    setIsAddNewProfessorMode(true);
  };
  const handleUpdateSubjects = (professor, indexOfAllProfessor) => {};
  const handleAddNewSubject = (professor, indexOfAllProfessor) => {
    setAddSubjectMode(true);
    setIsAddNewProfessorMode(false);
    setProfessor(professor);
  };
  useEffect(() => {
    getProfessorData();
  }, []);
  return (
    <div className="myTable position-relative">
      {addSubjectMode === true && (
        <AdminSelectSubjectToDoctor
          baseUrl={baseUrl}
          setAddSubjectMode={setAddSubjectMode}
          professor={professor}
          setAllProfessors={setAllProfessors}
          getProfessorData={getProfessorData}
        />
      )}
      <div>
        <div className="allprofessors">
          <div className="d-flex justify-content-between align-items-center">
            <div className=" ps-3 d-flex gap-2 align-items-center">
              <div>
                <i className="fa-solid fs-3 fa-up-right-from-square"></i>
              </div>
              <h4 className="profHeader">Professor Course</h4>
            </div>
            <div className="addNewDoctorToCourse">
              <button onClick={oppenFormAdd}>Add +</button>
            </div>
          </div>
          <div>
            {isAddNewProfessorMode === true && (
              <AdminHomePageProCourseAddMode
                baseUrl={baseUrl}
                setAddSubjectMode={setAddSubjectMode}
                setIsAddNewProfessorMode={setIsAddNewProfessorMode}
                getProfessorData={getProfessorData}
                setAllProfessors={setAllProfessors}
              />
            )}
            <table className="w-100">
              <thead>
                <tr>
                  <th>Name</th>
                  <th>Courses</th>
                </tr>
              </thead>
              {allProfessors.length === 0 ? (
                <tbody className="reloading">
                  <tr>
                    <td>
                      <i className="d-flex justify-content-center align-items-center h-100 fa-solid fa-spinner fa-2x fa-spin "></i>
                    </td>
                  </tr>
                </tbody>
              ) : (
                <tbody>
                  {allProfessors.map((professor, indexOfAllProfessor) => (
                    <tr key={indexOfAllProfessor}>
                      <td>{professor.doctor}</td>
                      <td>
                        <div className="allprofessorCourse">
                          <div className="profCour">
                            {professor.courses.map((course, index) => (
                              <p key={index}>
                                {course.coursename}, {course.group}{" "}
                              </p>
                            ))}
                          </div>

                          <div className="addNewCourse">
                            <button
                              onClick={() =>
                                handleAddNewSubject(
                                  professor,
                                  indexOfAllProfessor
                                )
                              }
                            >
                              + Add Subject
                            </button>
                            {/* <button
                        onClick={() =>
                          handleUpdateSubjects(professor, indexOfAllProfessor)
                        }
                      >
                        Update
                      </button> */}
                          </div>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              )}
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};
