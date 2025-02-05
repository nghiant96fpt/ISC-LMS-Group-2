import React from "react";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";

import "./App.css";
import StudentRoutes from "./routes/StudentRoutes";
import TeacherRoutes from "./routes/TeacherRoutes";
import LedershipRoutes from "./routes/LeadershipRoutes";

function App() {
  return (
    <Router>
      <Routes>
      <Route path="/" element={<Navigate to="/student" replace />} />
        <Route path="/student/*" element={<StudentRoutes />} />
        <Route path="/teacher/*" element={<TeacherRoutes />} />
        <Route path="/leadership/*" element={<LedershipRoutes />} />
      </Routes>
    </Router>
  );
}

export default App;
