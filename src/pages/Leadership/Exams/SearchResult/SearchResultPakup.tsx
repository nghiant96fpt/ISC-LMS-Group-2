// import React, { useState } from 'react';
// import { SearchData, IFileOption } from './type';
// import { IconArrowCaretDown } from '../../../../components/Icons';
// import ScoreBoardExport from '../ScoreBoard/ScoreBoardExport'; // import component xuất file

// import { render } from "@testing-library/react";

// // Định nghĩa kiểu cho props nhận bảng điểm
// interface SearchResultProps {
//   scoreBoardData: any[]; // bạn có thể cập nhật kiểu dữ liệu chính xác
// }

// const SearchResult: React.FC<SearchResultProps> = ({ scoreBoardData }) => {
//   // Dữ liệu mẫu cho lớp học
//   const [searchData] = useState<SearchData>({
//     subject: 'Ngữ Văn',
//     class: '10C1',
//     classId: '134 2665 3563',
//     startTime: 'Thứ 6, 20/10/2020',
//     startHour: '13:00 (GMT +7 Bangkok)',
//   });

//   // Sử dụng giá trị option trong fileOptions (sử dụng thuộc tính value)
//   const fileOptions: IFileOption[] = [
//     { value: 'xlsx', label: 'Excel -.xlsx' },
//     { value: 'pdf', label: 'PDF -.pdf' },
//     { value: 'csv', label: 'CSV -.csv' },
//   ];

//   // State cho định dạng file được chọn và dropdown mở hay đóng
//   const [selectedFile, setSelectedFile] = useState<string>(fileOptions[0].value);
//   const [isFileDropdownOpen, setIsFileDropdownOpen] = useState<boolean>(false);

//   return (
//     <div className="p-4 border border-orange-300 rounded-md bg-orange-50">
//       <div className="flex justify-between">
//         {/* Thông tin lớp học */}
//         <div className="space-y-2">
//           <p className="font-semibold">
//             Môn học: <span className="font-normal ml-8">{searchData.subject}</span>
//           </p>
//           <p className="font-semibold">
//             Lớp: <span className="font-normal ml-16">{searchData.class}</span>
//           </p>
//           <p className="font-semibold">
//             Mã lớp: <span className="font-normal ml-10">{searchData.classId}</span>
//           </p>
//         </div>

//         {/* Thời gian bắt đầu */}
//         <div>
//           <p>
//             <span className="font-semibold">Thời gian bắt đầu:</span> {searchData.startTime}
//           </p>
//           <p className="ml-32">{searchData.startHour}</p>
//         </div>

//         {/* Nút xuất file và dropdown chọn định dạng */}
//         <div className="text-right">
//           <p className="font-semibold mb-2 text-start">In bảng điểm:</p>
//           <div className="flex items-center space-x-2">
//             {/* Component xuất file, truyền dữ liệu bảng điểm và định dạng xuất hiện tại */}
//             <ScoreBoardExport data={scoreBoardData} exportType={selectedFile} />
            
//             {/* Dropdown xuất file */}
//             <div
//               className="relative"
//               style={{ width: '136px', height: '40px' }}
//               onClick={() => setIsFileDropdownOpen(!isFileDropdownOpen)}
//             >
//               {/* Ô hiển thị lựa chọn */}
//               <div className="border border-gray-300 rounded px-3 h-[40px] bg-white flex justify-between items-center cursor-pointer">
//                 {
//                   // Hiển thị label tương ứng với giá trị được chọn
//                   fileOptions.find(option => option.value === selectedFile)?.label
//                 }
//                 <div data-svg-wrapper>
//                   <IconArrowCaretDown />
//                 </div>
//               </div>

//               {/* Danh sách dropdown */}
//               {isFileDropdownOpen && (
//                 <div className="absolute mt-1 w-full bg-white border border-gray-300 rounded shadow-md z-10">
//                   {fileOptions.map((option, index) => (
//                     <div
//                       key={index}
//                       className="px-3 py-2 hover:bg-orange-100 cursor-pointer text-left"
//                       onClick={() => {
//                         setSelectedFile(option.value);
//                         setIsFileDropdownOpen(false);
//                       }}
//                     >
//                       {option.label}
//                     </div>
//                   ))}
//                 </div>
//               )}
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default SearchResult;

const SearchResultTT = () => {
    return (
      <>
        <h1> hihi</h1>
      </>
    )
    
};
export default SearchResultTT;