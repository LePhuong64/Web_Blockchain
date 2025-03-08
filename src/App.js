import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import TestList from "./pages/Students/TestList";
import TakeTest from "./pages/Students/TakeTest";
import TestResult from "./pages/Students/TestResult";
import Login from "./pages/Login";
import SignUp from "./pages/SignUp"; 

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<TestList />} />
        <Route path="/take-test/:id" element={<TakeTest />} />
        <Route path="/result" element={<TestResult />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
      </Routes>
    </Router>
  );
};

export default App;
