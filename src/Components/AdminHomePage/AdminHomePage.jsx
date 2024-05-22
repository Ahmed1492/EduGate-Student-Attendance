import "./AdminHomePage.scss";
import { AdminHomePageHeader } from "../AdminHomePageHeader/AdminHomePageHeader";
import { AdminHomePageProCourse } from "../AdminHomePageProCourse/AdminHomePageProCourse";
import { AdminHomePageAddSubjects } from "../AdminHomePageAddSubjects/AdminHomePageAddSubjects";
import { AdminHomePageAddNewUserAccount } from "../AdminHomePageAddNewUserAccount/AdminHomePageAddNewUserAccount";
import { DraggableSlider } from "../DraggableSlider/DraggableSlider";
import { jwtDecode } from "jwt-decode";
export const AdminHomePage = ({ baseUrl, auth }) => {
  const token = localStorage.getItem("myToken");
  const decodedToken = jwtDecode(token);
  // console.log("Decoded Token:", decodedToken);
  const userRole2 =
    decodedToken[
      "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
    ];
  return userRole2 === "Admin" ? (
    <div className="adminHomePage">
      <AdminHomePageHeader baseUrl={baseUrl}  decodedToken={decodedToken} />
      <div className="adminPageBodxy container-fluid ">
        <div className="row mt-4">
          <div className=" col-xl-7 col-lg-12">
            <div className="mb-4">
              <AdminHomePageProCourse baseUrl={baseUrl} />
            </div>
          </div>
          <div className="col-xl-5 col-lg-12  ">
            <div className="row justify-content-center ">
              <div className="col-xl-8 col-lg-5 col-md-6 col-sm-9 ">
                <div className="mb-4">
                  <AdminHomePageAddSubjects baseUrl={baseUrl} />
                </div>
              </div>
              <div className="col-xl-4 col-lg-3 col-md-3 col-sm-3 col-">
                <div className="mb-4">
                  <AdminHomePageAddNewUserAccount baseUrl={baseUrl} />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* <DraggableSlider /> */}
      </div>
    </div>
  ) : (
    <h1>You are not Authoraized</h1>
  );
};
