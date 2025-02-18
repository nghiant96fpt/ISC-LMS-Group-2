import { Icons } from '../SchoolYearTable/Icons';

const Pagination = () => {
  return (
    <div className="flex justify-between items-center mt-4">
      <span className="italic text-[16px] font-[font-Source-Sans-Pro]">
        Hiển thị
        <input className="mx-2 w-12 px-3 border border-[--border-orange] rounded-md focus:border-border-orange focus:outline-none" />
        hàng trong mỗi trang
      </span>
      <div className="flex gap-2">
        <button className="px-3 py-1">
          <img className="w-5" src={Icons.arrow_left} alt="" />
        </button>
        <button className="px-3 py-1">1</button>
        <button className="px-3 py-1 rounded-full bg-background-orange-1 text-white">2</button>
        <button className="px-3 py-1">3</button>
        ...
        <button className="px-3 py-1">100</button>
        <button className="px-3 py-1">
          <img className="w-5" src={Icons.arrow_right} alt="" />
        </button>
      </div>
    </div>
  );
};

export default Pagination;
