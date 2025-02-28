import { useState } from 'react';
import { DropdownOption } from '../../../../components/Dropdown/type';
import trash from '../../../../assets/icons/icon-fi_trash-2.png';
import plus from '../../../../assets/icons/icon_plus.png';
import Dropdown from '../../../../components/Dropdown';
import Button from '../../../../components/Button';
// import Tag from '../../../../components/Tag';
import './style.css';

const AllStudentProfilesHeader: React.FC = () => {
  const [selectedGradeOption, setSelectedGradeOption] = useState<DropdownOption | null>(null);
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);
  const [activeButton, setActiveButton] = useState<string>('all');

  const gradeOptions: DropdownOption[] = [
    { label: 'Khối 1', value: 'grade-1' },
    { label: 'Khối 2', value: 'grade-2' },
    { label: 'Khối 3', value: 'grade-3' },
    { label: 'Khối 4', value: 'grade-4' },
  ];

  const yearOptions: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];

  const buttons = [
    { label: 'Tất cả hồ sơ', value: 'all' },
    { label: 'Khen thưởng', value: 'reward' },
    { label: 'Kỷ luật', value: 'year' },
  ];

  return (
    <>
      <h1 className="text-3xl font-bold text-left text-black-text mb-5">Tất cả hồ sơ học viên</h1>
      <div className="flex justify-between items-center mb-6 mr-[30px]">
        <div className="flex gap-4">
          <Dropdown
            placeholder="Tất cả khối"
            size="short"
            options={gradeOptions}
            selectedOption={selectedGradeOption}
            onSelect={(option) => setSelectedGradeOption(option)}
            handleOptionClick={(option) => setSelectedGradeOption(option)}
          />
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)}
          />
          {/* Tags */}
          {/* <div className="flex gap-3">
              <Tag text="Tất cả hồ sơ" isActive={true} onClick={() => console.log('Clicked!')} />
              <Tag text="Khen thưởng" isActive={false} onClick={() => console.log('Clicked!')} />
              <Tag text="Kỷ luật" isActive={false} onClick={() => console.log('Clicked!')} />
            </div> */}
          <div className="flex gap-3 button-group">
            {buttons.map((btn) => (
              <button key={btn.value} className={`btn ${activeButton === btn.value ? 'active' : ''}`} onClick={() => setActiveButton(btn.value)}>
                {btn.label}
              </button>
            ))}
          </div>
        </div>

        <div className="flex gap-3">
          <button className="trash">
            <img src={trash} alt="trash" className="trash-icon" />
          </button>
          <button className="export-btn">Xuất file</button>
          <Button className="primary" size="big">
            <img src={plus} alt="" />
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default AllStudentProfilesHeader;
