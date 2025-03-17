import { useState } from 'react';
import TitleComponent from '../../../../components/Title';
import ClassListFromSearch from '../../DeclareData/ClassList/TableClassList/ClassListFromSearch';
import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './tableHeader';
import TableRowComponent from './tableRow';
import TrainingLevelManagementData from './data';
import ItemsPerPage from './ItemsPerPage';
import Pagination from './pagination';
// import PaginationControls from '../../../../components/Pagination';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
const TrainingLevelManagement = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState(TrainingLevelManagementData);
  const [urls, setUrls] = useState([
    { link: '/', linkName: 'Cài đặt hệ thống' },
    { link: '/', linkName: 'Quản lý các bậc đào tạo' },
  ]);

  const handleAddItem = () => {
    navigate('/leadership/system-settings/training-level-management/add'); // Chuyển hướng đến trang mong muốn
  };

  const handleDeleteItem = (id: number) => {
    // Gọi API hoặc cập nhật state để xóa item theo id
    console.log('Xóa item với ID:', id);
    setData((prevData) => prevData.filter((item) => item.id !== Number(id)));
  };

  // const handlePageChange = (page: number) => {
  //   setCurrentPage(page);
  // };

  const handleSearch = (query: string) => {
    console.log('Search data:', query);
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);

  const totalPages = Math.ceil(TrainingLevelManagementData.length / itemsPerPage);

  return (
    <>
      <AddressList addressList={urls} />
      <div className="flex justify-between items-center mr-10 mb-5">
        <DropdownSelectionComponent options={['2020', '2021', '2022', '2023']} width={144} className="flex-grow" />
        <Button size="big" type="button" className="primary" onClick={handleAddItem}>
          + Thêm mới
        </Button>
      </div>

      <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
          <TitleComponent text="Danh mục Các bậc đào tạo" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
          <ClassListFromSearch
            onSearch={handleSearch}
            placeholder="Tìm kiếm"
            inputStyle={{
              fontFamily: 'var(--font-Mulish)',
              fontStyle: 'italic',
              color: 'var(--black-text)',
            }}
          />
        </div>

        <div className="mb-4 col-span-full xl:mb-2">
          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
            <div
              className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
              xl:rounded-lg 2xl:rounded-lg w-full max-h-[340px] overflow-y-auto"
            >
              <Table className="">
                <TableHeaderComponent />
                <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                  {displayedData.map((item, index) => (
                    <TableRowComponent
                      key={item.id}
                      item={item}
                      index={startIndex + index} // Giữ nguyên index theo dữ liệu gốc
                      onDelete={handleDeleteItem}
                    />
                  ))}
                </TableBody>
              </Table>
            </div>
            <div className="flex justify-between items-center mt-6">
              <ItemsPerPage
                value={itemsPerPage}
                onChange={(newValue) => {
                  setItemsPerPage(newValue);
                  setCurrentPage(1);
                }}
                min={5}
                max={50}
                label="Số lượng"
              />

              <div className="flex items-center gap-x-2">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />

                {/* <PaginationControls
                itemsPerPage={itemsPerPage}
                setItemsPerPage={setItemsPerPage}
                onPageChange={handlePageChange}
                currentPage={currentPage}
                totalPages={totalPages}
              /> */}
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default TrainingLevelManagement;
