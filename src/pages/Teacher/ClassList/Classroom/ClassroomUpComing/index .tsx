import React, { useState, useEffect } from 'react';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import SearchInputProps from '../../../../../components/SearchInput';
import icon from './icon';

interface User {
  id: number;
  code: string;
  fullName: string;
}

interface Class {
  id: number;
  code: string;
  name: string;
}

interface Subject {
  id: number;
  name: string;
}

interface SubjectGroup {
  id: number;
  name: string;
  teacherId: number;
  teacher: any;
}

interface Topics {
  id: number;
  name: string;
}

interface Session {
  id: number;
  name: string;
}

interface AcademicYear {
  id: number;
  name: string | null;
  startTime: string;
  endTime: string;
  semesters: any;
}

interface Semester {
  id: number;
  name: string;
  academicYear: AcademicYear;
}

interface TeachingAssignment {
  id: number;
  startDate: string;
  endDate: string;
  description: string;
  active: boolean;
  user: User;
  class: Class;
  subject: Subject;
  subjectGroup: SubjectGroup;
  topics: Topics;
  sessions: Session[];
  semester: Semester;
}

interface ApiResponse {
  code: number;
  message: string;
  data: TeachingAssignment[];
  page: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}

const ClassroomExpired: React.FC = () => {
  const nestOptions = ['Tổ 1', 'Tổ 2', 'Tổ 3'];
  const subjectOptions = ['Tiếng Anh', 'Toán', 'Vật lý', 'Hóa học', 'Sinh học'];

  const [itemsPerPage, setItemsPerPage] = useState(10);
  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [currentPage, itemsPerPage]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fivefood.shop/api/teaching-assignments/class-expired?page=${currentPage}&pageSize=${itemsPerPage}&sortColumn=Id&sortOrder=asc`,
      );

      if (!response.ok) {
        throw new Error('Failed to fetch data');
      }

      const data: ApiResponse = await response.json();

      if (data.code === 0 && data.message === 'Success') {
        setTeachingAssignments(data.data);
        setTotalPages(data.totalPages);
      } else {
        throw new Error(data.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN');
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };

  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };

  const renderPaginationButtons = () => {
    //
    const pageButtons: JSX.Element[] = [];

    // Calculate display range
    let startPage = 1;
    let endPage = totalPages;

    if (totalPages > 5) {
      if (currentPage <= 3) {
        endPage = 5;
      } else if (currentPage >= totalPages - 2) {
        startPage = totalPages - 4;
      } else {
        startPage = currentPage - 2;
        endPage = currentPage + 2;
      }
    }

    // Add page buttons
    for (let i = startPage; i <= endPage; i++) {
      pageButtons.push(
        <button
          key={i}
          onClick={() => setCurrentPage(i)}
          className={
            currentPage === i
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }
        >
          {i}
        </button>,
      );
    }

    //
    if (totalPages > 5 && endPage < totalPages) {
      pageButtons.push(
        <button key="ellipsis" className="text-black">
          ...
        </button>,
      );
      pageButtons.push(
        <button
          key={totalPages}
          onClick={() => setCurrentPage(totalPages)}
          className={
            currentPage === totalPages
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }
        >
          {totalPages}
        </button>,
      );
    }

    return pageButtons;
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-3 px-2 md:px-10 w-full">
        <div className="flex space-x-8">
          <div>
            <div className="text-lg font-bold">Chọn tổ</div>
            <DropdownSelectionComponent width={'12rem'} placeholder="Chọn tổ..." options={nestOptions} />
          </div>
          <div>
            <div className="text-lg font-bold">Chọn bộ môn</div>
            <DropdownSelectionComponent width={'12rem'} placeholder="Chọn bộ môn..." options={subjectOptions} />
          </div>
        </div>
        <SearchInputProps placeholder="Tìm kiếm theo topic..." />
      </div>

      {/* Bảng dữ liệu */}
      <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
        {loading ? (
          <div className="text-center py-4">Đang tải dữ liệu...</div>
        ) : error ? (
          <div className="text-center py-4 text-red-500">{error}</div>
        ) : (
          <table className="table-fixed w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Mã lớp</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Tên lớp</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Môn học</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Thời gian</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Giảng viên</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2 font-sans">
                    <span>Chủ đề</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-center">
                  <div className="flex items-center gap-2 font-sans justify-center">
                    <span>Trạng thái</span>
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-center"></th>
              </tr>
            </thead>
            <tbody>
              {teachingAssignments.map((item, index) => (
                <tr key={item.id} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                  <td className="py-3 px-2 md:px-4">{item.class.code}</td>
                  <td className="py-3 px-2 md:px-4">{item.class.name}</td>
                  <td className="py-3 px-2 md:px-4">{item.subject.name}</td>
                  <td className="py-3 px-2 md:px-4">
                    {formatDate(item.startDate)} - {formatDate(item.endDate)}
                  </td>
                  <td className="py-3 px-2 md:px-4">{item.user.fullName}</td>
                  <td className="py-3 px-2 md:px-4">{item.topics.name}</td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <span className={`px-2 py-1 rounded-full text-xs ${item.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {item.active ? 'Đang hoạt động' : 'Không hoạt động'}
                    </span>
                  </td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <img src={icon.infoOutline} alt="Info" className="w-5 h-5 md:w-6 md:h-6 object-contain cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      {/* Thanh phân trang */}
      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
        <div className="flex items-center space-x-2 font-sans">
          <span>Hiển thị</span>
          <input
            type="number"
            value={itemsPerPage}
            onChange={(e) => {
              const value = parseInt(e.target.value);
              if (value > 0) {
                setItemsPerPage(value);
                setCurrentPage(1);
              }
            }}
            className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
          <button onClick={handlePreviousPage} disabled={currentPage === 1}>
            <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
          </button>

          {renderPaginationButtons()}

          <button onClick={handleNextPage} disabled={currentPage === totalPages}>
            <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ClassroomExpired;
