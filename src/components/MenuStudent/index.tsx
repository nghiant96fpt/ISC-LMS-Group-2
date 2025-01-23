import React, { useState } from "react";
import "./style.css";

const logo = require('../../assets/images/Logo.png');
const eye = require('../../assets/images/fi_eye.png');
const book = require('../../assets/images/Book.png');
const edit = require('../../assets/images/u_file-edit-alt.png');
const vector = require('../../assets/images/Vector.png');
const fi_bell = require('../../assets/images/fi_bell.png');
const question = require('../../assets/images/u_comment-question.png');

const Menu: React.FC = () => {
    const [isExpanded, setIsExpanded] = useState(false);
    const [activeIcon, setActiveIcon] = useState<string | null>(null);
    const [activeIndex, setActiveIndex] = useState<number | null>(null);

    const handleMouseEnter = () => setIsExpanded(true);
    const handleMouseLeave = () => setIsExpanded(false);

    const handleIconClick = (iconName: string, index: number) => {
        if (activeIcon === iconName && activeIndex === index) {
            setIsExpanded(false);
            setActiveIcon(null);
            setActiveIndex(null);
        } else {
            setIsExpanded(true);
            setActiveIcon(iconName);
            setActiveIndex(index);
        }
    };


    return (
        <div
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Sidebar chính */}
            <div className="w-28 h-[1080px] left-0 top-0 absolute bg-[#ff7506]">
                <div className="w-[74px] h-[42px] left-[19px] top-[58px] absolute">
                    <a href="/">
                        <img src={logo} alt="Logo" />
                    </a>
                </div>
                <div className="w-8 h-[300px] left-[40px] top-[205px] absolute">
                    {/* Eye Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-0 left-0 flex justify-center items-center cursor-pointer ${activeIndex === 0 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('eye', 0)}
                    >
                        <img src={eye} alt="Eye" />
                    </a>

                    {/* Book Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-[60px] left-0 flex justify-center items-center cursor-pointer ${activeIndex === 1 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('book', 1)}
                    >
                        <img src={book} alt="Book" />
                    </a>

                    {/* Edit Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-[120px] left-0 flex justify-center items-center cursor-pointer ${activeIndex === 2 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('edit', 2)}
                    >
                        <img src={edit} alt="Edit" />
                    </a>

                    {/* Vector Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-[180px] left-0 flex justify-center items-center cursor-pointer ${activeIndex === 3 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('vector', 3)}
                    >
                        <img src={vector} alt="Vector" />
                    </a>

                    {/* Bell Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-[240px] left-0 flex justify-center items-center cursor-pointer ${activeIndex === 4 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('fi_bell', 4)}
                    >
                        <img src={fi_bell} alt="Bell" />
                    </a>

                    {/* Question Icon */}
                    <a
                        href="#"
                        className={`relative w-8 h-8 absolute top-[300px] left-0 flex justify-center items-center cursor-pointer ${activeIndex === 5 ? 'before:content-[""] before:absolute before:w-[70px] before:h-[70px] before:bg-white/50 before:rounded-lg before:top-1/2 before:left-1/2 before:transform before:-translate-x-1/2 before:-translate-y-1/2' : ''}`}
                        onClick={() => handleIconClick('question', 5)}
                    >
                        <img src={question} alt="Question" />
                    </a>
                </div>
            </div>

            {isExpanded && (
                <div className="w-[300px] h-[1080px] left-[112px] top-0 absolute bg-white shadow-[4px_4px_10px_0px_rgba(133,178,220,0.25)]">
                    <div className="w-2 h-14 left-[290px] top-[196px] absolute bg-[#ff7506] rounded-[11px]" style={{ top: `${activeIndex === 0 ? '205px' : activeIndex === 1 ? '276px' : activeIndex === 2 ? '436px' : activeIndex === 3 ? '598px' : activeIndex === 4 ? '664px' : activeIndex === 5 ? '730px' : ''}` }}></div>

                    {/* Các mục menu */}
                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 0 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "205px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-regular fa-eye"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Tổng quan</span>
                    </a>

                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 1 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "276px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-solid fa-book text-lg"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Lớp học của tôi</span>
                    </a>

                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 2 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "436px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-solid fa-book text-lg"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Bài kiểm tra</span>
                    </a>

                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 3 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "598px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-regular fa-calendar text-lg"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Lịch thi</span>
                    </a>

                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 4 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "664px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-regular fa-bell text-lg"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Thông báo</span>
                    </a>

                    <a href="#" className={`block w-full h-12 absolute no-underline flex items-center ${activeIndex === 5 ? 'text-[#ff7506]' : 'text-[#373839] opacity-70'}`} style={{ top: "730px", left: "34px" }} onClick={() => setIsExpanded(false)} >
                        <i className="fa-regular fa-comment text-lg"></i>
                        <span className="ml-4 text-lg font-bold font-sans tracking-tight">Trợ giúp</span>
                    </a>

                    {/* Các mục mới thêm */}
                    <a href="#" className="block w-full h-10 absolute no-underline flex items-center" style={{ top: "335px", left: "60px" }} onClick={() => setIsExpanded(false)} >
                        <span className="text-[#373839] opacity-70 text-sm font-sans tracking-tight hover:text-[#373839] hover:font-bold hover:ml-2 transition-all">
                            Danh sách lớp học
                        </span>
                    </a>

                    <a href="#" className="block w-full h-10 absolute no-underline flex items-center" style={{ top: "395px", left: "60px" }} onClick={() => setIsExpanded(false)} >
                        <span className="text-[#373839] opacity-70 text-sm font-sans tracking-tight hover:text-[#373839] hover:font-bold hover:ml-2 transition-all">
                            Tham gia vào lớp
                        </span>
                    </a>

                    <a href="#" className="block w-full h-10 absolute no-underline flex items-center" style={{ top: "495px", left: "60px" }} onClick={() => setIsExpanded(false)} >
                        <span className="text-[#373839] opacity-70 text-sm font-sans tracking-tight hover:text-[#373839] hover:font-bold hover:ml-2 transition-all">
                            Danh sách bài kiểm tra
                        </span>
                    </a>

                    <a href="#" className="block w-full h-10 absolute no-underline flex items-center" style={{ top: "555px", left: "60px" }} onClick={() => setIsExpanded(false)} >
                        <span className="text-[#373839] opacity-70 text-sm font-sans tracking-tight hover:text-[#373839] hover:font-bold hover:ml-2 transition-all">
                            Bảng điểm
                        </span>
                    </a>
                </div>
            )}
        </div>
    );
};

export default Menu;
