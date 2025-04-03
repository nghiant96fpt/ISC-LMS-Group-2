import React from 'react';
import { teacherData } from './data';
const avatar = require('../../../../assets/images/Frame 19.png');

const TeacherProfile = () => {
  return (
    <div className="overflow-x-auto bg-white flex-grow px-4 md:px-10">
      <div className="border rounded-lg overflow-hidden mb-6">
        <div className="bg-background-2 text-white p-4 text-lg">Thông tin chung</div>
        <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="flex flex-col items-center">
            <img src={avatar} alt="Avatar" className="w-40 h-40 md:w-64 md:h-64 rounded-full object-cover" />
          </div>
          <div className="grid gap-2">
            <p className="text-orange-text font-bold">Thông tin giảng viên</p>
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <strong className="text-gray-500">Mã giảng viên:</strong>
                <span className="text-gray-500">{teacherData.id}</span>
              </div>
              <div>
                <input type="checkbox" className="mr-2" />
                <span className="text-gray-500">Sinh mã tự động</span>
              </div>
              <div className="flex items-center gap-2">
                <strong className="text-gray-500">Tổ - Bộ môn:</strong>
                <span className="text-gray-500">{teacherData.department}</span>
              </div>
            </div>
          </div>
          <div className="grid gap-2">
            <p>
              <strong className="text-gray-500">Quốc tịch:</strong> {teacherData.nationality}
            </p>
            <p>
              <strong className="text-gray-500">Tôn giáo:</strong> {teacherData.religion}
            </p>
            <p>
              <strong className="text-gray-500">Trạng thái:</strong> <span className="bg-green-500 text-white px-2 py-1 rounded">Đang giảng dạy</span>
            </p>
          </div>
          <div className="grid gap-2">
            <p className="text-orange-text font-bold">Địa chỉ liên hệ</p>
            <p>
              <strong className="text-gray-500">Địa chỉ:</strong> {teacherData.address}
            </p>
            <p>
              <strong className="text-gray-500">Email:</strong> nhminh@gmail.com
            </p>
            <p>
              <strong className="text-gray-500">SDT:</strong> 0933 925 4365
            </p>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-6 p-6">
        <div className="p-6">
          <strong className="text-orange-text block mb-4 text-center sm:text-left">Thông tin cá nhân</strong>
          <div className="grid grid-cols-3  gap-6">
            {/* Div đầu tiên (Bên trái) */}
            <div className="grid gap-2 mr-[270px] justify-self-start">
              <p>
                <strong className="text-gray-500">CMND/CCCD:</strong> <span className="text-gray-500">{teacherData.personalId}</span>
              </p>
              <p>
                <strong className="text-gray-500">Ngày cấp:</strong> <span className="text-gray-500">{teacherData.issueDate}</span>
              </p>
              <p>
                <strong className="text-gray-500">Nơi cấp:</strong> <span className="text-gray-500">{teacherData.issuePlace}</span>
              </p>
            </div>

            {/* Div thứ hai (Ở giữa) */}
            <div className="grid gap-2 justify-self-center">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-gray-500">Đoàn viên</span>
              </div>
              <p>
                <strong className="text-gray-500">Ngày vào đoàn:</strong> <span className="text-gray-500">{teacherData.unionJoinDate}</span>
              </p>
              <p>
                <strong className="text-gray-500">Nơi vào đoàn:</strong> <span className="text-gray-500">{teacherData.partyJoinDate}</span>
              </p>
            </div>

            {/* Div thứ ba (Bên phải) */}
            <div className="grid gap-2 justify-self-end">
              <div className="flex items-center gap-2">
                <input type="checkbox" />
                <span className="text-gray-500">Đảng viên</span>
              </div>
              <p>
                <strong className="text-gray-500">Ngày vào đảng:</strong> <span className="text-gray-500">{teacherData.partyJoinDate}</span>
              </p>
              <p>
                <strong className="text-gray-500">Nơi vào đảng:</strong> <span className="text-gray-500">{teacherData.partyJoinDate}</span>
              </p>
            </div>
          </div>
        </div>
      </div>

      <div className="border rounded-lg overflow-hidden mb-6 p-6">
        <strong className="text-orange-text block mb-4">Thông tin gia đình</strong>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="grid gap-2">
            <p>
              <strong className="text-gray-500">Người liên hệ:</strong> {teacherData.name1}
            </p>
            <p>
              <strong className="text-gray-500">Địa chỉ:</strong> {teacherData.address1}
            </p>
          </div>
          <div className="grid gap-2">
            <p>
              <strong className="text-gray-500">Người liên hệ 2:</strong> {teacherData.name2}
            </p>
            <p>
              <strong className="text-gray-500">Địa chỉ:</strong> {teacherData.address2}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
