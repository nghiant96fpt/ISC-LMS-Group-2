import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Leadership/Dashboard';
import AllStudentProfiles from '../../pages/Leadership/AllStudentProfiles';
import AllTeacherProfiles from '../../pages/Leadership/AllTeacherProfiles';
import TransferAcceptance from '../../pages/Leadership/TransferAcceptance';
import Exams from '../../pages/Leadership/Exams';
import StudentRetention from '../../pages/Leadership/StudentRetention';
import SystemSettings from '../../pages/Leadership/SystemSettings';
import TeachingAssignment from '../../pages/Leadership/TeachingAssignment';
import SchoolYearAdd from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearAdd';
import SchoolYearEditPages from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages';
import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable';
import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';
import DepartmentSettings from '../../pages/Leadership/DeclareData/SetupDepartmentModal';
import SubjectList from '../../pages/Leadership/DeclareData/SubjectList';
import NewClass from '../../pages/Leadership/DeclareData/ClassList/NewClass';
import UpdateClass from '../../pages/Leadership/DeclareData/ClassList/UpdateClass';

import TableClassList from '../../pages/Leadership/DeclareData/ClassList/TableClassList';
import ClassDetail from '../../pages/Leadership/DeclareData/ClassList/ClassDetail';
import Uploadfile from '../../pages/Leadership/DeclareData/ClassList/Uploadfile';
import ClassList from '../../pages/Leadership/DeclareData/ClassList';
import MyDatePicker from '../../components/CalendarInput';




const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="leadership" />}>
        <Route index element={<Dashboard />} />
        <Route path="all-student-profiles" element={<AllStudentProfiles />} />
        <Route path="all-teacher-profiles" element={<AllTeacherProfiles />} />
        <Route path="transfer-acceptance" element={<TransferAcceptance />} />
        {/*route cho school-year - group-4*/}
        <Route path="declare-data/school-year" element={<SchoolYear />} /> {/* url table niên khóa */}
        <Route path="declare-data/school-year/edit-school-year" element={<SchoolYearEditPages />} /> {/* url sửa niên khóa */}
        <Route path="declare-data/school-year/add-school-year" element={<SchoolYearAdd />} /> {/* url thêm niên khóa */}
        {/* route cho class-list - group-4 */}
        <Route path="declare-data/add-class" element={<NewClass />} /> {/* url thêm lớp học */}
        <Route path="declare-data/update-class" element={<UpdateClass />} /> {/* url thiết lập lớp học */}
        <Route path="declare-data/class-list" element={<TableClassList />} />
        <Route path="declare-data/class-detail" element={<ClassDetail />} /> {/* url bảng ds lớp học */}
        <Route path="declare-data/file-class" element={<Uploadfile />} /> {/* url xuât file lớp học */}
        {/*  */}
        <Route path="declare-data/*" element={<DeclareDataRoutes />} />
        {/* <Route path="declare-data" element={<DeclareData />} /> */}
        <Route path="declare-data/edit" element={<DepartmentSettings />} />
        <Route path="declare-data/subject-list" element={<SubjectList />} />
        <Route path="exams" element={<Exams />} />
        <Route path="student-retention" element={<StudentRetention />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
        <Route path="test" element={<MyDatePicker />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
