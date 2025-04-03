import { useState } from 'react';
import { TableCell, TableRow } from '../../../../../components/ui/tabble';
import IconImages from '../../../../../components/IconImages';
import { StudentRetentionListTableRowProps } from './type';
import { Link } from 'react-router-dom';
import { columns } from '../tableColumns';

const StudentRetentionListTableRow: React.FC<StudentRetentionListTableRowProps> = ({ item, index }) => {
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedItem, setSelectedItem] = useState<{ id: number } | null>(null);

  const handleOpenDeleteModal = () => {
    setSelectedItem({ id: item.id });
    setIsDeleteModalOpen(true);
  };

  return (
    <TableRow key={item.id} className={index % 2 === 0 ? 'bg-[#F0F3F6] border-[#F0F3F6]' : ''}>
      {columns.map((col) => (
        <TableCell key={col.key} className="px-4 py-3 text-black-text text-start text-xs md:text-sm lg:text-base ">
          {col.isDate ? new Date(item[col.key]).toLocaleDateString() : item[col.key]}
        </TableCell>
      ))}
      {/* Cột chứa nút chức năng */}
      <TableCell className="px-4 py-3 text-start w-[150px]">
        <div className="flex gap-2">
          <button>
            <div className="flex gap-2">
              <Link to={`/leadership/update-student-retention/${item.id}`}>
                <img src={IconImages.OrangeEditWriteOutline} alt="Sửa" className="w-4 md:w-5 lg:w-6" />
              </Link>
              <button onClick={handleOpenDeleteModal}>
                <img src={IconImages.iconTrashBinOutlineOrange} alt="Xóa" className="w-4 md:w-5 lg:w-6" />
              </button>
            </div>
          </button>
        </div>
      </TableCell>
    </TableRow>
  );
};

export default StudentRetentionListTableRow;
