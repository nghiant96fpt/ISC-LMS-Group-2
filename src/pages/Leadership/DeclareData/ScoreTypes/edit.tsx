import React, { useState, useEffect } from 'react';
import { GradeTypeFormData } from './type';
import './style.css';
import Button from '../../../../components/Button';

const EditGradeTypeModal: React.FC = () => {
    const sampleData: GradeTypeFormData = {
        gradeTypeName: "Kiểm tra giữa kỳ",
        coefficient: "2",
        semester1: "3",
        semester2: "2"
    };

    const [formData, setFormData] = useState<GradeTypeFormData>(sampleData);
    const [isOpen, setIsOpen] = useState(false);

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
            console.log('Form submitted:', formData);
            setIsOpen(false);
        }
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    if (!isOpen) return null;

    return (
        <div className="add-grade-modal__overlay" onClick={handleClose}>
            <div className="add-grade-modal__content" onClick={(e) => e.stopPropagation()}>
                <h2 className="add-grade-modal__title">Sửa loại điểm</h2>
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
                        <Button disabled={!isFormValid} className='primary' size='big'>Lưu</Button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default EditGradeTypeModal;