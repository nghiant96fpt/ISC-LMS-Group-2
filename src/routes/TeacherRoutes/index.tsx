import { Routes, Route } from "react-router-dom";
import MainLayout from "../../layouts/MainLayout";
import TeacherDashboard from "../../pages/Teacher/TeacherDashboard";
import ClassList from "../../pages/Teacher/ClassList";
import AddClass from "../../pages/Teacher/AddClass";
import JoinClass from "../../pages/Teacher/JoinClass";
import TestList from "../../pages/Teacher/TestList";
import AddTest from "../../pages/Teacher/AddTest";
import EnterScores from "../../pages/Teacher/EnterScores";
import ScoreBoard from "../../pages/Teacher/ScoreBoard";
import ExamSchedule from "../../pages/Teacher/ExamSchedule";
import Notifications from "../../pages/Teacher/Notifications";
import Help from "../../pages/Teacher/Help";
import ClassDetail from "../../pages/Teacher/ClassList/ClassDetail/ClassDeatail";
import ClassInformation from "../../pages/Teacher/ClassList/ClassInformation/ClassInformation";
import TeacherScoring from '../../pages/Teacher/TeacherScoring';
import Transcript from '../../pages/Teacher/Transcript';
import Classroom from "../../pages/Teacher/ClassList/Classroom/index";

const TeacherRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="teacher" />}>
        <Route index element={<TeacherDashboard />} />
        {/* Group-3 Class Detail */}
        <Route path="class-list" element={<ClassList />} />
        <Route path="class-list/class-detail/:id" element={<ClassDetail />} />
        <Route path="class-list/class-information-done" element={<ClassInformation />} />
        {/*  */}

        <Route path="add-class" element={<AddClass />} />
        <Route path="join-class" element={<JoinClass />} />
        <Route path="test-list" element={<TestList />} />
        <Route path="add-test" element={<AddTest />} />
        <Route path="exam-schedule" element={<ExamSchedule />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="help" element={<Help />} />
        <Route path="classroom" element={<Classroom />} />
        <Route path="enter-scores" element={<TeacherScoring />} />
        <Route path="score-board" element={<Transcript />} />
      </Route>
    </Routes>
  );
};

export default TeacherRoutes;
