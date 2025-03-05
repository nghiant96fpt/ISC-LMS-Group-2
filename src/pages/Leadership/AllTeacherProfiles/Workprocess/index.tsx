import { useCallback, useState } from 'react';
import { WorkHistory } from './Types';
import { workHistoryData as initialworkHistoryData } from './data';
import arrow_right from '../../../../assets/icons/icon-arrow-right.png';
import arrow_down from '../../../../assets/icons/caret-down_white.png';
import edit from '../../../../assets/icons/orange_edit_write_outline.png';
import fi_trash from '../../../../assets/icons/icon-fi_trash-2.png';
import fi_search from '../../../../assets/icons/fi_search.png';
import fi_plus from '../../../../assets/icons/fi_plus.png';
import TrainingList from '../../TrainingInfo/TrainingList';
import fiarrowupdown from '../../../../assets/icons/u_arrow up down.png';
import Button from '../../../../components/Button';
import SearchInput from '../../../../components/SearchTable';
import DeleteAcademicYearModal from '../../../../components/DeleteConfirmation';
import { Link } from 'react-router-dom';
const Workprocess = () => {
  const [openSection, setOpenSection] = useState<string | null>('work');
  const [subjectGroups, setSubjectGroups] = useState<WorkHistory[]>(initialworkHistoryData);
  const [selectedGroup, setSelectedGroup] = useState<WorkHistory | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [searchText, setSearchText] = useState<string>('');
  const toggleSection = (section: string) => {
    setOpenSection((prevSection) => (prevSection === section ? null : section));
  };

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchText(event.target.value);
  };

  const handleDeleteClick = useCallback((group: WorkHistory) => {
    setSelectedGroup(group);
    setIsDeleteModalOpen(true);
  }, []);
  const confirmDelete = useCallback(() => {
    if (selectedGroup) {
      setSubjectGroups((prev) => prev.filter((g) => g.id !== selectedGroup.id));
    }
    setIsDeleteModalOpen(false);
  }, [selectedGroup]);
  return (
    <div className="overflow-x-auto flex-grow px-2 md:px-10">
      <div className="  border rounded-lg shadow-md overflow-hidden">
        <button
          onClick={toggleSection.bind(this, 'work')}
          className={` w-full h-[58px] text-left px-4 py-2 flex items-center justify-between transition-colors 
        ${openSection === 'work' ? 'bg-orange-500 text-white' : 'bg-white text-black-text border border-slate-100'}`}
        >
          <span className="flex items-center text-lg gap-2">
            {openSection === 'work' ? (
              <img src={arrow_down} alt="arrow down" className="w-5 h-3 transition-transform" />
            ) : (
              <img src={arrow_right} alt="arrow right" className="w-3 h-5 transition-transform" />
            )}
            Quá trình công tác
          </span>
        </button>

        {openSection === 'work' && (
          <div className="p-4 w-[95%] mx-auto  ">
            <div className="mb-2 flex flex-wrap items-center justify-between gap-4">
              <div className="w-[438px] h-10 relative">
                <img src={fi_search} alt="Search" className="absolute left-4 top-1/2 w-5 h-5 transform -translate-y-1/2" />

                <SearchInput placeholder="Tìm kiếm" value={searchText} onChange={handleSearchChange} />
              </div>
              <Link to="/leadership/all-teacher-profiles/addworkprocess">
                <Button size="mini" className="primary">
                  <img src={fi_plus} alt="Add Icon" />
                  Thêm
                </Button>
              </Link>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full border-collapse border rounded-lg text-center overflow-hidden">
                <thead>
                  <tr className="bg-gray-800 text-white">
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Cơ quan/ Đơn vị
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Tổ/ Bộ môn
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Chức vụ
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Ngày bắt đầu
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2 text-center">
                      <div className="flex items-center justify-center gap-1">
                        Ngày kết thúc
                        <img src={fiarrowupdown} alt="" className="w-6 h-6" />
                      </div>
                    </th>
                    <th className="p-2"></th>
                  </tr>
                </thead>

                <tbody>
                  {subjectGroups
                    .filter((row) => row.unit.toLowerCase().includes(searchText.toLowerCase()))
                    .map((row, index) => (
                      <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                        <td className="p-2 ">{row.unit}</td>
                        <td className="p-2 ">{row.dept}</td>
                        <td className="p-2 ">{row.role}</td>
                        <td className="p-2 ">{row.start}</td>
                        <td className="p-2 ">{row.end}</td>
                        <td className="p-2 text-center whitespace-nowrap space-x-4">
                          {' '}
                          <Link to="/leadership/all-teacher-profiles/addworkprocess">
                            <button>
                              <img src={edit} alt="edit" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                            </button>
                          </Link>
                          <button onClick={handleDeleteClick.bind(null, row)}>
                            <img src={fi_trash} alt="delete" className="h-5 w-5 sm:h-6 sm:w-6 md:h-8 md:w-8" />
                          </button>
                        </td>
                      </tr>
                    ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
      <div className="pt-20">
        <TrainingList onClick={toggleSection.bind(this, 'education')} />
      </div>
      {isDeleteModalOpen && (
        <DeleteAcademicYearModal
          title="Xóa Quá Trình"
          description="Xác nhận muốn xoá Tổ - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
          onCancel={() => setIsDeleteModalOpen(false)}
          onConfirm={confirmDelete}
        />
      )}
    </div>
  );
};

export default Workprocess;
