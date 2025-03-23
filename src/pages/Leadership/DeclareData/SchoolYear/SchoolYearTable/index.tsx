import { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { ISchoolYear } from './type';
import { DeleteConfirmation } from '../SchoolYearDelete/SchoolYearDelete';

import SchoolYearTable from './SchoolYearTable';
import Panigation from '../SchoolYearPanigation/Panigation';
import axios from 'axios';
import { Link } from 'react-router';
import { toast, ToastContainer } from 'react-toastify';

const SchoolYear = () => {
  const [originalData, setOriginalData] = useState<ISchoolYear[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [data, setData] = useState<ISchoolYear[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [numPage, setNumPage] = useState(4);
  const [index, setIndex] = useState(1); // Mặc định trang đầu tiên
  const [size, setSize] = useState(7); // Mặc định 7 phần tử mỗi trang
  const [totalItems, setTotalItems] = useState(0);

  // const handleDelete = () => {
  //   if (selectedId !== null) {
  //     setData((prev) => prev.filter((item) => item.id !== selectedId));
  //     setShowPopup(false);
  //   }
  // };
  

  const handleDeleteSuccess = () => {
    toast.success('Xóa niên khóa thành công!', {
      position: 'top-right',
      autoClose: 3000,
      theme: 'colored',
    });

    setData((prev) => prev.filter((item) => item.id !== selectedId));
    setShowPopup(false);
  };

  const handleShowPopup = () => {
    setShowPopup(false);
  };

  const fetchData = async (pageNumber = 1, pageSize = 5) => {
    try {
      const url = `https://fivefood.shop/api/academic-years?page=${pageNumber}&pageSize=${pageSize}`;
      const response = await axios.get(url);

      setData(response.data.data); // Cập nhật dữ liệu hiển thị
      setOriginalData(response.data.data); // Lưu dữ liệu gốc để tìm kiếm

      if (response.data.totalPages) {
        setNumPage(response.data.totalPages);
      }
      if (response.data.totalItems) {
        setTotalItems(response.data.totalItems);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchData(index, size);
  }, [index, size]);

  const handleSearch = (value: string) => {
    setSearchTerm(value.trim());
    if (value.trim() === '') {
      setData(originalData); 
    } else {
      const filteredData = originalData.filter((item) => item.name.toLowerCase().includes(value.toLowerCase()));
      setData(filteredData);
    }
  };


  const handleSizeChange = (newSize: number) => {
    if (newSize > 0) {
      setSize(newSize);
      setIndex(1); 
    }
  };

  return (
    <div className="py-6 px-14 bg-background-white shadow-custom rounded-[16px]">
      {/* <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      /> */}
      <div className="flex justify-end items-center mb-4">
        <Link to={'/leadership/declare-data/school-year/add-school-year'}>
          <button className="bg-orange-500 px-8 py-3 text-white rounded-md font-medium">Thêm mới</button>
        </Link>
      </div>

      {/* Tiêu đề / tìm kiếm */}
      <div className="flex justify-between items-center text-black-text mb-4">
        <h2 className="text-[22px] font-bold">Niên khóa</h2>
        <div className="relative w-full max-w-sm">
          <img src={Icons.search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none focus:border-orange-500"
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      </div>

      {/* Bảng */}
      <SchoolYearTable
        data={data}
        onDelete={(id) => {
          setSelectedId(id);
          setShowPopup(true);
        }}
      />

      {/* Phân trang */}
      <Panigation indexChoose={index} numPage={numPage} setNumpage={setNumPage} setIndex={setIndex} size={size} setSize={handleSizeChange} />

      {/* Popup delete */}
      {showPopup && selectedId !== null && (
        <DeleteConfirmation
          id={selectedId}
          onDeleteSuccess={handleDeleteSuccess} // ✅ Dùng một lần
          onCancel={handleShowPopup}
        />
      )}
    </div>
  );
};

export default SchoolYear;
