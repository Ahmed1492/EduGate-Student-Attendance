import React, { useContext, useEffect, useState } from "react";
import "./ProfessorGenerateForm.scss";
import { LocationTimeContext } from "../GetLocationAndTime/GetLocationAndTime";
import axios from "axios";
import Swal from "sweetalert2";

export const ProfessorGenerateForm = ({
  setIsGeneratingQrCode,
  generatedCourse,
  serGenerate,
  setQrCodeData,
  baseUrl,
  setNewData,
}) => {
  const token = localStorage.getItem("myToken");

  const [generatedGroupNum, setGeneratedGroupNum] = useState();
  const [generatedWeekNum, setGeneratedWeekNum] = useState("");
  const generatedCourseName = generatedCourse.courseName;
  const generatedId2 = generatedCourse.courseId;
  const groupName = generatedCourse.groupName;
  const groupId = generatedCourse.groupId;
  const obj = generatedCourse;
  const { location, currentTime, currentLocation, setCurrentLocation } =
    useContext(LocationTimeContext);
  let latitude = location.coordinates.lat;
  let longitude = location.coordinates.lng;

  const getInputsData = (e) => {};

  const getGroupNum = (e) => {
    console.log(e.target.value);
    setGeneratedGroupNum(e.target.value);
    // console.log(generatedId3);
  };
  const getWeekNum = (e) => {
    console.log(e.target.value);
    setGeneratedWeekNum(e.target.value);
  };

  // function encodeData(data, key) {
  //   let encodedData = "";
  //   let keyIndex = 0;

  //   for (let i = 0; i < data.length; i++) {
  //     let character = data.charAt(i);
  //     let keyChar = key.charAt(keyIndex % key.length);

  //     let encodedCharAscii = character.charCodeAt(0) + keyChar.charCodeAt(0);
  //     encodedCharAscii %= 256;

  //     let encodedChar = String.fromCharCode(encodedCharAscii);
  //     encodedData += encodedChar;

  //     keyIndex++;
  //   }

  //   return encodedData;
  // }

  const handlQRCode = () => {
    if (generatedWeekNum !== "") {
      
      const sendData = `${generatedCourseName} - ${generatedId2} -  ${groupName} - ${groupId} - ${Number(
        generatedWeekNum
      )} - ${longitude} - ${latitude} - ${currentTime}`;
      // console.log( 'Decoded : ' , sendData);
    
      var encodedData = btoa(sendData);
      console.log("encodedData : ", encodedData);
      var decodedData = atob(encodedData);
      console.log("decodedData :: ", decodedData);
  
      setNewData(encodedData);
      serGenerate(true);
      setIsGeneratingQrCode(false);
      setCurrentLocation(!currentLocation);
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please Fill All Data",
        icon: "warning",
      });
    }
  };

  // console.log(encodedData);

  useEffect(() => {}, []);
  return (
    <div className="layer">
      <div className="position-absolute createQrCard">
        <div className="header mb-3">
          <div className="d-flex my-2 justify-content-between align-items-center">
            <h2>{generatedCourseName}</h2>
            <div onClick={() => setIsGeneratingQrCode(false)}>
              <i className="fa-solid fa-xmark"></i>
            </div>
          </div>
        </div>
        <div className="cardGeneratingBody">
          <div className="inputs">
            <div className="d-flex align-items-center mb-4 mt-3 justify-content-around">
              <label className="d-inline-block" htmlFor="">
                Group /
              </label>
              <input
                className="disapledGroup"
                type="text"
                value={obj.groupName}
                disabled
              />
            </div>
            <select
              onChange={getWeekNum}
              className="form-select"
              aria-label="Default select example"
            >
              <option value="" defaultValue>
                Weeks
              </option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
              <option value="6">6</option>
              <option value="7">7</option>
              <option value="8">8</option>
              <option value="9">9</option>
              <option value="10">10</option>
              <option value="11">11</option>
              <option value="12">12</option>
              <option value="13">13</option>
              <option value="14">14</option>
            </select>
          </div>
        </div>
        <div onClick={handlQRCode} className="generateButton">
          <button>Generate</button>
        </div>
      </div>
    </div>
  );
};
