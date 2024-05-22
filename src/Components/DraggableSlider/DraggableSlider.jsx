import React, { useState, useRef, useEffect } from "react";
import "./DraggableSlider.scss";
import { AdminHomePageProCourse } from "../AdminHomePageProCourse/AdminHomePageProCourse";
import { AdminHomePageAddSubjects } from "../AdminHomePageAddSubjects/AdminHomePageAddSubjects";
import { AdminHomePageAddNewUserAccount } from "../AdminHomePageAddNewUserAccount/AdminHomePageAddNewUserAccount";

export const DraggableSlider = () => {
  const [isDown, setIsDown] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const sliderRef = React.useRef(null);

  const end = () => {
    setIsDown(false);
    sliderRef.current.classList.remove("active");
  };

  const start = (e) => {
    setIsDown(true);
    sliderRef.current.classList.add("active");
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    setStartX(x);
    setScrollLeft(sliderRef.current.scrollLeft);
  };

  const move = (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX || e.touches[0].pageX - sliderRef.current.offsetLeft;
    const dist = x - startX;
    sliderRef.current.scrollLeft = scrollLeft - dist;
  };

  return (
    <div className="profsubjects">
      <div className=" items-wrapper">
        <ul
          ref={sliderRef}
          className="items"
          onMouseDown={start}
          onTouchStart={start}
          onMouseMove={move}
          onTouchMove={move}
          onMouseLeave={end}
          onMouseUp={end}
          onTouchEnd={end}
        >
          <li className="item">
            <AdminHomePageProCourse />
          </li>

          <li className="item">
            <AdminHomePageAddSubjects />
          </li>
          <li className="item">
            <AdminHomePageAddNewUserAccount />
          </li>
        </ul>
      </div>
    </div>
  );
};
