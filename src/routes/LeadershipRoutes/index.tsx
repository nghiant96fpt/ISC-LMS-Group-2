
import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Leadership/Dashboard';
import AllStudentProfiles from '../../pages/Leadership/AllStudentProfiles';
import AllTeacherProfiles from '../../pages/Leadership/AllTeacherProfiles';
import TransferAcceptance from '../../pages/Leadership/TransferAcceptance';
import DeclareData from '../../pages/Leadership/DeclareData';
import Exams from '../../pages/Leadership/Exams';
import StudentRetention from '../../pages/Leadership/StudentRetention';
import SystemSettings from '../../pages/Leadership/SystemSettings';
import TeachingAssignment from '../../pages/Leadership/TeachingAssignment';

//import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear';
        import SchoolYearEditPages from "../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages";

import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable';


const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="leadership" />}>
        <Route index element={<Dashboard />} />
        <Route path="all-student-profiles" element={<AllStudentProfiles />} />
        <Route path="all-teacher-profiles" element={<AllTeacherProfiles />} />
        <Route path="transfer-acceptance" element={<TransferAcceptance />} />
        <Route path="declare-data" element={<DeclareData />} />

        <Route path="declare-data/school-year/edit" element={<SchoolYearEditPages />} />
        <Route path="declare-data/school-year" element={<SchoolYear />} /> {/*route cho school-year - group-4*/}
        <Route path="exams" element={<Exams />} />
        <Route path="student-retention" element={<StudentRetention />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
