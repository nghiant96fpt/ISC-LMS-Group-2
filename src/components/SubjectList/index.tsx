import React from 'react';
import deLete from '../../assets/images/fi_trash-2.png';
import sortIcon from '../../assets/images/u_arrow up down.png';

const subjects = [
  { id: 'vl009', name: 'Vật Lý 9' },
  { id: 'hh010', name: 'Hoá Học 10' },
  { id: 'sh010', name: 'Sinh Học 10' },
  { id: 'vl010', name: 'Vật Lý 10' },
  { id: 'vl009', name: 'Vật Lý 9' },
  { id: 'hh010', name: 'Hoá Học 10' },
  { id: 'vl010', name: 'Vật Lý 10' },
  { id: 'vl009', name: 'Vật Lý 9' },
  { id: 'hh010', name: 'Hoá Học 10' },
];

const SubjectList = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-background-gray-100 p-4">
      <div className="p-6 bg-background-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center w-full p-4">Danh sách môn học</h2>
          <button className="text-green-text hover:text-red-status transition">
            <img src={deLete} alt="delete" className="w-6 h-6" />
          </button>
        </div>
        <div className="overflow-auto max-h-[400px] border rounded-md">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-br-gradient-right-or text-white text-lg">
                <th className="p-3 w-16 text-center">
                  <input
                    type="checkbox"
                    className="w-5 h-5 bg-white border-2 border-blue-500 rounded-md appearance-none checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-500"
                  />
                </th>

                <th className="p-3 w-40 text-left whitespace-nowrap">
                  <span className="inline-flex items-center">
                    Mã môn học
                    <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                  </span>
                </th>
                <th className="p-3 w-64 text-left whitespace-nowrap">
                  <span className="inline-flex items-center">
                    Tên môn học
                    <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                  </span>
                </th>
              </tr>
            </thead>
            <tbody>
              {subjects.map((subject, index) => (
                <tr key={index} className={`${index % 2 === 0 ? 'bg-background-white' : 'bg-gray-100'} hover:bg-background-gray-200 transition`}>
                  <td className="p-3 w-16 text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-blue-500 rounded-md appearance-none checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-500"
                    />
                  </td>
                  <td className="p-3 w-40 text-left">{subject.id}</td>
                  <td className="p-3 w-64 text-left">{subject.name}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default SubjectList;
