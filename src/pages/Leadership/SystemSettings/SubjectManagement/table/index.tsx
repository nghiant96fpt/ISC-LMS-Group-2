import { useState, useEffect } from 'react';
import './style.css';
import '../../../../../styles/_variables.scss';
import edit from '../../../../../assets/icons/fi_edit.png';
import trash from '../../../../../assets/icons/fi_trash-2.png';
import search from '../../../../../assets/icons/fi_search.png';
import arrow_right from '../../../../../assets/icons/chevron_big_right.png';
import arrow_left from '../../../../../assets/icons/arrow left.png';
import Popup from '../../../../../components/Popup';
import DeleteConfirmation from '../../../../../components/DeleteConfirmation';
import arrowupdown from '../../../../../assets/icons/u_arrow up down.png';
import { DropdownOption } from '../../../../../components/Dropdown/type';
import { toast } from 'react-toastify';
import Cookies from 'js-cookie';

const API_URL = 'https://fivefood.shop/api/subject-types';
const token = Cookies.get('accessToken');

const ClassManagementTable: React.FC<{ selectedYearOption: DropdownOption | null }> = ({ selectedYearOption }) => {
  const [subjects, setSubjects] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [subjectToDelete, setSubjectToDelete] = useState<number | null>(null);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [editingSubjectId, setEditingSubjectId] = useState<string | null>(null);
  const [editingData, setEditingData] = useState<any | null>(null);

  // Hàm helper: header dùng cho các request có token.
  const authHeaders = {
    Authorization: `Bearer ${token}`,
    'Content-Type': 'application/json',
    Accept: 'application/json',
  };

  const fetchSubjects = async () => {
    if (!selectedYearOption) return;
    try {
      const yearId = selectedYearOption.value || '';
      const response = await fetch(`${API_URL}?yearId=${yearId}`, {
        headers: {
          ...authHeaders,
        },
      });
      const result = await response.json();
      if (result.code === 0) {
        console.log('Fetched subjects:', result.data);
        setSubjects(result.data);
      }
    } catch (error) {
      console.error('Error fetching subjects:', error);
    }
  };

  useEffect(() => {
    console.log('Selected Year Option:', selectedYearOption);
    fetchSubjects();
  }, [selectedYearOption]);

  const filteredSubjects = subjects.filter((subject) => {
    // Lọc theo tên và năm học
    const matchesSearchQuery = subject.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesSelectedYear = selectedYearOption ? subject.academicYear.name === selectedYearOption.label : true;
    return matchesSearchQuery && matchesSelectedYear;
  });

  const totalPages = Math.ceil(filteredSubjects.length / itemsPerPage);
  const currentData = filteredSubjects.slice((currentPage - 1) * itemsPerPage, currentPage * itemsPerPage);

  const goToPage = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  // Modal handlers
  const handleOpenModal = (id: number) => {
    setSubjectToDelete(id);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSubjectToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (subjectToDelete !== null) {
      try {
        const response = await fetch(`${API_URL}/${subjectToDelete}`, {
          method: 'DELETE',
          headers: {
            ...authHeaders,
          },
        });
        if (response.ok) {
          setSubjects(subjects.filter((subject) => subject.id !== subjectToDelete));
        } else {
          console.error('Delete failed');
        }
      } catch (error) {
        console.error('Error deleting subject:', error);
      }
      toast.success('Xóa môn học thành công!');
      setIsModalOpen(false);
      setSubjectToDelete(null);
    }
  };

  // Edit handlers
  const handleEditSubject = async (id: string) => {
    setEditingSubjectId(id);
    try {
      const response = await fetch(`${API_URL}/${id}`, {
        headers: {
          ...authHeaders,
        },
      });
      const result = await response.json();
      setEditingData(result.data);
    } catch (error) {
      console.error('Error fetching subject details:', error);
    }
  };

  const handleSavePopup = async (updatedData: any) => {
    if (!updatedData.id) return;
    const payload = {
      name: updatedData.name,
      description: updatedData.description,
      status: updatedData.status,
      AcademicYearsId: updatedData.AcademicYearsId,
    };

    try {
      const res = await fetch(`${API_URL}/${updatedData.id}`, {
        method: 'PUT',
        headers: {
          ...authHeaders,
        },
        body: JSON.stringify(payload),
      });
      if (!res.ok) throw new Error('Update failed');

      setSubjects((prevSubjects) => prevSubjects.map((subject) => (subject.id === updatedData.id ? { ...subject, ...updatedData } : subject)));
      toast.success('Sửa môn học thành công!');
      setEditingSubjectId(null);
      setEditingData(null);
    } catch (err) {
      console.error('Error updating subject:', err);
    }
  };

  return (
    <div className="content-classrooomsettings">
      <div className="head-content-classrooomsettings">
        <p className="title-classrooomsettings">Danh sách các loại môn học</p>
        <div className="search-classrooomsettings">
          <button className="search-button-classrooomsettings">
            <img src={search} alt="search" className="icon-search" />
          </button>
          <input
            type="text"
            className="search-input"
            placeholder="Tìm kiếm theo tên..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="main-content-classrooomsettings">
        <table className="w-full border-collapse">
          <thead className="bg-br-gradient-top-or text-white">
            <tr>
              <th className="p-3 text-center">
                <div className="flex items-center justify-center gap-2">
                  Loại môn
                  <img src={arrowupdown} alt="Sort Icon" className="w-6 h-6" />
                </div>
              </th>
              <th className="p-3 text-center">Trạng thái</th>
              <th className="p-3 text-left">Ghi chú</th>
              <th className="p-3 text-center"></th>
            </tr>
          </thead>
          <tbody>
            {currentData.length > 0 ? (
              currentData.map((item, index) => (
                <tr key={item.id} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-gray-200'}>
                  <td className="p-3 text-center">{item.name}</td>
                  <td className={`p-3 text-center ${item.status ? 'text-blue-600' : 'text-red-600'}`}>
                    {item.status ? 'Hoạt động' : 'Không hoạt động'}
                  </td>
                  <td className="p-3">{item.description}</td>
                  <td className="p-3 text-center flex justify-center gap-3">
                    <button onClick={() => handleEditSubject(item.id.toString())} className="rounded-lg">
                      <img src={edit} alt="edit" className="w-5 h-5" />
                    </button>
                    <button onClick={() => handleOpenModal(item.id)}>
                      <img src={trash} alt="trash" className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-3 text-center text-gray-500">
                  Không tìm thấy kết quả nào.
                </td>
              </tr>
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
          <button onClick={() => goToPage(currentPage - 1)} disabled={currentPage === 1}>
            <img src={arrow_left} alt="Trước" className="h-4" />
          </button>
          {Array.from({ length: totalPages }, (_, i) => (
            <button key={i} className={currentPage === i + 1 ? 'active bg-blue-500 text-white pageactive' : ''} onClick={() => goToPage(i + 1)}>
              {i + 1}
            </button>
          ))}
          <button onClick={() => goToPage(currentPage + 1)} disabled={currentPage === totalPages}>
            <img src={arrow_right} alt="Sau" className="h-4" />
          </button>
        </div>
      </div>

      {/* Modal Confirm Delete */}
      {isModalOpen && subjectToDelete !== null && (
        <DeleteConfirmation
          title="Xác nhận xoá môn học"
          description="Bạn có chắc chắn muốn xóa môn học này không?"
          onCancel={handleCloseModal}
          onConfirm={handleConfirmDelete}
        />
      )}

      {/* Edit Popup */}
      {editingSubjectId && editingData && (
        <Popup
          titleBig="Thiết lập lớp học"
          titleSmall1="Loại lớp học"
          titleSmall2="Trạng thái"
          titleSmall3="Ghi chú"
          isOpen={true}
          onClose={() => {
            setEditingSubjectId(null);
            setEditingData(null);
          }}
          initId={editingData.id}
          initName={editingData.name}
          initDescription={editingData.description}
          initActive={editingData.status}
          onSave={(data) =>
            handleSavePopup({
              ...data,
              id: editingData.id,
              AcademicYearsId: editingData.academicYear?.id ?? 0,
            })
          }
        />
      )}
    </div>
  );
};

export default ClassManagementTable;
