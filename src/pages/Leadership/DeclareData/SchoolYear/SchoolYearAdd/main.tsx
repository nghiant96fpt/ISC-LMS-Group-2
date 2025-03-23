import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import icon from './icon';
import DropdownSelection from '../../../../../components/DropdownSelection';
import Checkbox from '../../../../../components/CheckBox';
import Button from '../../../../../components/Button';
import CalendarInput from '../../../../../components/CalendarInput';
import { useForm, Controller } from 'react-hook-form';
import { FormData } from '../SchoolYearFormEdit/type';

const SchoolYearAdd: React.FC = (props) => {
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(false);
  const [semesters, setSemesters] = useState<number[]>([1]); // Default with one semester
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleCancel = () => {
    console.log('Cancel clicked');
    navigate('/leadership/declare-data/school-year');
  };

  const handleSave = () => {
    console.log('Save clicked');
  };

  // năm
  const yearOptions = Array.from({ length: 10 }, (_, i) => (new Date().getFullYear() - i).toString());

  // Function to add new semester
  const addSemester = () => {
    setSemesters([...semesters, semesters.length + 1]);
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center mb-4">Thêm niên khóa mới</h1>
      <div className="grid gap-4 grid-cols-2">
        <div className="mb-4">
          <label className="block font-semibold mb-1">Niên khóa:</label>
          <div className="flex items-center space-x-2">
            <DropdownSelection options={yearOptions} width={'144px'} />
            <span>đến</span>
            <DropdownSelection options={yearOptions} width={'144px'} />
          </div>
        </div>

        <div className="mb-2">
          <label className="flex items-center space-x-2">
            <Checkbox label="Kế thừa dữ liệu:" isChecked={isChecked} onChange={handleCheckboxChange} />
            <DropdownSelection width={'144px'} placeholder="Niên khóa" />
          </label>
          <p className="text-sm text-gray-500 mt-1 flex items-start space-x-2">
            <img src={icon.union} alt="icon" className="w-5 h-5" />
            <span className="italic">
              Dữ liệu được kế thừa bao gồm các thông tin:
              <br />- Thông tin học viên và danh sách lớp học
              <br />- Thông tin môn học
              <br />- Phân công giảng dạy
            </span>
          </p>
        </div>
      </div>

      <div className="border-t my-4"></div>

      <div className="mb-2">
        <h2 className="font-bold mb-2 text-orange-text">Cài đặt thời gian</h2>
        {semesters.map((semester, index) => (
          <div key={index} className="flex items-center space-x-2 mb-4">
            <label className="flex items-center font-semibold">
              <img src={icon.fi_minus} alt="icon" className="icon-fiminus mr-2" />
              <p className="p-0 m-0 text-sm">Tên học kì:</p>
            </label>
            <input type="text" className="semester-input" placeholder={`Học kì ${semester}`} />

            <div className="flex items-center space-x-2">
              <p className="text-sm">Từ</p>
              <Controller
                name="startDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <div className="relative inline-block">
                    <CalendarInput />
                  </div>
                )}
              />

              <p className="text-sm">đến</p>
              <Controller
                name="endDate"
                control={control}
                defaultValue={null}
                render={({ field }) => (
                  <div className="relative inline-block">
                    <CalendarInput />
                  </div>
                )}
              />
            </div>
          </div>
        ))}
      </div>

      <label className="flex items-center font-semibold">
        <img src={icon.fi_plus} alt="icon" className="icon-fiminus mr-2" />
        <button type="button" className="p-0 m-0 text-sm" onClick={addSemester}>
          Thêm học kì mới
        </button>
      </label>

      <div className="flex justify-center mt-6 space-x-3">
        <Button
          onClick={handleCancel}
          disabled={false}
          width="160px"
          height="52px"
          style={{
            backgroundColor: 'var(--background-gray)',
            border: 'var(--border-gray)',
            color: 'var(--text-white)',
          }}
        >
          Huỷ
        </Button>
        <Button
          onClick={handleSave}
          disabled={false}
          width="160px"
          height="52px"
          style={{ backgroundColor: 'var(--background-orange-1)', border: 'var(--border-orange)', color: 'var(--text-white)' }}
        >
          Lưu
        </Button>
      </div>
    </div>
  );
};

export default SchoolYearAdd;
