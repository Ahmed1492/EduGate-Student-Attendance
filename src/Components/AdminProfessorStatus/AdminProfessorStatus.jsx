import React, { useEffect, useState } from "react";
import "./AdminProfessorStatus.scss";
import axios from "axios";
import { AdminProfessorStatusAdd } from "../AdminProfessorStatusAdd/AdminProfessorStatusAdd";
export const AdminProfessorStatus = (props) => {
  const baseUrl = props.baseUrl;
  // const baseUrl = `https://7877-196-129-112-238.ngrok-free.app/`;
  const [professorAccount, setProfessorAccount] = useState([]);
  const [isreload, seIsReload] = useState(false);
  const [isAddDoctorMode, seIsAddDoctorMode] = useState(false);
  // const [modifingMode, setModifyingModeForName] = useState(false);
  const [editingIndexForName, setEditingIndexForName] = useState(null);
  const [modifyingModeForName, setModifyingModeForName] = useState(false);
  const [afterUpdatingProfessor, setAfterUpdatingProfessor] = useState([]);

  const [editingIndexForId, setEditingIndexForId] = useState(null);
  const [modifyingModeForId, setModifyingModeForId] = useState(false);

  const handleStatus = async (e) => {
    let newState = !professorAccount[e].isActive;
    let newObj = { ...professorAccount[e] };
    newObj.isActive = newState;
    // console.log(newObj);
    seIsReload(true);
    console.log(newObj);
    seIsReload(newObj);
    updateProfessorStatus(newObj, isreload);
  };
  const token = localStorage.getItem("myToken");

  const updateProfessorStatus = async (newObj) => {
    try {
      seIsReload({});
      let myResponse = await axios.post(baseUrl + "doctors/update", newObj, {
        headers: {
          Authorization: `Bearer ${token}`,
          "ngrok-skip-browser-warning": "true", // Set any value
        },
      });
      seIsReload(true);

      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
    // console.log(updateProfessorStatus);
  };

  const getData = async () => {
    try {
      const myResponse = await axios.get(baseUrl + "doctors", {
        headers: {
          Authorization: `Bearer ${token}`,

          "ngrok-skip-browser-warning": "69420",
        },
      });
      setProfessorAccount(myResponse.data);
    } catch (error) {
      console.log(error);
      throw error;
    }
  };
  const activeAddDoctorMode = () => {
    seIsAddDoctorMode(true);
  };

  const changeDoctorName = (doctor, index, e) => {
    setModifyingModeForName(true);
    console.log("Array", professorAccount[index]);
    // console.log("Doctor ", doctor);
  };
  const updateingDoctorName = async () => {
    try {
      seIsReload({});
      let myResponse = await axios.post(
        baseUrl + "doctors/update",
        afterUpdatingProfessor,
        {
          headers: {
            Authorization: `Bearer ${token}`,

            "ngrok-skip-browser-warning": "true", // Set any value
          },
        }
      );
      seIsReload(true);
      setEditingIndexForName(null);
      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };

  const handleDoubleClickForName = (index) => {
    setModifyingModeForName(true);
    setEditingIndexForName(index);
    setEditingIndexForId(null);

    // console.log("modify mode : ", modifyingModeForName);
    // console.log("index : ", index);
    // console.log("editingIndexForName : ", editingIndexForName);
  };
  const handleChangeForName = (e, index, doctor) => {
    const updatedProfessors = [...professorAccount];
    updatedProfessors[index].name = e.target.value;
    setProfessorAccount(updatedProfessors);
    // console.log("event : ", e);
    // console.log("index : ", e);
    // console.log("doctor : ", doctor);
    setAfterUpdatingProfessor(doctor);

    // console.log("modify mode : ", modifyingModeForName);
  };

  const handleBlurForName = () => {
    // setEditingIndexForName(null);
    console.log("modify mode : ", modifyingModeForName);
  };

  const cancelUpdatingForName = () => {
    seIsReload(true);
    setEditingIndexForName(null);
  };

  const handleDoubleClickForId = (index) => {
    setEditingIndexForName(false);
    setModifyingModeForId(true);
    setEditingIndexForId(index);
  };
  const handleChangeForId = (e, index, doctor) => {
    const updatedProfessors = [...professorAccount];
    updatedProfessors[index].userId = e.target.value;
    setProfessorAccount(updatedProfessors);
    setAfterUpdatingProfessor(doctor);
    // console.log("event : ", e);
    // console.log("index : ", index);
    console.log("doctor : ", doctor);
  };

  const handleBlurForId = (index) => {};
  const updateingDoctorId = async () => {
    try {
      seIsReload({});
      let myResponse = await axios.post(
        baseUrl + "doctors/update",
        afterUpdatingProfessor,
        {
          headers: {
            Authorization: `Bearer ${token}`,

            "ngrok-skip-browser-warning": "true", // Set any value
          },
        }
      );
      seIsReload(true);
      setEditingIndexForName(null);
      setEditingIndexForId(null);
      console.log(myResponse);
    } catch (error) {
      console.log(error);
    }
  };
  const cancelUpdatingForId = () => {
    setEditingIndexForId(null);
  };
  useEffect(() => {
    getData();
    console.log("requests");
  }, [isreload]);

  return professorAccount.length === 0 ? (
    <div className="loadScreen">
      <div className="lds-dual-ring"></div>
    </div>
  ) : (
    <div className="professorStatusPage">
      <div className=" bg-white">
        <div className="professorStatusHeader mb-2 d-flex justify-content-between align-items-center">
          <h1> Professor Status</h1>
          <div className="studentListHeaderLeftSide">
            <input type="text" placeholder="Search For Professors" />
            <button onClick={activeAddDoctorMode}>+ Add New Doctor</button>
          </div>
        </div>
        <table>
          <thead>
            <tr>
              <th>Name</th>
              <th>ID</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {professorAccount.map((doctor, index) => (
              <tr key={index}>
                <td onDoubleClick={() => handleDoubleClickForName(index)}>
                  {modifyingModeForName && editingIndexForName === index ? (
                    <input
                      className="updateDoctorNames"
                      type="text"
                      value={doctor.name}
                      onChange={(e) => handleChangeForName(e, index, doctor)}
                      onBlur={handleBlurForName}
                      autoFocus
                    />
                  ) : (
                    doctor.name
                  )}
                </td>

                <td onDoubleClick={() => handleDoubleClickForId(index)}>
                  {modifyingModeForId && editingIndexForId === index ? (
                    <input
                      className="updateDoctorIds"
                      type="text"
                      value={doctor.userId}
                      onChange={(e) => handleChangeForId(e, index, doctor)}
                      onBlur={handleBlurForId}
                      autoFocus
                    />
                  ) : (
                    doctor.userId
                  )}
                </td>

                <td>
                  <div
                    onClick={() => handleStatus(index)}
                    className="professorStatus"
                  >
                    {doctor?.isActive === true ? (
                      <>
                        <div className="active isActiveStatus">Active</div>
                        <div className="inactive ">InActive</div>
                      </>
                    ) : (
                      <>
                        <div className="active">Active</div>
                        <div className="inactive notActiveStatus ">
                          InActive
                        </div>
                      </>
                    )}
                  </div>
                </td>

                {modifyingModeForName === true && (
                  <td className="update">
                    {modifyingModeForName && editingIndexForName === index && (
                      <div>
                        <button onClick={cancelUpdatingForName}>Cancel</button>
                        <button onClick={updateingDoctorName}>Update</button>
                      </div>
                    )}
                  </td>
                )}

                {modifyingModeForId === true && (
                  <td className="update">
                    {modifyingModeForId && editingIndexForId === index && (
                      <div>
                        <button onClick={cancelUpdatingForId}>Cancel</button>
                        <button onClick={updateingDoctorId}>Update</button>
                      </div>
                    )}
                  </td>
                )}
              </tr>
            ))}
          </tbody>
        </table>
        {isAddDoctorMode === true && (
          <AdminProfessorStatusAdd
            baseUrl={baseUrl}
            seIsAddDoctorMode={seIsAddDoctorMode}
            setProfessorAccount={setProfessorAccount}
            seIsReload={seIsReload}
          />
        )}
      </div>
    </div>
  );
};
