import { useState, useEffect } from 'react';
import { Table, TableBody } from '../../../../components/ui/tabble';
import TableHeaderComponent from './TransferListTableHeader';
import TableRowComponent from './TransferListTableRow';
import TitleComponent from '../../../../components/Title';
import ClassListFromSearch from './TransferListFromSearch';
import ItemsPerPage from './TransferListItemsPerPage';
import Pagination from './TransferListtPagination';
import AddressList from '../../../../components/AddressUrlStack/Index';
import { Link } from 'react-router';
import { useCookies } from 'react-cookie';
import axios from 'axios';
import { SchoolTransferListItem } from './data';

const ListTransferAcceptance = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [data, setData] = useState<SchoolTransferListItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [cookies] = useCookies(['accessToken']);

  // console.log(data);
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

  const handleSearch = (query: string) => {
    console.log('Searching for:', query);
    // You can implement search functionality here
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = data.slice(startIndex, endIndex);
  const totalPages = Math.ceil(data.length / itemsPerPage);

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
              <div className="flex items-center gap-x-2">
                <Pagination currentPage={currentPage} totalPages={totalPages} onPageChange={(page) => setCurrentPage(page)} />
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default ListTransferAcceptance;
