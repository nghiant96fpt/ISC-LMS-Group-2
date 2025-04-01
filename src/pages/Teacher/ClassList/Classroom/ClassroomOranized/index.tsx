import React, { useState, useEffect } from 'react';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import SearchInputProps from '../../../../../components/SearchInput';
import Button from '../../../../../components/Button';
import icon from './icon';


interface TeachingAssignment {
  user: {
    code: string;
    fullName: string;
  };
  class: {
    name: string;
  };
  subject: {
    name: string;
  };
  semester: {
    name: string;
  };
  startDate: string;
  endDate: string;
  active: boolean;
}

// Define props for SearchInput component
interface SearchInputPropsType {
  placeholder: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSearch: () => Promise<void>;
}

const TeachingAssignments = () => {
  const [teachingAssignments, setTeachingAssignments] = useState<TeachingAssignment[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [itemsPerPage, setItemsPerPage] = useState<number>(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [totalPages, setTotalPages] = useState<number>(1);
  const [sortColumn, setSortColumn] = useState<string>('Id');
  const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc');
  const [searchTerm, setSearchTerm] = useState<string>('');

  const subjectGroupOptions = ['Tất cả', 'Khoa học tự nhiên', 'Khoa học xã hội', 'Nghệ thuật', 'Thể dục thể thao', 'Ngoại ngữ', 'Tin học'];
  const statusOptions = ['Tất cả', 'Đang hoạt động', 'Không hoạt động'];

  useEffect(() => {
    fetchTeachingAssignments();
  }, [currentPage, itemsPerPage, sortColumn, sortOrder, searchTerm]);

  const fetchTeachingAssignments = async () => {
    setLoading(true);
    try {
      const response = await fetch(
        `https://fivefood.shop/api/teaching-assignments/class-not-expired?page=${currentPage}&pageSize=${itemsPerPage}&sortColumn=${sortColumn}&sortOrder=${sortOrder}${
          searchTerm ? `&search=${searchTerm}` : ''
        }`,
      );

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      setTeachingAssignments(data.data || []);
      setTotalPages(data.totalPages || 1);
      setLoading(false);
    } catch (error: unknown) {
      setError(error instanceof Error ? error.message : 'Unknown error occurred');
      setLoading(false);
    }
  };

  const handleSort = (column: string) => {
    if (sortColumn === column) {
      setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc');
    } else {
      setSortColumn(column);
      setSortOrder('asc');
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('vi-VN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const getTimeRange = (startDate: string, endDate: string) => {
    return `${formatDate(startDate)} - ${formatDate(endDate)}`;
  };

  const renderPagination = () => {
    const pages = [];
    const maxVisiblePages = 5;

    let startPage = Math.max(1, currentPage - Math.floor(maxVisiblePages / 2));
    let endPage = Math.min(totalPages, startPage + maxVisiblePages - 1);

    if (endPage - startPage + 1 < maxVisiblePages) {
      startPage = Math.max(1, endPage - maxVisiblePages + 1);
    }

    for (let i = startPage; i <= endPage; i++) {
      pages.push(
        <button
          key={i}
          className={`${
            currentPage === i
              ? 'w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium'
              : 'text-black-text'
          }`}
          onClick={() => setCurrentPage(i)}
        >
          {i}
        </button>,
      );
    }

    return (
      <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm">
        <button onClick={() => setCurrentPage(Math.max(1, currentPage - 1))} disabled={currentPage === 1}>
          <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
        </button>

        {startPage > 1 && (
          <>
            <button onClick={() => setCurrentPage(1)}>1</button>
            {startPage > 2 && <span className="text-black">...</span>}
          </>
        )}

        {pages}

        {endPage < totalPages && (
          <>
            {endPage < totalPages - 1 && <span className="text-black">...</span>}
            <button onClick={() => setCurrentPage(totalPages)}>{totalPages}</button>
          </>
        )}

        <button onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))} disabled={currentPage === totalPages}>
          <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
        </button>
      </div>
    );
  };

  return (
    <div className="flex flex-col h-full w-full">
      <div className="flex items-center justify-between mb-3 px-2 md:px-10 w-full">
        <div className="flex space-x-8">
          <div>
            <div className="text-lg font-bold">Nhóm môn học</div>
            <DropdownSelectionComponent width={'12rem'} placeholder="Chọn nhóm môn..." options={subjectGroupOptions} />
          </div>
          <div>
            <div className="text-lg font-bold">Trạng thái</div>
            <DropdownSelectionComponent width={'12rem'} placeholder="Chọn trạng thái..." options={statusOptions} />
          </div>
        </div>

        <SearchInputProps placeholder="Tìm kiếm..."  onSearch={fetchTeachingAssignments} />
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
        {loading ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-background-orange-1"></div>
          </div>
        ) : error ? (
          <div className="text-red-500 text-center py-4">Lỗi: {error}. Vui lòng thử lại sau.</div>
        ) : (
          <table className="table-fixed w-full border-collapse overflow-hidden rounded-t-lg">
            <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
              <tr>
                <th className="py-3 px-2 md:px-4 text-left">Mã người dùng</th>
                <th className="py-3 px-2 md:px-4 text-left">Tên giáo viên</th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Lớp</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('class.name')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Môn học</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('subject.name')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">
                  <div className="flex items-center gap-2">
                    <span>Thời gian</span>
                    <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 cursor-pointer" onClick={() => handleSort('startDate')} />
                  </div>
                </th>
                <th className="py-3 px-2 md:px-4 text-left">Học kỳ</th>
                <th className="py-3 px-2 md:px-4 text-left">Trạng thái</th>
                <th className="py-3 px-2 md:px-4 text-right"></th>
              </tr>
            </thead>
            <tbody>
              {teachingAssignments.map((item, index) => (
                <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                  <td className="py-3 px-2 md:px-4">{item.user.code}</td>
                  <td className="py-3 px-2 md:px-4">{item.user.fullName}</td>
                  <td className="py-3 px-2 md:px-4">{item.class.name}</td>
                  <td className="py-3 px-2 md:px-4">{item.subject.name}</td>
                  <td className="py-3 px-2 md:px-4">{getTimeRange(item.startDate, item.endDate)}</td>
                  <td className="py-3 px-2 md:px-4">{item.semester.name}</td>
                  <td className="py-3 px-2 md:px-4 text-left">
                    <Button children={item.active ? 'Bắt đầu' : 'Bắt đầu'} size="mini" className={item.active ? 'primary' : 'secondary'} />
                  </td>
                  <td className="py-3 px-2 md:px-4 text-center">
                    <img src={icon.infoOutline} alt="Chi tiết" className="w-5 h-5 md:w-6 md:h-6 object-contain cursor-pointer" />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text italic text-sm gap-2">
        <div className="flex items-center space-x-2">
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
            className="w-12 h-7 border border-border-orange rounded-md text-center focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        {renderPagination()}
      </div>
    </div>
  );
};

export default TeachingAssignments;
