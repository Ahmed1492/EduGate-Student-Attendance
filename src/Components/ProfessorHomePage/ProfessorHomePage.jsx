import React, { useEffect, useState } from "react";
import "./ProfessorHomePage.scss";
import { CreateQRcode } from "../CreateQRcode/CreateQRcode";
import { AttendanceList } from "../AttendanceList/AttendanceList";
import { ProfessorsubjectAttendance } from "../ProfessorsubjectAttendance/ProfessorsubjectAttendance";
import Image from "../../images/Rectangle 100.png";
import { ProfessorGenerateQrCode } from "../ProfessorGenerateQrCode/ProfessorGenerateQrCode";
import axios from "axios";
import { ProfessorGenerateForm } from "../ProfessorGenerateForm/ProfessorGenerateForm";
import QRCode from "qrcode.react";
import { jwtDecode } from "jwt-decode";
import EduGateLogo from "../../images/EduGateLogo.png";

import { Navigate, useNavigate } from "react-router-dom";
export const ProfessorHomePage = ({ baseUrl, setStudentAttendanceCourse }) => {
  const token = localStorage.getItem("myToken");
  const decodedToken = jwtDecode(token);
  const userRole2 =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];

  let id = decodedToken.DoctorId;
  let name =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    ];
  // console.log(name);
  // console.log(localStorage.getItem("myToken"));
  const urlOfSubjects = `${baseUrl}Attendance/DoctorCourse?doctorId=${id}`;
  const [allCourses, setAllCourses] = useState([]); // Change
  const [isGeneratingQrCode, setIsGeneratingQrCode] = useState(false);
  const [generatedCourse, setGeneratedCourse] = useState({});
  const [generate, serGenerate] = useState(false);
  const [qrCodeData, setQrCodeData] = useState();
  const [newData, setNewData] = useState();

  const getData = async () => {
    if (userRole2 !== "Admin") {
      try {
        let myRespone = await axios.get(urlOfSubjects, {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "69420",
          },
        });
        setAllCourses(myRespone.data[0]);
        // console.log(myRespone.data[0]);
      } catch (error) {
        console.log(error);
      }
    }
  };
  const loginRequist = async () => {
    try {
      let myRespone = await axios.post(baseUrl + "account/logout", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      console.log(myRespone);
    } catch (error) {
      console.log(error);
    }
  };
  const navigate = useNavigate();
  const handleLogOut = async () => {
    localStorage.removeItem("myToken");
    navigate("/login");
    await loginRequist();
  };

  const createQrCode = () => {
    serGenerate(false);
  };
  useEffect(() => {
    getData();
  }, []);
  return userRole2 !== "Admin" ? (
    allCourses.length === 0 ? (
      <div className="loadScreen">
        <div className="lds-dual-ring"></div>
      </div>
    ) : (
      <div className="position-relative  container-fluid professorHomePage ">
        <div className="professorHeaderPage">
          <div className="logo">
            <div className="">
              <h4>Dr / {name}</h4>
            </div>

            <img src={EduGateLogo} alt="EduGateLogo" />

            <div onClick={handleLogOut} className="logOutMenue">
              <p>LogOut</p>
            </div>
          </div>
        </div>
        {generate === true && (
          <div className="qrCodeCard vh-100 ">
            <div className="theGeneration ">
              <div className="deletQr" onClick={createQrCode}>
                <i className="fa-solid fa-xmark"></i>
              </div>
              {generate && <QRCode value={newData} />}
            </div>
          </div>
        )}
        {isGeneratingQrCode === true && (
          <ProfessorGenerateForm
            setNewData={setNewData}
            serGenerate={serGenerate}
            setQrCodeData={setQrCodeData}
            generatedCourse={generatedCourse}
            setIsGeneratingQrCode={setIsGeneratingQrCode}
            baseUrl={baseUrl}
          />
        )}

        <div className="row topSide">
          <div className="col-md-8">
            <div className="leftSide">
              <ProfessorsubjectAttendance
                allCourses={allCourses}
                baseUrl={baseUrl}
                setStudentAttendanceCourse={setStudentAttendanceCourse}
              />
            </div>
          </div>
          <div className="col-md-3">
            <div className="rightSide">
              <div className="homePageImage">
                <img src={Image} alt="" />
              </div>
            </div>
          </div>
        </div>
        <div>
          <ProfessorGenerateQrCode
            serGenerate={serGenerate}
            setGeneratedCourse={setGeneratedCourse}
            setIsGeneratingQrCode={setIsGeneratingQrCode}
            allCourses={allCourses}
            baseUrl={baseUrl}
          />
        </div>
      </div>
    )
  ) : (
    <h1>You are not authorized</h1>
  );
};
