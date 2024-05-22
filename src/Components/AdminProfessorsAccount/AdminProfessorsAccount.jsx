import React, { useEffect, useState } from "react";
import "./AdminProfessorsAccount.scss";
import axios from "axios";
export const AdminProfessorsAccount = ({ baseUrl }) => {
  const professorsAcount = [
    {
      name: "Ahmed Mohamed Ibtahim",
      id: 42020161,
      username: "Doctor",
      email: "ahmed1234@gmail.com",
      phoneNumber: "0115332214",
      password: "ahmed12345678",
      role: "Doctor",
    },
    {
      name: "John Adam Doe",
      id: 12345678,
      username: "johndoe123",
      email: "johndoe@example.com",
      phoneNumber: "555-123-4567",
      password: "securepassword123",
      role: "Doctor",
    },
    {
      name: "Jane Elizabeth Smith",
      id: 87654321,
      username: "janesmith456",
      email: "janesmith@example.com",
      phoneNumber: "555-987-6543",
      password: "strongpassword456",
      role: "Doctor",
    },
    {
      name: "Michael David Johnson",
      id: 13579246,
      username: "mjohnson789",
      email: "mjohnson@example.com",
      phoneNumber: "555-246-1357",
      password: "michael@password",
      role: "Doctor",
    },
    {
      name: "Sarah Marie Brown",
      id: 98765432,
      username: "sbrown321",
      email: "sarahbrown@example.com",
      phoneNumber: "555-789-4321",
      password: "sarahpassword789",
      role: "Doctor",
    },
    {
      name: "David Robert Wilson",
      id: 65432198,
      username: "dwilson876",
      email: "dwilson@example.com",
      phoneNumber: "555-654-3219",
      password: "davidsecurepassword",
      role: "Doctor",
    },
    {
      name: "Emily Grace Taylor",
      id: 98761234,
      username: "etaylor567",
      email: "etaylor@example.com",
      phoneNumber: "555-123-8765",
      password: "emilypassword567",
      role: "Doctor",
    },
    {
      name: "James William Rodriguez",
      id: 54328976,
      username: "jrodriguez123",
      email: "jamesr@example.com",
      phoneNumber: "555-789-2345",
      password: "james1234",
      role: "Doctor",
    },
    {
      name: "Sophia Maria Martinez",
      id: 78906543,
      username: "smartinez",
      email: "sophiam@example.com",
      phoneNumber: "555-543-7890",
      password: "sophiasecure",
      role: "Doctor",
    },
    {
      name: "William Thomas Turner",
      id: 10987654,
      username: "williamt789",
      email: "williamt@example.com",
      phoneNumber: "555-876-5432",
      password: "turnerpass789",
      role: "Doctor",
    },
  ];
  const [allProfessorsAccounts, setAllProfessorsAccount] = useState([]);
  const token = localStorage.getItem("myToken");
  const getAllProfessorsAccounts = async () => {
    try {
      let myResponse = await axios.get(
        baseUrl + "account/GetDoctorAndAdminUsers",
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setAllProfessorsAccount(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getAllProfessorsAccounts();
  }, []);
  return allProfessorsAccounts.length !== 0 ? (
    <div className="professorsAccount">
      <div className=" bg-white">
        <div className="profAccountHeader mb-2 d-flex justify-content-between align-items-center">
          <h2> Professors & Admins  Account</h2>
          <input type="text" placeholder="Search For Professors" />
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>phone Number</th>
              <th>Role</th>
            </tr>
          </thead>
          <tbody>
            {allProfessorsAccounts.map((doctor, index) => (
              <tr key={index}>
                <td>{doctor.name}</td>
                <td>{doctor.id}</td>
                <td>{doctor.userName}</td>
                <td>{doctor.email}</td>
                <td>{doctor.phoneNumber}</td>
                <td>
                  <div
                    className={`${
                      doctor.role == "Admin"
                        ? "adminAccount"
                        : "professorAccount"
                    }  `}
                  >
                    {doctor.role === "Admin" ? (
                      <div className="adminLogo d-flex align-items-center">
                        <i className="fa-solid fa-crown"></i>
                        {doctor.role}
                      </div>
                    ) : (
                      <div className="professorLogo d-flex align-items-center">
                        <i className="fa-regular fa-circle-user"></i>{" "}
                        {doctor.role}
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  ) : (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  );
};
