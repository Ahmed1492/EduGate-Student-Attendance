import React, { useEffect, useState } from "react";
import "./AdminStudentList.scss";
import axios from "axios";
import { AdminStudentListAddStd } from "../AdminStudentListAddStd/AdminStudentListAddStd";
// const baseUrl = `https://7877-196-129-112-238.ngrok-free.app/`;
export const AdminStudentList = ({ baseUrl }) => {
  const [reload, setReload] = useState();
  const [studentList, setStudentList] = useState([]);
  const token = localStorage.getItem("myToken");

  const getStudentData = async () => {
    try {
      let myResponse = await axios.get(baseUrl + "students", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setStudentList(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const [addNewStudentMode, setAddNewStudentMode] = useState(false);
  const activeAddNewStdMode = () => {
    setAddNewStudentMode(true);
  };

  useEffect(() => {
    getStudentData();
    console.log("sda");
  }, [addNewStudentMode]);
  return studentList.length === 0 ? (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  ) : (
    <div className="studentList">
      <div className=" bg-white">
        <div className="studentListHeader mb-2 d-flex justify-content-between align-items-center">
          <h1> Student List</h1>
          <div className="studentListHeaderLeftSide">
            <input type="text" placeholder="Search For Professors" />
            <button onClick={activeAddNewStdMode}>+ Add New Student</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {studentList.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {addNewStudentMode === true && (
          <AdminStudentListAddStd
            setAddNewStudentMode={setAddNewStudentMode}
            setStudentList={setStudentList}
            setReload={setReload}
            baseUrl={baseUrl}
          />
        )}
      </div>
    </div>
  );
};
