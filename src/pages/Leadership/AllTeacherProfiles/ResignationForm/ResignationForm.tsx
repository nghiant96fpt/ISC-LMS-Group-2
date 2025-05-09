import React, { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import './style.css';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import Button from '../../../../components/Button';
import { ResignationFormProps } from './type';
import { toast } from 'react-toastify';
import axios from 'axios';
import { useCookies } from 'react-cookie';
import createAxiosInstance from '../../../../utils/axiosInstance';

const ResignationForm: React.FC = () => {
  const axiosInstance = createAxiosInstance();
  const { userId, id } = useParams<{ userId: string; id: string }>();
  const [loading, setLoading] = useState(false);
  const [cookies] = useCookies(["accessToken", 'userId']);
  const navigate = useNavigate();
  const [retirementData, setRetirementData] = useState<ResignationFormProps>({
    retirementDate: null,
    note: '',
    decision: null,
  });
  const [error, setError] = useState<string | null>(null);

  const handleDateChange = (date: dayjs.Dayjs | null) => {
    setRetirementData((prev) => ({
      ...prev,
      retirementDate: date,
    }));
  };

  const handleClose = () => {
    navigate('/leadership/all-teacher-profiles', { replace: true });
  };
  const convertFileToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };
  const handleSave = async () => {
    if (!isDataValid) return;
    setLoading(true);

    try {
      const base64File = retirementData.decision
        ? await convertFileToBase64(retirementData.decision as File)
        : null;

      const token = cookies.accessToken;
      if (!token) {
        toast.error("Lỗi xác thực: Token không tồn tại!");
        setLoading(false);
        return;
      }

      const value = {
        teacherId: Number(id),
        date: retirementData.retirementDate?.toISOString(),
        note: retirementData.note || "",
        attachment: base64File,
        status: 8,
        leadershipId: Number(cookies.userId),
        active: true,
      };

      try {
        // Thử cập nhật trước (PUT)
        const response = await axiosInstance.put(`api/retirement/putByTeacherId/${id}`, value);

        toast.success("Cập nhật thành công!");

      } catch (error: any) {
        if (error.response?.status === 404) {
          const dataPost = await axiosInstance.post(`api/retirement`, value);

          toast.success("Cập nhật thành công!");

        } else {
          console.error("❌ Lỗi API:", error);
          toast.error(`Lỗi: ${error.response?.status || "500"} - ${error.response?.data?.message || "Có lỗi xảy ra!"}`);
        }
      }
      navigate("/leadership/all-teacher-profiles");
    } catch (error) {

      toast.error("Có lỗi xảy ra, vui lòng thử lại!");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setRetirementData((prev) => ({
        ...prev,
        decision: file,
      }));
      setError(null);
    }
  };

  const handleNoteChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setRetirementData((prev) => ({
      ...prev,
      note: event.target.value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    handleSave();
  };

  const isDataValid = retirementData.retirementDate && retirementData.note && retirementData.decision;

  return (
    <div className="modal-overlay">
      <div className="overlay"></div>
      <div className="form-container">
        <h1 className="modal-title">Cập nhật nghỉ việc</h1>
        <form onSubmit={handleSubmit}>
          {/* Chọn ngày nghỉ */}
          <div className="row">
            <label className="label mb-4">
              Ngày nghỉ: <span className="text-red-500">*</span>
            </label>
            <DateInput value={retirementData.retirementDate} onChange={handleDateChange} width="80%" className="border-gray-300" />
          </div>
          {/* Ghi chú */}
          <div className="row mb-4">
            <label className="label">
              Ghi chú: <span className="required">*</span>
            </label>
            <textarea className="input" placeholder="Lorem ipsum dolor sit amet..." value={retirementData.note} onChange={handleNoteChange} required />
          </div>
          {/* File Upload */}
          <div className="mb-4">
            {/* Hàng chứa label, input và nút */}
            <div className="flex items-center gap-2">
              {/* Label */}
              <label className="font-semibold whitespace-nowrap">Quyết định nghỉ hưu:</label>

              {/* Ô hiển thị tên file (có icon) */}
              <div className="relative flex-1">
                {/* Icon ở bên trái */}
                <div className="absolute left-2 top-1/2 -translate-y-1/2">
                  <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
                    <path
                      d="M15.0667 10.3503L9.91672 15.5087C9.24156 16.1087 8.36267 16.4281 7.45982 16.4015C6.55697 16.3749 5.69839 16.0044 5.0597 15.3657C4.42101 14.727 4.05048 13.8684 4.0239 12.9656C3.99732 12.0627 4.3167 11.1838 4.91672 10.5087L11.5834 3.84201C11.9814 3.46392 12.5094 3.25311 13.0584 3.25311C13.6074 3.25311 14.1354 3.46392 14.5334 3.84201C14.9212 4.235 15.1386 4.7649 15.1386 5.31701C15.1386 5.86912 14.9212 6.39901 14.5334 6.79201L8.78338 12.5337C8.72648 12.595 8.65806 12.6444 8.58203 12.6793C8.50601 12.7141 8.42386 12.7336 8.34029 12.7367C8.25672 12.7398 8.17335 12.7264 8.09496 12.6973C8.01656 12.6682 7.94467 12.6239 7.88339 12.567C7.8221 12.5101 7.77263 12.4417 7.73779 12.3657C7.70294 12.2896 7.68342 12.2075 7.68032 12.1239C7.67723 12.0403 7.69062 11.957 7.71974 11.8786C7.74887 11.8002 7.79315 11.7283 7.85005 11.667L12.1251 7.40034C12.282 7.24342 12.3701 7.03059 12.3701 6.80867C12.3701 6.58675 12.282 6.37393 12.1251 6.21701C11.9681 6.06009 11.7553 5.97193 11.5334 5.97193C11.3115 5.97193 11.0986 6.06009 10.9417 6.21701L6.66672 10.5003C6.45281 10.7126 6.28302 10.9651 6.16716 11.2433C6.0513 11.5215 5.99165 11.8198 5.99165 12.1212C5.99165 12.4225 6.0513 12.7209 6.16716 12.9991C6.28302 13.2773 6.45281 13.5298 6.66672 13.742C7.1037 14.1582 7.68406 14.3904 8.28755 14.3904C8.89104 14.3904 9.47141 14.1582 9.90839 13.742L15.6501 7.99201C16.3125 7.28113 16.6731 6.3409 16.6559 5.36939C16.6388 4.39789 16.2452 3.47096 15.5582 2.7839C14.8711 2.09683 13.9442 1.70327 12.9727 1.68613C12.0012 1.66899 11.0609 2.02961 10.3501 2.69201L3.68339 9.35867C2.78438 10.3544 2.30424 11.6585 2.343 12.9995C2.38175 14.3404 2.93641 15.6147 3.89142 16.5568C4.84642 17.4989 6.12812 18.0362 7.46946 18.0567C8.8108 18.0773 10.1083 17.5795 11.0917 16.667L16.2501 11.517C16.3278 11.4393 16.3894 11.3471 16.4314 11.2455C16.4735 11.144 16.4951 11.0352 16.4951 10.9253C16.4951 10.8155 16.4735 10.7066 16.4314 10.6051C16.3894 10.5036 16.3278 10.4114 16.2501 10.3337C16.1724 10.256 16.0801 10.1943 15.9786 10.1523C15.8771 10.1102 15.7683 10.0886 15.6584 10.0886C15.5485 10.0886 15.4397 10.1102 15.3382 10.1523C15.2367 10.1943 15.1444 10.256 15.0667 10.3337V10.3503Z"
                      fill="#FF7506"
                    />
                  </svg>
                </div>

                {/* Input để hiển thị tên file */}
                <input
                  type="text"
                  className="w-full bg-gray-100 border border-gray-300 rounded-md pl-8 pr-2 py-2 outline-none"
                  value={retirementData.decision ? retirementData.decision.name : ''}
                  readOnly
                />
              </div>

              {/* Nút tải lên file */}
              <label className="cursor-pointer bg-orange-100 text-orange-700 py-2 px-4 rounded-md border border-orange-300 hover:bg-orange-200">
                Chọn tệp tải lên...
                <input type="file" onChange={handleFileChange} accept=".pdf,.jpeg,.jpg" className="hidden" />
              </label>
            </div>

            {/* Mô tả dưới input */}
            <p className="text-sm text-gray-500 mt-1 pl-[22%]">Kiểu file .pdf, .jpeg, .jpg. Dung lượng tối đa 100MB.</p>
          </div>

          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Hủy
            </button>
            <Button
              className={isDataValid ? "primary" : "secondary"}
              size="big"
              onClick={handleSave}
              disabled={!isDataValid || loading}
            >
              {loading ? "Đang lưu..." : "Lưu"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ResignationForm;
