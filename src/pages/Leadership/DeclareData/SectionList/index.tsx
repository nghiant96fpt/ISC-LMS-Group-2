import React, { useRef, useState, useEffect } from 'react';
import { Section as initialSections } from './data';
const trash = require('../../../../assets/icons/fi_trash-2.png');
const edit = require('../../../../assets/icons/fi_edit.png');
const left = require('../../../../assets/icons/arrow left.png');
const right = require('../../../../assets/icons/chevron_big_right.png');
const search = require('../../../../assets/icons/fi_search.png');
const arrow = require('../../../../assets/icons/u_arrow up down.png');

const SectionList: React.FC = () => {
    const [selectedSections, setSelectedSections] = useState<string[]>([]);
    const [sections] = useState(initialSections);
    const [itemsPerPage, setItemsPerPage] = useState(8);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const selectAllRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        if (selectAllRef.current) {
            selectAllRef.current.indeterminate = selectedSections.length > 0 && selectedSections.length < sections.length;
        }
    }, [selectedSections]);

    const handleSelectAll = () => {
        if (selectedSections.length === sections.length) {
            setSelectedSections([]);
        } else {
            setSelectedSections(sections.map((section) => section.id));
        }
    };
    const handleSelectItem = (id: string) => {
        setSelectedSections((prev) =>
            prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
        );
    };

    return (
        <div className="flex flex-col min-h-[752px] max-w-full bg-background-white shadow-lg rounded-lg p-4">
            <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
                <h2 className="text-lg font-sans font-bold">Môn học</h2>
                <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-full bg-gray-100 px-4 py-2">
                    <svg className="w-5 h-5 text-gray-400 absolute left-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" d="M21 21l-4.35-4.35m0 0A7.5 7.5 0 1011 18.5a7.5 7.5 0 005.65-2.85z"></path>
                    </svg>
                    <input
                        type="text"
                        placeholder="Tìm kiếm"
                        className="w-full pl-12 pr-4 py-2 bg-transparent outline-none text-gray-500 italic placeholder-gray-400"
                    />
                </div>

            </div>

            <div className="overflow-x-auto flex-grow px-2 md:px-10">
                <table className="w-full border-collapse overflow-hidden rounded-t-lg">
                    <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-white">
                        <tr>
                            <th className="py-3 px-2 md:px-4 text-center w-[50px]">
                                <input
                                    ref={selectAllRef}
                                    type="checkbox"
                                    className="custom-checkbox"
                                    checked={selectedSections.length === sections.length}
                                    onChange={handleSelectAll}
                                />
                            </th>
                            <th className="py-3 px-2 md:px-4 text-left">
                                <div className="flex items-center">
                                    Mã môn học
                                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2" />
                                </div>
                            </th>
                            <th className="py-3 px-2 md:px-4 text-left">
                                <div className="flex items-center">
                                    Tên môn học
                                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2" />
                                </div>
                            </th>
                            <th className="py-3 px-2 md:px-4 text-left">
                                <div className="flex items-center">
                                    Loại môn
                                    <img src={arrow} alt="Sort" className="w-5 h-5 md:w-6 md:h-6 object-contain ml-2" />
                                </div>
                            </th>
                            <th className="py-3 px-2 md:px-4 text-left">Số tiết HK1</th>
                            <th className="py-3 px-2 md:px-4 text-left">Số tiết HK2</th>
                            <th className="py-3 px-2 md:px-4 text-center"></th>
                        </tr>
                    </thead>
                    <tbody>
                        {sections.map((item, index) => (
                            <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                                <td className="py-3 px-2 md:px-4 text-center w-[50px]">
                                    <input
                                        type="checkbox"
                                        className="custom-checkbox"
                                        checked={selectedSections.includes(item.id)}
                                        onChange={() => handleSelectItem(item.id)}
                                    />
                                </td>
                                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.name}</td>
                                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.code}</td>
                                <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.category}</td>
                                <td className="py-3 px-2 md:px-4 font-sans text-black-text text-center">{item.periodHK1}</td>
                                <td className="py-3 px-2 md:px-4 font-sans text-black-text text-center">{item.periodHK2}</td>
                                <td className="py-3 px-2 md:px-4 text-center">
                                    <div className="flex justify-center space-x-2 items-center">
                                        <button className="w-8 h-8 flex items-center justify-center">
                                            <img src={trash} alt="Trash" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                        </button>
                                        <button className="w-8 h-8 flex items-center justify-center">
                                            <img src={edit} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>
            </div>
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
                        <img src={left} alt="Left" className="w-6 h-6 md:w-5 md:h-5" />
                    </button>
                    <button className="text-black-text">1</button>
                    <button className="w-[26px] h-[26px] rounded-full bg-background-orange-1 text-while-text flex items-center justify-center font-medium">
                        2
                    </button>
                    <button className="text-black">3</button>
                    <button className="text-black">...</button>
                    <button className="text-black">100</button>
                    <button>
                        <img src={right} alt="Right" className="w-6 h-6 md:w-5 md:h-5" />
                    </button>
                </div>
            </div>
        </div>
    );
};

export default SectionList;
