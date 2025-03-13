// filepath: d:\BLOCKCHAIN\TL\chamdiem\src\App.js
import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import StudentHome from "./pages/Students/StudentHome"; 
import TeacherDashboard from "./pages/TeacherDashboard/TeacherDashboard"; // Import TeacherDashboard
import Login from "./pages/Login"; // Import Login
import SignUp from "./pages/SignUp"; // Import SignUp

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/*" element={<StudentHome />} />
        <Route path="/teacher/*" element={<TeacherDashboard />} /> {/* Add route for TeacherDashboard */}
        <Route path="/" element={<Login />} /> {/* Add route for Login */}
        <Route path="/signUp" element={<SignUp />} /> {/* Add route for SignUp */}
      </Routes>
    </Router>
  );
};

export default App;