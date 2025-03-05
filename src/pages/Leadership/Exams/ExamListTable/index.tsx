import { useState } from "react";
import Calendar from "./Calendar";
import ExamList from "./ExamList";
import SwitchTag from "../../../../components/SwitchTag";
import DropdownSelectionComponent from "../../../../components/DropdownSelection";
import Button from "../../../../components/Button";
import AddressList from "../../../../components/AddressUrlStack/Index";
import { useNavigate } from "react-router";
const tabOptions = {
    labels: ['Xem theo bảng', 'Xem theo lịch '],
    paths: ["/leadership/exams", "/leadership/exams/list"],
};
const option_date = ["2020-2021", "2019-2020", "2018-2019", "2017-2018"];
const option_selectClass = ["6A", "6B", "6C"];
const option_selectBlock = ["Khối 6", "Khối 7", "Khối 8"];
const ExamPage = () => {
    const navigate = useNavigate();
    const [selectedDate, setSelectedDate] = useState<string | null>(null);
    const [viewMode, setViewMode] = useState<"table" | "calendar">("table");
    const [urls, setUrls] = useState([{ link: "/", linkName: "Quản lý lịch thi" }])
    const goCreate = () => {
        navigate(`/leadership/exams/create-exam-schedule`);
    };
    return (
        <div className="flex flex-col gap-4  w-full max-w-6xl mx-auto">
            {/* Tiêu đề trang */}
            <AddressList addressList={urls} />

            {/* Phần header quản lý lịch thi */}
            <div className="flex flex-wrap items-center justify-between gap-4 p-4">
                {/* Group chứa select và nút công tắc */}
                <div className="flex flex-wrap gap-2 items-center">
                    <DropdownSelectionComponent placeholder="Niên khóa" label={option_date[0]} options={option_date} width={144} />
                    <DropdownSelectionComponent
                        label='Chọn lớp'
                        options={option_selectClass}
                        width={144}
                    />
                    <DropdownSelectionComponent
                        label='Chọn khối'
                        options={option_selectBlock}
                        width={144}
                    />


                    {/* Nút chuyển đổi dạng công tắc */}
                    <div className="flex bg-gray-200 rounded-full p-1">
                        <SwitchTag options={tabOptions} />
                    </div>
                </div>

                {/* Nút thêm mới */}
                <Button className="bg-orange-500 text-white px-4 py-2 rounded flex items-center" onClick={goCreate}>
                    + Thêm mới
                </Button>
            </div>

            {/* Phần nội dung */}
            <div className="flex flex-col md:flex-row gap-4 justify-center w-full">
                <div className="w-full md:w-3/4">
                    <Calendar setSelectedDate={setSelectedDate} />
                </div>
                <div className="w-full md:w-1/4">
                    <ExamList selectedDate={selectedDate} />
                </div>
            </div>
        </div>
    );
};

export default ExamPage;
