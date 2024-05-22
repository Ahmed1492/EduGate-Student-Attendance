import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProfessorsubjectAttendance.scss";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

export const ProfessorsubjectAttendance = ({
  baseUrl,
  allCourses,
  setStudentAttendanceCourse,
}) => {
  const settings = {
    dots: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 2,
    infinite: false,
    autoplay: false,
    autoplaySpeed: 1000,
  };
  const getCourseName = (course) => {
    setStudentAttendanceCourse(course);
  };
  return (
    <div className="doctorSubjects">
      <div className="doctHeader">
        <div>
          <h3>Your assigned</h3>
          <h3>Subjects attendance</h3>
          <p>Contril Your Student Attendance</p>
        </div>
      </div>
      <div className="slider-wrapper">
        <Slider {...settings}>
          {allCourses?.courses?.map((course, index) => (
            <div key={index} className="myyf">
              <Link
                onClick={() => getCourseName(course)}
                to={`/prof/Attendance/${course.courseId}/${course.groupId}`}
                key={index}
                className="mybbox"
              >
                <h3>{course.courseName}</h3>
                <h4>{course.courseCode}</h4>
                <h5>{course.groupName}</h5>
              </Link>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
