import React, { useState, useEffect } from 'react';
import { GradeTypeFormData } from './type';
import './style.css';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router';

const AddGradeTypeModal: React.FC = () => {
    const [formData, setFormData] = useState<GradeTypeFormData>({
        gradeTypeName: '',
        coefficient: '',
        semester1: '',
        semester2: ''
    });

    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    // Mở modal khi component mount
    useEffect(() => {
        setIsOpen(true);
    }, []);

    const isFormValid = formData.gradeTypeName && formData.coefficient;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            console.log('Submitted Data:', formData); // Xử lý dữ liệu tại đây
            setFormData({ gradeTypeName: '', coefficient: '', semester1: '', semester2: '' });
            setIsOpen(false); // Đóng modal sau khi submit
        }
    };
    const handleClose = () => {
        navigate("/leadership/declare-data/score-types", { replace: true });
    };
    return (
        <>
            {isOpen && (
                <div className="add-grade-modal__overlay" onClick={() => setIsOpen(false)}>
                    <div className="add-grade-modal__content" onClick={(e) => e.stopPropagation()}>
                        <h2 className="add-grade-modal__title">Thêm loại điểm mới</h2>
                        <form onSubmit={handleSubmit}>
                            <div className="add-grade-modal__form-row">
                                <div className="add-grade-modal__form-group gradeTypeName">
                                    <label className="add-grade-modal__label">
                                        Tên loại điểm:<span className="add-grade-modal__required"> *</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="gradeTypeName"
                                        value={formData.gradeTypeName}
                                        onChange={handleChange}
                                        className="add-grade-modal__input"
                                        placeholder="Nhập tên loại điểm"
                                    />
                                </div>

                                <div className="add-grade-modal__form-group coefficient">
                                    <label className="add-grade-modal__label">Hệ số:</label>
                                    <select
                                        name="coefficient"
                                        value={formData.coefficient}
                                        onChange={handleChange}
                                        className="add-grade-modal__select"
                                    >
                                        <option value="">Hệ số điểm</option>
                                        <option value="1">1</option>
                                        <option value="2">2</option>
                                        <option value="3">3</option>
                                    </select>
                                </div>
                            </div>

                            <div>
                                <p className="add-grade-modal__section-title">Số cột điểm tối thiểu</p>
                                <div className="add-grade-modal__semester-row">
                                    <div className="add-grade-modal__semester-input">
                                        <label className="add-grade-modal__label">Học kì I:</label>
                                        <input
                                            type="text"
                                            name="semester1"
                                            value={formData.semester1}
                                            onChange={handleChange}
                                            className="add-grade-modal__input"
                                        />
                                    </div>
                                    <div className="add-grade-modal__semester-input">
                                        <label className="add-grade-modal__label">Học kì II:</label>
                                        <input
                                            type="text"
                                            name="semester2"
                                            value={formData.semester2}
                                            onChange={handleChange}
                                            className="add-grade-modal__input"
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="add-grade-modal__button-group">

                                <Button onClick={handleClose} className='secondary' size='big'>Hủy</Button>
                                <Button disabled={!isFormValid} className={`${isFormValid ? 'primary' : 'secondary'}`} size='big'>Lưu</Button>



                            </div>
                        </form>
                    </div>
                </div>
            )}
        </>
    );
};

export default AddGradeTypeModal;
