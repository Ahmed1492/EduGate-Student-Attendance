import { ProfessorHomePage } from "./Components/ProfessorHomePage/ProfessorHomePage";
import { Routes, Route } from 'react-router-dom';
import { StudentAttendance } from "./Components/StudentAttendance/StudentAttendance";
import { NotFoundPage } from "./Components/NotFound/NotFoundPage";
import { AdminHomePage } from "./Components/AdminHomePage/AdminHomePage";
import { AdminProfessorsAccount } from "./Components/AdminProfessorsAccount/AdminProfessorsAccount";
import { AdminStudentAccount } from "./Components/AdminStudentAccount/AdminStudentAccount";
import { AdminStudentCourse } from "./Components/AdminStudentCourse/AdminStudentCourse";
import { AdminStudentList } from "./Components/AdminStudentList/AdminStudentList";
import { AdminProfessorStatus } from "./Components/AdminProfessorStatus/AdminProfessorStatus";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Login } from "./Components/Login/Login";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
import { jwtDecode } from "jwt-decode";
const baseUrl = 'https://6b6e-196-129-202-154.ngrok-free.app/api/';

const tesstt = `farag123@hti.com , Mohamed.Ahmed@hti.com  , P@$$w0rd`;
function App() {
  const [currentRole, setCurrentRole] = useState('');
  const [studentAttendanceCourse, setStudentAttendanceCourse] = useState();
  const [auth, setAuth] = useState();
  ;
  useEffect(() => {
    if (localStorage.getItem('myToken')) {
      const token = localStorage.getItem("myToken");
      const decodedToken = `${jwtDecode(token)}`;
      setCurrentRole(decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role']);
      // console.log(currentRole);
      // console.log(currentRole);
    }

  }, [auth]);
  return (
    <>

      <Routes>
        {
          currentRole === 'Admin' ? <Route path="/" element={<ProtectedRoute><AdminHomePage baseUrl={baseUrl} /></ProtectedRoute>} /> :
            <Route path="/" element={<ProtectedRoute><ProfessorHomePage setStudentAttendanceCourse={setStudentAttendanceCourse} baseUrl={baseUrl} /></ProtectedRoute>} />
        }


        <Route path="/login" element={<Login setAuth={setAuth} baseUrl={baseUrl} />} />
        <Route path="/admin" element={<ProtectedRoute><AdminHomePage auth={auth} baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/admin/profAccount" element={<ProtectedRoute><AdminProfessorsAccount baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/admin/profStatus" element={<ProtectedRoute><AdminProfessorStatus baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/admin/stdAccount" element={<ProtectedRoute><AdminStudentAccount baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/admin/stdCourse" element={<ProtectedRoute><AdminStudentCourse baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/admin/stdList" element={<ProtectedRoute><AdminStudentList baseUrl={baseUrl} /></ProtectedRoute>} />



        <Route path="/prof" element={<ProtectedRoute><ProfessorHomePage setStudentAttendanceCourse={setStudentAttendanceCourse} baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="/prof/Attendance/:courseId/:groupId/" element={<ProtectedRoute><StudentAttendance studentAttendanceCourse={studentAttendanceCourse} baseUrl={baseUrl} /></ProtectedRoute>} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
