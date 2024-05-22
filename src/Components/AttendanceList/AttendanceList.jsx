import React, { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./AttendanceList.scss";
export const AttendanceList = ({ baseUrl }) => {
  let id = 13;
  const urlOfSubjects = `${baseUrl}Attendance/DoctorCourse?doctorId=${id}`;
  const [allCourses, setAllCourses] = useState([]);
  const getData = async () => {
    try {
      let myRespone = await axios.get(urlOfSubjects, {
        headers: {
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setAllCourses(myRespone.data[0]);
      console.log(myRespone.data[0]);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getData();
  }, []);
  return allCourses.length === 0 ? (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  ) : (
    <div className="attandceListRightSide">
      <h2 className="mt-1 mb-4">Attendance List</h2>
      <div className="AllattandanceListBox">
        {allCourses?.courses?.map((course, index) => (
          <Link
           
            to={`/prof/Attendance/${course.courseId}/${course.groupId}`}
            key={index}
            className="attandanceListBox"
          >
            <h3>{course.courseName}</h3>
            <h4>{course.courseCode}</h4>
            <h5>{course.groupName}</h5>
          </Link>
        ))}
      </div>
    </div>
  );
};
