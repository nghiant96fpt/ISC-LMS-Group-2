import React from 'react';
import { Tooltip, PieChart, Pie, Cell } from 'recharts';
import '../index.css';
const data = [
  { name: 'Tổng số học sinh giỏi', value: 300 },
  { name: 'Tổng số học sinh khá', value: 125 },
  { name: 'Tổng số học sinh trung bình', value: 75 },
  { name: 'Yếu', value: 0 },
];

const GRADIENTS = [
  ['#2F80ED', '#56CCF2'],
  ['#FDC830', '#F37335'],
  ['#45B649', '#DCE35B'],
  ['#9CA3AF', '#D1D5DB'],
];
const Chart = () => {
  return (
    <div className="flex justify-between  h-48">
      {/* Biểu đồ tròn */}
      <div className="w-[45%] flex flex-col justify-center items-center">
        <PieChart width={180} height={180}>
          {/* Gradient Colors */}
          <svg width="0" height="0">
            <defs>
              {GRADIENTS.map((colors, index) => (
                <linearGradient key={index} id={`gradientColor${index}`} x1="0%" y1="0%" x2="100%" y2="100%">
                  <stop offset="0%" stopColor={colors[0]} />
                  <stop offset="100%" stopColor={colors[1]} />
                </linearGradient>
              ))}
            </defs>
          </svg>

          <Pie
            data={data}
            cx="50%"
            cy="50%"
            labelLine={false}
            label={({ cx, cy, midAngle, innerRadius, outerRadius, percent }) => {
              if (percent === 0) return null;
              const RADIAN = Math.PI / 180;
              const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
              const x = cx + radius * Math.cos(-midAngle * RADIAN);
              const y = cy + radius * Math.sin(-midAngle * RADIAN);

              return (
                <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" fontSize={16} fontWeight={600}>
                  {`${(percent * 100).toFixed(0)}%`}
                </text>
              );
            }}
            outerRadius={80}
            stroke="#fff"
            strokeWidth={6}
            dataKey="value"
            startAngle={300}
            endAngle={-60}
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={`url(#gradientColor${index})`} />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>

        {/*  */}
      </div>
      {/* Thống kê số liệu */}
      <div className="w-[50%] flex flex-col justify-center  gap-y-4">
        <div className="custom-line ">
          Tổng số lớp: <span className="font-bold">10</span>
        </div>
        <div className="custom-line ">
          Tổng số học sinh giỏi: <span className="text-blue-500">300</span>
        </div>
        <div className="custom-line ">
          Tổng số học sinh khá: <span className="text-orange-500">125</span>
        </div>
        <div className="custom-line ">
          Tổng số học sinh trung bình: <span className="text-green-500">75</span>
        </div>
        <div className="flex text-xs justify-between ">
          Tổng số học sinh yếu: <span className="text-gray-500">0</span>
        </div>
      </div>
    </div>
  );
};

export default Chart;
