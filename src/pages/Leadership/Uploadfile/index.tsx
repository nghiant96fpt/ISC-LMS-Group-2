// UploadFile.tsx
import React, { useState } from 'react';
import Modal from './Modal'; // Đảm bảo đường dẫn đúng

const UploadFile: React.FC = () => {
  const [isModalVisible, setModalVisible] = useState(false);

  const handleOpenModal = () => {
    setModalVisible(true);
  };

  const handleCloseModal = () => {
    setModalVisible(false);
  };

  return (
    <div>
      <button onClick={handleOpenModal} className="bg-green-500 text-white py-2 px-4 rounded">
        Mở Tải Lên File
      </button>
      <Modal isVisible={isModalVisible} onClose={handleCloseModal}>
        <h1 className="text-2xl font-bold">Tải lên file</h1>
        <div className="upload-form">
          <label htmlFor="file-upload" className="upload-label">
            Tệp đính kèm:
          </label>
          <input type="file" id="file-upload" className="file-input" />
          <p className="file-name">Chưa chọn file</p>
          <button className="cancel-button">Hủy</button>
          <button className="upload-button">Tải lên</button>
        </div>
      </Modal>
    </div>
  );
};

export default UploadFile;