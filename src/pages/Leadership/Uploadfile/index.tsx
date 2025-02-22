import React, { useState } from 'react';
import './model.css';

const App: React.FC = () => {
  const [isModalOpen, setModalOpen] = useState(false);
  const [fileName, setFileName] = useState('');
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = () => {
    if (!fileName || !file) {
      alert('Vui lòng nhập tên tệp và chọn tệp để tải lên.');
      return;
    }

    console.log('Tên tệp:', fileName);
    console.log('Tệp:', file);
    setModalOpen(false);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      const selectedFile: File = files[0];
      setFile(selectedFile);
      setFileName(selectedFile.name);
    } else {
      alert('Không có tệp nào được chọn!');
    }
  };

  return (
    <div className="container">
      
      <button className="add-button" onClick={() => setModalOpen(true)}>+ Thêm mới</button>

      {isModalOpen && (
        <div className="modal">
          <div className="modal-content">
            <h2>Tải lên file</h2>
            <div className="form-group1">
              <label>Tên đính kèm:</label>
              <input
                type="text"
                value={fileName}
                onChange={(e) => setFileName(e.target.value)}
                // placeholder="Tên tệp..."
              />
            </div>
            <div className="form-group2">
              <label>Tải file mẫu:</label>
              <a href="">[tải xuống file mẫu]</a>
            </div>
            <div className="form-group">
              <label className="custom-file-upload">
                Chọn tệp Tải lên...
                <input
                  type="file"
                  onChange={handleFileChange}
                  style={{ display: 'none' }} // Ẩn input file gốc
                />
              </label>
            </div>
            <div className="modal-buttons">
              <button className="cancel-button" onClick={() => setModalOpen(false)}>Hủy</button>
              <button className="upload-button" onClick={handleUpload}>Tải lên</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;