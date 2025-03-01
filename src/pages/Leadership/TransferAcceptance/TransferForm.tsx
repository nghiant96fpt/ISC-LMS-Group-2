import React from 'react';
import { Controller, useForm } from 'react-hook-form';
import Button from '../../../components/Button';
import CalendarInput from '../../../components/CalendarInput';
import Dropdown from '../../../components/Dropdown';
import './style.css';
import { Link } from 'react-router';

interface FormData {
  studentName: string;
  studentId: string;
  transferDate: string;
  semester: string;
  province: string;
  district: string;
  transferFrom: string;
  reason: string;
  file: FileList | null;
}

const TransferForm: React.FC = () => {
  const {
    register,
    handleSubmit,
    watch,
    control,
    formState: { errors, isValid },
  } = useForm<FormData>({
    mode: 'onChange',
  });

  const onSubmit = (data: FormData) => {
    console.log('Form Data:', data);
  };

  return (
    <div className="max-w-3xl mx-auto bg-white p-6 rounded-md shadow-md mb-7 mt-3">
      <h2 className="text-xl font-semibold mb-4 text-center">Tiếp nhận chuyển trường</h2>

      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium flex">Tên học viên {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
            <input
              type="text"
              {...register('studentName', { required: true })}
              className="w-full px-3 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300 bg-gray-100"
            />
          </div>

          <div>
            <label className="block text-sm font-medium flex">Mã học viên {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
            <input type="text" {...register('studentId', { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-100" />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="calendar">
            <label className="block text-sm font-medium flex">Ngày chuyển đến {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
            <Controller
              name="transferDate"
              control={control}
              render={({ field }) => <CalendarInput selectedDate={field.value ? new Date(field.value) : null} onDateChange={field.onChange} />}
            />
          </div>

          <div className="dropdown">
            <label className="block text-sm font-medium flex">Học kỳ chuyển</label>
            <p className="text-sm mt-3 mx-3 ">Học kỳ I</p>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="dropdown">
            <label className="block text-sm font-medium flex">Tỉnh/Thành {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
            <Controller
              name="province"
              control={control}
              render={({ field }) => (
                <Dropdown
                  selectedOption={field.value ? { value: field.value, label: field.value } : null}
                  handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                  options={[
                    { value: 'Hà Nội', label: 'Hà Nội' },
                    { value: 'TP HCM', label: 'TP HCM' },
                  ]}
                  onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                />
              )}
            />
          </div>

          <div className="dropdown">
            <label className="block text-sm font-medium flex">Quận/Huyện {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
            <Controller
              name="district"
              control={control}
              render={({ field }) => (
                <Dropdown
                  selectedOption={field.value ? { value: field.value, label: field.value } : null}
                  handleOptionClick={(selectedOption) => field.onChange(selectedOption.value)}
                  options={[
                    { value: 'Quận 1', label: 'Quận 1' },
                    { value: 'Quận 2', label: 'Quận 2' },
                  ]}
                  onSelect={(selectedOption) => field.onChange(selectedOption.value)}
                />
              )}
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium flex">Chuyển từ {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}</label>
          <input type="text" {...register('transferFrom', { required: true })} className="w-full px-3 py-2 border rounded-md bg-gray-100" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium">Lý do</label>
          <textarea {...register('reason')} className="w-full px-3 py-2 border rounded-md bg-gray-100" />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium flex items-center">
            Tệp đính kèm {errors.file && <p className="text-red-500 text-sm mx-1"> *</p>}
          </label>
          <div className="flex items-center justify-between rounded-md py-2 w-full">
            <div className="flex items-center flex-1 overflow-hidden rounded-md h-10 border bg-gray-100">
              <span className="text-orange-500 mx-3" style={{borderRight: "1px solid #C9C4C0"}}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.08 12.42L11.9 18.61C11.0899 19.33 10.0352 19.7133 8.95176 19.6814C7.86834 19.6495 6.83804 19.2048 6.07161 18.4384C5.30518 17.672 4.86055 16.6417 4.82866 15.5583C4.79676 14.4748 5.18002 13.4202 5.90004 12.61L13.9 4.60999C14.3777 4.15629 15.0113 3.90332 15.67 3.90332C16.3288 3.90332 16.9624 4.15629 17.44 4.60999C17.9054 5.08158 18.1663 5.71746 18.1663 6.37999C18.1663 7.04252 17.9054 7.6784 17.44 8.14999L10.54 15.04C10.4718 15.1135 10.3896 15.1729 10.2984 15.2147C10.2072 15.2565 10.1086 15.28 10.0083 15.2837C9.90804 15.2874 9.808 15.2713 9.71392 15.2364C9.61985 15.2014 9.53358 15.1483 9.46004 15.08C9.3865 15.0117 9.32713 14.9296 9.28532 14.8384C9.24351 14.7471 9.22008 14.6486 9.21636 14.5483C9.21265 14.448 9.22872 14.348 9.26367 14.2539C9.29862 14.1598 9.35175 14.0735 9.42004 14L14.55 8.87999C14.7383 8.69169 14.8441 8.43629 14.8441 8.16999C14.8441 7.90369 14.7383 7.64829 14.55 7.45999C14.3617 7.27169 14.1063 7.1659 13.84 7.1659C13.5737 7.1659 13.3183 7.27169 13.13 7.45999L8.00004 12.6C7.74334 12.8547 7.53961 13.1577 7.40057 13.4915C7.26154 13.8253 7.18996 14.1834 7.18996 14.545C7.18996 14.9066 7.26154 15.2646 7.40057 15.5985C7.53961 15.9323 7.74334 16.2353 8.00004 16.49C8.52441 16.9895 9.22085 17.2681 9.94504 17.2681C10.6692 17.2681 11.3657 16.9895 11.89 16.49L18.78 9.58999C19.5749 8.73694 20.0077 7.60866 19.9871 6.44286C19.9665 5.27705 19.4942 4.16474 18.6698 3.34026C17.8453 2.51578 16.733 2.04351 15.5672 2.02294C14.4014 2.00237 13.2731 2.43511 12.42 3.22999L4.42004 11.23C3.34124 12.4248 2.76507 13.9898 2.81157 15.599C2.85808 17.2081 3.52367 18.7372 4.66968 19.8678C5.81568 20.9983 7.35372 21.643 8.96332 21.6677C10.5729 21.6923 12.13 21.0949 13.31 20L19.5 13.82C19.5933 13.7268 19.6672 13.6161 19.7177 13.4942C19.7682 13.3724 19.7941 13.2418 19.7941 13.11C19.7941 12.9781 19.7682 12.8476 19.7177 12.7257C19.6672 12.6039 19.5933 12.4932 19.5 12.4C19.4068 12.3068 19.2961 12.2328 19.1743 12.1823C19.0525 12.1319 18.9219 12.1059 18.79 12.1059C18.6582 12.1059 18.5276 12.1319 18.4058 12.1823C18.284 12.2328 18.1733 12.3068 18.08 12.4V12.42Z"
                    fill="#FF7506"
                  />
                </svg>
              </span>
              <span className="text-sm text-gray-700 truncate">{watch('file')?.[0]?.name || 'Chưa có tệp nào'}</span>
            </div>
            <button
              type="button"
              className="px-4 py-2 text-sm text-orange-600 border border-orange-400 rounded-md ml-4"
              onClick={() => document.getElementById('fileInput')?.click()}
            >
              Chọn tệp tải lên...
            </button>
          </div>
          <input type="file" id="fileInput" {...register('file', { required: true })} className="hidden" />
          <p className="text-sm text-gray-400 italic mt-1">Lorem ipsum dolor sit amet, consectetur adipiscing elit</p>
        </div>

        <div className="flex justify-center gap-4 mt-10">
          <Link to="/leadership/transfer-acceptance">
            <Button type="button" className="secondary">
              Hủy
            </Button>
          </Link>
          <Button type="submit" className="primary" disabled={!isValid}>
            Tiếp theo
          </Button>
        </div>
      </form>
    </div>
  );
};

export default TransferForm;
