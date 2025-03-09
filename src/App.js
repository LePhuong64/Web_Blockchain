import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestList from "./pages/Students/TestList";
import TakeTest from "./pages/Students/TakeTest";
import TestResult from "./pages/Students/TestResult";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp";
import TestHistory from "./pages/Students/TestHistory";
import StudentHome from "./pages/Students/StudentHome"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<StudentHome />} /> 
        <Route path="/test-list" element={<TestList />} />
        <Route path="/take-test/:id" element={<TakeTest />} />
        <Route path="/result" element={<TestResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/history" element={<TestHistory />} />
      </Routes>
    </Router>
  );
};

export default App;