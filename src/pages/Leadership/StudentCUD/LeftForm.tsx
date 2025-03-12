import React from 'react';
import Dropdown from '../../../components/Dropdown';
import Input from '../../../components/Input';
import CalendarInput from '../../../components/CalendarInput';
import { DropdownOption } from '../../../components/Dropdown/type';

export interface leftFormProps{
  gender: DropdownOption | null;
  handleSelect: (item: { label: string; value: string }) => void;
  selectedDate: Date | null;
  handleDateChange: ((date: Date | null) => void) | undefined;
}

const LeftForm: React.FC<leftFormProps> = ({
  gender,
  handleSelect,
  selectedDate,
  handleDateChange
}) => {
  return (
    <div className="w-[47%]">
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Họ và tên</p>
        <Input className="h-[40px] min-w-[300px]" placeholder="Họ và tên" />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Giới tính</p>
        <Dropdown
          size="short"
          options={[
            { label: 'Nam', value: '0' },
            { label: 'Nữ', value: '1' },
          ]}
          selectedOption={gender}
          handleOptionClick={(e) => {
            handleSelect(e);
          }}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Ngày sinh</p>
        <CalendarInput
          placeholder="Chọn ngày sinh"
          style={{ maxWidth: 300 }}
          inputStyle={{ border: '1px solid #6b7280' }}
          selectedDate={selectedDate}
          onDateChange={handleDateChange}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Nơi sinh</p>
        <Input className="h-[40px] min-w-[300px]" placeholder="Nơi sinh" />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Dân tộc</p>
        <Input className="h-[40px] min-w-[300px]" placeholder="Dân tộc" />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Tốc giáo</p>
        <Input className="h-[40px] min-w-[300px]" placeholder="Tôn giáo" />
      </div>
    </div>
  );
};

export default LeftForm;
