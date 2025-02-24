import React, { useState } from 'react';
import './style.css';
import { useNavigate } from "react-router-dom";
import Button from '../../../../components/Button';

const AddDepartment: React.FC = () => {
    const [facultyCode, setFacultyCode] = useState('');
    const [facultyName, setFacultyName] = useState('');
    const [selectedHead, setSelectedHead] = useState('');
    const facultyOptions = ['Trần Thị B', 'Nguyễn Văn C'];
    const navigate = useNavigate();

    const handleClose = () => {
        navigate("/leadership/declare-data/block-department", { replace: true });
    };

    const handleSave = () => {
        console.log("Dữ liệu đã lưu:", { facultyCode, facultyName, selectedHead });
        alert("Lưu thành công!");
        navigate("/leadership/declare-data/block-department");
    };

    // Kiểm tra nếu có đầy đủ dữ liệu
    const isDataValid = facultyCode && facultyName && selectedHead;

    return (
        <div className="modal-overlay">
            <div className="modal-container">
                <h2 className="modal-title">Thêm Khoa - Khối</h2>

                <div className="modal-content">
                    <div className="row">
                        <label className="label">Mã khoa - khối:</label>
                        <input
                            type="text"
                            value={facultyCode}
                            className="input-50"
                            onChange={(e) => setFacultyCode(e.target.value)}
                            placeholder="Nhập mã khoa - khối"
                        />
                    </div>
                    <div className="row">
                        <label className="label">Tên khoa - khối:</label>
                        <input
                            type="text"
                            value={facultyName}
                            className="input"
                            onChange={(e) => setFacultyName(e.target.value)}
                            placeholder="Nhập tên khoa - khối"
                        />
                    </div>
                    <div className="row">
                        <label className="label">Trưởng khoa - khối:</label>
                        <div className="select-container">
                            <select
                                className="input"
                                value={selectedHead}
                                onChange={(e) => setSelectedHead(e.target.value)}
                            >
                                <option value="">Chọn trưởng khoa - khối</option>
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
                    <Button className="secondary" size="big" onClick={handleClose}>
                        Hủy
                    </Button>
                    <Button
                        className={isDataValid ? "primary" : "secondary"}
                        size="big"
                        onClick={handleSave}
                        disabled={!isDataValid}
                    >
                        Lưu
                    </Button>
                </div>
            </div>
        </div>
    );
};

export default AddDepartment;
