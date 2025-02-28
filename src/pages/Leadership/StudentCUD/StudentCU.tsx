import React, { useEffect, useRef, useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Card from '../../../components/Card';
import UserDefaultAVT from '../../../assets/images/people/leadership/user-default-avt.png';
import CameraEdit from '../../../assets/images/people/leadership/camera edit.png';
import Input from '../../../components/Input';
import CalendarInput from '../../../components/CalendarInput';
import { DropdownOption } from '../../../components/Dropdown/type';
import Dropdown from '../../../components/Dropdown';
import RightForm from './RightForm';
import LeftForm from './LeftForm';
import AddressForm from './AddressForm';
import FamilyForm from './FamilyForm';
import Button from '../../../components/Button';


const StudentCU: React.FC = () => {
  const addressList = [
    { linkName: 'Hồ sơ học viên', link: '/leadership/all-student-profiles' },
    { linkName: 'Thêm học viên', link: '/leadership/new-student' },
  ];

  const [selectedImage, setSelectedImage] = useState<string>(UserDefaultAVT);
  const cameraEditRef = useRef<HTMLInputElement>(null);

  const handleActiveCameraEdit = () => {
    if (cameraEditRef.current) {
      cameraEditRef.current.click();
    }
  };
  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setSelectedImage(imageUrl);
    }
  };

  const [gender, setGender] = useState<{ label: string; value: string } | null>(null);

  const handleSelect = (item: { label: string; value: string }) => {
    setGender(item);
  };

  const [selectedDate, setSelectedDate] = useState<Date | null>(null);

  const handleDateChange = (date: Date | null) => {
    setSelectedDate(date);
  };

  const [course, setCourse] = useState<{ label: string; value: string } | null>(null);
  const handleSelectCourse = (item: { label: string; value: string }) => {
    setCourse(item);
  };

  const grades: DropdownOption[] = [
    { label: '6', value: '6' },
    { label: '7', value: '7' },
    { label: '8', value: '8' },
    { label: '9', value: '9' },
  ];

  const classes: DropdownOption[] = [
    { label: '6A', value: '6A' },
    { label: '6B', value: '6B' },
    { label: '6C', value: '6C' },
    { label: '7A', value: '7A' },
    { label: '7B', value: '7B' },
    { label: '7C', value: '7C' },
    { label: '8A', value: '8A' },
    { label: '8B', value: '8B' },
    { label: '8C', value: '8C' },
    { label: '9A', value: '9A' },
    { label: '9B', value: '9B' },
    { label: '9C', value: '9C' },
  ];

  const [selectedGrade, setSelectedGrade] = useState<DropdownOption | null>(null);
  const [selectedClass, setSelectedClass] = useState<DropdownOption | null>(null);

  const handleGradeSelect = (option: DropdownOption) => {
    setSelectedGrade(option);
    setSelectedClass(null);
  };

  const handleClassSelect = (option: DropdownOption) => {
    setSelectedClass(option);
  };

  const filteredClasses = selectedGrade ? classes.filter((item) => item.value.startsWith(selectedGrade.value)) : [];

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckTuSinhMa = () => {
    setIsChecked(!isChecked);
  };
  const codeRef = useRef<HTMLInputElement>(null);
  const generateStudentCode = (quantity: number) => {
    const nextNumber = quantity + 1;
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    const currentYear = new Date().getFullYear();

    return `${currentYear}-HS${formattedNumber}`;
  };
  useEffect(() => {
    if (isChecked && codeRef.current) {
      let code = generateStudentCode(0);
      codeRef.current.value = code;
    } else {
      codeRef.current!.value = '';
    }
  }, [isChecked]);

  const [admissionDate, setAdmissionDate] = useState<Date | null>(null);

  const handleAdmissionDateChange = (date: Date | null) => {
    setAdmissionDate(date);
  };

  const [formally, setFormally] = useState<DropdownOption | null>(null);
  const handleSelectFormally = (option: DropdownOption) => {
    setFormally(option);
  };

  const [status, setStatus] = useState<DropdownOption | null>(null);
  const handleSelectStatus = (option: DropdownOption) => {
    setStatus(option);
  };

  return (
    <div className="pr-20 pl-10">
      <AddressList addressList={addressList} />

      <Card size="full" variant="dark-primary" className="shadow-xl mb-5 overflow-auto">
        <Card.Header className="py-2">
          <p className="px-8 text-2xl font-bold">Thông tin chung</p>
        </Card.Header>
        <Card.Body>
          <div className="px-8 flex justify-between mb-5">
            <div className="w-[19%] flex justify-center items-center relative h-max">
              <img src={selectedImage} alt="default-avt" className="w-[160px] h-[160px] object-cover rounded-full" />
              <input id="cameraEdit" type="file" accept="image/*" ref={cameraEditRef} hidden onChange={handleImageChange} />
              <img
                src={CameraEdit}
                alt="camera-edit"
                className="absolute bottom-0 size-12 translate-y-1/2 cursor-pointer"
                onClick={handleActiveCameraEdit}
              />
            </div>
            <div className="w-[77%]">
              <p className="font-bold text-[#CC5C00] mb-3">Thông tin học viên</p>
              <div className=" w-full flex justify-between">
                <LeftForm gender={gender} handleDateChange={handleDateChange} handleSelect={handleSelect} selectedDate={selectedDate} />

                <RightForm
                  course={course}
                  codeRef={codeRef}
                  filteredClasses={filteredClasses}
                  grades={grades}
                  isChecked={isChecked}
                  selectedClass={selectedClass}
                  admissionDate={admissionDate}
                  selectedGrade={selectedGrade}
                  handleCheckTuSinhMa={handleCheckTuSinhMa}
                  handleClassSelect={handleClassSelect}
                  handleAdmissionDateChange={handleAdmissionDateChange}
                  handleGradeSelect={handleGradeSelect}
                  handleSelectCourse={handleSelectCourse}
                  formally={formally}
                  handleSelectFormally={handleSelectFormally}
                  status={status}
                  handleSelectStatus={handleSelectStatus}
                />
              </div>
            </div>
          </div>
        </Card.Body>
        <hr className="h-[12px] bg-[#F2F2F2] shadow-[0px_4px_8px_0px_rgba(154,202,245,0.15)_inset]" />
        <Card.Body>
          <div className="px-8 flex justify-end">
            <div className="w-[77%]">
              <p className="font-bold text-[#CC5C00] mb-3">Địa chỉ liên hệ</p>
              <AddressForm />
            </div>
          </div>
        </Card.Body>
        <Card.Header className="py-2 mt-[30px]">
          <p className="px-8 text-2xl font-bold">Thông tin gia đình</p>
        </Card.Header>
        <Card.Body>
          <div className="px-8">
            <FamilyForm />
          </div>
        </Card.Body>
      </Card>
      <div className="w-full flex justify-center mb-5">
        <div className="w-[220px] flex justify-between">
          <Button className='secondary' children={'Hủy'} size='mini'/>
          <Button className='primary' children={'Lưu'} size='mini'/>
        </div>
      </div>
    </div>
  );
};

export default StudentCU;
