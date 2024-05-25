import React, { useEffect, useRef, useState } from "react";
import "./AdminHomePageHeader.scss";
import { Link, useNavigate } from "react-router-dom";
import $ from "jquery";
import { screen } from "@testing-library/react";
import axios from "axios";
import EduGateLogo from "../../images/EduGateLogo.png";

export const AdminHomePageHeader = ({ decodedToken, baseUrl }) => {
  // let items = parseInt($(".items").css("width"), 10);
  const [dragablePlace, setDragablePlace] = useState(0);
  const [isHoverNavBar, setIsHoverNavBar] = useState(true);
  const [mywindowScreen, setMywindowScreen] = useState($(window).width());

  console.log(decodedToken);
  const adminName =
    decodedToken[
      "http://schemas.xmlsoap.org/ws/2005/05/identity/claims/givenname"
    ];
  const hanleToLeft = () => {
    // dragablePlace !== 0 && setDragablePlace(dragablePlace - 7);
    // console.log(items);
    dragablePlace !== 0 && setDragablePlace(dragablePlace - 7);
    console.log(dragablePlace);
  };
  const hanleToRight = () => {
    dragablePlace <= 14
      ? setDragablePlace(dragablePlace + 7)
      : setDragablePlace(dragablePlace - dragablePlace);

    console.log("dragaable ", dragablePlace);
    console.log("window Screen ", mywindowScreen);
    // console.log(items);
    // console.log(dragablePlace);
  };
  useEffect(() => {}, [mywindowScreen]);
  const toLeftBtn = useRef();
  const handleNavBarEnter = () => {
    setIsHoverNavBar(true);
    $(".toLeft").fadeIn(400).css("display", "flex");
    $(".toRight").fadeIn(400).css("display", "flex");
  };
  const handleNavBarLeave = () => {
    $(".toLeft").fadeOut(400);
    $(".toRight").fadeOut(400);
    // setIsHoverNavBar(false);
  };
  const token = localStorage.getItem("myToken");

  const navigate = useNavigate();

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
  const handleLogOut = async () => {
    localStorage.removeItem("myToken");
    navigate("/login");
    await loginRequist();
  };
  return (
    <div
      onMouseEnter={handleNavBarEnter}
      onMouseLeave={handleNavBarLeave}
      className="headerOfAdminPage"
    >
      <div className="logOutHomePage">
        <div className="adminHeaderPage">
          <div className="logo">
            <div className="">
              <h4> Admin / {adminName} </h4>
            </div>
            <img src={EduGateLogo} alt="EduGateLogo" />
            <div onClick={handleLogOut} className="logOutMenue">
              <p>LogOut</p>
            </div>
          </div>
        </div>
      </div>
      <main>
        <button onClick={hanleToLeft} ref={toLeftBtn} className="toLeft">
          <i className="fa-solid fa-arrow-left"></i>
        </button>
        <button onClick={hanleToRight} className="toRight">
          <i className="fa-solid fa-arrow-right"></i>
        </button>
        <div className="wrapper">
          <ul style={{ right: dragablePlace + "%" }} className="items">
            {/* Each Link now includes the onMouseUp handler to manage clicks post-dragging */}
            <Link to="/admin/profAccount" className="item" draggable="false">
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Professor & Admin</h4>
                    <p>Account</p>
                  </div>
                  <div className="icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            </Link>
            <Link
              to="/admin/profStatus"
              className="item"
              onMouseUp={() => console.log("up")}
              draggable="false"
            >
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Professor</h4>
                    <p>Status</p>
                  </div>
                  <div className="icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            </Link>
            <Link
              to="/admin/stdAccount"
              className="item"
              onMouseUp={() => console.log("up")}
              draggable="false"
            >
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Students</h4>
                    <p>Account</p>
                  </div>
                  <div className="icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            </Link>
            <Link
              to="/admin/stdList"
              className="item"
              onMouseUp={() => console.log("up")}
              draggable="false"
            >
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Students</h4>
                    <p>List</p>
                  </div>
                  <div className="icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            </Link>
            <Link
              to="/admin/stdCourse"
              className="item"
              onMouseUp={() => console.log("up")}
              draggable="false"
            >
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Student</h4>
                    <p>Courses</p>
                  </div>
                  <div className="icon">
                    <i className="fa-regular fa-user"></i>
                  </div>
                </div>
                <div className="line"></div>
              </div>
            </Link>
            {/* Add more links as needed, ensuring to include onMouseUp={handleClick} */}
          </ul>
        </div>
      </main>
    </div>
  );
};
