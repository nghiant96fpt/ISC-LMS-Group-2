import React from 'react';
import Button from '../../../../components/Button';

const ConfirmPopup: React.FC = () => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-8 rounded-lg shadow-2xl w-[500px] max-w-full">
        <h2 className="text-2xl font-bold text-center">Xác nhận</h2>
        <p className="text-center mt-4 whitespace-nowrap text-lg">Giảng viên có chắc chắn muốn Bắt đầu bài kiểm tra?</p>
        <div className="flex justify-center mt-8 space-x-3">
          <Button className="secondary" size="big">
            Hủy
          </Button>
          <Button className="primary" size="big">
            Lưu
          </Button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmPopup;
