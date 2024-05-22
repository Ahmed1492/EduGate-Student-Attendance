import { ProfessorHomePage } from "./Components/ProfessorHomePage/ProfessorHomePage";
import { Routes, Route, useNavigate } from 'react-router-dom';
import { StudentAttendance } from "./Components/StudentAttendance/StudentAttendance";
import { NotFoundPage } from "./Components/NotFound/NotFoundPage";
import { AdminHomePage } from "./Components/AdminHomePage/AdminHomePage";
import { DraggableSlider } from "./Components/DraggableSlider/DraggableSlider";
import { AdminProfessorsAccount } from "./Components/AdminProfessorsAccount/AdminProfessorsAccount";
import { AdminStudentAccount } from "./Components/AdminStudentAccount/AdminStudentAccount";
import { AdminStudentCourse } from "./Components/AdminStudentCourse/AdminStudentCourse";
import { AdminStudentList } from "./Components/AdminStudentList/AdminStudentList";
import { AdminProfessorStatus } from "./Components/AdminProfessorStatus/AdminProfessorStatus";
import { Test } from "./Components/Test/Test";
import { AdminSelectSubjectToStudent } from "./Components/AdminSelectSubjectToStudent/AdminSelectSubjectToStudent";
import { AdminStudentListAddStd } from "./Components/AdminStudentListAddStd/AdminStudentListAddStd";
import { AdminProfessorStatusAdd } from "./Components/AdminProfessorStatusAdd/AdminProfessorStatusAdd";
import DynamicQRCodeGenerator from "./Components/Test/DynamicQRCodeGenerator";
import CenterMode from "./Components/Test/CenterMode";
import SimpleSlider from "./Components/Test/CenterMode";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { AttendanceList } from "./Components/AttendanceList/AttendanceList";
import Clock from "./Components/Test/Clock";
import { AdminStudentCourseAddMode } from "./Components/AdminStudentCourseAddMode/AdminStudentCourseAddMode";
import { Login } from "./Components/Login/Login";
import { useEffect, useState } from "react";
import ProtectedRoute from "./Components/ProtectedRoute/ProtectedRoute";
const baseUrl = 'https://cf27-196-129-126-65.ngrok-free.app/api/';

const tesstt = `farag123@hti.com , Mohamed.Ahmed@hti.com  , P@$$w0rd`;


function App() {
  const [studentAttendanceCourse, setStudentAttendanceCourse] = useState();
  const [auth, setAuth] = useState();
  return (
    <>

      <Routes>
        <Route path="/login" element={<Login setAuth={setAuth} baseUrl={baseUrl} />} />
        <Route path="/" element={<ProtectedRoute><AdminHomePage baseUrl={baseUrl} /></ProtectedRoute>} />
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
