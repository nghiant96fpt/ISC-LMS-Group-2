import { Routes, Route } from 'react-router-dom';
import MainLayout from '../../layouts/MainLayout';
import Dashboard from '../../pages/Leadership/Dashboard';
import AllStudentProfiles from '../../pages/Leadership/AllStudentProfiles';
import ClassTransferMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ClassTransferMethod';
import ExemptionMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ExemptionMethod';
import ReservationMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/ReservationMethod';
import SchoolTransferMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/SchoolTransferMethod';
import DisciplinaryMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/DisciplinaryMethod';
import RewardMethod from '../../pages/Leadership/AllStudentProfiles/table/bodyTable/RewardMethod';
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
import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';
import DepartmentSettings from '../../pages/Leadership/DeclareData/SetupDepartmentModal';
import SubjectList from '../../pages/Leadership/DeclareData/SubjectList';
import BlockDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/bockDepartment';
// import AddDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/add';
import ClassListWrapper from '../../pages/Leadership/DeclareData/BlockDepartment/ClassListWrapper';
import EditDepartment from '../../pages/Leadership/DeclareData/BlockDepartment/edit';

// import DeclareDataRoutes from '../../pages/Leadership/DeclareData/DeclareDataRoutes';

// import ScoreTypes from '../../pages/Leadership/DeclareData/ScoreTypes/ScoreTypes';
// import EditGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/edit';
// import AddGradeTypeModal from '../../pages/Leadership/DeclareData/ScoreTypes/add';
import SectionList from '../../pages/Leadership/DeclareData/SectionList';
import SubjectSetup from '../../pages/Leadership/DeclareData/SubjectSettings';
import NewClass from '../../pages/Leadership/DeclareData/ClassList/NewClass';
import UpdateClass from '../../pages/Leadership/DeclareData/ClassList/UpdateClass';

import TableClassList from '../../pages/Leadership/DeclareData/ClassList/TableClassList';
import ClassDetail from '../../pages/Leadership/DeclareData/ClassList/ClassDetail';
import Uploadfile from '../../pages/Leadership/DeclareData/ClassList/Uploadfile';
import ResignationForm from '../../pages/Leadership/AllTeacherProfiles/ResignationForm/ResignationForm';
import LeaveUpdateModal from '../../pages/Leadership/AllTeacherProfiles/UpdateLeave/UpdateLeave';
import RetirementUpdateModal from '../../pages/Leadership/AllTeacherProfiles/RetirementFrom/RetirementForm';
import StudentCU from '../../pages/Leadership/StudentCUD/StudentCU';
import StudyProcess from '../../pages/Leadership/StudyProcess';
import UpdateRewards from '../../pages/Leadership/StudyProcess/UpdateRewards';
import UpdateDiscipline from '../../pages/Leadership/StudyProcess/UpdateDiscipline';

import StudentRetensionUpdate from '../../pages/Leadership/StudentRetention/StudentRetensionUpdate';
import AddTransferAcceptance from '../../pages/Leadership/TransferAcceptance/AddTransferAcceptance';
import ListTopic from '../../pages/Leadership/TeachingAssignment/DsChiDe';
import Config from '../../pages/Leadership/SystemSettings/Config';

import TrainingLevelManagement from '../../pages/Leadership/SystemSettings/TrainingLevelManagement';
import AddForm from '../../pages/Leadership/SystemSettings/TrainingLevelManagement/addPeachLevel';
import UserManagement from '../../pages/Leadership/SystemSettings/UserManagement';
import SettingForm from '../../pages/Leadership/SystemSettings/UserManagement/addSetting';
import SubjectManagement from '../../pages/Leadership/SystemSettings/SubjectManagement';

const StudentRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<MainLayout role="leadership" />}>
        <Route index element={<Dashboard />} />
        {/*Group-3 All student */}
        <Route path="all-student-profiles" element={<AllStudentProfiles />} />
        <Route path="all-student-profiles/retirement/:id" element={<ResignationForm />} />
        <Route path="all-student-profiles/stop-working/:id" element={<LeaveUpdateModal />} />
        <Route path="all-student-profiles/resignation/:id" element={<RetirementUpdateModal />} />
        {/*  */}
        {/*all-student-profiles*/}
        <Route path="all-student-profiles/*" element={<AllStudentProfiles />} />
        <Route path="all-student-profiles/class-transfer-method" element={<ClassTransferMethod />} />
        <Route path="all-student-profiles/exemption-method" element={<ExemptionMethod />} />
        <Route path="all-student-profiles/reservation-method" element={<ReservationMethod />} />
        <Route path="all-student-profiles/school-transfer-method" element={<SchoolTransferMethod />} />
        <Route path="all-student-profiles/disciplinary-method" element={<DisciplinaryMethod />} />
        <Route path="all-student-profiles/reward-method" element={<RewardMethod />} />
        {/*all-teacher-profiles*/}
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
        {/* route cho tiếp nhận chuyển trường và hồ sơ bảo lưu - group 4 */}
        <Route path="update-student-retention" element={<StudentRetensionUpdate />} />
        <Route path="add-transfer-acceptance" element={<AddTransferAcceptance />} />
        {/* route cho phân công giảng dạy và ds chủ đề - group 4 */}
        <Route path="teaching-assignment" element={<TeachingAssignment />} /> {/* url phân công giảng */}
        <Route path="teaching-list-topic" element={<ListTopic />} /> {/* url ds chủ đề */}
        {/*  */}
        <Route path="declare-data" element={<DeclareData />} />
        {/* Route cho block-department */}
        <Route path="declare-data/block-department" element={<BlockDepartment />} />
        {/* <Route path="declare-data/block-department/add" element={<AddDepartment />} /> */}
        <Route path="declare-data/block-department/list" element={<ClassListWrapper />} />
        <Route path="declare-data/block-department/:id" element={<EditDepartment />} />
        {/*  */}
        {/* <Route path="declare-data/score-types" element={<ScoreTypes />} />
        <Route path="declare-data/score-types/:id" element={<EditGradeTypeModal />} />
        <Route path="declare-data/score-types/add" element={<AddGradeTypeModal />} /> */}
        <Route path="declare-data/edit" element={<DepartmentSettings />} />
        <Route path="declare-data/subject-list" element={<SubjectList />} />
        {/* <Route path="declare-data" element={<DeclareData />} /> */}
        {/* <Route path="declare-data/edit" element={<DepartmentSettings />} /> */}
        {/* <Route path="declare-data/subject-list" element={<SubjectList />} /> */}
        {/* <Route path="section-list" element={<SectionList />} /> */}
        {/* <Route path="section-list/edit" element={<SubjectSetup />} /> */}
        <Route path="exams" element={<Exams />} />
        <Route path="student-retention" element={<StudentRetention />} />
        <Route path="system-settings" element={<SystemSettings />} />
        <Route path="system-settings/training-level-management" element={<TrainingLevelManagement />} />
        <Route path="system-settings/training-level-management/add" element={<AddForm />} />
        <Route path="system-settings/user-management" element={<UserManagement />} />
        <Route path="system-settings/user-management/settings" element={<SettingForm />} />
        <Route path="teaching-assignment" element={<TeachingAssignment />} />
        {/* */}
        <Route path="study-process" element={<StudyProcess />} />
        <Route path="study-process/update-rewards" element={<UpdateRewards />} />
        <Route path="study-process/update-discipline" element={<UpdateDiscipline />} />
        <Route path="create-student" element={<StudentCU />} />
        <Route path="new-student" element={<StudentCU />} />
        <Route path='system-settings/config' element={<Config/>}/>
        {/* Thiết lập lớp học */}
        <Route path="system-settings/subject-management" element={<SubjectManagement />} />
      </Route>
    </Routes>
  );
};

export default StudentRoutes;
