import React, { useEffect, useState } from "react";
import $ from "jquery";
import axios from "axios";
export const AdminShowSubjectsMode = (props) => {
  // const baseUrl = "https://7877-196-129-112-238.ngrok-free.app/";
  const baseUrl = props.baseUrl;
  const token = localStorage.getItem("myToken");

  const [allCourses, setAllCourses] = useState([]);
  // const allCourses = [
  //   { courseName: "Data Base", code: "CSC 419" },
  //   { courseName: "Computer Science", code: "CSC 101" },
  //   { courseName: "Physics", code: "PHY 201" },
  //   { courseName: "Biology", code: "BIO 301" },
  //   { courseName: "Chemistry", code: "CHE 401" },
  //   { courseName: "Mathematics", code: "MAT 501" },
  //   { courseName: "English Literature", code: "ENG 601" },
  //   { courseName: "History", code: "HIS 701" },
  //   { courseName: "Psychology", code: "PSY 801" },
  //   { courseName: "Economics", code: "ECO 901" },
  //   { courseName: "Sociology", code: "SOC 1001" },
  //   { courseName: "Political Science", code: "POL 1101" },
  //   { courseName: "Art History", code: "ART 1201" },
  //   { courseName: "Philosophy", code: "PHI 1301" },
  //   { courseName: "Geography", code: "GEO 1401" },
  //   { courseName: "Anthropology", code: "ANT 1501" },
  //   { courseName: "Environmental Science", code: "ENV 1601" },
  //   { courseName: "Music Theory", code: "MUS 1701" },
  //   { courseName: "Drama", code: "DRA 1801" },
  //   { courseName: "Engineering", code: "ENG 1901" },
  //   { courseName: "Health Sciences", code: "HSC 2001" },
  // ];
  // const baseUrl = "https://c14f-196-129-118-88.ngrok-free.app/";
  const [isConfirmed, setIsConfirmed] = useState(null);

  const toggleMoreOptions = (index) => {
    // Hide all "more options" sections except for the one corresponding to the clicked index
    $(".getMoreOptionForEachCourse").each(function (i) {
      if (i === index) {
        $(this).fadeToggle(200);
      } else {
        $(this).hide();
        setIsConfirmed(null);
      }
    });
  };
  const handleDeleteCourse = (object, index) => {
    console.log("not Confirmed Delete ");
    $(".getMoreOptionForEachCourse").hide();
    setIsConfirmed(index);
    console.log(object.id);
  };
  const handleModifyCourse = (e) => {
    console.log("Modified", e);
  };

  const deleteFromSystem = async (targetedSubject) => {
    try {
      let id = targetedSubject.id;
      console.log(targetedSubject);
      let myResponse = await axios.post(baseUrl + `course/delete/${id}`, id, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setIsConfirmed(null);
      getData();
      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelDeleting = () => {
    console.log("Cancelled , Subject did Not Deleted");
    setIsConfirmed(null);
  };
  const getData = async () => {
    try {
      setAllCourses([]);
      let myResponse = await axios.get(baseUrl + "Course", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      setAllCourses(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    // Hide all "more options" sections initially
    $(".getMoreOptionForEachCourse").hide();
  }, []);

  return (
    <div className="subjects position-relative">
      {allCourses.length === 0 ? (
        <i className="d-flex justify-content-center align-items-center h-100 fa-solid fa-spinner fa-2x fa-spin "></i>
      ) : (
        <div className="subjectsBox">
          <div className="subjectBoxHeader">
            <h4>Subjects</h4>
            <div className="myInput">
              <input type="text" placeholder="Search By Subject Code" />
              <div className="icon">
                <i className="fa-solid fa-magnifying-glass"></i>
              </div>
            </div>
          </div>
          <button onClick={props.addNewSubject} className="addNewSubject">
            + Add Now Subject
          </button>
          <div className="allAvaliableCourses">
            {allCourses.map((singleCourse, index) => (
              <div key={index} className="specifiedSubject">
                <div className="eachSubject">
                  <div className="courseDetails">
                    <div className="icon">
                      <i className="fa-brands fa-readme"></i>
                    </div>
                    <div className="coursDesc">
                      <h5>{singleCourse.courseName}</h5>
                      <p>{singleCourse.code}</p>
                    </div>
                  </div>
                  <div
                    onClick={() => toggleMoreOptions(index)}
                    className="moreOptions"
                  >
                    <i className="fa-solid fa-ellipsis"></i>
                  </div>
                  <div className="getMoreOptionForEachCourse">
                    <button onClick={() => handleModifyCourse(singleCourse)}>
                      Modify
                    </button>
                    <button
                      onClick={() => handleDeleteCourse(singleCourse, index)}
                    >
                      Delete
                    </button>
                  </div>
                </div>
                {isConfirmed === index && (
                  <div className="confirmDelete">
                    <div className="wrapper position-relative">
                      <div className="warning">
                        <p>
                          Are You Sure You Want To Delete "{" "}
                          <span>{singleCourse.courseName}</span> " from The
                          System
                        </p>
                        <div className="actions">
                          <button onClick={cancelDeleting}>Cancel</button>
                          <button
                            onClick={() => deleteFromSystem(singleCourse)}
                          >
                            Delete
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
