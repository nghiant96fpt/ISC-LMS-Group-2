import React, { useState } from 'react';
import Dropdown from '../../../../components/Dropdown';
import { DropdownOption } from '../../../../components/Dropdown/type';
import CheckboxComponent from '../../../../components/CheckBox';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
const EditExamSchedule: React.FC = () => {
  const navigate = useNavigate();
  const [examTitle, setExamTitle] = useState('Thi cuối học kỳ I');
  const [duration, setDuration] = useState(180);
  const [examDate, setExamDate] = useState('2020-10-23');
  const [gradingOption, setGradingOption] = useState('all');
  const [graders, setGraders] = useState(['Nguyễn Văn D', 'Trần Thị D']);
  const [selectedTeachers, setSelectedTeachers] = useState<string[]>(['Nguyễn Văn D', 'Trần Thị D']);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setIsIndeterminate(false); // Khi click vào checkbox, bỏ trạng thái indeterminate
  };

  const [selectedSchoolYear, setSelectedSchoolYear] = useState<DropdownOption | null>(null);
  const [selectedGrade, setSelectedGrade] = useState<DropdownOption | null>(null);
  const [selectedSubject, setSelectedSubject] = useState<DropdownOption | null>(null);
  const [isChecked, setIsChecked] = useState(false);
  const [isIndeterminate, setIsIndeterminate] = useState(false);
  const [isChecked2, setIsChecked2] = useState(false);
  const [isIndeterminate2, setIsIndeterminate2] = useState(false);

  const handleSubjectChange = (option: DropdownOption) => {
    setSelectedSubject(option);
    console.log('Môn thi đã chọn:', option);
  };

  const handleCheckboxChange2 = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
    setIsIndeterminate(false); // Khi click vào checkbox, bỏ trạng thái indeterminate
  };
  const handleSchoolYearChange = (option: DropdownOption) => {
    setSelectedSchoolYear(option);
    console.log('Niên khóa đã chọn:', option);
  };

  const handleGradeChange = (option: DropdownOption) => {
    setSelectedGrade(option);
    console.log('Khối đã chọn:', option);
  };
  const handleClose = () => {
    navigate('/leadership/exams', { replace: true });
  };
  return (
    <div className="modal-overlay ">
      <div className="modal-container p-6 bg-white rounded-lg shadow-lg w-full max-w-3xl">
        <h2 className="text-center text-xl font-bold mb-4">Chỉnh sửa lịch thi</h2>

        <div className="grid grid-cols-2 gap-4">
          <div className="flex flex-row gap-x-20">
            <div className=" flex items-center gap-10">
              <label className="font-medium whitespace-nowrap">Niên khóa:</label>
              <Dropdown
                options={[
                  { value: 'option1', label: '2021-2022' },
                  { value: 'option2', label: '2023-2024' },
                  { value: 'option3', label: '2025-2026' },
                ]}
                onSelect={handleSchoolYearChange}
                selectedOption={selectedSchoolYear}
                handleOptionClick={handleSchoolYearChange}
                placeholder="Niên khóa"
                border="visible"
                borderColor="black"
                size="short"
                iconColor="#FF7506"
                status="normal"
                disabled={false}
                showArrow={true}
                backgroundColorSelected="rgb(79 164 204)"
              />
            </div>

            <div className=" flex items-center gap-6">
              <label className="font-medium">Khối:</label>
              <Dropdown
                options={[
                  { value: 'option6', label: 'Khối 9' },
                  { value: 'option4', label: 'Khối 10' },
                  { value: 'option5', label: 'Khối 11' },
                ]}
                onSelect={handleGradeChange}
                selectedOption={selectedGrade}
                handleOptionClick={handleGradeChange}
                placeholder="Khối"
                border="visible"
                borderColor="black"
                size="short"
                iconColor="#FF7506"
                status="normal"
                disabled={false}
                showArrow={true}
                backgroundColorSelected="rgb(79 164 204)"
              />
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-11">
            <label className="font-medium block mb-2">
              Lớp học <span className="text-red-500">*</span>
            </label>
            <div className="grid grid-cols-3 gap-x-4 gap-y-2">
              <label className="flex items-center gap-2 translate-y-2">
                <input type="radio" name="class" className="w-5 h-5 accent-blue-500 " />
                Tất cả lớp
              </label>
              <label className="flex items-center gap-2 translate-y-2">
                <input type="radio" name="class" className="w-5 h-5 accent-blue-500" />
                Lớp cơ bản
              </label>
              <label className="flex items-center gap-2 translate-y-2">
                <input type="radio" name="class" className="w-5 h-5 accent-blue-500 " />
                Lớp nâng cao
              </label>
              <label className="flex items-center gap-2 translate-y-2 col-span-3">
                <input type="radio" name="class" className="w-5 h-5 accent-blue-500" />
                Tùy chọn
              </label>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="flex items-center gap-x-14">
            <label className="font-medium">
              Môn thi
              <span className="text-red-500">*</span>
            </label>
            <Dropdown
              options={[
                { value: 'option7', label: 'Toán' },
                { value: 'option8', label: 'Lý' },
                { value: 'option9', label: 'Hóa' },
              ]}
              onSelect={handleSubjectChange}
              selectedOption={selectedSubject}
              handleOptionClick={handleSubjectChange}
              placeholder="Khối"
              border="visible"
              borderColor="black"
              size="medium"
              iconColor="#FF7506"
              status="normal"
              disabled={false}
              showArrow={true}
              backgroundColorSelected="rgb(79 164 204)"
            />
          </div>
        </div>

        <div className="mt-4">
          <div className="flex flex-col gap-2">
            <div className="flex items-center gap-x-10">
              <label className="font-medium whitespace-nowrap">
                Tên kỳ thi <span className="text-red-500">*</span>
              </label>
              <input type="text" className="border border-black rounded px-2 py-1 w-[410px] text-black focus:border-blue-500" />
            </div>

            <div className="flex items-center gap-10 pl-[125px]">
              <CheckboxComponent
                label="Học kỳ 1"
                isChecked={isChecked}
                isIndeterminate={isIndeterminate}
                onChange={handleCheckboxChange}
                customStyles={{
                  container: { display: 'flex', alignItems: 'center' },
                  label: { color: '#000', fontWeight: '500', fontSize: '14px' },
                }}
              />
              <CheckboxComponent
                label="Học kỳ 2"
                isChecked={isChecked2}
                isIndeterminate={isIndeterminate2}
                onChange={handleCheckboxChange2}
                customStyles={{
                  container: { display: 'flex', alignItems: 'center' },
                  label: { color: '#000', fontWeight: '500', fontSize: '14px' },
                }}
              />
            </div>
          </div>
        </div>

        <div className="mt-4 flex flex-col gap-4">
          <div className="flex items-center gap-4">
            <label className="font-medium w-[160px] whitespace-nowrap">
              Thời lượng làm bài <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2">
              <input type="number" className="border rounded px-2 py-1 w-[200px]" value={duration} />
              <span className="font-medium">Phút</span>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <label className="font-medium w-[160px] whitespace-nowrap">
              Ngày làm bài <span className="text-red-500">*</span>
            </label>
            <input type="date" className="border rounded px-2 py-1 w-[140px] accent-orange-500" />
          </div>
        </div>
        <br />
        <hr />

        <div className="mt-4">
          {/* Tiêu đề */}
          <label className="font-medium text-orange-500">Phân công chấm thi</label>

          {/* Lựa chọn phân công */}
          <div className="flex flex-col gap-2 mt-2">
            {/* Áp dụng cho tất cả lớp */}
            <div className="flex items-center gap-2">
              <input type="radio" className="w-5 h-5 accent-blue-500" checked={gradingOption === 'all'} onChange={() => setGradingOption('all')} />
              <label>Áp dụng cho tất cả lớp</label>

              {/* Input danh sách người chấm */}
              <div className="relative flex-grow border rounded px-2 py-1 flex items-center">
                <div className="flex gap-1 flex-wrap">
                  {graders.map((grader, index) => (
                    <span key={index} className="bg-blue-500 text-white px-2 py-1 rounded flex items-center gap-1">
                      {grader}
                      <button onClick={() => setGraders(graders.filter((g) => g !== grader))} className="text-white font-bold">
                        ×
                      </button>
                    </span>
                  ))}
                </div>
                {/* Icon tìm kiếm */}
                <button className="absolute right-2">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z"
                      fill="#FF7506"
                    />
                    <path
                      fill-rule="evenodd"
                      clip-rule="evenodd"
                      d="M15.9428 15.9413C16.3333 15.5508 16.9665 15.5508 17.357 15.9413L21.707 20.2913C22.0975 20.6819 22.0975 21.315 21.707 21.7055C21.3165 22.0961 20.6833 22.0961 20.2928 21.7055L15.9428 17.3555C15.5523 16.965 15.5523 16.3319 15.9428 15.9413Z"
                      fill="#FF7506"
                    />
                  </svg>
                </button>
              </div>
            </div>

            {/* Tùy chọn */}
            <div className="flex items-center gap-2">
              <input
                type="radio"
                className="w-5 h-5 accent-blue-500"
                checked={gradingOption === 'custom'}
                onChange={() => setGradingOption('custom')}
              />
              <label>Tùy chọn</label>
            </div>
          </div>
        </div>

        <div className="mt-6 flex justify-center gap-2">
          <Button className="secondary" size="big" onClick={handleClose}>
            Hủy
          </Button>
          <Button className="primary" size="big">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default EditExamSchedule;
