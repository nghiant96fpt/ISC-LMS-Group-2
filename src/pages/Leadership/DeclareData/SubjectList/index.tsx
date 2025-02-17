import React from 'react';
import deLete from '../../../../assets/images/fi_trash-2.png';
import sortIcon from '../../../../assets/images/u_arrow up down.png';
import { subjects } from './type';

const SubjectPage: React.FC = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="p-6 bg-white rounded-lg shadow-lg w-full max-w-4xl">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-semibold text-center w-full p-4">Danh sách môn học</h2>
          <button className="text-green-500 hover:text-red-500 transition">
            <img src={deLete} alt="delete" className="w-6 h-6" />
          </button>
        </div>
        <div className="border rounded-md overflow-hidden">
          <div className="max-h-[400px] overflow-auto">
            <table className="w-full border-collapse">
              <thead className="sticky top-0 z-10">
                <tr className="text-white" style={{ background: 'linear-gradient(to right, var(--background-2), var(--background-1))' }}>
                  <th className="p-3 w-16 text-center">
                    <input
                      type="checkbox"
                      className="w-5 h-5 border-2 border-blue-500 rounded-md bg-white appearance-none 
                                 checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 
                                 checked:text-white checked:after:content-['✔'] checked:after:text-white 
                                 checked:after:flex checked:after:items-center checked:after:justify-center 
                                 checked:after:w-full checked:after:h-full"
                    />
                  </th>
                  <th className="p-3 w-40 text-left">
                    <span className="flex items-center">
                      Mã môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                  <th className="p-3 w-64 text-left">
                    <span className="flex items-center">
                      Tên môn học
                      <img src={sortIcon} alt="Sort" className="ml-2 w-4 h-4" />
                    </span>
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-300">
                {subjects.map((subject, index) => (
                  <tr key={index} className={`${index % 2 === 0 ? 'bg-white' : 'bg-gray-100'} hover:bg-gray-200 transition`}>
                    <td className="p-3 w-16 text-center">
                      <input
                        type="checkbox"
                        className="w-5 h-5 border-2 border-blue-500 rounded-md bg-white appearance-none 
                                   checked:bg-blue-500 checked:border-blue-500 checked:ring-2 checked:ring-blue-500 
                                   checked:text-white checked:after:content-['✔'] checked:after:text-white 
                                   checked:after:flex checked:after:items-center checked:after:justify-center 
                                   checked:after:w-full checked:after:h-full"
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
    </div>
  );
};

export default SubjectPage;
