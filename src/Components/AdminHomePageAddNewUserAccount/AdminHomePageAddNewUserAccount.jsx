import React, { useState } from "react";
import "./AdminHomePageAddNewUserAccount.scss";
import { AdminAddNewUserAccount } from "../AdminAddNewUserAccount/AdminAddNewUserAccount";
export const AdminHomePageAddNewUserAccount = ({ baseUrl }) => {
  const [isAddNewUserAccountMode, setIsAddNewUserAccountMode] = useState(false);
  const [addedNewUserAccount, setAddedNewUserAccount] = useState({
    displayName: "Mohamed Ahmed",
    email: "Mohamed.Ahmed@hti.com",
    phoneNumber: "01004877992",
    password: "P@$$w0rd",
    role: "Admin",
  });
  const handleCreateNewUserAccount = () => {
    setIsAddNewUserAccountMode(true);
    console.log("added");
  };
  return (
    <div>
      {isAddNewUserAccountMode === true && (
        <AdminAddNewUserAccount
          setIsAddNewUserAccountMode={setIsAddNewUserAccountMode}
          baseUrl={baseUrl}
        />
      )}
      <button onClick={handleCreateNewUserAccount} className="newUserAcount">
        <div className="createNewUserBox">
          <p>+</p>
          <p>Create New User Account</p>
        </div>
      </button>
    </div>
  );
};
