import { useState } from 'react';
import { Link } from 'react-router';
import Panigation from '../DeclareData/SchoolYear/SchoolYearPanigation/Panigation';
import DeleteModal from '../../../components/DeleteConfirmation';
import UpdateModel from './ModalUpdate';
const list = require('../../../assets/icons/fi_list.png');
const trash = require('../../../assets/icons/fi_trash-2.png');

const TeachingAssignment: React.FC = () => {
  const teachers = ['Hoàng Mỹ Trưng', 'Nguyễn Kỷ Nguyên', 'Mộc Tâm Tâm'];
  const [idDelete, setIdDelete] = useState<number | String | null>(null);
  const [data, setData] = useState([
    { maLop: 1, tenLop: '6A3', ngayBatDau: '2022-22-02', ngayKetThuc: '2021-02-02' },
    { maLop: 1, tenLop: '6A3', ngayBatDau: '2022-22-02', ngayKetThuc: '2021-02-02' },
  ]);

  return (
    <>
      <h1 className="text-2xl font-bold ml-2">Phân công giảng dạy</h1>
      <div className="flex flex-col lg:flex-row min-h-screen">
        {/* Sidebar */}
        <aside className="text-white bg-white p-4 w-full lg:w-64 flex-shrink-0 transition-all duration-300">
          <div className="bg-gray-900 p-4" style={{ borderRadius: '10px 10px 0px 0px' }}>
            <h2 className="text-lg font-bold">GV Lương Hoàng</h2>
            <div className="mt-4">
              <label className="block text-sm">Niên khóa</label>
              <select className="w-full bg-gray-800 p-2 rounded mt-1">
                <option>2020-2021</option>
              </select>
            </div>
            <div className="mt-4">
              <label className="block text-sm">Bộ Môn</label>
              <select className="w-full bg-gray-800 p-2 rounded mt-1">
                <option>Toán Đại Số</option>
              </select>
            </div>
          </div>
          <h3 className="mt-6 text-md font-semibold bg-orange-500 p-3 rounded-lg">Tổ An</h3>
          {teachers.map((teacher, index) => (
            <button key={index} className="block w-full text-left p-3 mt-2  text-black rounded-lg bg-orange-50 border border-orange-500">
              {teacher}
            </button>
          ))}
        </aside>
        {/* Main Content */}
        <main className="flex-1 p-3 bg-gray-100">
          <div className="flex justify-between items-center bg-white p-2">
            <p></p>
            <div className="flex gap-4 items-center justify-center">
              <img src={trash} alt="Edit" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
              <div style={{ border: '1px solid gray', height: '30px' }}></div>
              <button className="bg-orange-500 text-white px-4 py-2 rounded">+ Thêm mới</button>
            </div>
          </div>
          {/* Table */}
          <div
            className="mt-3 bg-white shadow rounded-lg overflow-hidden p-2"
            style={{ height: '450px ', overflow: 'auto', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}
          >
            <div>
              <p className="font-bold mb-4">Danh sách phân công giảng dạy</p>
              <table className="w-full border-collapse overflow-hidden rounded-t-lg">
                <thead className="bg-gradient-to-r from-background-orange-1 to-background-1 text-while-text">
                  <tr>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Mã lớp</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Tên lớp</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Ngày bắt đầu</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Ngày kết thúc</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-left">
                      <div className="flex items-center gap-2 font-sans">
                        <span>Danh sách môn học</span>
                      </div>
                    </th>
                    <th className="py-3 px-2 md:px-4 text-right"></th>
                  </tr>
                </thead>
                <tbody>
                  {data.map((item, index) => (
                    <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.maLop}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.tenLop}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.ngayBatDau}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">{item.ngayKetThuc}</td>
                      <td className="py-3 px-2 md:px-4 font-sans text-black-text">
                        {' '}
                        <img src={list} alt="List" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                      </td>
                      <td className="py-3 px-2 md:px-4 text-center">
                        <div className="flex justify-center space-x-2 items-center">
                          <button className="w-8 h-8 flex items-center justify-center">
                            <UpdateModel />
                          </button>
                          <button onClick={() => setIdDelete(item.maLop)} className="w-8 h-8 flex items-center justify-center">
                            <img src={trash} alt="Trash" className="w-5 h-5 md:w-6 md:h-6 object-contain" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
            <Panigation indexChoose={1} numPage={9} size={2} />
          </div>
          {idDelete != null && (
            <DeleteModal
              title="Xóa Tổ - Bộ môn"
              description="Xác nhận thông tin này - Bộ môn này và toàn bộ thông tin bên trong? Sau khi xoá sẽ không thể hoàn tác."
              onCancel={() => setIdDelete(null)}
              onConfirm={() => {}}
            />
          )}
        </main>
      </div>
    </>
  );
};

export default TeachingAssignment;
