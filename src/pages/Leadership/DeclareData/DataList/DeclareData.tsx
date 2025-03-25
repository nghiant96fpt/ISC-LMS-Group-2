import React, { useCallback, useEffect, useState } from 'react';
import { subjectGroups as initialSubjectGroups } from './data';
import './style.css';
import { Link } from 'react-router';
import { SubjectGroup } from './type';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';
import SearchInput from '../../../../components/SearchTable';
import PaginationControls from '../../../../components/Pagination';
import { useDispatch, useSelector } from 'react-redux';
import { RootState, AppDispatch } from '../../../../redux/store';
import { fetchTeacherList } from '../../../../redux/reducers/Leadership/DeclareData/Department/teacherSlice';
import { deleteTeacher } from '../../../../redux/reducers/Leadership/DeclareData/Department/teacherThunks';
const edit = require('../../../../assets/icons/fi_edit.png');
const list = require('../../../../assets/icons/fi_list.png');
const trash = require('../../../../assets/icons/fi_trash-2.png');
const arrow = require('../../../../assets/icons/u_arrow up down.png');

const DeclareData: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 100; // Giả định tổng số trang
  const [subjectGroups, setSubjectGroups] = useState<SubjectGroup[]>(initialSubjectGroups);
  const [selectedGroup, setSelectedGroup] = useState<SubjectGroup | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchValue, setSearchValue] = useState('');
  const dispatch = useDispatch<AppDispatch>();
  const { teachers, loading, error } = useSelector((state: RootState) => state.teacher);
  useEffect(() => {
    dispatch(fetchTeacherList({ page: 1, pageSize: 10 }));
  }, [dispatch]);
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
  // const handleDeleteClick = useCallback((group: SubjectGroup) => {
  //   setSelectedGroup(group);
  //   setIsDeleteModalOpen(true);
  // }, []);
  const handleDelete = (group: SubjectGroup) => {
    setSelectedGroup(group); // ✅ Lưu cả đối tượng
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = useCallback(() => {
    if (selectedGroup?.id !== undefined) {
      dispatch(deleteTeacher(selectedGroup.id as number));
      setSubjectGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
    }
    setIsDeleteModalOpen(false);
  }, [selectedGroup, dispatch]);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };
  return (
    <div className="flex flex-col min-h-[752px] max-w-full bg-background-white shadow-lg rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-sans font-bold">Tổ - Bộ môn</h2>
        <SearchInput value={searchValue} onChange={handleSearchChange} placeholder="Nhập từ khóa..." />
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10">
        <table className="w-full border-collapse overflow-hidden rounded-t-lg">
          <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
            <tr>
              <th className="py-3 px-2 md:px-4 text-left">
                <div className="flex items-center gap-2 font-sans">
                  <span>Tên tổ - bộ môn</span>
                  <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                </div>
              </th>
              <th className="py-3 px-2 md:px-4 text-left">
                <div className="flex items-center gap-2 font-sans">
                  <span>Trưởng bộ môn</span>
                  <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                </div>
              </th>
              <th className="py-3 px-2 md:px-4 text-right"></th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher: any, index) => (
              <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{teacher.fullName}</td>
                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{teacher.subjectGroupName}</td>
                <td className="py-3 px-2 md:px-4 text-center">
                  <div className="flex justify-center space-x-2 items-center">
                    <Link to="subject-list">
                      <button className="w-8 h-8 flex items-center justify-center">
                        <img src={list} alt="List" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                      </button>
                    </Link>
                    <button className="w-8 h-8 flex items-center justify-center">
                      <Link to="edit">
                        <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                      </Link>
                    </button>
                    <button onClick={handleDelete.bind(null, teacher)} className="w-8 h-8 flex items-center justify-center">
                      <img src={trash} alt="Trash" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        {isDeleteModalOpen && (
          <DeleteAcademicYearModal
            title="Xóa Tổ - Bộ môn"
            description="Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
            onCancel={() => setIsDeleteModalOpen(false)}
            onConfirm={confirmDelete}
          />
        )}
      </div>

      {/* Thanh phân trang */}

      <PaginationControls
        itemsPerPage={itemsPerPage}
        setItemsPerPage={setItemsPerPage}
        onPageChange={handlePageChange}
        currentPage={currentPage}
        totalPages={totalPages}
      />
    </div>
  );
};

export default DeclareData;
