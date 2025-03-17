import React, { useEffect, useRef, useState } from 'react';
import deLete from '../../../../assets/images/fi_trash-2.png';
import sortIcon from '../../../../assets/images/u_arrow up down.png';
import { subjects as initialSubjects } from './subjectListConfig';
import './style.css';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';

const SubjectPage: React.FC = () => {
  const [selectedSubjects, setSelectedSubjects] = useState<string[]>([]);
  const [subjects, setSubjects] = useState(initialSubjects);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const selectAllRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (selectAllRef.current) {
      selectAllRef.current.indeterminate = selectedSubjects.length > 0 && selectedSubjects.length < subjects.length;
    }
  }, [selectedSubjects]);

  const handleSelectAll = () => {
    if (selectedSubjects.length === subjects.length) {
      setSelectedSubjects([]);
    } else {
      setSelectedSubjects(subjects.map((subject) => subject.id));
    }
  };

  const handleSelectItem = (id: string) => {
    setSelectedSubjects((prev) => (prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]));
  };

  const handleDeleteConfirm = () => {
    setSubjects((prev) => prev.filter((subject) => !selectedSubjects.includes(subject.id)));
    setSelectedSubjects([]);
    setIsModalOpen(false);
  };
  return (
    <div className="flex justify-center items-center max-h-screen bg-background-gray-100 p-4">
      <div className="p-6 bg-background-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center w-full p-4">Danh sách môn học</h2>
          <button
            className={`delete-btn ${selectedSubjects.length > 0 ? 'active' : ''}`}
            onClick={() => setIsModalOpen(true)}
            disabled={selectedSubjects.length === 0}
          >
            <img src={deLete} alt="delete" className="w-6 h-6" />
          </button>
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="max-h-[400px] overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10 ">
                <tr className="text-while-text br-gradient-right-or">
                  <th className="p-3 w-16 text-center">
                    <input
                      ref={selectAllRef}
                      type="checkbox"
                      className="custom-checkbox"
                      checked={selectedSubjects.length === subjects.length}
                      onChange={handleSelectAll}
                    />
                  </th>
                  <th className="p-3 w-40 text-left">
                    <span className="flex items-center">
                      Mã môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                  <th className="p-3 w-64 text-left">
                    <span className="flex items-center">
                      Tên môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                </tr>
                {isModalOpen && <DeleteAcademicYearModal title="Xóa Tổ - Bộ môn"
                  description="Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác." onCancel={() => setIsModalOpen(false)} onConfirm={handleDeleteConfirm} />}
              </thead>
              <tbody className="divide-y divide-gray-300">
                {subjects.map((subject, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                    <td className="p-3 w-16 text-center">
                      <input
                        type="checkbox"
                        className="custom-checkbox"
                        checked={selectedSubjects.includes(subject.id)}
                        onChange={() => handleSelectItem(subject.id)}
                      />
                    </td>
                    <td className="p-3 w-40 text-left">{subject.id}</td>
                    <td className="p-3 w-64 text-left">{subject.name}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SubjectPage;
