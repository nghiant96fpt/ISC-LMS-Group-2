import React from 'react';
import { teacherData } from './data';
const avatar = require('../../../../assets/images/Frame 19.png');
const TeacherProfile = () => {
  return (
    <div className="overflow-x-auto bg-white flex-grow px-2 md:px-10">
      <div className="border rounded-lg overflow-hidden mb-6">
        <div className="bg-background-2 text-white p-4  text-lg">Thông tin chung</div>
        <div className="p-6 grid grid-cols-4 gap-2">
          <div className="flex flex-col items-center">
            <img src={avatar} alt="Avatar" className="w-64 h-64 rounded-full object-cover" />
          </div>
          <div className="grid gap-2">
            <p>
              <strong className="text-orange-text">Thông tin giảng viên</strong>
            </p>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Mã giảng viên:</strong>
              <span className="ml-6 text-gray-500">{teacherData.id}</span>
            </div>
            <div>
              <input type="checkbox" className="ml-36" />
              <span className=" text-gray-500"> Sinh mã tự động</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Tổ - Bộ môn:</strong> <span className="ml-9 text-gray-500">{teacherData.department}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Môn giảng dạy:</strong> <span className="ml-4 text-gray-500">{teacherData.subjects}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Họ và Tên:</strong> <span className="ml-14 text-gray-500">{teacherData.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Ngày sinh:</strong> <span className="ml-14 text-gray-500">{teacherData.birthDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Giới tính:</strong> <span className="ml-16 text-gray-500">{teacherData.gender}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Dân tộc:</strong> <span className="ml-20 text-gray-500">{teacherData.ethnicity}</span>
            </div>
            <div className="flex items-center gap-2">
              <strong className="text-gray-500">Ngày vào trường:</strong> <span className="ml-1 text-gray-500">{teacherData.issueDate}</span>
            </div>
          </div>
          <div className="grid gap-0 leading-tight">
            <p>
              <strong className="text-gray-500">Quốc tịch:</strong> <span className="ml-16 text-gray-500">{teacherData.nationality}</span>
            </p>
            <p>
              <strong className="text-gray-500">Tôn giáo:</strong> <span className="ml-16 text-gray-500">{teacherData.religion}</span>
            </p>
            <p>
              <strong className="text-gray-500">Trạng thái:</strong>
              <span className="bg-white text-green-500 border border-green-500 px-2 py-1 rounded ml-14">Đang giảng dạy</span>
            </p>
            <p>
              <strong className="text-gray-500">Môn kiêm nhiệm:</strong>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full inline-block">Toán</span>
              <span className="bg-blue-500 text-white px-3 py-1 rounded-full inline-block">Vật lý</span>
            </p>
            <p>
              <strong className="text-gray-500">Bí danh:</strong> <span className="ml-16 text-gray-500">{teacherData.alias}</span>
            </p>
          </div>
          <div className="grid gap-0 leading-tight">
            <p className="text-orange-text ">Địa chỉ liên hệ</p>
            <p>
              <strong className="text-gray-500">Địa chỉ:</strong> <span className="ml-1 text-gray-500">{teacherData.address}</span>
            </p>
            <p>
              <strong className="text-gray-500">Email:</strong> <span className="text-gray-500">nhminh@gmail.com</span>
            </p>
            <p>
              <strong className="text-gray-500">SDT:</strong> <span className="text-gray-500">0933 925 4365</span>
            </p>
          </div>
        </div>
      </div>

      {/* <div className="border rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <strong className="text-orange-text block mb-4 text-left ml-[300px]">Thông tin cá nhân</strong>
          <div className="grid grid-cols-3 gap-4">
            <div className="col-span-2 col-start-2 ml-[-125px] grid grid-cols-3 gap-4">
              <div className="grid gap-2">
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
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-gray-500">Đoàn viên</span>
                </div>
                <p>
                  <strong className="text-gray-500">Ngày vào đoàn:</strong>
                  <span className="text-gray-500"> {teacherData.personalId}</span>
                </p>
                <p>
                  <strong className="text-gray-500">Nơi vào đoàn:</strong> <span className="text-gray-500">{teacherData.partyJoinDate}</span>
                </p>
              </div>
              <div className="grid gap-2">
                <div className="flex items-center gap-2">
                  <input type="checkbox" />
                  <span className="text-gray-500">Đảng viên</span>
                </div>
                <p>
                  <strong className="text-gray-500">Ngày vào đảng:</strong>
                  <span className="text-gray-500"> {teacherData.personalId}</span>
                </p>
                <p>
                  <strong className="text-gray-500">Nơi vào đảng:</strong> <span className="text-gray-500">{teacherData.partyJoinDate}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}

      <div className="border rounded-lg flex justify-center overflow-hidden mb-6">
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

      {/* <div className="border rounded-lg overflow-hidden mb-6">
        <div className="p-6">
          <strong className="text-orange-text block mb-4 text-left ml-[275px]">Thông tin gia đình</strong>
          <div className="grid grid-cols-2 gap-4">
            <div className="col-span-2 col-start-2 ml-[-355px] grid grid-cols-3 gap-4">
              <div className="grid gap-2">
                <p>
                  <strong className="text-gray-500">Người liên hệ:</strong> <span className="text-gray-500">{teacherData.name1}</span>
                </p>
                <p>
                  <strong className="text-gray-500">Địa chỉ:</strong> <span className="text-gray-500">{teacherData.address1}</span>
                </p>
                <p>
                  <strong className="text-gray-500">SĐT:</strong> <span className="text-gray-500">{teacherData.phone1}</span>
                </p>
              </div>
              <div className="grid gap-2">
                <p>
                  <strong className="text-gray-500">Người liên hệ 2:</strong> <span className="text-gray-500">{teacherData.name2}</span>
                </p>
                <p>
                  <strong className="text-gray-500">Địa chỉ:</strong> <span className="text-gray-500">{teacherData.address2}</span>
                </p>
                <p>
                  <strong className="text-gray-500">SĐT:</strong> <span className="text-gray-500">{teacherData.phone2}</span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </div> */}
      <div className="border rounded-lg overflow-hidden mb-6   flex justify-center">
        <div className="p-6 mr-[800px]">
          <strong className="text-orange-text block mb-4 text-center sm:text-left">Thông tin gia đình</strong>
          <div className="grid  grid-cols-1 sm:grid-cols-2 gap-6">
            <div className="grid gap-2">
              <p>
                <strong className="text-gray-500">Người liên hệ:</strong> <span className="text-gray-500">{teacherData.name1}</span>
              </p>
              <p>
                <strong className="text-gray-500">Địa chỉ:</strong> <span className="text-gray-500">{teacherData.address1}</span>
              </p>
              <p>
                <strong className="text-gray-500">SĐT:</strong> <span className="text-gray-500">{teacherData.phone1}</span>
              </p>
            </div>
            <div className="grid gap-2">
              <p>
                <strong className="text-gray-500">Người liên hệ 2:</strong> <span className="text-gray-500">{teacherData.name2}</span>
              </p>
              <p>
                <strong className="text-gray-500">Địa chỉ:</strong> <span className="text-gray-500">{teacherData.address2}</span>
              </p>
              <p>
                <strong className="text-gray-500">SĐT:</strong> <span className="text-gray-500">{teacherData.phone2}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TeacherProfile;
