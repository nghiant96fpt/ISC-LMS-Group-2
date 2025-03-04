
import React, { useState } from "react";
import { ExamSchedule } from "./type";
import DateInput from "../CreateExamSchedule/Date";
import dayjs from 'dayjs';
import './style.css';
import vector from "../../../../assets/icons/Vector.png";
import { useNavigate } from "react-router";
import Button from "../../../../components/Button";

const teachers = ["Nguyễn Văn D", "Trần Thị D", "Lê Văn A", "Phạm Thị B"];
const allClasses = ["9A1", "9A2", "9C1", "9C2", "9B1"];
const subjects = ["Toán", "Văn", "Anh", "Lý", "Hóa", "Sinh", "Sử", "Địa", "GDCD"];

const ExamScheduleForm: React.FC = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState<ExamSchedule>({
        schoolYear: "",
        grade: "",
        classType: "Tất cả lớp",
        selectedClasses: [],
        subject: "",
        semester: "Học kỳ 1",
        duration: 0,
        examDate: "",
        gradingAssignment: {
            applyAll: true,
            selectedTeachers: [],
            classTeachers: {},
        },
    });

    const [searchTerm, setSearchTerm] = useState("");
    const [filteredClasses, setFilteredClasses] = useState<string[]>([]);
    const [showDropdown, setShowDropdown] = useState(false);
    const [showSubjectDropdown, setShowSubjectDropdown] = useState(false);

    const [teacherSearch, setTeacherSearch] = useState("");
    const [filteredTeachers, setFilteredTeachers] = useState<string[]>([]);
    const [showTeacherDropdown, setShowTeacherDropdown] = useState(false);
    const handleClose = () => {
        navigate('/leadership/exams', { replace: true });
    };

    const handleInputChange = (field: keyof ExamSchedule, value: any) => {
        setFormData((prev) => {
            let updatedData = { ...prev, [field]: value };

            // Nếu chọn "Tất cả lớp" và phân công chấm thi ở tùy chọn thì cập nhật danh sách lớp
            if (field === "classType" && value === "Tất cả lớp" && !prev.gradingAssignment.applyAll) {
                updatedData = {
                    ...updatedData,
                    selectedClasses: allClasses, // Gán tất cả lớp vào danh sách lớp chọn
                };
            }

            return updatedData;
        });
    };

    const handleGradingAssignmentChange = (newAssignment: Partial<ExamSchedule["gradingAssignment"]>) => {
        setFormData((prev) => {
            const updatedAssignment = {
                ...prev.gradingAssignment,
                ...newAssignment,
            };

            // Nếu chọn "Tùy chọn" và lớp học đang là "Tất cả lớp" thì hiển thị danh sách lớp ngay
            if (newAssignment.applyAll === false && prev.classType === "Tất cả lớp") {
                updatedAssignment.classTeachers = prev.selectedClasses.reduce((acc, className) => {
                    acc[className] = [];
                    return acc;
                }, {} as Record<string, string[]>);
            }

            return {
                ...prev,
                gradingAssignment: updatedAssignment,
            };
        });
    };

    const handleClassSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setSearchTerm(term);
        setFilteredClasses(
            allClasses.filter((cls) => cls.toLowerCase().includes(term.toLowerCase()))
        );
        setShowDropdown(true);
    };

    const addClass = (cls: string) => {
        if (!formData.selectedClasses.includes(cls)) {
            setFormData((prev) => ({
                ...prev,
                selectedClasses: [...prev.selectedClasses, cls],
            }));
        }
        setSearchTerm("");
        setFilteredClasses([]);
        setShowDropdown(false);
    };

    const removeClass = (cls: string) => {
        setFormData((prev) => ({
            ...prev,
            selectedClasses: prev.selectedClasses.filter((c) => c !== cls),
        }));
    };

    const handleSemesterChange = (semester: string) => {
        setFormData((prev) => ({ ...prev, semester }));
    };

    const handleTeacherChange = (className: string, teacher: string) => {
        setFormData((prev) => ({
            ...prev,
            gradingAssignment: {
                ...prev.gradingAssignment,
                classTeachers: {
                    ...prev.gradingAssignment.classTeachers,
                    [className]: [...(prev.gradingAssignment.classTeachers[className] || []), teacher], // Thêm giáo viên vào danh sách
                },
            },
        }));
    };

    const handleTeacherSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        const term = e.target.value;
        setTeacherSearch(term);
        setFilteredTeachers(
            teachers.filter((teacher) => teacher.toLowerCase().includes(term.toLowerCase()))
        );
        setShowTeacherDropdown(true);
    };

    const addTeacher = (teacher: string) => {
        if (!formData.gradingAssignment.selectedTeachers.includes(teacher)) {
            setFormData((prev) => ({
                ...prev,
                gradingAssignment: {
                    ...prev.gradingAssignment,
                    selectedTeachers: [...prev.gradingAssignment.selectedTeachers, teacher],
                },
            }));
        }
        setTeacherSearch("");
        setShowTeacherDropdown(false);
    };

    const addTeachers = (className: string, teacher: string) => {
        setFormData((prev) => {
            const newClassTeachers = {
                ...prev.gradingAssignment.classTeachers,
                [className]: [...(prev.gradingAssignment.classTeachers[className] || []), teacher],
            };
            console.log("Updated classTeachers:", newClassTeachers);
            return {
                ...prev,
                gradingAssignment: {
                    ...prev.gradingAssignment,
                    classTeachers: newClassTeachers,
                },
            };
        });
    };

    const removeTeacher = (teacher: string) => {
        setFormData((prev) => ({
            ...prev,
            gradingAssignment: {
                ...prev.gradingAssignment,
                selectedTeachers: prev.gradingAssignment.selectedTeachers.filter((t) => t !== teacher),
            },
        }));
    };

    return (

        <div className="p-6 max-w-3xl mx-auto rounded-2xl space-y-4">
            <h2 className="text-2xl font-bold text-center">Thêm lịch thi mới</h2>
            <div className="grid grid-cols-2 gap-4 mt-4">
                <label className="flex items-center gap-2">
                    <span className="w-1/3 font-medium mr-10">Niên khóa:</span>
                    <select className="flex-1 p-3 border rounded-lg" onChange={(e) => handleInputChange("schoolYear", e.target.value)}>
                        <option>Niên khóa</option>
                    </select>
                </label>
                <label className="flex items-center gap-2">
                    <span className="w-1/3 font-medium">Khối:</span>
                    <select className="flex-1 p-3 border rounded-lg" onChange={(e) => handleInputChange("grade", e.target.value)}>
                        <option>Khối</option>
                    </select>
                </label>
            </div>

            {/* Lớp học */}
            <div className="flex items-start gap-6">
                {/* Label */}
                <label className="font-medium whitespace-nowrap min-w-[100px] mt-1 mr-12">Lớp học *</label>

                {/* Các tùy chọn radio */}
                <div className="flex flex-wrap gap-6">
                    <div className="flex gap-4">
                        {["Tất cả lớp", "Lớp cơ bản", "Lớp nâng cao"].map((type) => (
                            <label key={type} className="flex items-center gap-2 mr-12">
                                <input type="radio" checked={formData.classType === type} onChange={() => handleInputChange("classType", type)} />
                                {type}
                            </label>
                        ))}
                    </div>

                    {/* Tùy chọn + Input (đưa xuống hàng) */}
                    <div className="flex items-center gap-2 w-full">
                        <label className="flex items-center gap-2">
                            <input type="radio" checked={formData.classType === "Tùy chọn"} onChange={() => handleInputChange("classType", "Tùy chọn")} />
                            Tùy chọn
                        </label>

                        {formData.classType === "Tùy chọn" && (
                            <div className="relative">
                                <div className="w-[422px] p-2 border rounded-lg flex flex-wrap items-center gap-2 min-h-[42px]">
                                    {formData.selectedClasses.map((cls) => (
                                        <span
                                            key={cls}
                                            className="px-3 py-1 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                                        >
                                            {cls}
                                            <button onClick={() => removeClass(cls)} className="text-white font-bold">×</button>
                                        </span>
                                    ))}
                                    <input
                                        type="text"
                                        className="flex-1 outline-none"
                                        placeholder={formData.selectedClasses.length === 0 ? "Tìm lớp..." : ""}
                                        value={searchTerm}
                                        onChange={handleClassSearch}
                                        onFocus={() => setShowDropdown(true)}
                                    />
                                </div>
                                {showDropdown && filteredClasses.length > 0 && (
                                    <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-auto z-10">
                                        {filteredClasses.map((cls) => (
                                            <li
                                                key={cls}
                                                className="p-2 hover:bg-gray-100 cursor-pointer"
                                                onClick={() => addClass(cls)}
                                            >
                                                {cls}
                                            </li>
                                        ))}
                                    </ul>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <div className="flex items-center">
                <label className="font-medium whitespace-nowrap min-w-[120px] mt-1 mr-12">Môn thi *</label>
                <div className="relative w-full">
                    <button className="w-full p-3 border rounded-lg flex justify-between items-center" onClick={() => setShowSubjectDropdown(!showSubjectDropdown)}>
                        {formData.subject || "Chọn môn thi"}
                        <img src={vector} alt="Mũi tên" />
                    </button>
                    {showSubjectDropdown && (
                        <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-auto z-10">
                            {subjects.map((subj) => (
                                <li key={subj} className="p-2 hover:bg-gray-100 cursor-pointer" onClick={() => { handleInputChange("subject", subj); setShowSubjectDropdown(false); }}>
                                    {subj}
                                </li>
                            ))}
                        </ul>
                    )}
                </div>
            </div>
            {/* Kỳ thi */}
            <div className="flex items-center gap-4">
                <label className="font-medium whitespace-nowrap min-w-[105px] mt-1 mr-12">Tên kỳ thi *</label>
                <input type="text" className="w-full p-3 border rounded-lg" value={`Thi cuối ${formData.semester}`} readOnly />
            </div>

            <div className="flex items-center gap-4">
                <label className="font-medium whitespace-nowrap min-w-[100px] mt-1 mr-14">Chọn kỳ thi</label>
                <div className="flex gap-4">
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={formData.semester === "Học kỳ 1"} onChange={() => handleSemesterChange("Học kỳ 1")} />
                        Học kỳ 1
                    </label>
                    <label className="flex items-center gap-2">
                        <input type="checkbox" checked={formData.semester === "Học kỳ 2"} onChange={() => handleSemesterChange("Học kỳ 2")} />
                        Học kỳ 2
                    </label>
                </div>
            </div>

            {/* Thời lượng bài thi */}
            <div className="flex items-center gap-4">
                <label className="font-medium whitespace-nowrap min-w-[100px] mt-1 mr-1">Thời lượng làm bài *</label>
                <div className="flex gap-2">
                    <input
                        type="number"
                        placeholder="Nhập số phút"
                        className="p-3 border rounded-lg w-48 placeholder-italic"
                        onChange={(e) => handleInputChange("duration", Number(e.target.value))}
                    />
                    <span className="flex items-center">phút</span>
                </div>
            </div>

            {/* Ngày làm bài */}
            <div className="flex items-center gap-4">
                <label className="font-medium whitespace-nowrap min-w-[120px] mt-1 mr-8">Ngày làm bài *</label>
                <DateInput
                    value={formData.examDate ? dayjs(formData.examDate, "D/M/YYYY") : null}
                    onChange={(date) => handleInputChange("examDate", date?.format("D/M/YYYY"))}
                    width="200px"
                />
            </div>

            {/* Phân công chấm thi */}
            <div className="mt-6">
                <h3 className="text-lg font-semibold">Phân công chấm thi</h3>
                <div className="flex items-center gap-4 mt-2">
                    <input
                        type="radio"
                        checked={formData.gradingAssignment.applyAll}
                        onChange={() => handleInputChange("gradingAssignment", { ...formData.gradingAssignment, applyAll: true })}
                    />
                    <span>Áp dụng cho tất cả lớp</span>
                    {formData.gradingAssignment.applyAll && (
                        <div className="flex-1 relative">
                            <div className="w-full p-2 border rounded-lg flex flex-wrap items-center gap-2 min-h-[42px]">
                                {formData.gradingAssignment.selectedTeachers.map((teacher) => (
                                    <span
                                        key={teacher}
                                        className="px-3 py-1 bg-blue-600 text-white rounded-lg flex items-center gap-2"
                                    >
                                        {teacher}
                                        <button onClick={() => removeTeacher(teacher)} className="text-white font-bold">×</button>
                                    </span>
                                ))}
                                <input
                                    type="text"
                                    className="flex-1 outline-none"
                                    placeholder={formData.gradingAssignment.selectedTeachers.length === 0 ? "Tìm giáo viên..." : ""}
                                    value={teacherSearch}
                                    onChange={handleTeacherSearch}
                                    onFocus={() => setShowTeacherDropdown(true)}
                                />
                            </div>
                            {showTeacherDropdown && filteredTeachers.length > 0 && (
                                <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-auto z-10">
                                    {filteredTeachers.map((teacher) => (
                                        <li
                                            key={teacher}
                                            className="p-2 hover:bg-gray-100 cursor-pointer"
                                            onClick={() => addTeacher(teacher)}
                                        >
                                            {teacher}
                                        </li>
                                    ))}
                                </ul>
                            )}
                        </div>
                    )}
                </div>
                <div className="flex items-center gap-4 mt-2">
                    <input
                        type="radio"
                        checked={!formData.gradingAssignment.applyAll}
                        onChange={() => handleGradingAssignmentChange({ applyAll: false })}
                    />
                    <span>Tùy chọn</span>
                </div>

                {/* {!formData.gradingAssignment.applyAll && (
                    <div className="mt-4">
                        {formData.selectedClasses.map((cls) => (
                            <div key={cls} className="flex items-center gap-4 mt-2">
                                <span className="w-16 font-medium">{cls}</span>
                                <div className="flex-1 relative">
                                    <div className="w-full p-2 border rounded-lg flex flex-wrap items-center gap-2 min-h-[42px]">
                                        {formData.gradingAssignment.classTeachers[cls]?.map((teacher) => (
                                            <span key={teacher} className="px-3 py-1 bg-blue-600 text-white rounded-lg flex items-center gap-2">
                                                {teacher}
                                                <button onClick={() => removeTeacher(teacher)} className="text-white font-bold">×</button>
                                            </span>
                                        ))}
                                        <input
                                            type="text"
                                            className="flex-1 outline-none"
                                            placeholder={formData.gradingAssignment.selectedTeachers.length === 0 ? "Tìm giáo viên..." : ""}
                                            value={teacherSearch}
                                            onChange={handleTeacherSearch}
                                            onFocus={() => setShowTeacherDropdown(true)}
                                        />
                                    </div>
                                    {showTeacherDropdown && filteredTeachers.length > 0 && (
                                        <ul className="absolute w-full bg-white border rounded-lg mt-1 max-h-40 overflow-auto z-10">
                                            {filteredTeachers.map((teacher) => (
                                                <li
                                                    key={teacher}
                                                    className="p-2 hover:bg-gray-100 cursor-pointer"
                                                    onClick={() => addTeacher(teacher)}
                                                >
                                                    {teacher}
                                                </li>
                                            ))}
                                        </ul>
                                    )}
                                </div>
                            </div>
                        ))}
                    </div>
                )
                } */}
            </div >
            {/* Nút Hủy & Lưu */}
            <div className="mt-6 flex justify-center gap-x-4">
                <button className="w-40 px-5 py-3 bg-gray-300 rounded-lg font-medium" onClick={handleClose}>Hủy</button>
                <button className="w-40 px-5 py-3 bg-gray-400 text-white rounded-lg font-medium">Lưu</button>
            </div>
        </div >


    );
};

export default ExamScheduleForm;
