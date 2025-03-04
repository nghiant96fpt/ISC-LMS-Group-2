import React from 'react';

const TeacherDashboard = () => {
  return (
    <div className="p-6 bg-gray-100 h-full">
      {/* Tiêu đề chính */}
      <div className="flex gap-6 mb-6">
        <div className="lg:w-[40%] bg-red-100">
          <h1 className="text-3xl font-bold text-gray-800">Tổng quan</h1>
          {/* component tổng quan */}
        </div>
        
        <div className="lg:w-[60%] bg-blue-100">
          <h1 className="text-3xl font-bold text-gray-800 text-start">Tất cả khóa học</h1>
          {/* component table */}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
