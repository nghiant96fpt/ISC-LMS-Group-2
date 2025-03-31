import React, { useEffect, useRef, useState } from 'react';
import AddressList from '../../../components/AddressUrlStack/Index';
import Card from '../../../components/Card';
import UserDefaultAVT from '../../../assets/images/people/leadership/user-default-avt.png';
import CameraEdit from '../../../assets/images/people/leadership/camera edit.png';
import { DropdownOption } from '../../../components/Dropdown/type';
import Button from '../../../components/Button';
import LeftForm from './LeftForm';
import RightForm from './RightForm';
import AddressForm from './AddressForm';
import FamilyForm from './FamilyForm';
import { useForm } from 'react-hook-form';
import './styles.css';
import createAxiosInstance from '../../../utils/axiosInstance';
import Loading from '../../../components/Loading';
import { toast } from 'react-toastify';
import { formatDate } from '../../../utils/formatDate';

const StudentCU = () => {
  const [loading, setLoading] = useState(false);

  type formType = {
    fullname: string;
    gender: DropdownOption | null;
    birthday: Date | null;
    birthPlace: string;
    folk: string;
    religion: string;

    academicYear: DropdownOption | null;
    grade: DropdownOption | null;
    class: DropdownOption | null;
    code: string;
    enrollmentDate: Date | null;
    status: DropdownOption | null;
    entry: DropdownOption | null;

    birthdayString: string;
  };
  const {
    register,
    formState: { errors },
    watch,
    setValue,
    trigger,
    getValues,
    setError,
    clearErrors,
  } = useForm<formType>({
    defaultValues: {
      fullname: '',
      gender: null,
      birthday: null,
      birthPlace: '',
      folk: '',
      religion: '',
      academicYear: null,
      grade: null,
      class: null,
      birthdayString: '',
      code: '',
      enrollmentDate: null,
      status: null,
      entry: null,
    },
  });

  const validTrigger = async () => {
    return await trigger([
      'fullname',
      'birthday',
      'gender',
      'birthPlace',
      'folk',
      'religion',
      'academicYear',
      'grade',
      'class',
      'code',
      'enrollmentDate',
      'status',
      'entry'
    ]);
  };

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

  const axiosTrue = createAxiosInstance(true);

  const [courses, setCourses] = useState<DropdownOption[]>([]);
  const [grades, setGrades] = useState<DropdownOption[]>([]);
  const [classes, setClasses] = useState<DropdownOption[]>([]);

  // Niên khóa
  const handleGetAcademicYears = async () => {
    const response = await axiosTrue.get(`api/academic-years?sortColumn=id`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id.toString(),
    }));
    setCourses(data);
  };

  // Khối & lớp
  const handleGetGrades = async () => {
    const response = await axiosTrue.get(`api/grade-levels?page=1&pageSize=10&sortColumn=Id&sortOrder=asc`);
    const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
      label: item?.name,
      value: item?.id,
    }));
    setGrades(data);
  };
  const handleGetClasses = async () => {
    const isValid = await trigger('grade');
    if (isValid) {
      const selectedGradeValue = getValues('grade')?.value;
      const response = await axiosTrue.get(`api/class/by-grade?gradeLevelId=${selectedGradeValue}&sortColumn=id&sortOrder=asc`);
      const data = response?.data?.data?.map((item: { id: number; name: string }) => ({
        label: item?.name,
        value: item?.id,
      }));
      setClasses(data);
    }
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        await Promise.all([handleGetAcademicYears(), handleGetGrades()]);
      } catch (error) {
        console.log(error);
        toast.error('Có lỗi khi lấy dữ liệu!');
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const selectedGrade = getValues('grade');
  useEffect(() => {
    if (selectedGrade) {
      handleGetClasses();
    }
  }, [selectedGrade]);

  const [isChecked, setIsChecked] = useState(false);
  const handleCheckTuSinhMa = () => {
    console.log('isChecked');

    setIsChecked(!isChecked);
  };

  const generateStudentCode = (quantity: number) => {
    const nextNumber = quantity + 1;
    const formattedNumber = nextNumber.toString().padStart(4, '0');
    const currentYear = new Date().getFullYear();

    return `${currentYear}-HS${formattedNumber}`;
  };

  useEffect(() => {
    if (isChecked) {
      let code = generateStudentCode(0);
      setValue('code', code);
      clearErrors('code');
    } else {
      setValue('code', '');
    }
  }, [isChecked]);

  const handleCreate = async () => {
    const isValid = await validTrigger();
    if (isValid) {
      const date = getValues('birthday');
      const formattedDate = formatDate(date as Date);
      setValue('birthdayString', formattedDate);
      console.log(getValues());
    }
  };

  return (
    <div className="pr-20 pl-10 content">
      <Loading isLoading={loading} />
      <AddressList addressList={addressList} />

      <Card size="full" variant="dark-primary" className="shadow-xl mb-5 overflow-auto">
        <Card.Header className="py-2">
          <p className="px-8 text-2xl font-bold text-white pb-0">Thông tin chung</p>
        </Card.Header>
        <Card.Body>
          <div className="px-8 flex justify-between mb-5">
            <div className="w-[15%] flex justify-center items-center relative h-max" onClick={handleActiveCameraEdit}>
              <img src={selectedImage} alt="default-avt" className="w-[160px] h-[160px] object-cover rounded-full" />
              <input id="cameraEdit" type="file" accept="image/*" ref={cameraEditRef} hidden onChange={handleImageChange} />
              <img
                src={CameraEdit}
                alt="camera-edit"
                className="absolute bottom-0 size-12 translate-y-1/2 cursor-pointer"
              />
            </div>
            <div className="w-[81%]">
              <p className="font-bold text-[#CC5C00] mb-3">Thông tin học viên</p>
              <div className=" w-full flex justify-between">
                <LeftForm register={register} errors={errors} watch={watch} setValue={setValue} setError={setError} clearError={clearErrors} />

                <RightForm
                  isChecked={isChecked}
                  handleCheckTuSinhMa={handleCheckTuSinhMa}

                  register={register}
                  errors={errors}
                  watch={watch}
                  setValue={setValue}
                  setError={setError}
                  clearError={clearErrors}
                  courses={courses}
                  filteredClasses={classes}
                  grades={grades}
                  selectedGrade={selectedGrade}
                />
              </div>
            </div>
          </div>
        </Card.Body>
        <hr className="h-[12px] bg-[#F2F2F2] shadow-[0px_4px_8px_0px_rgba(154,202,245,0.15)_inset]" />
        <Card.Body>
          <div className="px-8 flex justify-end">
            <div className="w-[81%]">
              <p className="font-bold text-[#CC5C00] mb-3">Địa chỉ liên hệ</p>
              <AddressForm />
            </div>
          </div>
        </Card.Body>
        <Card.Header className="py-2 mt-[30px]">
          <p className="px-8 text-2xl font-bold text-white pb-0">Thông tin gia đình</p>
        </Card.Header>
        <Card.Body>
          <div className="px-8">
            <FamilyForm />
          </div>
        </Card.Body>
      </Card>
      <div className="w-full flex justify-center mb-5">
        <div className="w-[220px] flex justify-between">
          <Button className="secondary" children={'Hủy'} size="mini" />
          <Button className="primary" children={'Lưu'} size="mini" onClick={handleCreate} />
        </div>
      </div>
    </div>
  );
};

export default StudentCU;
