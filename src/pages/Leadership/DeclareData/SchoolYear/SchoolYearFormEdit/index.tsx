import { useState } from 'react';
import Button from '../../../../../components/Button';
import CalendarInput from '../../../../../components/CalendarInput';

import CheckboxComponent from '../../../../../components/CheckBox';
import ClickableIcon from '../../../../../components/ClickableIcon';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import { IconInfoOutline } from '../../../../../components/Icons';
import TextComponent from '../../../../../components/Text';

import TextBlockComponent from '../../../../../components/TextBlock';
import TitleComponent from '../../../../../components/Title';
import { useForm, Controller } from 'react-hook-form';
import { FormData } from './type';

const SchoolYearFormEdit: React.FC = (FormData) => {
  const {
    control,
    setValue,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FormData>();
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setIsChecked(event.target.checked);
  };

  const handleFormSubmit = (data: FormData) => {
    console.log('Form submitted', data);
  };

  const handleDateChange = (date: Date | null, fieldName: keyof FormData) => {
    setValue(fieldName, date);
  };

  function handleClick(): void {
    throw new Error('Function not implemented.');
  }

  return (
    <form encType="multipart/form-data" onSubmit={handleSubmit(handleFormSubmit)}>
      <div className="p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 w-full">
        <TitleComponent text="Thiết lập niên khóa" size={30} align="center" weight="bold" />
        {/* Layout 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Cột 1 */}
          <div className="p-6 col-span-full xl:col-auto">
            <TitleComponent text="Niên khóa" size={20} className="mb-4" />

            <div className="flex items-center gap-4">
              <div className="flex-grow-0">
                <Controller
                  name="schoolYearStart"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Bắt buộc chọn niên khóa',
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <DropdownSelectionComponent
                        {...field}
                        placeholder="Niên khóa"
                        options={['2020', '2021', '2022', '2023']}
                        width={200}
                        onSelect={field.onChange}
                      />
                      {errors.schoolYearStart && <span className="text-red-500 absolute top-full mt-1">{errors.schoolYearStart.message}</span>}
                    </div>
                  )}
                />
              </div>

              <span className="mx-2">đến</span>

              <div className="flex-grow-0">
                <Controller
                  name="schoolYearEnd"
                  control={control}
                  defaultValue=""
                  rules={{
                    required: 'Bắt buộc chọn niên khóa',
                  }}
                  render={({ field }) => (
                    <div className="relative">
                      <DropdownSelectionComponent
                        {...field}
                        placeholder="Niên khóa"
                        options={['2020', '2021', '2022', '2023']}
                        width={200}
                        onSelect={field.onChange}
                      />
                      {errors.schoolYearEnd && <span className="text-red-500 absolute top-full mt-1">{errors.schoolYearEnd.message}</span>}
                    </div>
                  )}
                />
              </div>
            </div>
          </div>

          {/* Cột 2 */}
          <div className="p-6 col-span-full xl:col-auto">
            <div className="flex justify-between items-center space-x-4">
              <CheckboxComponent
                label="Kế thừa dữ liệu"
                iconName="iconCheckActiveBlueLarge"
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                className="flex-grow "
              />

              <Controller
                name="schoolYearEnd"
                control={control}
                defaultValue=""
                rules={{
                  required: 'Bắt buộc chọn niên khóa',
                }}
                render={({ field }) => (
                  <div className="relative">
                    <DropdownSelectionComponent
                      {...field}
                      placeholder="Niên khóa"
                      options={['2020', '2021', '2022', '2023']}
                      width={200}
                      onSelect={field.onChange}
                    />
                    {errors.schoolYearEnd && <span className="text-red-500 absolute top-full mt-1">{errors.schoolYearEnd.message}</span>}
                  </div>
                )}
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
          <TitleComponent text="Cài đặt thời gian" size={20} align="left" weight="bold" color="#CC5C00" className="m-6" />
        </div>

        {/* Flexbox cho dropdown */}
        {errors.semester && <span className="my-6 mx-6 text-red-500">{errors.semester.message}</span>}
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-between">
          <ClickableIcon iconName="iconMinusActiveBlueLarge" onClick={handleClick} size="sm" text="Example Text" />
          <TextComponent text="Tên hoc kỳ:" color="var(--black-text)" weight="extrabold" />
          <input
            type="text"
            placeholder="Học kỳ 1"
            className="border border-gray-300 outline-none rounded-xl px-2 py-2 w-full md:w-60"
            {...register('semester', {
              required: 'Bắt buộc nhập tên học kỳ',
            })}
          />

          <TextComponent text="từ" color="var(--black-text)" weight="thin" />
          <Controller
            name="startDate"
            control={control}
            defaultValue={null}
            render={({ field }) => <CalendarInput selectedDate={field.value} onDateChange={(date) => handleDateChange(date, 'startDate')} />}
          />
          <TextComponent text="đến" color="var(--black-text)" weight="thin" />
          <Controller
            name="endDate"
            control={control}
            defaultValue={null}
            render={({ field }) => <CalendarInput selectedDate={field.value} onDateChange={(date) => handleDateChange(date, 'endDate')} />}
          />
        </div>

        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-start">
          <ClickableIcon iconName="iconPlusBlue" onClick={handleClick} size="sm" />
          <TextComponent text="Thêm học kỳ mới:" color="var(--blue-text)" weight="extrabold" />
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
            Hủy
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
    </form>
  );
};

export default SchoolYearFormEdit;
