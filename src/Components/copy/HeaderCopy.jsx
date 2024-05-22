import React, { useEffect, useRef, useState } from "react";
import "./AdminHomePageHeader.scss";
import { Link } from "react-router-dom";
import $ from "jquery";
import Slider from "react-slick";

export const AdminHomePageHeader = () => {
  const [dragablePlace, setDragablePlace] = useState(0);
  const settings = {
    className: "center",
    centerMode: true,
    infinite: true,
    centerPadding: "60px",
    slidesToShow: 3,
    speed: 500,
  };

  // <Link
  //   to="/admin/profStatus"
  //   className="item"
  //   onMouseUp={() => console.log("up")}
  //   draggable="false"
  // >
  //   <div className="optionBox">
  //     <div className="innerBox">
  //       <div className="details">
  //         <h4>Professor</h4>
  //         <p>Status</p>
  //       </div>
  //       <div className="icon">
  //         <i className="fa-regular fa-user"></i>
  //       </div>
  //     </div>
  //     <div className="line"></div>
  //   </div>
  // </Link>
  // <Link
  //   to="/admin/stdAccount"
  //   className="item"
  //   onMouseUp={() => console.log("up")}
  //   draggable="false"
  // >
  //   <div className="optionBox">
  //     <div className="innerBox">
  //       <div className="details">
  //         <h4>Students</h4>
  //         <p>Account</p>
  //       </div>
  //       <div className="icon">
  //         <i className="fa-regular fa-user"></i>
  //       </div>
  //     </div>
  //     <div className="line"></div>
  //   </div>
  // </Link>
  // <Link
  //   to="/admin/stdList"
  //   className="item"
  //   onMouseUp={() => console.log("up")}
  //   draggable="false"
  // >
  //   <div className="optionBox">
  //     <div className="innerBox">
  //       <div className="details">
  //         <h4>Students</h4>
  //         <p>List</p>
  //       </div>
  //       <div className="icon">
  //         <i className="fa-regular fa-user"></i>
  //       </div>
  //     </div>
  //     <div className="line"></div>
  //   </div>
  // </Link>
  // <Link
  //   to="/admin/stdCourse"
  //   className="item"
  //   onMouseUp={() => console.log("up")}
  //   draggable="false"
  // >
  //   <div className="optionBox">
  //     <div className="innerBox">
  //       <div className="details">
  //         <h4>Student</h4>
  //         <p>Courses</p>
  //       </div>
  //       <div className="icon">
  //         <i className="fa-regular fa-user"></i>
  //       </div>
  //     </div>
  //     <div className="line"></div>
  //   </div>
  // </Link>
  return (
    <div className="slider-container container-fluid">
      <div className="row">
        <Slider {...settings}>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
          <div>
            <Link to="/admin/stdCourse" className="item">
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
          </div>
        </Slider>
      </div>
    </div>
  );
};

// const [isDown, setIsDown] = useState(false);
// const [startX, setStartX] = useState(0);
// const [scrollLeft, setScrollLeft] = useState(0);
// const sliderRef = useRef(null);

// const end = () => {
//   setIsDown(false);
//   sliderRef.current.classList.remove("active");
// };

// const start = (e) => {
//   setIsDown(true);
//   sliderRef.current.classList.add("active");
//   setStartX(e.pageX - sliderRef.current.offsetLeft);
//   setScrollLeft(sliderRef.current.scrollLeft);
//   e.preventDefault(); // Prevents the default behavior, useful to avoid drag issues
// };

// const move = (e) => {
//   if (!isDown) return;
//   e.preventDefault(); // Prevent default behavior during mouse move
//   const x = e.pageX - sliderRef.current.offsetLeft;
//   const dist = x - startX;
//   sliderRef.current.scrollLeft = scrollLeft - dist;
// };

// const handleClick = (e) => {
//   // If dragging, prevent the click event from propagating
//   if (isDown) {
//     e.preventDefault();
//     e.stopPropagation();
//   }
// };

import React, { useEffect, useRef, useState } from "react";
import "./AdminHomePageHeader.scss";
import { Link } from "react-router-dom";
import $ from "jquery";
import { screen } from "@testing-library/react";

export const AdminHomePageHeader = () => {
  // let items = parseInt($(".items").css("width"), 10);
  const [dragablePlace, setDragablePlace] = useState(0);
  const [isHoverNavBar, setIsHoverNavBar] = useState(true);
  const [mywindowScreen, setMywindowScreen] = useState($(window).width());
  const hanleToLeft = () => {
    // dragablePlace !== 0 && setDragablePlace(dragablePlace - 7);
    // console.log(items);
    dragablePlace !== 0 && setDragablePlace(dragablePlace - 7);
    console.log(dragablePlace);
  };
  const hanleToRight = () => {
    dragablePlace !== 21 && setDragablePlace(dragablePlace + 7);
    dragablePlace !== 21 && setDragablePlace(dragablePlace + 7);

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
  return (
    <div
      onMouseEnter={handleNavBarEnter}
      onMouseLeave={handleNavBarLeave}
      className="headerOfAdminPage"
    >
      <main>
        <div onClick={hanleToLeft} ref={toLeftBtn} className="toLeft">
          <i className="fa-solid fa-arrow-left"></i>
        </div>
        <div onClick={hanleToRight} className="toRight">
          <i className="fa-solid fa-arrow-right"></i>
        </div>

        <div className="wrapper">
          <ul style={{ right: dragablePlace + "%" }} className="items">
            {/* Each Link now includes the onMouseUp handler to manage clicks post-dragging */}
            <Link to="/admin/profAccount" className="item" draggable="false">
              <div className="optionBox">
                <div className="innerBox">
                  <div className="details">
                    <h4>Professor</h4>
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

