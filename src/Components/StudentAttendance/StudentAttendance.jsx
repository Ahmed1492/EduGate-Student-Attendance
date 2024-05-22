import React, { useEffect, useState } from "react";
import "./StudentAttendance.scss";
import axios from "axios";
import { useParams } from "react-router-dom";

export const StudentAttendance = ({ baseUrl, studentAttendanceCourse }) => {
  // const baseUrl = "https://7877-196-129-112-238.ngrok-free.app/";
  const parm = useParams();
  let courseId = parm.courseId;
  let groupId = parm.groupId;
  let attendance = `${baseUrl}Attendance?courseId=${courseId}&groupId=${groupId}`;
  const [allStudents, setallStudents] = useState([]);
  const [updateStudent, setUpdateStudent] = useState([]);
  const [updateStudentAttendance, setUpdateStudentAttendance] = useState({
    studentId: "",
    courseId: courseId,
    groupId: groupId,
    lectureNumber: "",
    attend: "",
  });
  const token = localStorage.getItem("myToken");
  function countTrue(weeks) {
    return weeks?.filter((value) => value === true).length;
  }
  const getAttendaceOfStudent = async () => {
    try {
      let myRespone = await axios.get(attendance, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setallStudents(myRespone.data);
      console.log(myRespone.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getWeek = async (
    allStudentDetails,
    indexOfCurrentStudent,
    singleWeek,
    indexOfWeeks
  ) => {
    try {
      let stId = allStudentDetails.studentId;
      let stdLectureNumber = indexOfWeeks + 1;
      let stdAttend = !singleWeek;
      let newObj = { ...updateStudent };
      newObj.studentId = stId;
      newObj.lectureNumber = stdLectureNumber;
      newObj.courseId = +courseId;
      newObj.groupId = +groupId;
      newObj.attend = stdAttend;
      setUpdateStudent(newObj);
      // console.log(newObj);
      await changeStudentAttendace(newObj);
      await getAttendaceOfStudent();
      // console.log(allStudentDetails.studentAttend);
    } catch (error) {
      console.log(error);
    }
  };
  const changeStudentAttendace = async (changedStudent) => {
    try {
      let myResponse = await axios.post(
        baseUrl + "Attendance/updateAttendance",
        changedStudent,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        }
      );
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAttendaceOfStudent();
    console.log("updated");
  }, [updateStudent]);
  console.log("Current Course : ", studentAttendanceCourse);
  return (
    <div className="container-fluid">
      <div className="stdTableAttendance">
        <table className="studentTable w-100 mt-3">
          <thead className="studentAttendanceHeader  ">
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>W1</th>
              <th>W2</th>
              <th>W3</th>
              <th>W4</th>
              <th>W5</th>
              <th>W6</th>
              <th>W7</th>
              <th>W8</th>
              <th>W9</th>
              <th>W10</th>
              <th>W11</th>
              <th>W12</th>
              <th>W13</th>
              <th>W14</th>
              <th>Total</th>
            </tr>
          </thead>
          <tbody className="studentAttendanceBody ">
            {allStudents?.map((student, indexOfCurrentStudent) => (
              <tr key={indexOfCurrentStudent}>
                <td>{student.studentName}</td>
                <td>{student.studentId}</td>
                {student?.studentAttend?.map((singleWeek, indexOfWeeks) => (
                  <td key={indexOfWeeks}>
                    <div
                      onClick={(e) =>
                        getWeek(
                          student,
                          indexOfCurrentStudent,
                          singleWeek,
                          indexOfWeeks
                        )
                      }
                      className={`
                      ${
                        singleWeek === true ? "Present" : "absent"
                      } studentStatus`}
                    ></div>
                  </td>
                ))}
                <td>{countTrue(student.studentAttend)}/14</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
