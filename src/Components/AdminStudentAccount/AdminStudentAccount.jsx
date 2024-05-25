import React, { useEffect, useState } from "react";
import "./AdminStudentAccount.scss";
import e from "cors";
import axios from "axios";
export const AdminStudentAccount = ({ baseUrl }) => {
  const professorsAcount = [
    {
      name: "Ahmed Mohamed Ibtahim",
      id: 42020161,
      username: "Doctor",
      email: "ahmed1234@gmail.com",
      phoneNumber: "0115332214",
      password: "ahmed12345678",
    },
    {
      name: "John Adam Doe",
      id: 12345678,
      username: "johndoe123",
      email: "johndoe@example.com",
      phoneNumber: "555-123-4567",
      password: "securepassword123",
    },
    {
      name: "Jane Elizabeth Smith",
      id: 87654321,
      username: "janesmith456",
      email: "janesmith@example.com",
      phoneNumber: "555-987-6543",
      password: "strongpassword456",
    },
    {
      name: "Michael David Johnson",
      id: 13579246,
      username: "mjohnson789",
      email: "mjohnson@example.com",
      phoneNumber: "555-246-1357",
      password: "michael@password",
    },
    {
      name: "Sarah Marie Brown",
      id: 98765432,
      username: "sbrown321",
      email: "sarahbrown@example.com",
      phoneNumber: "555-789-4321",
      password: "sarahpassword789",
    },
    {
      name: "David Robert Wilson",
      id: 65432198,
      username: "dwilson876",
      email: "dwilson@example.com",
      phoneNumber: "555-654-3219",
      password: "davidsecurepassword",
    },
    {
      name: "Emily Grace Taylor",
      id: 98761234,
      username: "etaylor567",
      email: "etaylor@example.com",
      phoneNumber: "555-123-8765",
      password: "emilypassword567",
    },
    {
      name: "James William Rodriguez",
      id: 54328976,
      username: "jrodriguez123",
      email: "jamesr@example.com",
      phoneNumber: "555-789-2345",
      password: "james1234",
    },
    {
      name: "Sophia Maria Martinez",
      id: 78906543,
      username: "smartinez",
      email: "sophiam@example.com",
      phoneNumber: "555-543-7890",
      password: "sophiasecure",
    },
    {
      name: "William Thomas Turner",
      id: 10987654,
      username: "williamt789",
      email: "williamt@example.com",
      phoneNumber: "555-876-5432",
      password: "turnerpass789",
    },
  ];
  const [studentsAccounts, setStudentsAccounts] = useState([]);
  const token = localStorage.getItem("myToken");
  const getAllAccounts = async () => {
    try {
      let myResponse = await axios.get(baseUrl + "account/GetStudentUsers", {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true",
        },
      });
      setStudentsAccounts(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };

  const [searchedStd, setSearchedStd] = useState(null);
  const [isEmptyInp, setIsEmptyInp] = useState(true);

  const handleSearch = (e) => {
    e.target.value !== "" ? setIsEmptyInp(false) : setIsEmptyInp(true);
    e.target.value !== "" ? setIsEmptyInp(false) : setIsEmptyInp(true);
    let searchedValue = e.target.value.toLowerCase();
    let searchedStudent = studentsAccounts.filter((doctor) =>
      String(doctor.userName).includes(searchedValue)
    );
    console.log(searchedStudent);
    setSearchedStd(searchedStudent);
    console.log(searchedStd);
  };
  useEffect(() => {
    getAllAccounts();
  }, []);
  return studentsAccounts.length !== 0 ? (
    <div className="studentsAccount">
      <div className=" bg-white">
        <div className="studentsAccountHeader mb-2 d-flex justify-content-between align-items-center">
          <h1> Students Account</h1>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search For Students"
          />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Email</th>
            </tr>
          </thead>
          {isEmptyInp === true ? (
            <tbody>
              {studentsAccounts.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.userName}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {searchedStd.map((student, index) => (
                <tr key={index}>
                  <td>{student.name}</td>
                  <td>{student.userName}</td>
                  <td>{student.email}</td>
                </tr>
              ))}
            </tbody>
          )}
        </table>
      </div>
    </div>
  ) : (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  );
};
