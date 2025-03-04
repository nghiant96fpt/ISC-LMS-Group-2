import React, { useRef, useState } from "react";
import SearchInput from "../../SearchTable";
import Button from "../../Button";

import caretdown from "../../../assets/icons/icon-arrow-down.png";
import fiarrowright from "../../../assets/icons/icon-arrow-right.png";
import fiflus from "../../../assets/icons/fi_plus_white.png";
import fitrash from "../../../assets/icons/fi_trash-2.png";
import fiedit from "../../../assets/icons/icon-fi_edit.png";
import fiarrowupdown from "../../../assets/icons/u_arrow up down.png";
import { trainingData } from "./data";

const TrainingList: React.FC = () => {
    const [searchValue, setSearchValue] = useState("");
    const [isExpanded, setIsExpanded] = useState(false);
    const headerRef = useRef<HTMLDivElement | null>(null);

    const toggleExpand = () => {
        setIsExpanded((prev) => !prev);

        if (headerRef.current) {
            if (isExpanded) {
                headerRef.current.classList.remove("bg-background-orange-1", "text-white");
                headerRef.current.classList.add("bg-white", "text-black-text");
            } else {
                headerRef.current.classList.remove("bg-white", "text-black-text");
                headerRef.current.classList.add("bg-background-orange-1", "text-white");
            }
        }
    };

    return (
        <div className="bg-white border border-gray-300 rounded-lg w-full shadow max-w-[1640px] max-h-[464px] w-full overflow-hidden">
            <div
                ref={headerRef}
                className={`h-14 flex items-center px-4 rounded-t-lg cursor-pointer border-b border-gray-300 bg-white text-black-text`}
                onClick={toggleExpand}
            >
                <img
                    src={isExpanded ? caretdown : fiarrowright}
                    className={`${isExpanded ? "w-5 h-4" : "w-4 h-5"} mr-2`}
                    alt="Dropdown"
                />
                <span className="font-semibold text-lg pl-2">Thông tin đào tạo</span>
            </div>
            {isExpanded && (
                <div className="px-10 pt-1 pb-10">
                    <div className="flex justify-between items-center my-4">
                        <SearchInput
                            placeholder="Tìm kiếm"
                            value={searchValue}
                            onChange={(e) => setSearchValue(e.target.value)}
                        />
                        <Button className="primary">
                            <img src={fiflus} alt="Add Icon" />
                            Thêm
                        </Button>
                    </div>

                    <div className="border border-gray-300 rounded-lg overflow-hidden bg-white">
                        <div className="bg-gray-900 text-while-text grid grid-cols-7 p-3 text-center font-semibold rounded-t-lg">
                            <span className="flex items-center justify-center gap-1">
                                Cơ quan/ Đơn vị
                                <img src={fiarrowupdown} alt="arrow up down Icon" className="w-5 h-5" />
                            </span>
                            <span>Chuyên ngành</span>
                            <span>Ngày bắt đầu</span>
                            <span>Ngày kết thúc</span>
                            <span>Văn bằng/ Chứng chỉ</span>
                            <span>Hình thức</span>
                            <span>Hành động</span>
                        </div>
                        {trainingData.map((item, index) => (
                            <div
                                key={item.id}
                                className={`grid grid-cols-7 p-3 text-center border-b border-gray-200 ${index % 2 === 0 ? "bg-gray-50" : "bg-white"
                                    }`}
                            >
                                <span>{item.organization}</span>
                                <span>{item.specialization}</span>
                                <span>{item.startDate}</span>
                                <span className={item.endDate === "Chưa xác định" ? "italic text-gray-500" : ""}>
                                    {item.endDate}
                                </span>
                                <span>{item.degree}</span>
                                <span>{item.form}</span>
                                <span className="flex justify-center gap-2">
                                    <button>
                                        <img src={fiedit} alt="Edit Icon" className="w-5 h-5" />
                                    </button>
                                    <button>
                                        <img src={fitrash} alt="Trash Icon" className="w-5 h-5" />
                                    </button>
                                </span>
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </div>
    );
};

export default TrainingList;
