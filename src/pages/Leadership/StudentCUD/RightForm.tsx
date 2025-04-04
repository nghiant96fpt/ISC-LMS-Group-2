import React from 'react';
import Dropdown from '../../../components/Dropdown';
import { DropdownOption } from '../../../components/Dropdown/type';
import Input from '../../../components/Input';
import CheckboxComponent from '../../../components/CheckBox';
import CalendarInput from '../../../components/CalendarInput';

export interface RightFormProps {
  isChecked: boolean;
  handleCheckTuSinhMa: (event: React.ChangeEvent<HTMLInputElement>) => void;

  register?: any;
  errors?: any;
  watch?: any;
  setValue?: any;
  setError?: any;
  clearError?: any;

  courses: DropdownOption[];
  grades: DropdownOption[];
  filteredClasses: DropdownOption[];
  selectedGrade: DropdownOption | null;
  entries: DropdownOption[];
  statuses: DropdownOption[];
}

const RightForm: React.FC<RightFormProps> = ({
  isChecked,
  handleCheckTuSinhMa,

  register,
  errors,
  setValue,
  watch,
  clearError,

  courses,
  grades,
  filteredClasses,
  selectedGrade,
  entries,
  statuses
}) => {
  return (
    <div className="w-[47%]">
      <div className="flex items-center mb-1">
        <p className="w-[115px]">Niên khóa</p>
        <Dropdown
          size="short"
          options={courses}
          placeholder="Chọn niên khóa"
          selectedOption={watch('academicYear')}
          handleOptionClick={(e) => {
            setValue('academicYear', e);
            clearError('academicYear');
          }}
          {...register('academicYear', { required: 'Vui lòng chọn thông tin niên khóa !' })}
          borderColor={errors?.academicYear && '#EF4444'}
        />
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.academicYear?.message}</p>}
      <div className="flex items-center mb-1">
        <p className="w-[118px]">Khối</p>
        <Dropdown
          size="short"
          options={grades}
          selectedOption={watch('grade')}
          handleOptionClick={(e) => {
            setValue('grade', e);
            clearError('grade');
          }}
          {...register('grade', { required: 'Vui lòng chọn thông tin khối và lớp học !' })}
          placeholder="Chọn khối"
          borderColor={errors?.grade && '#EF4444'}
        />
        <div className="ms-2">
          <Dropdown
            size="medium"
            options={filteredClasses}
            selectedOption={watch('class')}
            handleOptionClick={(e) => {
              setValue('class', e);
              clearError('class');
            }}
            placeholder="Chọn lớp"
            {...register('class', { required: 'Vui lòng chọn thông tin lớp học !' })}
            disabled={!selectedGrade}
            borderColor={errors?.class && '#EF4444'}
          />
        </div>
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.grade?.message}</p>}
      {errors?.class && !errors?.grade && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.class?.message}</p>}
      <div className="flex items-center mb-1">
        <p className="w-[118px]">Mã học viên</p>
        <div className="flex items-center">
          <Input
            className={`h-[40px] me-2 ${errors?.code ? 'border-red-500' : ''}`}
            size="sm"
            placeholder="Nhập mã học viên"
            {...register('code', { required: 'Vui lòng nhập mã học viên !' })}
            onChange={(e) => {
              setValue('code', e.currentTarget.value);
              clearError('code');
            }}
          />
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
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.code?.message}</p>}
      <div className="flex items-center mb-1">
        <p className="w-[118px]">Ngày nhập học</p>
        <CalendarInput
          placeholder="Chọn ngày sinh"
          style={{ maxWidth: 300 }}
          inputStyle={{ border: `${errors?.enrollmentDate ? '2px solid #EF4444' : '1px solid #6b7280'}` }}
          selectedDate={watch('enrollmentDate')}
          onDateChange={(e) => {
            setValue('enrollmentDate', e);
            clearError('enrollmentDate');
          }}
          {...register('enrollmentDate', { required: 'Vui lòng chọn ngày nhập học !' })}
        />
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.enrollmentDate?.message}</p>}
      <div className="flex items-center mb-1">
        <p className="w-[118px]">Hình thức</p>
        <Dropdown
          size="medium"
          options={entries}
          selectedOption={watch('entry')}
          handleOptionClick={(e) => {
            setValue('entry', e);
            clearError('entry');
          }}
          {...register('entry', { required: 'Vui lòng chọn hình thức nhập học !' })}
          borderColor={errors?.entry && '#EF4444'}
          placeholder='Chọn hình thức'
        />
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.entry?.message}</p>}
      <div className="flex items-center mb-1">
        <p className="w-[118px]">Trạng thái</p>
        <Dropdown
          size="medium"
          options={statuses}
          selectedOption={watch('status')}
          handleOptionClick={(e) => {
            setValue('status', e);
            clearError('status');
          }}
          {...register('status', { required: 'Vui lòng chọn trạng thái theo học !' })}
          borderColor={errors?.status && '#EF4444'}
          placeholder='Chọn trạng thái'
        />
      </div>
      {errors && <p className="pb-0 ps-[118px] text-red-500 text-sm mt-1 mb-2">{errors?.status?.message}</p>}
    </div>
  );
};

export default RightForm;
