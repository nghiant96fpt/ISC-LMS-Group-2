import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import attachIcon from '../../../../assets/icons/u_paperclip.png';
import './index.css';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import axios from 'axios';
import { useCookies } from 'react-cookie';

const AddTransferAcceptance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, touchedFields },
    setValue,
    watch,
  } = useForm({
    mode: 'onTouched', // Chỉ validate khi người dùng đã tương tác với trường
    defaultValues: {
      studentName: '',
      studentID: '',
      transferToSchool: '',
      schoolAddress: '',
      reason: '',
    },
  });
  const [fileName, setFileName] = useState('');
  const [transferDate, setTransferDate] = useState<dayjs.Dayjs | null>(null);
  const [selectedSemester, setSelectedSemester] = useState<string | null>(null);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState<string>('');
  const [cookies] = useCookies(['accessToken']);
  interface Province {
    provinceId: number;
    provinceName: string;
  }

  interface Districts {
    districtId: number;
    districtName: string;
  }

  interface TransferData {
    studentId: number;
    fullName: string;
    transferSchoolDate: string;
    transferToSchool: string;
    schoolAddress: string;
    reason: string;
    provinceCode: number;
    districtCode: number;
    attachmentName: string;
    attachmentPath: string;
    semesterId: number;
    userId: number;
  }

  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [selectedProvince, setSelectedProvince] = useState<string>('');

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };
  const onSubmit = async (data: any) => {
    try {
      // Validation checks
      if (
        !data.studentName ||
        !data.studentID ||
        !transferDate ||
        !selectedSemester ||
        !selectedProvince ||
        !selectedDistrict ||
        !data.transferToSchool ||
        !data.schoolAddress
      ) {
        setError('Vui lòng điền đầy đủ các trường bắt buộc');
        alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
        return;
      }

      setLoading(true);
      setError('');
      setSuccess(false);

      // Format data before sending
      const transferData: TransferData = {
        studentId: parseInt(data.studentID.replace(/\D/g, '')), // Chuyển đổi sang số và loại bỏ ký tự không phải số
        fullName: data.studentName.trim(),
        transferSchoolDate: dayjs(transferDate).format('YYYY-MM-DD'),
        transferToSchool: data.transferToSchool.trim(),
        schoolAddress: data.schoolAddress.trim(),
        reason: data.reason?.trim() || '',
        provinceCode: parseInt(selectedProvince),
        districtCode: parseInt(selectedDistrict),
        attachmentName: '',
        attachmentPath: '',
        semesterId: parseInt(selectedSemester || '0'),
        userId: 0,
      };

      // Log data trước khi gửi để debug
      console.log('Data before sending:', {
        rawData: data,
        formattedData: transferData,
        date: transferDate,
        province: selectedProvince,
        district: selectedDistrict,
      });

      const response = await axios.post('https://fivefood.shop/api/transfer-school', transferData, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${cookies.accessToken}`,
        },
        withCredentials: true, // Enable sending cookies
      });

      if (response.data && response.data.success) {
        // Check for success flag
        setSuccess(true);
        alert('Lưu thông tin thành công!');
        // Optionally redirect or clear form
      } else {
        throw new Error(response.data?.message || 'Có lỗi xảy ra');
      }
    } catch (err: any) {
      console.error('Error details:', {
        message: err.message,
        response: err.response?.data,
        status: err.response?.status,
      });

      let errorMessage = 'Có lỗi xảy ra khi gửi đơn chuyển trường';

      if (err.response?.status === 401) {
        errorMessage = 'Phiên đăng nhập hết hạn, vui lòng đăng nhập lại';
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message;
      }

      setError(errorMessage);
      alert(`Lỗi: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    axios
      .get('https://fivefood.shop/api/address/provinces')
      .then((res) => {
        setProvinces(Array.isArray(res.data.data) ? res.data.data : []);
      })
      .catch((err) => console.error('Lỗi khi lấy tỉnh/thành: ', err));
  }, []);

  const handleProvinceChange = (provinceId: string) => {
    if (!provinceId) {
      return;
    }
    setSelectedProvince(provinceId);
    axios
      .get(`https://fivefood.shop/api/address/districts?provinceId=${provinceId}`)
      .then((res) => {
        setDistricts(res.data.data);
      })
      .catch((err) => console.error('Lỗi khi lấy quận/huyện: ', err));
  };

  const handleDistrictChange = (districtId: string) => {
    if (!districtId) {
      return;
    }
    setSelectedDistrict(districtId);
  };

  const handleFileUpload = async (file: File) => {
    try {
      // Tạo FormData để upload file
      const formData = new FormData();
      formData.append('file', file);

      // Kiểm tra và cập nhật endpoint upload file nếu cần
      const response = await axios.post('https://fivefood.shop/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      // Lưu đường dẫn file sau khi upload
      setAttachmentPath(response.data.filePath); // Thay đổi theo cấu trúc phản hồi thực tế
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      throw error;
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  const handleSemesterChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedSemester(e.target.value);
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md max-w-[800px] p-10 pb-2">
      <h2 className="text-2xl font-semibold text-center mb-2">Tiếp nhận chuyển trường</h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Tên học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Tên học viên: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full md:w-[585px]">
            <input
              {...register('studentName', { required: 'Vui lòng nhập tên học viên' })}
              placeholder="Nguyễn Hữu Phucas"
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            {errors.studentName?.message && <span className="text-red-500 text-sm">{String(errors.studentName.message)}</span>}
          </div>
        </div>

        {/* Mã học viên */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Mã học viên: <span className="text-red-500">*</span>
          </label>
          <div className="relative w-full md:w-[585px]">
            <input
              {...register('studentID', { required: 'Vui lòng nhập mã học viên' })}
              placeholder="PC05360"
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            {errors.studentID?.message && <span className="text-red-500 text-sm">{String(errors.studentID.message)}</span>}
          </div>
        </div>

        {/* Ngày chuyển đến */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Ngày chuyển đến: <span className="text-red-500">*</span>
          </label>
          <div className="custom w-full md:w-[585px]">
            <DateInput value={transferDate} onChange={(date) => setTransferDate(date)} />
            {isSubmitted && !transferDate && <span className="text-red-500 text-sm">Vui lòng chọn ngày chuyển đến</span>}
          </div>
        </div>

        {/* Học kỳ chuyển */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Học kỳ chuyển: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <select className="w-full p-2 bg-[#F2F2F2] rounded" onChange={handleSemesterChange}>
              <option value="">Chọn học kỳ</option>
              <option value="1">Học kỳ I</option>
              <option value="2">Học kỳ II</option>
              <option value="3">Học kỳ III</option>
            </select>
            {isSubmitted && !selectedSemester && <span className="text-red-500 text-sm">Vui lòng chọn học kỳ</span>}
          </div>
        </div>

        {/* Tỉnh/Thành */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Tỉnh/Thành: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <select className="w-full p-2 bg-[#F2F2F2] rounded" onChange={(e) => handleProvinceChange(e.target.value)}>
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((province) => (
                <option key={province.provinceId} value={province.provinceId}>
                  {province.provinceName}
                </option>
              ))}
            </select>
            {!selectedProvince && isSubmitted && <span className="text-red-500 text-sm">Vui lòng chọn tỉnh/thành</span>}
          </div>
        </div>

        {/* Quận/Huyện */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Quận/Huyện: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <select className="w-full p-2 bg-[#F2F2F2] rounded" disabled={!selectedProvince} onChange={(e) => handleDistrictChange(e.target.value)}>
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.districtId} value={district.districtId}>
                  {district.districtName}
                </option>
              ))}
            </select>
            {!selectedDistrict && selectedProvince && <span className="text-red-500 text-sm">Vui lòng chọn quận/huyện</span>}
          </div>
        </div>

        {/* Chuyển từ */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Chuyển từ: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <input
              {...register('transferToSchool', { required: 'Vui lòng nhập trường chuyển từ' })}
              placeholder="VD: Trường THPT Chuyên Lê Hồng Phong"
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            {errors.transferToSchool?.message && <span className="text-red-500 text-sm">{String(errors.transferToSchool.message)}</span>}
          </div>
        </div>

        {/* Địa chỉ trường */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Địa chỉ trường: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <input
              {...register('schoolAddress', { required: 'Vui lòng nhập địa chỉ trường' })}
              placeholder="Nhập địa chỉ trường học"
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
            />
            {errors.schoolAddress?.message && <span className="text-red-500 text-sm">{String(errors.schoolAddress.message)}</span>}
          </div>
        </div>

        {/* Lý do */}
        <div className="flex flex-col md:flex-row justify-between items-start">
          <label className="block font-medium">Lý do:</label>
          <div className="w-full md:w-[585px]">
            <textarea
              {...register('reason')}
              className="w-full p-2 bg-[#F2F2F2] rounded focus:border-orange-400 focus:ring-1 focus:ring-orange-200 outline-none"
              rows={2}
              placeholder=""
            />
          </div>
        </div>

        {/* Tệp đính kèm */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="font-medium">Tệp đính kèm: {/* Remove required asterisk */}</label>
          <div className="w-full md:w-[585px]">
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded px-3 bg-[#F2F2F2] h-10 flex-grow">
                <img src={attachIcon} alt="icon" className="w-7 h-5 pr-1 border-r-2 text-orange-500" />
                <span className="text-gray-500 ml-2">{fileName || ' '}</span>
              </div>
              <label className="cursor-pointer border border-orange-500 px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition h-10 flex items-center">
                Chọn tệp tải lên...
                <input type="file" className="hidden" onChange={handleFileChange} />
              </label>
            </div>
            <p className="text-sm text-gray-500 font-thin italic">Tệp đính kèm không bắt buộc.</p>
          </div>
        </div>

        {/* Thông báo lỗi/thành công */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Lỗi!</strong>
            <span className="block sm:inline"> {error}</span>
          </div>
        )}
        {success && (
          <div className="bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded relative" role="alert">
            <strong className="font-bold">Thành công!</strong>
            <span className="block sm:inline"> Đã lưu thông tin thành công.</span>
          </div>
        )}

        {/* Buttons */}
        <div className="flex justify-center space-x-4 mt-4">
          <button type="button" onClick={handleCancel} className="w-40 h-12 bg-gray-200 rounded-lg font-semibold">
            Hủy
          </button>
          <Button
            type="submit"
            className="bg-orange-500 hover:bg-orange-600 text-white text-md"
            size="mini"
            width="160px"
            height="48px"
            disabled={loading}
          >
            {loading ? 'Đang xử lý...' : 'Lưu lại'}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default AddTransferAcceptance;
