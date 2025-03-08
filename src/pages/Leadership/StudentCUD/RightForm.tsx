import React from 'react';
import Dropdown from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/Dropdown/type';
import Input from '../../../components/Input';
import CheckboxComponent from '../../../components/CheckBox';
import CalendarInput from '../../../components/CalendarInput';

export interface RightFormProps {
  course: DropdownOption | null;
  handleSelectCourse: (item: { label: string; value: string }) => void;
  grades: DropdownOption[];
  selectedGrade: DropdownOption | null;
  handleGradeSelect: (option: DropdownOption) => void;
  filteredClasses: DropdownOption[];
  selectedClass: DropdownOption | null;
  handleClassSelect: (option: DropdownOption) => void;
  codeRef: any;
  isChecked: boolean;
  handleCheckTuSinhMa: (event: React.ChangeEvent<HTMLInputElement>) => void;
  admissionDate: Date | null;
  handleAdmissionDateChange: ((date: Date | null) => void) | undefined;
  formally: DropdownOption | null;
  handleSelectFormally: (item: { label: string; value: string }) => void;
  status: DropdownOption | null;
  handleSelectStatus: (item: { label: string; value: string }) => void;
}

const RightForm: React.FC<RightFormProps> = ({
  course,
  handleSelectCourse,
  grades,
  selectedGrade,
  handleGradeSelect,
  filteredClasses,
  selectedClass,
  handleClassSelect,
  codeRef,
  isChecked,
  handleCheckTuSinhMa,
  admissionDate,
  handleAdmissionDateChange,
  formally,
  handleSelectFormally,
  status,
  handleSelectStatus
}) => {
  return (
    <div className="w-[47%]">
      <div className="flex items-center mb-2">
        <p className="w-[115px]">Niên khóa</p>
        <Dropdown
          size="short"
          options={[
            { label: '2021-2023', value: '2021-2023' },
            { label: '2023-2025', value: '2023-2025' },
          ]}
          selectedOption={course}
          handleOptionClick={(e) => {
            handleSelectCourse(e);
          }}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Khối</p>
        <Dropdown size="short" options={grades} selectedOption={selectedGrade} handleOptionClick={handleGradeSelect} placeholder="Chọn khối" />
        <div className="ms-2">
          <Dropdown
            size="short"
            options={filteredClasses}
            selectedOption={selectedClass}
            handleOptionClick={handleClassSelect}
            placeholder="Chọn lớp"
            disabled={!selectedGrade}
          />
        </div>
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Mã học viên</p>
        <div className="flex items-center">
          <Input ref={codeRef} className="h-[40px] me-2" size="sm" placeholder="Mã học viên" />
          <div className="ms-2">
            <CheckboxComponent
              isChecked={isChecked}
              onChange={handleCheckTuSinhMa}
              label="Tự động sinh mã"
              customStyles={{ label: { fontSize: 16 } }}
            />
          </div>
        </div>
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Ngày nhập học</p>
        <CalendarInput
          placeholder="Chọn ngày sinh"
          style={{ maxWidth: 300 }}
          inputStyle={{ border: '1px solid #6b7280' }}
          selectedDate={admissionDate}
          onDateChange={handleAdmissionDateChange}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Hình thức</p>
        <Dropdown
          size="short"
          options={[
            { label: 'Trúng tuyển', value: '1' },
          ]}
          selectedOption={formally}
          handleOptionClick={(e) => {
            handleSelectFormally(e);
          }}
        />
      </div>
      <div className="flex items-center mb-2">
        <p className="w-[118px]">Trạng thái</p>
        <Dropdown
          size="short"
          options={[
            { label: 'Đang theo học', value: '0' },
            { label: 'Đã chuyển lớp', value: '1' },
            { label: 'Đã chuyển trường', value: '2' },
            { label: 'Đã thôi học', value: '3' },
          ]}
          selectedOption={status}
          handleOptionClick={(e) => {
            handleSelectStatus(e);
          }}
        />
      </div>
    </div>
  );
};

export default RightForm;
