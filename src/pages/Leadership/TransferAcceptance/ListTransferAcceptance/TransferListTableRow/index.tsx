import { SchoolTransferListItem } from '../data';

interface TableRowProps {
  item: SchoolTransferListItem;
  index: number;
}

const TableRowComponent = ({ item, index }: TableRowProps) => {
  return (
    <tr className={index % 2 === 0 ? 'bg-white' : 'bg-[#F0F3F6]'}>
      {/* Mã học sinh */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.studentId || 'N/A'}</td>

      {/* Họ và tên */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.fullName}</td>

      {/* Ngày sinh */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{new Date(item.dateOfBirth).toLocaleDateString('vi-VN')}</td>

      {/* Giới tính */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.gender}</td>

      {/* Trường chuyển từ */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.transferToSchool || 'Không xác định'}</td>

      {/* Học kỳ chuyển */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.transferSemester || 'Không xác định'}</td>

      {/* Lớp */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{item.grade}</td>

      {/* Ngày chuyển */}
      <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-900">{new Date(item.transferDate).toLocaleDateString('vi-VN')}</td>

      {/* Các nút thao tác */}
      <td className="px-4 py-3 whitespace-nowrap text-right text-sm font-medium">
        <div className="flex justify-end space-x-2">
          <button className="text-blue-600 hover:text-blue-900">Xem</button>
        </div>
      </td>
    </tr>
  );
};

export default TableRowComponent;
