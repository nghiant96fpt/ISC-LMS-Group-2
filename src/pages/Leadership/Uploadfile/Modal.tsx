import React from 'react';
import './model.css';

interface ModalProps {
  isVisible: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isVisible, onClose }) => {
  if (!isVisible) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-container">
        <h2 className="modal-title">Tải lên file</h2>
        
        {/* Hàng tải lên file */}
        <div className="file-upload">
          <label className="upload-label">Tệp đính kèm:</label>
          <input type="text" className="file-input" placeholder="Nhập tên file..." />
          <button className="choose-button">Chọn tệp tải lên</button>
        </div>

        {/* Hàng tải file mẫu */}
        <div className="file-upload">
          <label className="upload-label">Tải file mẫu:</label>
          <button className="choose-button">Tải xuống file mẫu</button>
        </div>


        <div className="button-group">
          <button onClick={onClose} className="cancel-button">
            Hủy
          </button>
          <button className="upload-button">
            Tải lên
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;