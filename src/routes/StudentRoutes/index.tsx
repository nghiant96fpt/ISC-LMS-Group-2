import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Student/Dashboard';
import ClassList from '../../pages/Student/ClassList';
import JoinClass from '../../pages/Student/JoinClass';
import TestList from '../../pages/Student/TestList';
import ScoreBoard from '../../pages/Student/ScoreBoard';
import ExamSchedule from '../../pages/Student/ExamSchedule';
import Notifications from '../../pages/Student/Notifications';
import Help from '../../pages/Student/Help';
import Login from '../../pages/Student/Login/Login';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="student" />}>
        <Route index element={<Dashboard />} />
        <Route path="class-list" element={<ClassList />} />
        <Route path="join-class" element={<JoinClass />} />
        <Route path="test-list" element={<TestList />} />
        <Route path="score-board" element={<ScoreBoard />} />
        <Route path="score-board" element={<ScoreBoard />} />
        <Route path="exam-schedule" element={<ExamSchedule />} />
        <Route path="notifications" element={<Notifications />} />
        <Route path="help" element={<Help />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
