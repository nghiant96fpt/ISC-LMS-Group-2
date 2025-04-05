import React from 'react';
import {
    IconArrowRightDoubleLine,
    IconArrowLeftDoubleLine,
    IconOutlineArrowLeftSingle,
    IconOutlineArrowRightSingle,
} from '../../../../../components/Icons';

interface PaginationProps {
    currentPage: number;
    totalPages: number;
    onPageChange: (page: number) => void;
    totalItems: number;
    itemsPerPage: number;
    startIndex: number;
    endIndex: number;
}

const Pagination: React.FC<PaginationProps> = ({
    currentPage,
    totalPages,
    onPageChange,
    totalItems,
    itemsPerPage,
    startIndex,
    endIndex
}) => {
    // Tính toán số trang hiển thị
    const getPageNumbers = (current: number, total: number): (number | string)[] => {
        const pages: (number | string)[] = [];
        const maxVisiblePages = 5;

        if (total <= maxVisiblePages) {
            return Array.from({ length: total }, (_, i) => i + 1);
        }

        // Luôn hiển thị trang đầu
        pages.push(1);

        // Tính toán range hiển thị
        let start = Math.max(2, current - 1);
        let end = Math.min(total - 1, start + 2);

        if (current > 3) {
            pages.push('...');
        }

        // Thêm các trang ở giữa
        for (let i = start; i <= end; i++) {
            pages.push(i);
        }

        // Thêm dấu ... và trang cuối
        if (end < total - 1) {
            pages.push('...');
        }
        if (end < total) {
            pages.push(total);
        }

        return pages;
    };

    const pageNumbers = getPageNumbers(currentPage, totalPages);

    return (
        <nav className="flex items-center gap-x-1" aria-label="Pagination">
            {/* Nút Previous */}
            <button
                type="button"
                disabled={currentPage === 1}
                onClick={() => onPageChange(currentPage - 1)}
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-background-orange-1 focus:outline-none focus:bg-background-orange-1 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Previous"
            >
                <IconOutlineArrowLeftSingle />
            </button>

            {/* Các số trang */}
            <div className="flex items-center gap-x-1">
                {pageNumbers.map((page, index) =>
                    page === "..." ? (
                        <button
                            key={index}
                            type="button"
                            onClick={() => {
                                const prevPage = pageNumbers[index - 1] as number;
                                const nextPage = pageNumbers[index + 1] as number;
                                onPageChange(Math.floor((prevPage + nextPage) / 2));
                            }}
                            className="group min-h-[38px] min-w-[38px] flex justify-center items-center text-gray-400 hover:text-orange-text p-2 text-sm rounded-full focus:outline-none focus:bg-gray-100"
                        >
                            <span className="group-hover:hidden text-xs">•••</span>
                            {index === 1 ? (
                                <IconArrowLeftDoubleLine className="hidden group-hover:block" />
                            ) : (
                                <IconArrowRightDoubleLine className="hidden group-hover:block" />
                            )}
                        </button>
                    ) : (
                        <button
                            key={index}
                            type="button"
                            onClick={() => onPageChange(page as number)}
                            className={`min-h-[38px] min-w-[38px] flex justify-center items-center border text-base font-bold
                            ${currentPage === page ? 'bg-background-orange-1 text-white' : 'border-transparent text-gray-800 hover:bg-gray-100'}
                            py-2 px-3 text-sm rounded-full focus:outline-none`}
                            aria-current={currentPage === page ? "page" : undefined}
                        >
                            {page}
                        </button>
                    )
                )}
            </div>

            {/* Nút Next */}
            <button
                type="button"
                disabled={currentPage === totalPages}
                onClick={() => onPageChange(currentPage + 1)}
                className="min-h-[38px] min-w-[38px] py-2 px-2.5 inline-flex justify-center items-center gap-x-2 text-sm rounded-full border border-transparent text-gray-800 hover:bg-background-orange-1 focus:outline-none focus:bg-background-orange-1 disabled:opacity-50 disabled:pointer-events-none"
                aria-label="Next"
            >
                <IconOutlineArrowRightSingle />
            </button>
        </nav>
    );
};

export default Pagination;