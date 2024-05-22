import React, { useEffect, useState } from "react";
import "./Login.scss";
import Logo from "../../images/Discover the World’s Top Designers & Creative Professionals 1.png";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
import Joi from "joi";
import LoginImage from "../../images/LoginBackGround.png";
import Swal from "sweetalert2";
export const Login = ({ baseUrl, setAuth }) => {
  const [userRole, setUserRole] = useState();
  const [errorRequiest, setErrorRequiest] = useState([]);
  const [userLogin, setUserLogin] = useState({
    email: "",
    password: "",
  });
  let userAuthorization;
  console.log("new");
  const screenWidth = window.screen.width;
  const screenHeight = window.screen.height;

  // Log the screen dimensions to the console
  console.log(`Screen width: ${screenWidth}px`);
  console.log(`Screen height: ${screenHeight}px`);

  const hasRole = (role) => {
    return userRole ? userRole.includes(role) : false;
  };

  const navigete = useNavigate();
  const getUserData = (e) => {
    const newObj = { ...userLogin };
    let name = e.target.id;
    let value = e.target.value;
    newObj[name] = value;
    setUserLogin(newObj);
    // console.log(newObj);
  };
  const handleLogin = () => {
    loginRequist();
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    let schema = Joi.object({
      email: Joi.string()

        .min(8)
        .max(33)
        .email({ tlds: { allow: ["com", "net"] } })
        .required(),
      password: Joi.string()
        .required()
        .pattern(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
        .messages({
          "string.pattern.base":
            "Password must contain at least one lowercase letter, one uppercase letter, one digit, and be at least 8 characters long.",
        }),
    });
    let resultOfValidation = schema.validate(userLogin, { abortEarly: true });
    resultOfValidation.error
      ? Swal.fire({
          icon: "error",
          title: "Oops...",
          text: resultOfValidation.error.details.map(
            (error) => `${error.message} `
          ),
        })
      : handleLogin();
  };

  const loginRequist = async () => {
    try {
      let myRespone = await axios.post(baseUrl + "account/login", userLogin, {
        headers: {
          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      await localStorage.setItem("myToken", myRespone?.data?.token);
      await hasRole();
      setUserRole(false);
      // console.log(userRole);
      // console.log(myRespone.data.token);
    } catch (error) {
      setErrorRequiest(error.response.data.errorMessage);
      error &&
        Swal.fire({
          icon: "error",
          title: "Oops...",
          text: `${error.response.data.errorMessage} may be Email Or Password Not Correct`,
        });
    }
  };

  useEffect(() => {
    const token = localStorage.getItem("myToken");
    if (token) {
      try {
        const decodedToken = jwtDecode(token);
        console.log("Decoded Token:", decodedToken);
        const userRole2 =
          decodedToken[
            "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
          ];
        userRole2 === "Admin" ? navigete("/admin") : navigete("/prof");
        setAuth(userRole2);
      } catch (error) {
        console.error("Error decoding token:", error);
      }
    } else {
      // Setting userLogin to false if token is not available
    }
  }, [userRole]);

  return (
    <div className="loginPage">
      <div className="wrapper">
        <div className="containerLoginForm">
          <div className="signForm">
            <div className="content">
              <h3>Sign In To</h3>
              <h3>Your Account</h3>
              <p>Welcome Back Please Enter You Detaile</p>
            </div>

            <form action="">
              <label htmlFor="email">Email</label>
              <input
                onChange={getUserData}
                id="email"
                type="text"
                autoComplete="username"
                placeholder="Example@gmail.com"
              />
              <label htmlFor="password">Password</label>
              <input
                onChange={getUserData}
                id="password"
                type="password"
                placeholder="Enter Your Password"
                autoComplete="current-password"
              />
              <button onClick={handleSubmit}>Sign In</button>
            </form>
          </div>
          <div className="logo">
            <img src={LoginImage} alt="loginBackGround" />
          </div>
        </div>
      </div>
    </div>
  );
};
