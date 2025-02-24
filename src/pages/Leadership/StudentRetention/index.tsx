import StudentRetentionHeader from './header';
import TableStudentRetention from './table';
const StudentRetention: React.FC = () => {
  return (
    <>
      <div className="student-retention">
        <StudentRetentionHeader />
        <div className="content">
          <TableStudentRetention title="Danh sách bảo lưu" />
        </div>
      </div>
    </>
  );
};

export default StudentRetention;
