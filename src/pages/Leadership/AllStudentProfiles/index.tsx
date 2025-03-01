import AllStudentProfilesHeader from './header';
import TableAllStudentProfiles from './table';
import ClassList from "../DeclareData/ClassList/ClassDetail";
import SchoolYear from "../DeclareData/SchoolYear/SchoolYearTable";

const AllStudentProfiles: React.FC = () => {
  return (
    <>
      <div className="student-retention">
        <AllStudentProfilesHeader />
        <div className="content">
          <TableAllStudentProfiles title="Danh sách học viên" />
        </div>
      </div>
    </>
  );
};

export default AllStudentProfiles;
