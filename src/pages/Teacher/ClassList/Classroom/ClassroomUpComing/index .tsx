import React, { useState } from "react";
import DropdownSelectionComponent from "../../../../../components/DropdownSelection";
import SearchInputProps from "../../../../../components/SearchInput";
import { Classroom } from "../data/type";
import { classrooms as initialClassrooms } from "../data/data";
import icon from "./icon";
import Button from "../../../../../components/Button";
const ClassroomUpComing: React.FC = () => {
    const nestOptions = ["Tổ 1", "Tổ 2", "Tổ 3"];
    const subjectOptions = ["Tiếng Anh", "Toán"];

    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [classrooms, setClassrooms] = useState<Classroom[]>(initialClassrooms);
    return (<div className="flex flex-col h-full w-full">
        <div className="flex items-center justify-between mb-3 px-2 md:px-10 w-full">
            <div className="flex space-x-8">
                <div>
                    <div className="text-lg font-bold">Chọn tổ</div>
                    <DropdownSelectionComponent width={"12rem"} placeholder="Chọn tổ..." options={nestOptions} />
                </div>
                <div>
                    <div className="text-lg font-bold">Chọn bộ môn</div>
                    <DropdownSelectionComponent width={"8rem"} placeholder="Chọn bộ môn..." options={subjectOptions} />
                </div>
            </div>
            <SearchInputProps placeholder="Tìm kiếm theo topic..." />
        </div>

        {/* Bảng dữ liệu */}
        <div className="overflow-x-auto flex-grow px-2 md:px-10 w-full">
            <table className="table-fixed w-full border-collapse overflow-hidden rounded-t-lg">
                <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
                    <tr>
                        <th className="py-3 px-2 md:px-4 text-left">
                            <div className="flex items-center gap-2 font-sans">
                                <span>Mã lớp</span>
                            </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 text-left">
                            <div className="flex items-center gap-2 font-sans">
                                <span>Mã môn học</span>
                                <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                            </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 text-left">
                            <div className="flex items-center gap-2 font-sans">
                                <span>Thời gian</span>
                                <img src={icon.arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                            </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 text-left">
                            <div className="flex items-center gap-2 font-sans">
                                <span>Giảng viên</span>
                            </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 text-left">
                            <div className="flex items-center gap-2 font-sans">

                            </div>
                        </th>
                        <th className="py-3 px-2 md:px-4 text-right"></th>
                    </tr>
                </thead>
                <tbody >
                    {classrooms.map((item, index) => (
                        <tr key={index} className={`border-b ${index % 2 === 1 ? "bg-gray-100" : ""}`}>
                            <td className="py-3 px-2 md:px-4">{item.classCode}</td>
                            <td className="py-3 px-2 md:px-4">{item.subjectCode}</td>
                            <td className="py-3 px-2 md:px-4">{item.time}</td>
                            <td className="py-3 px-2 md:px-4">{item.lecturer}</td>
                            <td className="py-3 px-2 md:px-4 text-left">

                            </td>
                            <td className="py-3 px-2 md:px-4 text-center">
                                <img src={icon.infoOutline} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>

        {/* Thanh phân trang */}
        <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
            <div className="flex items-center space-x-2 font-sans">
                <span>Hiển thị</span>
                <input
                    type="number"
                    value={itemsPerPage}
                    onChange={(e) => setItemsPerPage(Number(e.target.value))}
                    className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
                />
                <span>hàng trong mỗi trang</span>
            </div>

            <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
                <button>
                    <img src={icon.left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
                </button>
                <button className="text-black-text">1</button>
                <button className="w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium">
                    2
                </button>
                <button className="text-black">3</button>
                <button className="text-black">...</button>
                <button className="text-black">100</button>
                <button>
                    <img src={icon.right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
                </button>
            </div>
        </div>
    </div>);
}
export default ClassroomUpComing;