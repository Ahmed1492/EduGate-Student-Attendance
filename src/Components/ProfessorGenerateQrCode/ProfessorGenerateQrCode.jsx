import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProfessorGenerateQrCode.scss";
const settings = {
  dots: true,
  speed: 500,
  slidesToShow: 3,
  slidesToScroll: 2,
  infinite: false,
  autoplay: false,
  autoplaySpeed: 1000,
};
const allCourses2 = {
  courses: [
    { courseName: "Phisics", courseCode: "CSC414" },
    { courseName: "Physics", courseCode: "CSC414" },
    { courseName: "Chemistry", courseCode: "CHE201" },
    { courseName: "Biology", courseCode: "BIO101" },
    { courseName: "Mathematics", courseCode: "MAT202" },
    { courseName: "Computer Science", courseCode: "CSC303" },
    { courseName: "English Literature", courseCode: "ENG102" },
    { courseName: "History", courseCode: "HIS301" },
    { courseName: "Economics", courseCode: "ECO401" },
    { courseName: "Psychology", courseCode: "PSY201" },
    { courseName: "Sociology", courseCode: "SOC202" },
    { courseName: "Art", courseCode: "ART105" },
    { courseName: "Music", courseCode: "MUS200" },
    { courseName: "Physical Education", courseCode: "PED101" },
    { courseName: "Geography", courseCode: "GEO303" },
    { courseName: "Political Science", courseCode: "POL202" },
    { courseName: "Philosophy", courseCode: "PHI303" },
    { courseName: "Anthropology", courseCode: "ANT101" },
    { courseName: "Languages", courseCode: "LAN202" },
    { courseName: "Statistics", courseCode: "STA301" },
    { courseName: "Engineering", courseCode: "ENG404" },
    { courseName: "Architecture", courseCode: "ARC202" },
    { courseName: "Business Administration", courseCode: "BUS303" },
  ],
};
export const ProfessorGenerateQrCode = ({
  allCourses,
  setIsGeneratingQrCode,
  setGeneratedCourse,
}) => {
  const handleGeneration = (course) => {
    setIsGeneratingQrCode(true);
    setGeneratedCourse(course);
  };

  return (
    <div className="generateQrCode">
      <h2 className="pb-4">Generate Qr Code</h2>

      <div className="slider-wrapper">
        <Slider {...settings}>
          {allCourses?.courses?.map((course, index) => (
            <div key={index} className="myyf">
              <div className="mybbox">
                <div className="topSide">
                  <h4>{course.courseName}</h4>
                  <p>{course.courseCode}</p>
                </div>
                <div
                  onClick={() => handleGeneration(course)}
                  className="bottomSide"
                >
                  <button>Generate</button>
                </div>
              </div>
            </div>
          ))}
        </Slider>
      </div>
    </div>
  );
};
