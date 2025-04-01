import React, { useEffect, useState } from 'react';
import Button from '../../../../../components/Button';
import CheckboxComponent from '../../../../../components/CheckBox';
import ClickableIcon from '../../../../../components/ClickableIcon';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import { IconInfoOutline } from '../../../../../components/Icons';
import TextComponent from '../../../../../components/Text';
import TextBlockComponent from '../../../../../components/TextBlock';
import TitleComponent from '../../../../../components/Title';
import { Link, useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import dayjs from 'dayjs';
import DateInput from '../../../../../components/Date';
import Select from 'react-select';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useCookies } from 'react-cookie';

const SchoolYearFormEdit: React.FC = () => {
  const [cookies] = useCookies(['accessToken']);
  const [formData, setFormData] = useState({
    schoolYearStart: '',
    schoolYearEnd: '',
    startDate: null as dayjs.Dayjs | null,
    endDate: null as dayjs.Dayjs | null,
    semesters: [] as Array<{ id?: string; name: string; startTime: dayjs.Dayjs | null; endTime: dayjs.Dayjs | null }>,
    schoolId: 2,
  });
  const [isChecked, setIsChecked] = useState(false);
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();

  // Configure axios with authentication
  const axiosInstance = axios.create({
    headers: {
      Authorization: `Bearer ${cookies.accessToken}`,
    },
  });

  useEffect(() => {
    if (id) {
      axiosInstance
        .get(`https://fivefood.shop/api/academic-years/${id}`)
        .then((response) => {
          // console.log('📌 Dữ liệu academic year:', response.data);
          const data = response.data.data;

          // Set academic year data
          setFormData({
            schoolYearStart: new Date(data.startTime).getFullYear().toString(),
            schoolYearEnd: new Date(data.endTime).getFullYear().toString(),
            startDate: dayjs(data.startTime),
            endDate: dayjs(data.endTime),
            schoolId: data.schoolId || 2,
            semesters: data.semesters.map((semester: any) => ({
              id: semester.id,
              name: semester.name,
              startTime: dayjs(semester.startTime),
              endTime: dayjs(semester.endTime),
            })),
          });
        })
        .catch((error) => {
          // console.error('❌ Lỗi khi lấy niên khóa:', error.response?.data || error);
          toast.error('Không thể tải thông tin niên khóa. Vui lòng thử lại sau.');
        });
    }
  }, [id]);

  const handleInputChange = (field: string, value: any) => {
    setFormData((prevData) => ({
      ...prevData,
      [field]: value,
    }));
  };

  const handleSemesterChange = (index: number, field: string, value: any) => {
    const newSemesters = [...formData.semesters];
    newSemesters[index] = { ...newSemesters[index], [field]: value };
    setFormData({ ...formData, semesters: newSemesters });
  };

  const addSemester = () => {
    setFormData({
      ...formData,
      semesters: [...formData.semesters, { name: '', startTime: null, endTime: null }],
    });
  };

  const removeSemester = (indexToRemove: number) => {
    setFormData({
      ...formData,
      semesters: formData.semesters.filter((_, index) => index !== indexToRemove),
    });
  };

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };
  const handleFormSubmit = async (event: React.FormEvent) => {
    event.preventDefault();

    try {
      const academicYearPayload = {
        id: parseInt(id || '0'),
        name: `${formData.schoolYearStart}-${formData.schoolYearEnd}`,
        startTime: formData.startDate?.format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
        endTime: formData.endDate?.format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
      };

      await axiosInstance.put(`https://fivefood.shop/api/academic-years/${id}`, [academicYearPayload]);

      const semesterUpdates = formData.semesters.map(async (semester) => {
        if (semester.id) {
          const semesterPayload = {
            name: semester.name,
            startTime: semester.startTime?.format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
            endTime: semester.endTime?.format('YYYY-MM-DDTHH:mm:ss.SSSSZ'),
            academicYearId: parseInt(id || '0'),
          };
          await axiosInstance.put(`https://fivefood.shop/api/semesters/${semester.id}`, semesterPayload);
        }
      });

      await Promise.all(semesterUpdates);

      toast.success('Cập nhật thành công! 🎉');
      setTimeout(() => {
        navigate('/leadership/declare-data/school-year');
      }, 1000);
    } catch (error: any) {
      console.error('Lỗi khi cập nhật:', error.response?.data || error);
      toast.error(`Lỗi khi cập nhật: ${error.response?.data?.message || error.message}`);
    }
  };

  const yearOptions = Array.from({ length: 10 }, (_, i) => {
    const year = 2020 + i;
    return { value: year.toString(), label: year.toString() };
  });

  return (
    <form encType="multipart/form-data" onSubmit={handleFormSubmit}>
      <div className="p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 w-full">
        <TitleComponent text="Thiết lập niên khóa" size={30} align="center" weight="bold" />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          <div className="p-6 col-span-full xl:col-auto">
            <TitleComponent text="Niên khóa" size={20} className="mb-4" />
            <div className="flex items-center gap-4">
              <div className="flex-grow-0">
                <Select
                  placeholder="Niên khóa"
                  options={yearOptions}
                  value={{ value: formData.schoolYearStart, label: formData.schoolYearStart }}
                  onChange={(selectedOption) => handleInputChange('schoolYearStart', selectedOption?.value)}
                  styles={{ control: (base) => ({ ...base, width: 200 }) }}
                />
              </div>
              <span className="mx-2">đến</span>
              <div className="flex-grow-0">
                <Select
                  placeholder="Niên khóa"
                  options={yearOptions}
                  value={{ value: formData.schoolYearEnd, label: formData.schoolYearEnd }}
                  onChange={(selectedOption) => handleInputChange('schoolYearEnd', selectedOption?.value)}
                  styles={{ control: (base) => ({ ...base, width: 200 }) }}
                />
              </div>
            </div>
          </div>
          <div className="p-6 col-span-full xl:col-auto">
            <div className="flex justify-between items-center space-x-4">
              <CheckboxComponent
                label="Kế thừa dữ liệu"
                iconName="iconCheckActiveBlueLarge"
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                className="flex-grow"
              />
              <DropdownSelectionComponent
                placeholder="Niên khóa"
                options={['2020', '2021', '2022', '2023']}
                width={200}
                onSelect={(value) => handleInputChange('schoolYearEnd', value)}
              />
            </div>
            <div className="flex mt-4 space-x-4">
              <IconInfoOutline className="flex-shrink-0" />
              <TextBlockComponent text="Dữ liệu được kế thừa bao gồm các thông tin:<br/>- Thông tin học viên và Danh sách lớp học<br/>- Thông tin môn học<br/>- Phân công giảng dạy" />
            </div>
          </div>
        </div>
        <hr className="mx-6 border-t border-gray-300" />
        <div className="dark:bg-gray-700 rounded-lg">
          <TitleComponent text="Cài đặt thời gian" size={20} align="left" weight="bold" color="#CC5C00" className="m-6" />
        </div>
        {formData.semesters.map((semester, index) => (
          <div key={index} className="my-6 mx-6 grid grid-cols-[150px,1fr,auto,auto] gap-4 items-center">
            <div>
              <ClickableIcon iconName="iconMinusActiveBlueLarge" size="sm" text="Tên học kỳ:" onClick={() => removeSemester(index)} />
            </div>
            <input
              className="px-5 py-2 shadow-md"
              type="text"
              value={semester.name}
              onChange={(e) => handleSemesterChange(index, 'name', e.target.value)}
            />
            <div className="flex items-center gap-4">
              <TextComponent text="từ" color="var(--black-text)" weight="thin" className="text-right" />
              <DateInput value={semester.startTime} onChange={(date) => handleSemesterChange(index, 'startTime', date)} />
            </div>
            <div className="flex items-center gap-4">
              <TextComponent text="đến" color="var(--black-text)" weight="thin" className="text-right" />
              <DateInput value={semester.endTime} onChange={(date) => handleSemesterChange(index, 'endTime', date)} />
            </div>
          </div>
        ))}
        <div className="my-6 mx-6 flex gap-4 items-center flex-nowrap">
          <ClickableIcon
            iconName="iconPlusBlue"
            onClick={addSemester}
            size="sm"
            text="Thêm học kỳ mới:"
            customStyles={{ text: { color: 'var(--blue-text)' } }}
          />
        </div>
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-center">
          <Button
            size="big"
            type="button"
            style={{
              backgroundColor: 'var(--background-gray)',
              color: 'black',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontFamily: 'var(--font-Mulish)',
            }}
          >
            <Link to="/leadership/declare-data/school-year/" className="no-underline text-black">
              Hủy
            </Link>
          </Button>
          <Button
            size="big"
            type="submit"
            style={{
              backgroundColor: 'var(--background-4)',
              color: 'white',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontFamily: 'var(--font-Mulish)',
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
      <ToastContainer position="top-right" autoClose={3000} />
    </form>
  );
};

export default SchoolYearFormEdit;
