import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import createAxiosInstance from '../../../../utils/axiosInstance';

import calendar from '../../../../assets/icons/icon-calendar.png';
import paper from '../../../../assets/icons/u_paperclip.png';
import Loading from '../../../../components/Loading';
import Button from '../../../../components/Button';
import AlertwithIcon from '../../../../components/AlertwithIcon';

import { TrainingProgramForm, Teacher } from '../AddTraining/type';
import { SchoolFacilitie, Major } from '../TrainingList/type';
import { DropdownOption } from '../../../../components/Dropdown/type';

const API_URL = process.env.REACT_APP_API_URL;
const axiosInstance = createAxiosInstance(true);

const EditTrainingProgram: React.FC = () => {
    const { id } = useParams<{ id: string }>();
    const [form, setForm] = useState<TrainingProgramForm>({
        name: '',
        institution: 0,
        major: 0,
        startDate: '',
        endDate: '',
        filename: '',
        method: '',
        degree: '',
        attachment: null,
    });

    const [schoolList, setSchoolList] = useState<SchoolFacilitie[]>([]);
    const [majorList, setMajorList] = useState<Major[]>([]);
    const [loading, setLoading] = useState(false);
    const [alert, setAlert] = useState<{ message: string; type: 'success' | 'error' } | null>(null);
    const [errors, setErrors] = useState({
        institution: '',
        major: '',
        startDate: '',
        endDate: '',
        method: '',
        degree: '',
        name: '',
    });

    // 🔁 Lấy dữ liệu ban đầu của chương trình
    useEffect(() => {
        setLoading(true);
        axiosInstance.get(`${API_URL}/training-program/${id}`)
            .then((res) => {
                const data = res.data.data;
                setForm({
                    name: data.name,
                    institution: data.schoolFacilitiesId,
                    major: data.majorId,
                    startDate: data.startDate,
                    endDate: data.endDate,
                    filename: data.fileName || '',
                    method: data.trainingForm,
                    degree: data.degree,
                    attachment: null,
                });
            })
            .catch((err) => {
                console.error(err);
                setAlert({ message: 'Không thể tải dữ liệu chương trình đào tạo.', type: 'error' });
            })
            .finally(() => setLoading(false));
    }, [id]);

    // 🔁 Lấy danh sách cơ sở và chuyên ngành
    useEffect(() => {
        axiosInstance.get(`${API_URL}/schools`).then((res) => setSchoolList(res.data.data));
        axiosInstance.get(`${API_URL}/major`).then((res) => setMajorList(res.data.data));
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value, type, files } = e.target as HTMLInputElement;

        if (type === 'file' && files) {
            const file = files[0];
            if (file) {
                setForm((prev) => ({
                    ...prev,
                    attachment: file
                }));
            }
        } else {
            setForm((prev) => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const validateForm = () => {
        const newErrors: typeof errors = {
            institution: '',
            major: '',
            startDate: '',
            endDate: '',
            method: '',
            degree: '',
            name: '',
        };

        if (!form.name) newErrors.name = 'Vui lòng nhập tên chương trình đào tạo';
        if (!form.institution) newErrors.institution = 'Vui lòng chọn cơ sở đào tạo';
        if (!form.major) newErrors.major = 'Vui lòng chọn chuyên ngành';
        if (!form.startDate) newErrors.startDate = 'Vui lòng chọn ngày bắt đầu';
        if (!form.endDate) newErrors.endDate = 'Vui lòng chọn ngày kết thúc';
        else if (form.endDate < form.startDate) newErrors.endDate = 'Ngày kết thúc phải sau ngày bắt đầu';
        if (!form.method) newErrors.method = 'Vui lòng nhập hình thức đào tạo';
        if (!form.degree) newErrors.degree = 'Vui lòng nhập văn bằng/chứng chỉ';

        setErrors(newErrors);
        return Object.values(newErrors).every((e) => e === '');
    };

    const handleSubmit = async () => {
        if (!validateForm()) return;

        setLoading(true);
        setAlert(null);

        const payload = {
            name: form.name,
            majorId: Number(form.major),
            schoolFacilitiesId: Number(form.institution),
            startDate: form.startDate,
            endDate: form.endDate,
            degree: form.degree,
            trainingForm: form.method,
            fileName: form.attachment?.name || form.filename,
            filePath: form.attachment?.name || form.filename,
        };

        try {
            await axiosInstance.put(`${API_URL}/training-program/${id}`, payload);
            setAlert({ message: 'Cập nhật chương trình đào tạo thành công!', type: 'success' });
        } catch (err) {
            console.error(err);
            setAlert({ message: 'Cập nhật thất bại.', type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="container mx-auto px-4 py-6">
            <Loading isLoading={loading} />
            {alert && <AlertwithIcon message={alert.message} type={alert.type} icon="" />}

            <h1 className="text-xl font-semibold mb-4">Chỉnh sửa chương trình đào tạo</h1>

            {/* Form tương tự như AddTrainingProgram */}
            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label>Tên chương trình</label>
                    <input className="form-input" name="name" value={form.name} onChange={handleChange} />
                    {errors.name && <span className="text-red-500">{errors.name}</span>}
                </div>
                <div>
                    <label>Cơ sở đào tạo</label>
                    <select className="form-select" name="institution" value={form.institution} onChange={handleChange}>
                        <option value="">-- Chọn --</option>
                        {schoolList.map((s) => (
                            <option key={s.id} value={s.id}>{s.name}</option>
                        ))}
                    </select>
                    {errors.institution && <span className="text-red-500">{errors.institution}</span>}
                </div>
                <div>
                    <label>Chuyên ngành</label>
                    <select className="form-select" name="major" value={form.major} onChange={handleChange}>
                        <option value="">-- Chọn --</option>
                        {majorList.map((m) => (
                            <option key={m.id} value={m.id}>{m.name}</option>
                        ))}
                    </select>
                    {errors.major && <span className="text-red-500">{errors.major}</span>}
                </div>
                <div>
                    <label>Ngày bắt đầu</label>
                    <input className="form-input" type="date" name="startDate" value={form.startDate} onChange={handleChange} />
                    {errors.startDate && <span className="text-red-500">{errors.startDate}</span>}
                </div>
                <div>
                    <label>Ngày kết thúc</label>
                    <input className="form-input" type="date" name="endDate" value={form.endDate} onChange={handleChange} />
                    {errors.endDate && <span className="text-red-500">{errors.endDate}</span>}
                </div>
                <div>
                    <label>Văn bằng/Chứng chỉ</label>
                    <input className="form-input" name="degree" value={form.degree} onChange={handleChange} />
                    {errors.degree && <span className="text-red-500">{errors.degree}</span>}
                </div>
                <div>
                    <label>Hình thức đào tạo</label>
                    <input className="form-input" name="method" value={form.method} onChange={handleChange} />
                    {errors.method && <span className="text-red-500">{errors.method}</span>}
                </div>
                <div>
                    <label>File đính kèm</label>
                    <input type="file" name="attachment" onChange={handleChange} />
                </div>
            </div>

            <div className="mt-6">
                <Button onClick={handleSubmit} className="primary">
                    Cập nhật
                </Button>
            </div>
        </div>
    );
};

export default EditTrainingProgram;
