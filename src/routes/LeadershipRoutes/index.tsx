import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Leadership/Dashboard';
import AllStudentProfiles from '../../pages/Leadership/AllStudentProfiles';
import AllTeacherProfiles from '../../pages/Leadership/AllTeacherProfiles';
import TransferAcceptance from '../../pages/Leadership/TransferAcceptance';
import DeclareData from '../../pages/Leadership/DeclareData/DataList';
import Exams from '../../pages/Leadership/Exams';
import StudentRetention from '../../pages/Leadership/StudentRetention';
import SystemSettings from '../../pages/Leadership/SystemSettings';
import TeachingAssignment from '../../pages/Leadership/TeachingAssignment';
import SchoolYearAdd from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearAdd';
import SchoolYearEditPages from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearEditPages';
import SchoolYear from '../../pages/Leadership/DeclareData/SchoolYear/SchoolYearTable';
import DepartmentSettings from '../../pages/Leadership/DeclareData/SetupDepartmentModal';
import SubjectList from '../../pages/Leadership/DeclareData/SubjectList';
import BlockDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/bockDepartment';
import AddDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/add';
import ClassListWrapper from '../../pages/Leadership/DeclareData/BlockDepartment/ClassListWrapper';
import EditDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/edit';
import ScoreTypes from '../../pages/Leadership/DeclareData/ScoreTypes/ScoreTypes';
import EditGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/edit';
import AddGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/add';
import EditExamScheduleModal from '../../pages/Leadership/Exams/EditExams/edit';
import ExamDetailModal from '../../pages/Leadership/Exams/ExamsDeTai/index';
// import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';
import SectionList from '../../pages/Leadership/DeclareData/SectionList';
import SubjectSetup from '../../pages/Leadership/DeclareData/SubjectSettings';
import NewClass from '../../pages/Leadership/DeclareData/ClassList/NewClass';
import UpdateClass from '../../pages/Leadership/DeclareData/ClassList/UpdateClass';

import TableClassList from '../../pages/Leadership/DeclareData/ClassList/TableClassList';
import ClassDetail from '../../pages/Leadership/DeclareData/ClassList/ClassDetail';
import Uploadfile from '../../pages/Leadership/DeclareData/ClassList/Uploadfile';

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
        <Route path="declare-data" element={<DeclareData />} />
        {/* Route cho block-department */}
        <Route path="declare-data/block-department" element={<BlockDepartment />} />
        <Route path="declare-data/block-department/add" element={<AddDepartment />} />
        <Route path="declare-data/block-department/list" element={<ClassListWrapper />} />
        <Route path="declare-data/block-department/:id" element={<EditDepartment />} />
        {/*  */}
        <Route path="declare-data/score-types" element={<ScoreTypes />} />
        <Route path="declare-data/score-types/:id" element={<EditGradeTypeModal />} />
        <Route path="declare-data/score-types/add" element={<AddGradeTypeModal />} />
        <Route path="declare-data/edit" element={<DepartmentSettings />} />
        <Route path="declare-data/subject-list" element={<SubjectList />} />
        {/* <Route path="declare-data/*" element={<DeclareDataRoutes />} /> */}
        {/* <Route path="declare-data" element={<DeclareData />} /> */}
        {/* <Route path="declare-data/edit" element={<DepartmentSettings />} /> */}
        {/* <Route path="declare-data/subject-list" element={<SubjectList />} /> */}
        {/* <Route path="section-list" element={<SectionList />} /> */}
        {/* <Route path="section-list/edit" element={<SubjectSetup />} /> */}
        <Route path="exams" element={<Exams />} />
        <Route path="exams/:id" element={<EditExamScheduleModal />} />
        <Route path="exams/detai" element={<ExamDetailModal />} />
        <Route path="student-retention" element={<StudentRetention />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
