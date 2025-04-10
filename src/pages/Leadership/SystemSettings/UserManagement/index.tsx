import { useState, useEffect } from 'react';
import TitleComponent from '../../../../components/Title';
import { Table, TableBody } from '../../../../components/ui/tabble';
import AddressList from '../../../../components/AddressUrlStack/Index';
import Button from '../../../../components/Button';
import { useNavigate } from 'react-router-dom';
import DropdownSelectionComponent from '../../../../components/DropdownSelection';
import UserListTableHeader from './userListTableHeader';
import UserListTableRow from './userListTableRow';
import { fetchUserList, UserListItem } from './data/userListData';
import ClassListFromSearch from '../../DeclareData/ClassList/TableClassList/ClassListFromSearch';
import ItemsPerPage from './ItemsPerPage';
import Pagination from './pagination';
import axios from 'axios';
import { ArrowPathIcon } from '@heroicons/react/24/solid';

const UserManagement = () => {
  const navigate = useNavigate();
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState(1);
  const [userListData, setUserListData] = useState<UserListItem[]>([]);
  const [urls, setUrls] = useState([
    { link: '/', linkName: 'Cài đặt hệ thống' },
    { link: '/', linkName: 'Người dùng hệ thống' },
  ]);
  const [selectedTerm, setSelectedTerm] = useState('');
  const [selectedGrade, setSelectedGrade] = useState('');
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loadUserList = async () => {
      setLoading(true);
      try {
        const data = await fetchUserList(currentPage, itemsPerPage, searchTerm);
        setUserListData(data);
      } catch (error: any) {
        console.error('Failed to load user list:', error);
      } finally {
        setLoading(false);
      }
    };

    loadUserList();
  }, [currentPage, itemsPerPage, searchTerm]);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    setCurrentPage(1);
  };

  const handleDeleteItem = async (id: number) => {
    try {
      await axios.delete(`/api/users/${id}`);
      setUserListData((prevData) => prevData.filter((item) => item.id !== id));
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedData = userListData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(userListData.length / itemsPerPage);

  return (
    <>
      <AddressList addressList={urls.map((url, index) => ({ ...url, key: `${url.link}-${index}` }))} />
      <div className="flex justify-between items-center mb-5 mr-7">
        <div className="flex items-center gap-4">
          <DropdownSelectionComponent
            label="Chọn kỳ"
            placeholder="Chọn kỳ"
            options={['Kỳ 1', 'Kỳ 2']}
            onSelect={setSelectedTerm}
            width={144}
            className="border-black"
          />
          <DropdownSelectionComponent
            label="Chọn khối"
            placeholder="Chọn khối"
            options={['Khối 1', 'Khối 2']}
            onSelect={setSelectedGrade}
            width={144}
            className="border-black"
          />
        </div>
      </div>
      <section className="rounded-lg bg-background-white shadow-[4px_4px_25px_4px_rgba(154,201,245,0.25)] sm:p-5 antialiased">
        <div className="flex flex-col md:flex-row items-stretch md:items-center md:space-x-3 space-y-3 md:space-y-0 justify-between mx-4 py-4 dark:border-gray-700">
          <TitleComponent text="Danh sách người dùng" size={22} weight="extrabold" style={{ fontFamily: 'var(--font-Mulish)' }} />
          <ClassListFromSearch
            onSearch={handleSearch}
            placeholder="Tìm kiếm"
            inputStyle={{
              fontFamily: 'var(--font-Mulish)',
              fontStyle: 'italic',
              color: 'var(--black-text)',
            }}
          />
        </div>
        <div className="mb-4 col-span-full xl:mb-2">
          <div className="p-4 z-0 flex flex-col relative justify-between gap-4 rounded-large shadow-small w-full">
            <div className="relative overflow-x-auto border border-gray-400/10 rounded-lg w-full max-h-[340px] overflow-y-auto">
              <Table>
                <UserListTableHeader />
                <TableBody className="divide-y divide-[#F0F3F6] bg-white dark:divide-white/[0.05]">
                  {loading ? (
                    <tr>
                      <td colSpan={5} className="py-4">
                        <div className="flex justify-center items-center">
                          <ArrowPathIcon className="motion-safe:animate-spin w-[30px] h-[30px] text-orange-500 opacity-100" />
                        </div>
                      </td>
                    </tr>
                  ) : (
                    displayedData.map((item: any, index: number) => (
                      <UserListTableRow
                        key={item.id}
                        item={{
                          id: item.id,
                          name: item.name,
                          email: item.email,
                          userGroup: item.userGroup,
                          status: item.status,
                        }}
                        index={startIndex + index}
                        onDelete={handleDeleteItem}
                        statusClassName="text-gray-500 italic"
                      />
                    ))
                  )}
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
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default UserManagement;
