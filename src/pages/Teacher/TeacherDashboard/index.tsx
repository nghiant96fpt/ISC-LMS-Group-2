import React from 'react';
// import Dashboard from './Dashborad';

const TeacherDashboard = () => {
  return (
    <div className="  h-full">

      <div className="flex gap-2 mb-6">
        <div className="lg:w-[40%]">
          <h1 className="text-3xl font-bold text-gray-800">Tổng quan</h1>
          {/* component dashboard teacher*/}
          {/* <Dashboard/> */}
        </div>
        
        <div className="lg:w-[60%]">
          <h1 className="text-3xl font-bold text-gray-800 text-start">Tất cả khóa học</h1>
          {/* component table */}
        </div>
      </div>
    </div>
  );
};

export default TeacherDashboard;
