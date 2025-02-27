import React, { useState, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './style.css';

const ResignationForm: React.FC = () => {
  const navigate = useNavigate();
  const [ngay, setNgay] = useState('');
  const [ghiChu, setGhiChu] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState('');
  const dateInputRef = useRef<HTMLInputElement | null>(null);

  const handleClose = () => {
    navigate('/leadership/all-teacher-profiles', { replace: true });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = e.target.files?.[0];

    if (selectedFile) {
      const allowedFormats = ['application/pdf', 'image/jpeg', 'image/jpg'];
      const maxSize = 100 * 1024 * 1024; // 100MB

      if (!allowedFormats.includes(selectedFile.type)) {
        setError('Chỉ chấp nhận file .pdf, .jpeg, .jpg.');
        setFile(null);
        return;
      }
      if (selectedFile.size > maxSize) {
        setError('Dung lượng file vượt quá 100MB.');
        setFile(null);
        return;
      }

      setError('');
      setFile(selectedFile);
    }
  };

  const openDatePicker = () => {
    if (dateInputRef.current) {
      dateInputRef.current.showPicker(); // Hiển thị lịch
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    navigate('/leadership/all-teacher-profiles');
  };

  // Di chuyển isFormValid ra ngoài để cập nhật chính xác
  const isFormValid = ngay.trim() !== '' && ghiChu.trim() !== '' && file !== null;

  return (
    <>
      <div className="overlay"></div>
      <div className="form-container">
        <h2 className="title">Cập nhật nghỉ việc</h2>
        <form onSubmit={handleSubmit}>
          {/* Chọn ngày nghỉ */}
          <div className="row">
            <label className="title2">
              Ngày nghỉ: <span className="required">*</span>
            </label>
            <div className="input-main" onClick={openDatePicker}>
              <input
                type="date"
                id="date-picker"
                ref={dateInputRef}
                value={ngay}
                onChange={(e) => setNgay(e.target.value)}
                required
                className="hidden-input"
              />
              <span className={`date-display ${ngay ? 'has-value' : ''}`}>{ngay ? new Date(ngay).toLocaleDateString('vi-VN') : 'dd/MM/yyyy'}</span>
              <span className="calendar-icon"></span>
            </div>
          </div>

          {/* Ghi chú */}
          <div className="row">
            <label className="title2-note">
              Ghi chú: <span className="required">*</span>
            </label>
            <textarea
              className="note-textarea"
              placeholder="Lorem ipsum dolor sit amet..."
              value={ghiChu}
              onChange={(e) => setGhiChu(e.target.value)}
              required
            />
          </div>

          {/* File Upload */}
          <div className="row">
            <label className="title2">Quyết định nghỉ việc:</label>
            <div className="file-upload-container">
              <div className="file-input-wrapper">
                <span className="file-icon"></span>
                <div className="file-divider"></div>
                <input type="text" className="file-input" value={file ? file.name : ''} readOnly />
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
            <button type="submit" className={`submit-btn ${isFormValid ? 'active' : 'disabled'}`} disabled={!isFormValid}>
              Lưu
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default ResignationForm;
