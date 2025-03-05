import React from 'react';

import './index.css';
import Chart from './Chart/Chart';

const Dashboard = () => {
  return (
    <div className="">
      <div className=" font-bold w-full rounded-xl  p-1 ">
        <div className="grid grid-cols-2 gap-2">
          <div className="custom-css-gird  from-background-1 to-background-2">
            <h3 className="custom-text-title">Khóa học của tôi</h3>
            <p className="custom-text-data ">10</p>
          </div>
          <div className="custom-css-gird  from-background-6 to-background-blue-2">
            <h3 className="custom-text-title">Lớp học Online</h3>
            <p className=" custom-text-data ">2</p>
          </div>
          <div className="custom-css-gird  from-background-4 to-background-3">
            <h3 className="custom-text-title">Bài kiểm tra chưa chấm</h3>
            <p className=" custom-text-data ">8</p>
          </div>
          <div className="custom-css-gird  from-background-6 to-background-5">
            <h3 className="custom-text-title">Hỏi đáp Q & A</h3>
            <p className=" custom-text-data ">5</p>
          </div>
        </div>
      </div>

      <h2 className="shadow-boxShadow text-xl font-semibold mb-0.5">Thống kê kết quả học tập của học viên</h2>
      <div className="bg-white  w-full rounded-xl shadow-md p-4">
        {/* Component chart */}
        <Chart />

        {/* Chú thích */}
        <div className="flex flex-col gap-3">
          {/*  */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-blue-500 to-blue-400"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh giỏi</span>
          </div>

          {/*  */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-yellow-500 to-yellow-300"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh khá</span>
          </div>

          {/* */}
          <div className="flex items-center gap-1">
            <div className="w-6 h-4 rounded-md bg-gradient-to-r from-green-500 to-green-300"></div>
            <span className="text-gray-500 text-xs">Tổng số học sinh trung bình</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
