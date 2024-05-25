import React, { useEffect, useState } from "react";
import "./AdminProfessorsAccount.scss";
import axios from "axios";
import Swal from "sweetalert2";
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
  const [isEmptyInp, setIsImptyInp] = useState(true);
  const [allProfessorsAccounts, setAllProfessorsAccount] = useState([]);
  const [searchedProf, setSearchedPro] = useState(null);
  const [deletedEmail, setDeletedEmail] = useState();
  const token = localStorage.getItem("myToken");
  const [isDeleteMode, setIsDeleteMode] = useState(false);
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
      await setAllProfessorsAccount(myResponse.data);
    } catch (error) {
      console.log(error);
    }
  };
  const handleSearch = (e) => {
    e.target.value !== "" ? setIsImptyInp(false) : setIsImptyInp(true);
    let searchedValue = e.target.value.toLowerCase();
    console.log(isEmptyInp);
    let searchedDoctor = allProfessorsAccounts.filter((doctor) =>
      doctor.name.toLowerCase().includes(searchedValue)
    );
    setSearchedPro(searchedDoctor);
    console.log(searchedDoctor);
  };

  const deleteAccount = (doctor) => {
    setIsDeleteMode(true);
    setDeletedEmail(doctor.email);
  };

  const deleteFromSystem = async () => {
    try {
      let myRespone = await axios.post(
        baseUrl + `Account/DeleteUser/${deletedEmail}`,
        deletedEmail,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "ngrok-skip-browser-warning": "true",
          },
        }
      );
      setIsImptyInp(true);
      await setIsDeleteMode(false);
      await Swal.fire({
        icon: "success",
        title: "account Deleted Successfully",
        showConfirmButton: false,
        timer: 1500,
      });
      await setAllProfessorsAccount([]);
      await getAllProfessorsAccounts();
      console.log(myRespone);
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
          <h2> Professors & Admins Account</h2>
          <input
            onChange={handleSearch}
            type="text"
            placeholder="Search For Professors"
          />
        </div>
        {isDeleteMode === true && (
          <div className="layer">
            <div className="deleteBoxForAccount">
              <div className="warningDelete">
                <h4>Warning</h4>
                <i className="fa-solid fa-triangle-exclamation"></i>
              </div>
              <p>
                Are You Sure You Want To Delete `
                <span className="nameOfAccount">{deletedEmail}</span>` Account{" "}
                <br />
                From The System
              </p>
              <div className="buttons">
                <button onClick={() => setIsDeleteMode(false)}>Cancel</button>
                <button onClick={deleteFromSystem}>Delete</button>
              </div>
            </div>
          </div>
        )}
        <table>
          <thead>
            <tr>
              <th>Name</th>
              {/* <th>ID</th> */}
              <th>Username</th>
              <th>Email</th>
              <th>phone Number</th>
              <th>Role</th>
              <th>Delete Account</th>
            </tr>
          </thead>
          {isEmptyInp === true ? (
            <tbody>
              {allProfessorsAccounts.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.name}</td>
                  {/* <td>{doctor.id}</td> */}
                  <td>{doctor.userName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>
                    <div
                      className={`${
                        doctor.role === "Admin"
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
                  <td>
                    <div className="deleteAccount">
                      <button onClick={() => deleteAccount(doctor)}>
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          ) : (
            <tbody>
              {searchedProf.map((doctor, index) => (
                <tr key={index}>
                  <td>{doctor.name}</td>
                  {/* <td>{doctor.id}</td> */}
                  <td>{doctor.userName}</td>
                  <td>{doctor.email}</td>
                  <td>{doctor.phoneNumber}</td>
                  <td>
                    <div
                      className={`${
                        doctor.role === "Admin"
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
                  <td>
                    <div className="deleteAccount">
                      <button onClick={() => deleteAccount(doctor)}>
                        Delete
                      </button>
                    </div>
                  </td>
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
