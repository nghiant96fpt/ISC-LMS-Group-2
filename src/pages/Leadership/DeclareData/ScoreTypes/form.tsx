import React, { useEffect, useState } from 'react';
import { GradeTypeFormData } from './type';
import './style.css';

interface AddGradeTypeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: GradeTypeFormData) => void;
    initialData?: GradeTypeFormData; // Dữ liệu truyền vào khi sửa
}

const AddGradeTypeModal: React.FC<AddGradeTypeModalProps> = ({ isOpen, onClose, onSubmit, initialData }) => {
    const [formData, setFormData] = useState<GradeTypeFormData>({
        gradeTypeName: '',
        coefficient: '',
        semester1: '',
        semester2: '',
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData); // Set dữ liệu khi sửa
        } else {
            setFormData({
                gradeTypeName: '',
                coefficient: '',
                semester1: '',
                semester2: '',
            }); // Reset form khi thêm mới
        }
    }, [initialData, isOpen]);

    const isFormValid = formData.gradeTypeName && formData.coefficient;

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (isFormValid) {
            onSubmit(formData); // Gửi dữ liệu về component cha
            onClose();
        }
    };

    const handleCancel = () => {
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className="add-grade-modal__overlay" onClick={onClose}>
            <div
                className="add-grade-modal__content"
                onClick={(e) => e.stopPropagation()}
            >
                <h2 className="add-grade-modal__title">
                    {initialData ? 'Sửa loại điểm' : 'Thêm loại điểm mới'}
                </h2>
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
                                <option value="" >Hệ số điểm</option>
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
                        <button
                            type="button"
                            onClick={handleCancel}
                            className="add-grade-modal__button add-grade-modal__button--cancel"
                        >
                            Hủy
                        </button>
                        <button
                            type="submit"
                            disabled={!isFormValid}
                            className={`add-grade-modal__button add-grade-modal__button--save ${isFormValid ? 'enabled' : 'disabled'}`}
                        >
                            Lưu
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddGradeTypeModal;
