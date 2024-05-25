import React, { useEffect, useState } from "react";
import "./AdminAddNewUserAccount.scss";
import axios from "axios";
import Swal from "sweetalert2";
import Joi from "joi";
export const AdminAddNewUserAccount = ({
  baseUrl,
  setIsAddNewUserAccountMode,
}) => {
  const [allRoles, setAllRoles] = useState([]);
  const [addedNewUserAccount, setAddedNewUserAccount] = useState({
    displayName: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: "",
  });
  const token = localStorage.getItem("myToken");
  const getAllRoles = async () => {
    try {
      let myRespone = await axios.get(baseUrl + "account/AllRoles", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "69420",
        },
      });
      setAllRoles(myRespone.data);
    } catch (error) {
      console.log(error);
    }
  };
  const getUserData = (e) => {
    const newObj = { ...addedNewUserAccount };
    let name = e.target.id;
    let value = e.target.value;
    newObj[name] = value;
    setAddedNewUserAccount(newObj);
    console.log(newObj);
  };
  const getUserRole = (e) => {
    const newObj = { ...addedNewUserAccount };
    let value = e.target.value;
    newObj.role = value;
    setAddedNewUserAccount(newObj);
    console.log(newObj);
  };
  const addNewUserAccountToSystem = async () => {
    if (
      addedNewUserAccount.displayName !== "" &&
      addedNewUserAccount.email !== "" &&
      addedNewUserAccount.password !== "" &&
      addedNewUserAccount.phoneNumber !== "" &&
      addedNewUserAccount.role !== "" &&
      addedNewUserAccount.phoneNumber !== ""
    ) {
      try {
        const response = await axios.post(
          `${baseUrl}account/CreateUser`,
          addedNewUserAccount,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "ngrok-skip-browser-warning": "69420",
            },
          }
        );
        await setIsAddNewUserAccountMode(false);
        Swal.fire({
          icon: "success",
          title: "New user account added",
          showConfirmButton: false,
          timer: 2000,
        });

        console.log("Response:", response.data); // Assuming the response contains useful data
      } catch (error) {
        Swal.fire({
          title: "Warning Message",
          text: error.message,
          icon: "error",
        });
      }
    } else {
      Swal.fire({
        title: "Warning Message",
        text: "Please  Fill All Doctor Data",
        icon: "warning",
      });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const schema = Joi.object({
      displayName: Joi.string().min(3).max(30).required().messages({
        "string.empty": "User Name is required.",
        "string.min": "User Name should have a minimum length of 3.",
        "string.max": "User Name should have a maximum length of 30.",
      }),
      email: Joi.string()
        .min(8)
        .max(33)
        .email({ tlds: { allow: ["com", "net"] } })
        .required()
        .messages({
          "string.empty": "Email is required.",
          "string.min": "Email should have a minimum length of 8.",
          "string.max": "Email should have a maximum length of 33.",
          "string.email": "Email must be a valid email address.",
        }),
      phoneNumber: Joi.string()
        .pattern(/^[0-9]{10,22}$/)
        .required()
        .messages({
          "string.empty": "Phone number is required.",
          "string.pattern.base": "Not Vaild Phone Number",
        }),
      password: Joi.string()
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
          "string.pattern.base":
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
        }),
      role: Joi.string()
        .valid("Admin", "Student", "Doctor")
        .required()
        .messages({
          "any.only": "Not Vaild Role",
          "string.empty": "Role is required.",
        }),
    });

    const resultOfValidation = schema.validate(addedNewUserAccount, {
      abortEarly: true,
    });

    if (resultOfValidation.error) {
      Swal.fire({
        icon: "warning",
        title: "Oops...",
        html: resultOfValidation.error.details
          .map((error) => `<p>${error.message}</p>`)
          .join(""),
      });
    } else {
      addNewUserAccountToSystem();
    }
  };
  useEffect(() => {
    getAllRoles();
  }, []);
  return (
    <div className="addNewUserAccount">
      <div className="headerOfCard">
        <h4>Create New User Account</h4>
        <div onClick={() => setIsAddNewUserAccountMode(false)}>
          <i className="fa-solid fa-xmark"></i>
        </div>
      </div>
      <div className="addNewStudent">
        <label htmlFor="displayName">User Name</label>
        <input
          onChange={getUserData}
          type="text"
          id="displayName"
          placeholder="Use PascalCase"
        />
        <label htmlFor="email">User Email</label>
        <input
          onChange={getUserData}
          type="text"
          id="email"
          placeholder="Use PascalCase"
        />
        <label htmlFor="phoneNumber">User Phone</label>
        <input
          onChange={getUserData}
          type="text"
          id="phoneNumber"
          placeholder="Use PascalCase"
        />
        <label htmlFor="password">User Passowrd</label>
        <input
          onChange={getUserData}
          type="text"
          id="password"
          placeholder="Use PascalCase"
        />

        <label htmlFor="role">Role </label>
        <select
          onChange={getUserRole}
          className="form-select"
          id="role"
          aria-label="Default select example"
        >
          <option defaultValue>All Roles</option>

          {allRoles.map((role, index) => (
            <option key={index}>{role}</option>
          ))}
        </select>
      </div>
      <div className="addingButton">
        <button onClick={handleSubmit} className="add">
          Add
        </button>
      </div>
    </div>
  );
};
