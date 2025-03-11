import React from 'react';
import { PieChart, Pie, Cell, Tooltip } from 'recharts';
import './style.css';
const data = [
  { name: 'Đã hoàn thành', value: 7 },
  { name: 'Chưa hoàn thành', value: 3 },
];

const COLORS = ['#4A90E2', '#F5A623'];

const StudentAchievementChart = () => {
  return (
    <div className="bg-white shadow-lg rounded-2xl p-6 w-full max-w-lg mx-auto">
      <h2 className="text-xl font-semibold text-gray-800 text-center mb-4">Thống kê kết quả học tập của học viên</h2>

      <div className="flex items-center justify-between">
        <div className="flex-shrink-0">
          <PieChart width={180} height={180}>
            <Pie
              data={data}
              cx="50%"
              cy="50%"
              innerRadius={1}
              outerRadius={80}
              paddingAngle={8}
              cornerRadius={5}
              labelLine={false}
              label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
                if (percent === 0) return null;
                const RADIAN = Math.PI / 180;
                const radius = innerRadius + (outerRadius - innerRadius) * 0.6;
                const x = cx + radius * Math.cos(-midAngle * RADIAN);
                const y = cy + radius * Math.sin(-midAngle * RADIAN);

                return (
                  <text x={x} y={y} fill="#fff" textAnchor="middle" dominantBaseline="central" fontSize={14} fontWeight={600}>
                    {`${(percent * 100).toFixed(0)}%`}
                  </text>
                );
              }}
              stroke="#fff"
              strokeWidth={4}
              dataKey="value"
              startAngle={300}
              endAngle={-60}
            >
              {data.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={COLORS[index]} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
          <div>
            <div className="mb-2 flex items-center">
              <div className="color-box" style={{ backgroundColor: COLORS[0] }} />
              <span className="text-gray-600 pl-5">Số môn đã hoàn thành:</span>
            </div>

            <div className="mb-2 flex items-center">
              <div className="color-box" style={{ backgroundColor: COLORS[1] }} />
              <span className="text-gray-600 pl-5">Số môn chưa hoàn thành:</span>
            </div>
          </div>
        </div>

        {/* Phần thống kê bên phải */}
        <div className="w-1/2">
          <div className="flex justify-between text-gray-700 font-medium border-b border-red-900 pb-2 mb-2">
            <span>Tổng số môn:</span>
            <span className="font-semibold">10</span>
          </div>
          <div className="flex justify-between text-blue-500 font-medium border-b  border-red-900  pb-2 mb-2">
            <span>Số môn đã hoàn thành:</span>
            <span className="font-semibold">7</span>
          </div>
          <div className="flex justify-between text-orange-500 font-medium border-b  border-red-900 pb-2">
            <span>Số môn chưa hoàn thành:</span>
            <span className="font-semibold">3</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentAchievementChart;
