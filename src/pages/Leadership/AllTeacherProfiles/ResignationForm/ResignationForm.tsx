import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';
import DateInput from '../../../../components/Date';
import dayjs from 'dayjs';
import Button from '../../../../components/Button';
import { ResignationFormProps } from './type';

const ResignationForm: React.FC = () => {
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

  const handleSave = () => {
    if (!isDataValid) {
      setError('Vui lòng điền đầy đủ thông tin trước khi lưu.');
      return;
    }
    console.log('Dữ liệu đã lưu:', retirementData);
    alert('Lưu thành công!');
    navigate('/leadership/all-teacher-profiles');
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
    <>
      <div className="overlay"></div>
      <div className="form-container">
        <h2 className="title">Cập nhật nghỉ việc</h2>
        <form onSubmit={handleSubmit}>
          {/* Chọn ngày nghỉ */}
          <div className="row">
            <label className="label">
              Ngày nghỉ: <span className="text-red-500">*</span>
            </label>
            <DateInput value={retirementData.retirementDate} onChange={handleDateChange} width="75%" />
          </div>
          {/* Ghi chú */}
          <div className="row mb-4">
            <label className="title2-note">
              Ghi chú: <span className="required">*</span>
            </label>
            <textarea className="note-textarea" placeholder="Nhập ghi chú..." value={retirementData.note} onChange={handleNoteChange} required />
          </div>
          {/* File Upload */}
          <div className="row">
            <label className="title2">Quyết định nghỉ việc:</label>
            <div className="file-upload-container">
              <div className="file-input-wrapper">
                <span className="file-icon"></span>
                <div className="file-divider"></div>
                <input type="text" className="file-input" value={retirementData.decision ? retirementData.decision.name : ''} readOnly />
              </div>
              <input type="file" id="file-upload" className="file-hidden" accept=".pdf, .jpeg, .jpg" onChange={handleFileChange} />
              <label htmlFor="file-upload" className="file-button">
                Chọn tệp tải lên...
              </label>
              {error && <p className="error-message">{error}</p>}
            </div>
          </div>
          <p className="file-note">Kiểu file: .pdf, .jpeg, .jpg. Dung lượng tối đa 100MB.</p>
          {/* Button Submit */}
          <div className="button-group">
            <button type="button" className="cancel-btn" onClick={handleClose}>
              Hủy
            </button>
            <Button className={isDataValid ? 'primary' : 'secondary'} size="big" onClick={handleSave} disabled={!isDataValid}>
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResignationForm;
