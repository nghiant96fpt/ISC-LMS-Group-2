import { useState, useEffect } from 'react';
import axios from 'axios';
import './styleBodyTable.css';
import { Link, useNavigate } from 'react-router-dom';
import eye from './../../../../../assets/images/people/fi_eye_true.png';
import arrow from './../../../../../assets/icons/u_arrow up down.png';
import trash from './../../../../../assets/icons/fi_trash-2.png';
import union from './../../../../../assets/icons/Union.png';
import CheckboxComponent from './../../../../../components/CheckBox';
import Status from './../../../../../components/Status';
import arrow_right from '../../../../../assets/icons/chevron_big_right.png';
import arrow_left from '../../../../../assets/icons/arrow left.png';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';
import StatusBar from '../../../../../components/StatusBar/StatusBar';
import createAxiosInstance from '../../../../../utils/axiosInstance';

interface TableBodyProps {
  searchTerm: string;
}

const TableBody: React.FC<TableBodyProps> = ({ searchTerm }) => {
  const API_URL = 'https://fivefood.shop/api/studentinfos/all';
  const [selected, setSelected] = useState<string[]>([]);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [students, setStudents] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);

  const axiosTrue = createAxiosInstance(true);
  const navigator = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosTrue.get(API_URL);
        if (response?.data?.code === 0) {
          setStudents(response.data?.data);
        } else {
          setError('Lỗi tải dữ liệu');
        }
      } catch (error) {
        setError('Lỗi kết nối API');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  const filteredStudents = students.filter(
    (student) => student?.fullName.toLowerCase().includes(searchTerm.toLowerCase()) || student?.code.toLowerCase().includes(searchTerm.toLowerCase()),
  );

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id));
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selected.length === filteredStudents.length) {
      setSelected([]);
    } else {
      setSelected(filteredStudents.map((student) => student?.userId));
    }
  };

  const handleOpenModal = (id: string) => {
    setStudentToDelete(id);
  };

  const handleCloseModal = () => {
    setStudentToDelete(null);
  };

  const handleConfirmDelete = () => {
    if (studentToDelete) {
      setStudents((prev) => prev.filter((s) => s.id !== studentToDelete));
      setStudentToDelete(null);
    }
  };

  const totalPages = Math.ceil(filteredStudents.length / itemsPerPage);
  const currentData = filteredStudents.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  if (isLoading) return <p>Đang tải dữ liệu...</p>;
  if (error) return <p>{error}</p>;

  return (
    <>
      <div className="table-container">
        <table className="student-table">
          <thead className="bg-br-gradient-right-or">
            <tr>
              <th>
                <CheckboxComponent
                  isChecked={selected.length === filteredStudents.length}
                  isIndeterminate={selected.length > 0 && selected.length < filteredStudents.length}
                  onChange={toggleSelectAll}
                />
              </th>
              <th>
                <div className="th-content">
                  Mã học viên
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Tên học viên
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Ngày sinh
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Giới tính
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Dân tộc
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th>
                <div className="th-content">
                  Lớp
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th style={{maxWidth: 150}}>
                <div className="th-content">
                  Tình trạng
                  <img src={arrow} alt="Sort Icon" className="sort-icon" />
                </div>
              </th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {filteredStudents.length === 0 ? (
              <tr className="text-center">
                <td colSpan={9} className="text-center">
                  Không có học viên nào phù hợp.
                </td>
              </tr>
            ) : (
              currentData.map((student, index) => (
                <tr key={index}>
                  <td>
                    <CheckboxComponent isChecked={selected.includes(student?.userId)} onChange={() => toggleSelect(student?.userId)} />
                  </td>
                  <td>{student?.code}</td>
                  <td>{student?.fullName}</td>
                  <td>{new Date(student?.dob).toLocaleDateString('vi-VN')}</td>
                  <td>{student?.gender}</td>
                  <td>{student?.nation}</td>
                  <td>{student?.className}</td>
                  {/* tạm */}
                  <td style={{maxWidth: 150}}>{<StatusBar width='150px' status={student?.status}/>}</td>
                  {/* tạm */}
                  <td className="icon-container flex items-center">
                    <div className='flex items-center me-1'>
                      <button onClick={() => navigator('/leadership/student', {state: {studentId: student?.userId}})}>
                        <img className="eyeIcon" src={eye} alt="View" />
                      </button>
                    </div>
                    <button className='me-1' onClick={() => toggleDropdown(student?.userId)}>
                      <img className="unionIcon" src={union} alt="All" />
                    </button>
                    {openDropdownId === student?.userId && (
                      <ul className="dropdown-menu">
                        <li>
                          <Link to="">
                            <button onClick={() => console.log(`Sửa hồ sơ ${student?.userId}`)}>Sửa hồ sơ</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="class-transfer-method">
                            <button onClick={() => console.log(`Chuyển lớp ${student?.userId}`)}>Chuyển lớp</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="school-transfer-method">
                            <button onClick={() => console.log(`Chuyển trường ${student?.userId}`)}>Chuyển trường</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="reservation-method">
                            <button onClick={() => console.log(`Bảo lưu ${student?.userId}`)}>Bảo lưu</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="exemption-method">
                            <button onClick={() => console.log(`Cập nhật miễn giảm ${student?.userId}`)}>Cập nhật miễn giảm</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="reward-method">
                            <button onClick={() => console.log(`Cập nhật khen thưởng ${student?.userId}`)}>Cập nhật khen thưởng</button>
                          </Link>
                        </li>
                        <li>
                          <Link to="disciplinary-method">
                            <button onClick={() => console.log(`Cập nhật kỷ luật ${student?.userId}`)}>Cập nhật kỷ luật</button>
                          </Link>
                        </li>
                      </ul>
                    )}
                    {openDropdownId === student?.userId && <ul className="dropdown-menu">{/* Dropdown actions */}</ul>}
                    <button onClick={() => handleOpenModal(student?.userId)}>
                      <img className="trashIcon" src={trash} alt="Delete" />
                      {studentToDelete === student?.userId && (
                        <DeleteConfirmation
                          title="Xác nhận xóa học viên"
                          description={`Bạn có chắc chắn muốn xóa học viên ID ${studentToDelete}?\nHành động này không thể hoàn tác.`}
                          onCancel={handleCloseModal}
                          onConfirm={handleConfirmDelete}
                        />
                      )}
                    </button>
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
      <div className="footer-content-classroomsettings flex justify-between items-center mt-4">
        <div className="flex items-center">
          <span className="mr-2">Hiển thị</span>
          <input
            type="number"
            className="w-16 border rounded p-1 text-center"
            value={itemsPerPage}
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
          />
          <span className="ml-2">hàng trong mỗi trang</span>
        </div>

        <div className="pagination flex gap-2">
          <button onClick={() => {goToPage(currentPage - 1)}} disabled={currentPage === 1}>
            <img src={arrow_left} alt="Trước" className="h-4" />
          </button>
          {[...Array(totalPages)].map((_, index) => (
            <button key={index} onClick={() => goToPage(index)} className={`page-item ${currentPage === index + 1 ? 'active' : ''}`}>
              {index + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <img src={arrow_right} alt="Sau" className="h-4" />
          </button>
        </div>
      </div>
    </>
  );
};

export default TableBody;
