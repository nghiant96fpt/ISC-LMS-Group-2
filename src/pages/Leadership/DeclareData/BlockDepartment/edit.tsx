import React, { useState } from 'react';
import './style.css';
import { ModalProps } from './type';

const Modal: React.FC<ModalProps> = ({ title, code, faculty, headOfFaculty, facultyOptions, onClose, onSave }) => {
  const [facultyName, setFacultyName] = useState(faculty);
  const [selectedHead, setSelectedHead] = useState(headOfFaculty);

  return (
    <div className="modal-overlay">
      <div className="modal-container">
        <h2 className="modal-title">{title}</h2>

        <div className="modal-content">
          <div className="row">
            <label className="label">Mã khoa - khối:</label>
            <span className="text">{code}</span>
          </div>

          <div className="row">
            <label className="label">Khoa - khối:</label>
            <input type="text" value={facultyName} className="input" onChange={(e) => setFacultyName(e.target.value)} />
          </div>
          <div className="row">
            <label className="label">Trưởng khoa - khối:</label>
            <div className="select-container">
              <select className="input" value={selectedHead} onChange={(e) => setSelectedHead(e.target.value)}>
                {facultyOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        <div className="modal-footer">
          <button className="btn btn-cancel" onClick={onClose}>
            Hủy
          </button>
          <button className="btn btn-save" onClick={() => onSave()}>
            Lưu
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
