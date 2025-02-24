import React, { useCallback, useState } from 'react';
import './style.css';
import { Link } from 'react-router';
import DeleteModal from '../../../../components/DeleteModal';
import { IScoreType } from './type';

const scoreTypes = [
  { id: 1, name: "Điểm kiểm tra miệng", coefficient: 1, semester1: 1, semester2: 3 },
  { id: 2, name: "Điểm kiểm tra 15 phút", coefficient: 1, semester1: 3, semester2: 3 },
  { id: 3, name: "Điểm kiểm tra 1 tiết", coefficient: 2, semester1: 2, semester2: 1 },
  { id: 4, name: "Điểm thi học kỳ", coefficient: 3, semester1: 1, semester2: 1 },
];

const ScoreTypes: React.FC = () => {
  const [itemsPerPage, setItemsPerPage] = useState(8);
  const [data, setData] = useState<IScoreType[]>(scoreTypes);
  const [selectedScoreType, setSelectedScoreType] = useState<IScoreType | null>(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const handleDeleteClick = useCallback((item: IScoreType) => {
    setSelectedScoreType(item);
    setIsDeleteModalOpen(true);
  }, []);

  const handleItemsPerPageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setItemsPerPage(Number(e.target.value));
  };

  const handleCancelDelete = useCallback(() => {
    setIsDeleteModalOpen(false);
  }, []);

  const confirmDelete = useCallback(() => {
    if (selectedScoreType) {
      setData((prev) => prev.filter((g) => g.id !== selectedScoreType.id));
    }
    setIsDeleteModalOpen(false);
  }, [selectedScoreType]);

  return (
    <div className="flex flex-col min-h-[752px]  bg-background-white shadow-custom rounded-lg p-4">
      <div className="flex flex-wrap justify-between items-center px-2 md:px-10 py-2 gap-2">
        <h2 className="text-lg font-sans font-bold">Loại Điểm</h2>
        <div className="relative flex items-center w-full max-w-xs sm:w-[438px] rounded-[30px] border border-gray-300">
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" className="ms-3">
            <path fill-rule="evenodd" clip-rule="evenodd" d="M11 4C7.13401 4 4 7.13401 4 11C4 14.866 7.13401 18 11 18C14.866 18 18 14.866 18 11C18 7.13401 14.866 4 11 4ZM2 11C2 6.02944 6.02944 2 11 2C15.9706 2 20 6.02944 20 11C20 15.9706 15.9706 20 11 20C6.02944 20 2 15.9706 2 11Z" fill="#C5C5C5" />
            <path fill-rule="evenodd" clip-rule="evenodd" d="M15.9429 15.9433C16.3334 15.5528 16.9666 15.5528 17.3571 15.9433L21.7071 20.2933C22.0976 20.6838 22.0976 21.317 21.7071 21.7075C21.3166 22.098 20.6834 22.098 20.2929 21.7075L15.9429 17.3575C15.5524 16.967 15.5524 16.3338 15.9429 15.9433Z" fill="#C5C5C5" />
          </svg>
          <input
            type="text"
            placeholder="Tìm kiếm"
            className="w-full h-[40px] pl-2 pr-4 rounded-[30px] border-none focus:outline-none focus:ring-0 italic"
          />
        </div>
      </div>

      <div className="overflow-x-auto flex-grow px-2 md:px-10">
        <table className="w-full border-collapse overflow-hidden rounded-t-lg">
          <thead className="bg-gradient-to-r from-background-2 to-background-1 text-white">
            <tr>
              <th className="py-3 px-4 text-center" rowSpan={2}>
                <div className="flex items-center px-3 gap-2 font-sans">
                  <span> Loại điểm</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z" fill="white" />
                    <path d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z" fill="white" />
                  </svg>
                </div>
              </th>
              <th className="py-3 text-center" rowSpan={2}>
                <div className="flex items-center justify-center gap-2 font-sans w-full">
                  <span>Hệ số</span>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M9.70994 9.7158L11.9999 7.4158L14.2899 9.7158C14.3829 9.80953 14.4935 9.88392 14.6154 9.93469C14.7372 9.98546 14.8679 10.0116 14.9999 10.0116C15.132 10.0116 15.2627 9.98546 15.3845 9.93469C15.5064 9.88392 15.617 9.80953 15.7099 9.7158C15.8037 9.62284 15.8781 9.51223 15.9288 9.39038C15.9796 9.26852 16.0057 9.13781 16.0057 9.0058C16.0057 8.87379 15.9796 8.74308 15.9288 8.62122C15.8781 8.49936 15.8037 8.38876 15.7099 8.2958L12.7099 5.2958C12.617 5.20207 12.5064 5.12768 12.3845 5.07691C12.2627 5.02614 12.132 5 11.9999 5C11.8679 5 11.7372 5.02614 11.6154 5.07691C11.4935 5.12768 11.3829 5.20207 11.2899 5.2958L8.28994 8.2958C8.10164 8.4841 7.99585 8.7395 7.99585 9.0058C7.99585 9.2721 8.10164 9.52749 8.28994 9.7158C8.47825 9.9041 8.73364 10.0099 8.99994 10.0099C9.26624 10.0099 9.52164 9.9041 9.70994 9.7158Z" fill="white" />
                    <path d="M11.603 18.9856C11.4811 18.9348 11.3705 18.8604 11.2775 18.7667L8.27753 15.7267C8.1838 15.6337 8.10941 15.5231 8.05864 15.4013C8.00787 15.2794 7.98173 15.1487 7.98173 15.0167C7.98173 14.8847 8.00787 14.754 8.05864 14.6321C8.10941 14.5103 8.1838 14.3997 8.27753 14.3067C8.37049 14.213 8.48109 14.1386 8.60295 14.0878C8.72481 14.037 8.85552 14.0109 8.98753 14.0109C9.11954 14.0109 9.25025 14.037 9.3721 14.0878C9.49396 14.1386 9.60456 14.213 9.69753 14.3067L11.9875 16.6467L14.2775 14.3067C14.4711 14.1184 14.7316 14.0147 15.0017 14.0185C15.2717 14.0222 15.5292 14.1331 15.7175 14.3267C15.9058 14.5203 16.0095 14.7808 16.0058 15.0508C16.002 15.3209 15.8911 15.5784 15.6975 15.7667L12.6975 18.7667C12.6046 18.8604 12.494 18.9348 12.3721 18.9856C12.2502 19.0364 12.1195 19.0625 11.9875 19.0625C11.8555 19.0625 11.7248 19.0364 11.603 18.9856Z" fill="white" />
                  </svg>
                </div>
              </th>
              <th className="py-3 px-4 text-center border border-white" colSpan={2}>
                Số cột điểm tối thiểu
              </th>
              <th className="py-3 px-4 text-right" rowSpan={2}></th>
            </tr>
            <tr>
              <th className="py-3 px-4 text-center border border-white">Học kỳ 1</th>
              <th className="py-3 px-4 text-center border border-white">Học kỳ 2</th>
            </tr>
          </thead>

          <tbody>
            {data.map((item, index) => (
              <tr key={index} className={`border-b ${index % 2 === 1 ? 'bg-gray-100' : ''}`}>
                <td className="py-3 px-5 text-black-text">{item.name}</td>
                <td className="py-3 px-4 text-center text-black-text">{item.coefficient}</td>
                <td className="py-3 px-4 text-center text-black-text">{item.semester1}</td>
                <td className="py-3 px-4 text-center text-black-text">{item.semester2}</td>
                <td className="py-3 px-4 text-center">
                  <div className="flex justify-center space-x-2 items-center">
                    <button className="w-8 h-8 flex items-center justify-center">
                      <Link to={`/leadership/declare-data/score-types/${item.id}`}>
                        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                          <path fillRule="evenodd" clipRule="evenodd" d="M2.50482 5.17157C3.25497 4.42143 4.27239 4 5.33325 4H14.6666C15.403 4 15.9999 4.59695 15.9999 5.33333C15.9999 6.06971 15.403 6.66667 14.6666 6.66667H5.33325C4.97963 6.66667 4.64049 6.80714 4.39044 7.05719C4.14039 7.30724 3.99992 7.64638 3.99992 8V26.6667C3.99992 27.0203 4.14039 27.3594 4.39044 27.6095C4.64049 27.8595 4.97963 28 5.33325 28H23.9999C24.3535 28 24.6927 27.8595 24.9427 27.6095C25.1928 27.3594 25.3333 27.0203 25.3333 26.6667V17.3333C25.3333 16.597 25.9302 16 26.6666 16C27.403 16 27.9999 16.597 27.9999 17.3333V26.6667C27.9999 27.7275 27.5785 28.7449 26.8283 29.4951C26.0782 30.2452 25.0608 30.6667 23.9999 30.6667H5.33325C4.27239 30.6667 3.25497 30.2452 2.50482 29.4951C1.75468 28.7449 1.33325 27.7275 1.33325 26.6667V8C1.33325 6.93913 1.75468 5.92172 2.50482 5.17157Z" fill="#FF7506" />
                          <path fillRule="evenodd" clipRule="evenodd" d="M26.6666 3.83854C26.2701 3.83854 25.8898 3.99606 25.6094 4.27644L13.2039 16.682L12.4991 19.5011L15.3183 18.7964L27.7238 6.39083C28.0042 6.11044 28.1617 5.73016 28.1617 5.33363C28.1617 4.93711 28.0042 4.55683 27.7238 4.27644C27.4434 3.99606 27.0631 3.83854 26.6666 3.83854ZM23.7238 2.39083C24.5043 1.61034 25.5628 1.17188 26.6666 1.17188C27.7704 1.17188 28.8289 1.61034 29.6094 2.39083C30.3899 3.17131 30.8284 4.22987 30.8284 5.33363C30.8284 6.4374 30.3899 7.49596 29.6094 8.27644L16.9428 20.9431C16.7719 21.114 16.5578 21.2352 16.3233 21.2938L10.99 22.6272C10.5356 22.7407 10.055 22.6076 9.7238 22.2764C9.39263 21.9453 9.2595 21.4646 9.37309 21.0103L10.7064 15.6769C10.765 15.4425 10.8863 15.2284 11.0571 15.0575L23.7238 2.39083Z" fill="#FF7506" />
                        </svg>
                      </Link>
                    </button>
                    <button onClick={handleDeleteClick.bind(null, item)} className="w-8 h-8 flex items-center justify-center">
                      <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd" clipRule="evenodd" d="M12.3906 4.39118C12.6407 4.14113 12.9798 4.00065 13.3334 4.00065H18.6667C19.0204 4.00065 19.3595 4.14113 19.6096 4.39118C19.8596 4.64122 20.0001 4.98036 20.0001 5.33398V6.66732H12.0001V5.33398C12.0001 4.98036 12.1406 4.64122 12.3906 4.39118ZM9.33341 6.66732V5.33398C9.33341 4.27312 9.75484 3.2557 10.505 2.50556C11.2551 1.75541 12.2725 1.33398 13.3334 1.33398H18.6667C19.7276 1.33398 20.745 1.75541 21.4952 2.50556C22.2453 3.2557 22.6667 4.27312 22.6667 5.33398V6.66732H25.3334H28.0001C28.7365 6.66732 29.3334 7.26427 29.3334 8.00065C29.3334 8.73703 28.7365 9.33398 28.0001 9.33398H26.6667V26.6673C26.6667 27.7282 26.2453 28.7456 25.4952 29.4957C24.745 30.2459 23.7276 30.6673 22.6667 30.6673H9.33341C8.27255 30.6673 7.25513 30.2459 6.50499 29.4957C5.75484 28.7456 5.33341 27.7282 5.33341 26.6673V9.33398H4.00008C3.2637 9.33398 2.66675 8.73703 2.66675 8.00065C2.66675 7.26427 3.2637 6.66732 4.00008 6.66732H6.66675H9.33341ZM8.00008 9.33398V26.6673C8.00008 27.0209 8.14056 27.3601 8.39061 27.6101C8.64065 27.8602 8.97979 28.0006 9.33341 28.0006H22.6667C23.0204 28.0006 23.3595 27.8602 23.6096 27.6101C23.8596 27.3601 24.0001 27.0209 24.0001 26.6673V9.33398H8.00008ZM18.6667 13.334C19.4031 13.334 20.0001 13.9309 20.0001 14.6673V22.6673C20.0001 23.4037 19.4031 24.0007 18.6667 24.0007C17.9304 24.0007 17.3334 23.4037 17.3334 22.6673V14.6673C17.3334 13.9309 17.9304 13.334 18.6667 13.334ZM14.6667 14.6673C14.6667 13.9309 14.0698 13.334 13.3334 13.334C12.597 13.334 12.0001 13.9309 12.0001 14.6673V22.6673C12.0001 23.4037 12.597 24.0007 13.3334 24.0007C14.0698 24.0007 14.6667 23.4037 14.6667 22.6673V14.6673Z" fill="#FF7506" />
                      </svg>
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        {isDeleteModalOpen && <DeleteModal title='Xóa' message='Xác nhận muốn xoá những thông tin đã chọn? Sau khi xoá sẽ không thể hoàn tác.' onCancel={handleCancelDelete} onConfirm={confirmDelete} />}
      </div>

      <div className="mt-auto flex flex-wrap justify-center md:justify-between items-center px-2 md:px-10 p-4 mb-5 text-black-text font-sans italic text-sm gap-2">
        <div className="flex items-center space-x-2 font-sans">
          <span>Hiển thị</span>
          <input
            type="number"
            min={1}
            value={itemsPerPage}
            onChange={handleItemsPerPageChange}
            className="w-12 h-7 border border-border-orange rounded-md text-center text-black-text focus:outline-none focus:ring-1 focus:ring-border-orange"
          />
          <span>hàng trong mỗi trang</span>
        </div>

        <div className="flex space-x-1 md:space-x-2 items-center text-black-text text-sm font-sans">
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-left" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M11.354 1.646a.5.5 0 0 1 0 .708L5.707 8l5.647 5.646a.5.5 0 0 1-.708.708l-6-6a.5.5 0 0 1 0-.708l6-6a.5.5 0 0 1 .708 0" />
            </svg>
          </button>
          <button className="text-black-text">1</button>
          <button className="w-[26px] h-[26px] rounded-full bg-background-orange-1 text-white flex items-center justify-center font-medium">
            2
          </button>
          <button className="text-black">3</button>
          <button className="text-black">...</button>
          <button className="text-black">10</button>
          <button>
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-chevron-right" viewBox="0 0 16 16">
              <path fillRule="evenodd" d="M4.646 1.646a.5.5 0 0 1 .708 0l6 6a.5.5 0 0 1 0 .708l-6 6a.5.5 0 0 1-.708-.708L10.293 8 4.646 2.354a.5.5 0 0 1 0-.708" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
};

export default ScoreTypes;
