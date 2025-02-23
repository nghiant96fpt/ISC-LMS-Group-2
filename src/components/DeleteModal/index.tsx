import React from 'react';
import { IDeleteModal } from './type';

const DeleteModal: React.FC<IDeleteModal> = ({ title, message, onCancel, onConfirm }) => {
    return (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white rounded-lg shadow-lg p-8 max-w-md w-full text-center">
                <h1 className="text-2xl font-bold mb-4">{title}</h1>
                <p className="text-gray-700 mb-8">{message}</p>
                <div className="flex justify-center space-x-10">
                    {/* Nút "Huỷ" */}
                    <button onClick={onCancel} className="bg-gray-100 text-black-text font-semibold py-3 px-14 rounded-lg">
                        Huỷ
                    </button>
                    {/* Nút "Xác nhận" có kích thước lớn hơn */}
                    <button onClick={onConfirm} className="bg-background-orange-1 text-white font-semibold py-3 px-10 rounded-lg">
                        Xác nhận
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DeleteModal;
