import { useEffect, useState } from 'react';
import { Icons } from './Icons';
import { schoolYearData, ISchoolYear } from './type';
import { DeleteConfirmation } from '../SchoolYearDelete/SchoolYearDelete';

import SchoolYearTable from './SchoolYearTable';
import Panigation from '../SchoolYearPanigation/Panigation';

const SchoolYear = () => {
  const [data, setData] = useState<ISchoolYear[]>([]);
  const [showPopup, setShowPopup] = useState(false);
  const [selectedId, setSelectedId] = useState<number | null>(null);
  const [numPage, setNumPage] = useState(4);
  const [index, setIndex] = useState(-1);
  useEffect(() => {
    setData(schoolYearData);
  }, []);

  const handleDelete = () => {
    if (selectedId !== null) {
      setData((prev) => prev.filter((item) => item.id !== selectedId));
      setShowPopup(false);
    }
  };

  const handleShowPopup = () => {
    setShowPopup(false);
  };

  return (
    <div className="px-5 bg-background-white shadow-custom rounded-[16px]">
      {/* Tiêu đề / tìm kiếm */}
      <div className="flex justify-between items-center text-black-text mb-4">
        <h2 className="text-[22px] leading-[--line-height-Mulish-3] font-[--weight-Mulish]">Niên khóa</h2>

        <div className="relative w-full max-w-sm">
          <img src={Icons.search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full  font-[--font-Source-Sans-Pro] font-[weight-Source-Sans-Pro-3] px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none  focus:border-[--border-orange]"
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

      <Panigation indexChoose={index} numPage={numPage} setNumpage={setNumPage} setIndex={setIndex} />

      {/* popup delete */}
      {showPopup && <DeleteConfirmation onDelete={handleDelete} onCancel={handleShowPopup} />}
    </div>
  );
};

export default SchoolYear;
