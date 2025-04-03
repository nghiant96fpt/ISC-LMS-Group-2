import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import Button from '../../../../components/Button';
import attachIcon from '../../../../assets/icons/u_paperclip.png';
import './index.css';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import axios from 'axios';
import { useParams } from 'react-router';

const UpdateTransferAcceptance = () => {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitted, touchedFields },
    setValue,
    reset,
  } = useForm({
    mode: 'onTouched',
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
  const [selectedSemester, setSelectedSemester] = useState<number | null>(null);
  const [attachmentPath, setAttachmentPath] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [dataLoaded, setDataLoaded] = useState(false);
  const { id } = useParams<{ id: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [provinces, setProvinces] = useState<Province[]>([]);
  const [districts, setDistricts] = useState<Districts[]>([]);
  const [selectedProvince, setSelectedProvince] = useState('');

  // Thêm state để lưu tên tỉnh/huyện từ API
  const [provinceName, setProvinceName] = useState('');
  const [districtName, setDistrictName] = useState('');

  interface Province {
    provinceId: number;
    provinceName: string;
  }

  interface Districts {
    districtId: number;
    districtName: string;
  }

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        // Lấy danh sách tỉnh/thành
        const provincesResponse = await axios.get('https://fivefood.shop/api/address/provinces');
        const provincesData = provincesResponse.data.data || [];
        setProvinces(provincesData);

        if (id) {
          // Lấy thông tin chi tiết chuyển trường
          const response = await axios.get(`https://fivefood.shop/api/transfer-school/${id}`);
          const data = response.data.data;

          if (data) {
            // Set các giá trị cơ bản
            setValue('studentName', data.fullName || '');
            setValue('studentID', data.studentCode || '');
            setValue('transferToSchool', data.transferToSchool || '');
            setValue('reason', data.reason || '');

            // Xử lý ngày chuyển đến
            if (data.transferSchoolDate) {
              setTransferDate(dayjs(data.transferSchoolDate));
            }

            // Xử lý học kỳ
            if (data.semesterId) {
              setSelectedSemester(data.semesterId);
            } else if (data.transferSemester) {
              const semesterMatch = data.transferSemester.match(/Học kỳ (\d+)/);
              if (semesterMatch) {
                setSelectedSemester(Number(semesterMatch[1]));
              }
            }

            // Xử lý tỉnh/thành và quận/huyện
            if (data.provinceCode) {
              const provinceCode = data.provinceCode.toString();
              setSelectedProvince(provinceCode);

              // Lưu tên tỉnh từ API để hiển thị
              if (data.provinceName) {
                setProvinceName(data.provinceName);
              }

              // Kiểm tra xem tỉnh đã có trong danh sách chưa
              if (!provincesData.some((p: Province) => p.provinceId.toString() === provinceCode) && data.provinceName) {
                // Nếu chưa có, thêm vào danh sách provinces
                setProvinces((prev) => [
                  ...prev,
                  {
                    provinceId: parseInt(provinceCode),
                    provinceName: data.provinceName,
                  },
                ]);
              }

              // Lấy danh sách quận/huyện dựa trên tỉnh/thành đã chọn
              try {
                const districtResponse = await axios.get(`https://fivefood.shop/api/address/districts?provinceId=${provinceCode}`);
                const districtsData = districtResponse.data.data || [];
                setDistricts(districtsData);

                // Xử lý quận/huyện
                if (data.districtCode) {
                  const districtCode = data.districtCode.toString();
                  setSelectedDistrict(districtCode);

                  // Lưu tên huyện từ API để hiển thị
                  if (data.districtName) {
                    setDistrictName(data.districtName);
                  }

                  // Kiểm tra xem quận/huyện đã có trong danh sách chưa
                  if (!districtsData.some((d: Districts) => d.districtId.toString() === districtCode) && data.districtName) {
                    // Nếu chưa có, thêm vào danh sách districts
                    setDistricts((prev) => [
                      ...prev,
                      {
                        districtId: parseInt(districtCode),
                        districtName: data.districtName,
                      },
                    ]);
                  }
                }
              } catch (districtError) {
                console.error('Lỗi khi lấy danh sách quận/huyện:', districtError);
                // Nếu API lỗi nhưng vẫn có districtCode và districtName
                if (data.districtCode && data.districtName) {
                  setSelectedDistrict(data.districtCode.toString());
                  setDistrictName(data.districtName);
                  setDistricts([
                    {
                      districtId: data.districtCode,
                      districtName: data.districtName,
                    },
                  ]);
                }
              }
            }

            // Xử lý file đính kèm
            if (data.attachmentName) {
              setFileName(data.attachmentName);
            }
            if (data.attachmentPath) {
              setAttachmentPath(data.attachmentPath);
            }

            setDataLoaded(true);
          }
        }
      } catch (error) {
        console.error('Lỗi khi lấy thông tin:', error);
        setError('Không thể tải thông tin. Vui lòng thử lại sau.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [id, setValue]);

  const handleProvinceChange = async (provinceId: string) => {
    try {
      setSelectedProvince(provinceId);
      setSelectedDistrict('');
      setDistrictName(''); // Reset tên huyện khi đổi tỉnh

      if (provinceId) {
        // Cập nhật tên tỉnh
        const selectedProv = provinces.find((p) => p.provinceId.toString() === provinceId);
        if (selectedProv) {
          setProvinceName(selectedProv.provinceName);
        }

        // Lấy danh sách quận/huyện mới
        const response = await axios.get(`https://fivefood.shop/api/address/districts?provinceId=${provinceId}`);
        const districtsData = response.data.data || [];
        setDistricts(districtsData);
      } else {
        setProvinceName('');
        setDistricts([]);
      }
    } catch (error) {
      console.error('Lỗi khi lấy danh sách quận/huyện:', error);
      setDistricts([]);
    }
  };

  const handleDistrictChange = (districtId: string) => {
    if (!districtId) {
      setSelectedDistrict('');
      setDistrictName('');
      return;
    }

    setSelectedDistrict(districtId);

    // Cập nhật tên huyện
    const selectedDist = districts.find((d) => d.districtId.toString() === districtId);
    if (selectedDist) {
      setDistrictName(selectedDist.districtName);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (event.target.files?.length) {
      setFileName(event.target.files[0].name);
    }
  };

  const handleFileUpload = async (file: File) => {
    try {
      const formData = new FormData();
      formData.append('file', file);

      const response = await axios.post('https://fivefood.shop/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setAttachmentPath(response.data.filePath);
      return response.data;
    } catch (error) {
      console.error('Lỗi khi tải file:', error);
      throw error;
    }
  };

  const onSubmit = async (data: any) => {
    try {
      if (
        !data.studentName ||
        !data.studentID ||
        !transferDate ||
        !selectedSemester ||
        !selectedProvince ||
        !selectedDistrict ||
        !data.transferToSchool
      ) {
        setError('Vui lòng điền đầy đủ các trường bắt buộc');
        alert('Vui lòng điền đầy đủ các trường bắt buộc (*)');
        return;
      }

      setLoading(true);
      setError('');
      setSuccess(false);

      let attachmentData = { name: fileName, path: attachmentPath };
      if (data.attachment && data.attachment[0]) {
        const fileResponse = await handleFileUpload(data.attachment[0]);
        attachmentData = {
          name: data.attachment[0].name,
          path: fileResponse.filePath,
        };
      }

      const transferData = {
        studentId: parseInt(data.studentID) || 0,
        fullName: data.studentName,
        transferSchoolDate: transferDate ? transferDate.toISOString() : new Date().toISOString(),
        transferToSchool: data.transferToSchool,
        schoolAddress: data.schoolAddress,
        reason: data.reason || '',
        provinceCode: parseInt(selectedProvince) || 0,
        districtCode: parseInt(selectedDistrict) || 0,
        provinceName: provinceName, // Gửi tên tỉnh
        districtName: districtName, // Gửi tên huyện
        attachmentName: attachmentData.name,
        attachmentPath: attachmentData.path,
        semesterId: selectedSemester || 0,
        userId: 0,
      };

      const response = await axios.put(`https://fivefood.shop/api/transfer-school/${id}`, transferData, {
        headers: {
          'Content-Type': 'application/json',
          accept: '*/*',
        },
      });

      setSuccess(true);
      alert('Cập nhật thông tin thành công!');
    } catch (err: any) {
      console.error('Chi tiết lỗi:', err);
      setError(err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật đơn chuyển trường. Vui lòng thử lại sau.');
      alert('Lỗi: ' + (err.response?.data?.message || 'Có lỗi xảy ra khi cập nhật đơn chuyển trường'));
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    window.history.back();
  };

  return (
    <div className="w-full mx-auto bg-white rounded-lg shadow-md max-w-[800px] p-10 pb-2">
      <h2 className="text-2xl font-semibold text-center mb-2">Thiết lập chuyển trường</h2>

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
            <select
              className="w-full p-2 bg-[#F2F2F2] rounded"
              onChange={(e) => setSelectedSemester(Number(e.target.value))}
              value={selectedSemester || ''}
            >
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
            <select
              className="w-full p-2 bg-[#F2F2F2] rounded"
              onChange={(e) => handleProvinceChange(e.target.value)}
              value={selectedProvince || ''}
              disabled={isLoading}
            >
              <option value="">Chọn tỉnh/thành</option>
              {provinces.map((province) => (
                <option key={province.provinceId} value={province.provinceId.toString()}>
                  {province.provinceName || `Tỉnh/Thành ${province.provinceId}`}
                </option>
              ))}
            </select>
            {isSubmitted && !selectedProvince && <span className="text-red-500 text-sm">Vui lòng chọn tỉnh/thành</span>}
          </div>
        </div>

        {/* Quận/Huyện */}
        <div className="flex flex-col md:flex-row justify-between items-center">
          <label className="block font-medium">
            Quận/Huyện: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <select
              className="w-full p-2 bg-[#F2F2F2] rounded"
              disabled={!selectedProvince || isLoading}
              onChange={(e) => handleDistrictChange(e.target.value)}
              value={selectedDistrict || ''}
            >
              <option value="">Chọn quận/huyện</option>
              {districts.map((district) => (
                <option key={district.districtId} value={district.districtId.toString()}>
                  {district.districtName || `Quận/Huyện ${district.districtId}`}
                </option>
              ))}
            </select>
            {selectedProvince && isSubmitted && !selectedDistrict && <span className="text-red-500 text-sm">Vui lòng chọn quận/huyện</span>}
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
          <label className="font-medium">
            Tệp đính kèm: <span className="text-red-500">*</span>
          </label>
          <div className="w-full md:w-[585px]">
            <div className="flex items-center space-x-2">
              <div className="flex items-center border rounded px-3 bg-[#F2F2F2] h-10 flex-grow">
                <img src={attachIcon} alt="icon" className="w-7 h-5 pr-1 border-r-2 text-orange-500" />
                <span className="text-gray-500 ml-2">{fileName || ' '}</span>
              </div>
              <label className="cursor-pointer border border-orange-500 px-4 py-2 rounded bg-orange-100 hover:bg-orange-200 transition h-10 flex items-center">
                Chọn tệp tải lên...
                {/* <input type="file" {...register('attachment')} className="hidden" onChange={handleFileChange} /> */}
              </label>
            </div>
            <p className="text-sm text-gray-500 font-thin italic">Kích thước tệp không vượt quá 250MB.</p>
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

export default UpdateTransferAcceptance;
