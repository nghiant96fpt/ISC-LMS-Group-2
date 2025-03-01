import { useState } from 'react';
import './styleBodyTable.css';
import { Link } from 'react-router-dom';
import { data as dataDemo } from './data';
import eye from './../../../../../assets/images/people/fi_eye_true.png';
import arrow from './../../../../../assets/icons/u_arrow up down.png';
import trash from './../../../../../assets/icons/fi_trash-2.png';
import union from './../../../../../assets/icons/Union.png';
import DeleteStudentModal from './../../../../../components/DeleteStudentConfirm';
import CheckboxComponent from './../../../../../components/CheckBox';
import Status from './../../../../../components/Status'; // Import component Status

const TableBody = () => {
  const [selected, setSelected] = useState<string[]>([]);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [studentToDelete, setStudentToDelete] = useState<string | null>(null);
  const [openDropdownId, setOpenDropdownId] = useState<string | null>(null);

  const toggleDropdown = (id: string) => {
    setOpenDropdownId((prev) => (prev === id ? null : id)); // Nếu đang mở thì đóng lại
  };

  const toggleSelect = (id: string) => {
    setSelected((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const toggleSelectAll = () => {
    if (selected.length === dataDemo.length) {
      setSelected([]);
    } else {
      setSelected(dataDemo.map((student) => student.id));
    }
  };

  const handleDeleteClick = (id: string) => {
    setStudentToDelete(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = () => {
    console.log(`Xóa học viên có ID: ${studentToDelete}`);
    setIsDeleteModalOpen(false);
  };

  return (
    <div className="table-container">
      <table className="student-table">
        <thead className="bg-br-gradient-right-or">
          <tr>
            <th>
              <CheckboxComponent
                isChecked={selected.length === dataDemo.length}
                isIndeterminate={selected.length > 0 && selected.length < dataDemo.length}
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
            <th>
              <div className="th-content">
                Tình trạng
                <img src={arrow} alt="Sort Icon" className="sort-icon" />
              </div>
            </th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {dataDemo.map((student) => (
            <tr key={student.id}>
              <td>
                <CheckboxComponent isChecked={selected.includes(student.id)} onChange={() => toggleSelect(student.id)} />
              </td>
              <td>{student.id}</td>
              <td>{student.name}</td>
              <td>{student.birthDate}</td>
              <td>{student.gender}</td>
              <td>{student.people}</td>
              <td>{student.class}</td>
              <td>
                <Status type={student.status} />
              </td>
              <td className="icon-container">
                <Link to="">
                  <button>
                    <img className="eyeIcon" src={eye} alt="View" />
                  </button>
                </Link>
                {/* Nút mở dropdown */}
                <button onClick={() => toggleDropdown(student.id)}>
                  <img className="unionIcon" src={union} alt="All" />
                </button>
                {/* Dropdown chỉ hiển thị khi openDropdownId === student.id */}
                {openDropdownId === student.id && (
                  <ul className="dropdown-menu">
                    <li>
                      <Link to="">
                        <button onClick={() => console.log(`Sửa hồ sơ ${student.id}`)}>Sửa hồ sơ</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="class-transfer-method">
                        <button onClick={() => console.log(`Chuyển lớp ${student.id}`)}>Chuyển lớp</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="school-transfer-method">
                        <button onClick={() => console.log(`Chuyển trường ${student.id}`)}>Chuyển trường</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="reservation-method">
                        <button onClick={() => console.log(`Bảo lưu ${student.id}`)}>Bảo lưu</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="exemption-method">
                        <button onClick={() => console.log(`Cập nhật miễn giảm ${student.id}`)}>Cập nhật miễn giảm</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="reward-method">
                        <button onClick={() => console.log(`Cập nhật khen thưởng ${student.id}`)}>Cập nhật khen thưởng</button>
                      </Link>
                    </li>
                    <li>
                      <Link to="disciplinary-method">
                        <button onClick={() => console.log(`Cập nhật kỷ luật ${student.id}`)}>Cập nhật kỷ luật</button>
                      </Link>
                    </li>
                  </ul>
                )}
                <button onClick={() => handleDeleteClick(student.id)}>
                  <img className="trashIcon" src={trash} alt="Delete" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {isDeleteModalOpen && <DeleteStudentModal onCancel={() => setIsDeleteModalOpen(false)} onConfirm={confirmDelete} />}
    </div>
  );
};

export default TableBody;
