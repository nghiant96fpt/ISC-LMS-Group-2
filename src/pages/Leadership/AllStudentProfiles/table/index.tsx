import search from './../../../../assets/icons/fi_search.png';
import TableBody from './bodyTable';
import './styleTable.css';

interface HeaderSearchProps {
  title: string;
}

const TableStudentRetention: React.FC<HeaderSearchProps> = ({ title }) => {
  return (
    <>
      <div className="TableStudentRetentionsBoder">
        <div className="TableStudentRetentions">
          <div className="TableStudentRetention flex justify-between pr-8">
            <div className="mt-4">
              <p className="title-classrooomsettings">Danh sách học viên</p>
            </div>

            <div className="search-classrooomsettings">
              <button className="search-button-classrooomsettings">
                <img src={search} alt="search" className="icon-search" />
              </button>
              <input type="text" className="search-input" placeholder="Tìm kiếm..." />
            </div>
          </div>

          <div className="TableStudentRetention-Body w-full">
            <TableBody />
          </div>
        </div>
      </div>
    </>
  );
};

export default TableStudentRetention;
