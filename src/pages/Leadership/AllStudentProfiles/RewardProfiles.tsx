import React, { useState } from 'react';
import eyeIcon from '../../../assets/icons/orange_eye_outline.png';
import arrow_right from '../../../assets/icons/chevron_big_right.png';
import arrow_left from '../../../assets/icons/arrow left.png';
import search from '../../../assets/icons/fi_search.png';
import './table/styleTable.css';

const RewardProfiles: React.FC = () => {
  const [rowsPerPage, setRowsPerPage] = useState(8);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const totalPages = 100;

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="TableStudentRetention">
      <div className="TableStudentRetention-Header">
        <div className="header-search">
          <h2 className="title">Khen thưởng</h2>
          <div className="search-box">
            <img src={search} alt="Search" className="search-icon" />
            <input type="text" className="search-input" placeholder="Tìm kiếm" />
          </div>
        </div>
      </div>

      <div className="TableStudentRetention-Body">
        <table className="table">
          <thead>
            <tr>
              <th>Mã học viên</th>
              <th>Tên học viên</th>
              <th>Ngày sinh</th>
              <th>Giới tính</th>
              <th>Số lần khen thưởng</th>
              <th>Hành động</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>123</td>
              <td>Nguyễn Văn A</td>
              <td>01/01/2000</td>
              <td>Nam</td>
              <td>5</td>
              <td>
                <button onClick={() => console.log('View/Update Reward')}>
                  <img src={eyeIcon} alt="View" className="icon" />
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="TableStudentRetention-Footer">
        <div className="table-footer">
          <div className="rows-per-page">
            <span>Hiển thị</span>
            <input type="number" value={rowsPerPage} onChange={(e) => setRowsPerPage(Number(e.target.value))} />
            <span>hàng trong mỗi trang</span>
          </div>

          <div className="pagination">
            <button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
              <img src={arrow_left} alt="Sort Icon" className="sort-icon" />
            </button>

            <button onClick={() => handlePageChange(1)} className={currentPage === 1 ? 'active' : ''}>
              1
            </button>

            {currentPage > 2 && <span>...</span>}
            {currentPage > 1 && currentPage < totalPages && <button className="active">{currentPage}</button>}
            {currentPage < totalPages - 1 && <span>...</span>}

            <button onClick={() => handlePageChange(totalPages)} className={currentPage === totalPages ? 'active' : ''}>
              {totalPages}
            </button>

            <button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
              <img src={arrow_right} alt="Sort Icon" className="sort-icon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RewardProfiles;