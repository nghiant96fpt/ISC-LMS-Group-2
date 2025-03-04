import React from 'react';
import './type';

const ExamDetailModal: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-[600px]">
        <div className="flex justify-between items-center border-b pb-2 mb-4">
          <h2 className="text-lg font-semibold">Xem chi tiết lịch thi</h2>
          <button className="text-gray-500">&times;</button>
        </div>
        <div className="text-sm space-y-2">
          <div className="flex justify-between whitespace-nowrap gap-2">
            <p>
              <strong>Môn thi:</strong> Toán học
            </p>
            <p>
              <strong>Phân loại:</strong> Giữa kỳ
            </p>
            <p>
              <strong>Thời gian:</strong> 45 phút
            </p>
            <p>
              <strong>Học kỳ:</strong> Học kỳ 1
            </p>
          </div>
          <div className="flex justify-between whitespace-nowrap gap-2">
            <p>
              <strong>Ngày thi:</strong> 20/01/2021
            </p>
            <p>
              <strong>Khoa-khối:</strong> 6
            </p>
            <p>
              <strong>Lớp:</strong> 9A1, 9A3, 9A4, 9A5
            </p>
          </div>
          <div className="whitespace-nowrap mt-2">
            <p>
              <strong>Phân công chấm thi:</strong> Nguyễn Văn C, Trần Thị D
            </p>
          </div>
        </div>
        <div className="mt-4">
          <p>
            <strong>File đính kèm:</strong> Loremisump.pdf
          </p>
          <button className="mt-2 bg-orange-500 text-white px-4 py-2 rounded flex items-center">
            <span className="mr-2">📥</span> Tải xuống
          </button>
        </div>
      </div>
    </div>
  );
};

export default ExamDetailModal;
