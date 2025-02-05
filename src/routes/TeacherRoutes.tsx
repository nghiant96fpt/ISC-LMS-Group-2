import { Routes, Route } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import TeacherDashboard from "../pages/Teacher/TeacherDashboard";
import ClassList from "../pages/Teacher/ClassList";
import AddClass from "../pages/Teacher/AddClass";
import JoinClass from "../pages/Teacher/JoinClass";
import TestList from "../pages/Teacher/TestList";
import AddTest from "../pages/Teacher/AddTest";
import EnterScores from "../pages/Teacher/EnterScores";
import ScoreBoard from "../pages/Teacher/ScoreBoard";
import ExamSchedule from "../pages/Teacher/ExamSchedule";
import Notifications from "../pages/Teacher/Notifications";
import Help from "../pages/Teacher/Help";

const TeacherRoutes = () => {
  return (
    <Routes>
    <Route path="/" element={<MainLayout role="teacher" />}>
      <Route index element={<TeacherDashboard />} />
      <Route path="class-list" element={<ClassList />} />
      <Route path="add-session" element={<AddClass />} />
      <Route path="join-class" element={<JoinClass />} />
      <Route path="test-list" element={<TestList />} />
      <Route path="add-test" element={<AddTest />} />
      <Route path="enter-scores" element={<EnterScores />} />
      <Route path="score-board" element={<ScoreBoard />} />
      <Route path="exam-schedule" element={<ExamSchedule />} />
      <Route path="notifications" element={<Notifications />} />
      <Route path="help" element={<Help />} />
    </Route>
  </Routes>
  );
};

export default TeacherRoutes;
