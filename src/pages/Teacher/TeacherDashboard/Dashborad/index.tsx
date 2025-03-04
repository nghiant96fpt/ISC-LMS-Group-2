import React from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const data = [
  { name: 'Giỏi', value: 10 },
  { name: 'Khá', value: 125 },
  { name: 'Trung bình', value: 75 },
  { name: 'Yếu', value: 0 },
];

const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];

const Dashboard = () => {
  return (
    <div>
      <div className="bg-white font-bold w-full rounded-xl shadow-md p-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Khóa học của tôi</h3>
            <p className="text-2xl text-blue-500">10</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Lớp học Online</h3>
            <p className="text-2xl text-green-500">2</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Bài kiểm tra chưa chấm</h3>
            <p className="text-2xl text-yellow-500">8</p>
          </div>
          <div className="p-4 border rounded-lg">
            <h3 className="text-lg font-semibold">Hỏi đáp Q & A</h3>
            <p className="text-2xl text-red-500">5</p>
          </div>
        </div>
      </div>

      <h2 className="text-xl">Thống kê kết quả học tập của học viên</h2>
      <div className="bg-white font-bold w-full rounded-xl shadow-md p-4">
        <div className="flex h-56">
          <div className="w-[50%]">
            <PieChart width={225} height={200}>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                outerRadius={80}
                fill="#8884d8"
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
            </PieChart>
          </div>
          <div className="w-[50%] flex flex-col justify-center pl-4">
            <div className="text-lg">
              Tổng số học sinh giỏi: <span className="text-blue-500">300</span>
            </div>
            <div className="text-lg">
              Tổng số học sinh khá: <span className="text-green-500">125</span>
            </div>
            <div className="text-lg">
              Tổng số học sinh trung bình: <span className="text-yellow-500">75</span>
            </div>
            <div className="text-lg">
              Tổng số học sinh yếu: <span className="text-red-500">0</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
