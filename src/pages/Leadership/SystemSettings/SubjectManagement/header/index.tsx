import Dropdown from '../../../../../components/Dropdown';
import { DropdownOption } from '../../../../../components/Dropdown/type';
import Button from '../../../../../components/Button';
import plus from '../../../../../assets/icons/Plus.jpg';
import Breadcrumb from '../../../../../components/AddressUrlStack/Index';
import { useState } from 'react';
import './style.css';

const ClassManagementHeader: React.FC = () => {
  const [selectedYearOption, setSelectedYearOption] = useState<DropdownOption | null>(null);

  const yearOptions: DropdownOption[] = [
    { label: '2023-2024', value: '2023-2024' },
    { label: '2024-2025', value: '2024-2025' },
  ];

  const addresses = [
    { linkName: 'Cài đặt hệ thống', link: '/' },
    { linkName: 'Thiết lập môn học', link: '/' },
  ];

  return (
    <>
      <div className="breadcrum ml-5">
        <Breadcrumb addressList={addresses} type={true} />
      </div>
      <div className="flex justify-between items-center pt-6 pl-3 mb-6 mr-[65px]">
        {/* Dropdown */}
        <div className="dropdown">
          <Dropdown
            placeholder="Niên khóa"
            size="short"
            options={yearOptions}
            selectedOption={selectedYearOption}
            onSelect={(option) => setSelectedYearOption(option)}
            handleOptionClick={(option) => setSelectedYearOption(option)}
          />
        </div>

        <div className="flex justify-end">
          <Button className="primary" size="big">
            <img src={plus} alt="" />
            Thêm mới
          </Button>
        </div>
      </div>
    </>
  );
};

export default ClassManagementHeader;
