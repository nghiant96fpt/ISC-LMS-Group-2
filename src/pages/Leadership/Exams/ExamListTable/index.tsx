import { useState } from "react";
import Calendar from "./Calendar";
import ExamList from "./ExamList";

const ExamPage = () => {
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "calendar">("table");

    return (
        <div className="flex flex-col gap-4 p-5 w-full max-w-6xl mx-auto">
            {/* Tiêu đề trang */}
            <h1 className="text-2xl font-bold text-gray-800 text-left">Quản lý bài thi</h1>

            {/* Phần header quản lý lịch thi */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                {/* Group chứa select và nút công tắc */}
                <div className="flex flex-wrap gap-2 items-center">
                    <select className="border border-gray-300 p-2 rounded">
                        <option>2020-2021</option>
                    </select>
                    <select className="border border-gray-300 p-2 rounded">
                        <option>Chọn lớp</option>
                    </select>
                    <select className="border border-gray-300 p-2 rounded">
                        <option>Chọn Khối</option>
                    </select>

                    {/* Nút chuyển đổi dạng công tắc */}
                    <div className="flex bg-gray-200 rounded-full p-1">
                        <button
                            className={`px-4 py-2 rounded-full transition ${
                                viewMode === "table"
                                    ? "bg-black text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => setViewMode("table")}
                        >
                            Xem theo bảng
                        </button>
                        <button
                            className={`px-4 py-2 rounded-full transition ${
                                viewMode === "calendar"
                                    ? "bg-black text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => setViewMode("calendar")}
                        >
                            Xem theo lịch
                        </button>
                    </div>
                </div>

                {/* Nút thêm mới */}
                <button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center">
                    + Thêm mới
                </button>
            </div>

            {/* Phần nội dung */}
            <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                <div className="w-full md:w-3/4">
                    <Calendar setSelectedDate={setSelectedDate} />
                </div>
                <div className="w-full md:w-1/4">
                    <ExamList selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
