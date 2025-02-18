export const DeleteConfirmation = ({ onDelete, onCancel }: { onDelete: () => void; onCancel: () => void }) => {
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-[--background-while] rounded-lg p-6 w-[400px] shadow-lg">
        <h2 className="text-xl font-bold text-center">Xóa niên khóa</h2>
        <p className="text-gray-600 text-center mt-2">
          Xác nhận muốn xóa niên khóa này và toàn bộ thông tin bên trong? Sau khi xóa sẽ không thể hoàn tác.
        </p>
        <div className="flex justify-center gap-4 mt-4">
          <button onClick={onCancel} className="px-4 py-2 border border-gray-300 rounded-md hover:bg-gray-100">
            Huỷ
          </button>
          <button onClick={onDelete} className="px-4 py-2 bg-orange-500 text-white rounded-md hover:bg-orange-600">
            Xác nhận
          </button>
        </div>
      </div>
    </div>
  );
};
