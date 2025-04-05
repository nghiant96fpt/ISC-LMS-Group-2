import { useState, useEffect } from 'react';
import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './TransferListTableHeader';
import TableRowComponent from './TransferListTableRow';
import TitleComponent from '../../../../components/Title';
// import ClassListFromSearch from './TransferListFromSearch';
import ItemsPerPage from './TransferListItemsPerPage';
import Pagination from './TransferListtPagination';
import AddressList from '../../../../components/AddressUrlStack/Index';
import { Link } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { SchoolTransferListItem } from './data';
import search_icon from '../../../../../src/assets/icons/fi_search.png';

const ListTransferAcceptance = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<SchoolTransferListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [cookies] = useCookies(['accessToken']);

  useEffect(() => {
    const fetchTransferList = async () => {
      try {
        const response = await axios.get('https://fivefood.shop/api/transfer-school/list', {
          headers: {
            Authorization: `Bearer ${cookies.accessToken}`,
          },
        });

        // Transform the data to match our interface
        const transformedData = response.data.data.map((item: any) => ({
          studentId: item.studentId,
          fullName: item.fullName,
          dateOfBirth: new Date(item.dateOfBirth),
          gender: item.gender,
          transferDate: new Date(item.transferDate),
          transferSemester: item.transferSemester,
          transferToSchool: item.transferToSchool,
          semesterStart: new Date(item.semesterStart),
          semesterEnd: new Date(item.semesterEnd),
          grade: item.gradeLevel,
        }));

        setData(transformedData);
        setLoading(false);
      } catch (err) {
        setError('Failed to fetch transfer list');
        setLoading(false);
        console.error('Error fetching transfer list:', err);
      }
    };

    fetchTransferList();
  }, [cookies.accessToken]);

  // Reset page when search query changes
  useEffect(() => {
    setCurrentPage(1);
  }, [searchQuery]);

  // Filter data based on search query
  const filteredData = data.filter(item =>
    item.fullName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Pagination calculations
  const totalItems: number = filteredData.length;
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = Math.min(startIndex + itemsPerPage, totalItems);
  const displayedData = filteredData.slice(startIndex, endIndex);

  // Handle page change
  const handlePageChange = (page: number) => {
    if (page < 1) page = 1;
    if (page > totalPages) page = totalPages;
    setCurrentPage(page);
  };

  const addressData = [
    { linkName: 'Hồ sơ học viên', link: '/quan-ly-hoc-sinh' },
    { linkName: 'Tiếp nhận chuyển trường', link: '/tiep-nhan-chuyen-truong' },
  ];

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <>
      <div className="flex flex-col  mb-4">
        <div className="mb-4">
          <AddressList addressList={addressData} />
        </div>

        <div className="flex justify-end sm:flex-row gap-3 w-full md:w-auto mx-10">
          <Link to="/leadership/add-transfer-acceptance">
            <button className="flex items-center gap-2 whitespace-nowrap px-6 py-3 bg-orange-500 text-white rounded-md hover:bg-orange-600">
              <span>+</span>
              <span>Thêm mới</span>
            </button>
          </Link>
        </div>
      </div>
      <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased mb-10 ">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
          <TitleComponent text="Danh sách chuyển trường" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
          <div className="relative w-full max-w-sm">
            <img src={search_icon} alt="Search" className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Tìm kiếm tên học viên"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full font-[--font-Source-Sans-Pro] font-[weight-Source-Sans-Pro-3] px-10 py-2 border bg-[#F0F3F6] rounded-[24px] outline-none focus:border-[--border-orange]"
            />
          </div>
        </div>

        <div className="mb-4 col-span-full xl:mb-2">
          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
            <div
              className="relative overflow-x-auto border border-gray-400/10 rounded-lg sm:rounded-lg md:rounded-lg lg:rounded-lg
                      xl:rounded-lg 2xl:rounded-lg"
            >
              <Table style={{ fontFamily: 'var(--font-Mulish)' }} className="w-full text-sm text-left rtl:text-right">
                {/* Header */}
                <TableHeaderComponent />

                {/* Body */}
                <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                  {displayedData.map((item, index) => (
                    <TableRowComponent key={item.studentId} item={item} index={startIndex + index} />
                  ))}
                </TableBody>
              </Table>
            </div>
            {/* Chọn số hàng hiển thị */}
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

              {/* Phân trang */}
              <Pagination 
  currentPage={currentPage}
  totalPages={totalPages} 
  onPageChange={handlePageChange}
  totalItems={totalItems}
  itemsPerPage={itemsPerPage}
  startIndex={startIndex + 1}
  endIndex={endIndex}
/>
              </div>
            </div>
          </div>
        
      </section>
    </>
  );
};

export default ListTransferAcceptance;
