import React, { useState } from "react";
import "./AdminHomePageAddSubjects.scss";
import { AdminShowSubjectsMode } from "../AdminShowSubjectsMode/AdminShowSubjectsMode";
import { AdminAddNewSubjectMode } from "../AdminAddNewSubjectMode/AdminAddNewSubjectMode";
export const AdminHomePageAddSubjects = ({ baseUrl }) => {
  const [addingSubjectMode, setAddingSubjectMode] = useState(false);
  const [isMoreOptionsClicked, setIsMoreOptionsClicked] = useState(null);

  const addNewSubject = () => {
    setAddingSubjectMode(!addingSubjectMode);
    console.log("added");
  };

  const getMoreOptionsCours = (e, index) => {
    setIsMoreOptionsClicked(index);
    console.log(e);
    console.log(index);
  };
  return addingSubjectMode === true ? (
    <AdminAddNewSubjectMode
      setAddingSubjectMode={setAddingSubjectMode}
      baseUrl={baseUrl}
    />
  ) : (
    <AdminShowSubjectsMode
      addNewSubject={addNewSubject}
      isMoreOptionsClicked={isMoreOptionsClicked}
      getMoreOptionsCours={getMoreOptionsCours}
      setIsMoreOptionsClicked={setIsMoreOptionsClicked}
      baseUrl={baseUrl}
    />
  );
};
