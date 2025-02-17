import React, { useState } from "react";
import { DepartmentSettingsProps } from "./type";

const minus = require("../../assets/icons/icon_minus.png");
const plus = require("../../assets/icons/icon_plus.png");
const caretdown = require("../../assets/icons/caret_down.png");

export const DepartmentSettings: React.FC = () => {
    const departmentData: DepartmentSettingsProps = {
        departmentName: "Khoa học tự nhiên",
        headOfDepartment: ["Trần Thị B", "Nguyễn Văn A", "Lê Thị C"],
        subjects: ["Toán", "Hóa", "Ngữ Văn", "Sinh", "Lý"],
    };

    const [selectedHead, setSelectedHead] = useState(departmentData.headOfDepartment[0]);

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-2xl p-6 w-[884px] h-[539px] shadow-lg flex flex-col justify-between">
                <form className="w-full pt-3 px-[60px] pb-10">
                    <h2 className="text-black-text text-center text-2xl font-bold mb-5">Thiết lập Tổ - Bộ môn</h2>

                    <div className="flex items-center justify-between mb-4">
                        <label className="w-3/12 text-black-text font-bold text-base">Tổ - Bộ môn:</label>
                        <input type="text"
                            className="w-9/12 p-2 border border-gray-300 rounded-lg text-gray-700 cursor-pointer"
                            value={departmentData.departmentName} readOnly
                        />
                    </div>

                    <div className="flex items-center justify-between mb-4">
                        <label className="w-3/12 text-black-text font-bold text-base">Trưởng tổ - Bộ môn:</label>
                        <div className="w-9/12 relative flex-1 w-full">
                            <select className="w-full p-2 border border-gray-300 rounded-lg text-gray-700 appearance-none"
                                value={selectedHead} onChange={(e) => setSelectedHead(e.target.value)}
                            >
                                {departmentData.headOfDepartment.map((name, index) => (
                                    <option key={index} value={name}>{name}</option>
                                ))}
                            </select>
                            <img src={caretdown} alt="Dropdown"
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 w-8 h-8 pointer-events-none"
                            />
                        </div>
                    </div>

                    <hr className="my-6 border-gray-300" />

                    <div className="flex flex-col items-start w-full">
                        <p className="text-orange-text font-bold text-base mb-5">Danh sách môn học</p>
                        <div className="grid grid-cols-3 gap-4 w-full">
                            {departmentData.subjects.map((subject, index) => (
                                <div key={index} className="flex items-center gap-3 rounded-lg text-sm">
                                    <img src={minus} alt="Remove" className="w-5 cursor-pointer" />
                                    <span>{subject}</span>
                                </div>
                            ))}
                        </div>
                        <button className="mt-4 text-blue-text font-bold flex items-center">
                            <img src={plus} alt="Add" className="w-5 mr-2" /> Thêm môn học mới
                        </button>
                    </div>

                    <div className="flex justify-center gap-4 mt-10">
                        <button className="w-40 py-2 bg-gray-300 text-gray-700 font-bold rounded-lg">Hủy</button>
                        <button className="w-40 py-2 bg-orange-text text-white font-bold rounded-lg">Lưu</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default DepartmentSettings;
