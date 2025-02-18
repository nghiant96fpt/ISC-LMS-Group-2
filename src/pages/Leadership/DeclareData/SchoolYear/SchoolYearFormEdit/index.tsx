import { useState } from 'react';
import Button from '../../../../../components/Button';
import CalendarInput from '../../../../../components/CalendarInput';

import CheckboxComponent from '../../../../../components/CheckBox';
import ClickableIcon from '../../../../../components/ClickableIcon';
import DropdownSelectionComponent from '../../../../../components/DropdownSelection';
import { IconInfoOutline } from '../../../../../components/Icons';
import TextComponent from '../../../../../components/Text';

import TextBlockComponent from '../../../../../components/TextBlock';
import TitleComponent from '../../../../../components/Title';

const SchoolYearFormEdit: React.FC = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    setIsChecked(event.target.checked);
  };

  const handleClick = () => {
    console.log('Icon được nhấn!');
  };

  return (
    <form encType="multipart/form-data">
      <div className="p-6 sm:p-8 md:p-10 bg-white rounded-lg shadow-sm dark:border-gray-700 dark:bg-gray-800 w-full">
        <TitleComponent
          text="Thiết lập niên khóa"
          size={30}
          align="center"
          weight="bold"
        />
        {/* Layout 2 cột */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full">
          {/* Cột 1 */}
          <div className="p-6 sm:p-8 md:p-10 dark:bg-gray-700 rounded-lg">
            <TitleComponent
              text="Niên khóa"
              size={20}
              className="mb-4"
            />

            {/* Dropdown + "đến" */}
            <div className="flex items-center gap-4 flex-wrap">
              <DropdownSelectionComponent
                placeholder="Niên khóa"
                options={['2020', '2021', '2022', '2023']}
                width={144}
                onSelect={(value) =>
                  console.log('Bạn chọn:', value)
                }
              />
              <span className="text-gray-700">đến</span>
              <DropdownSelectionComponent
                placeholder="Niên khóa"
                options={['2020', '2021', '2022', '2023']}
                width={144}
                onSelect={(value) =>
                  console.log('Bạn chọn:', value)
                }
              />
            </div>
          </div>

          {/* Cột 2 */}
          <div className="p-6 sm:p-8 md:p-10 dark:bg-gray-600 rounded-lg">
            <div className="flex justify-between items-center space-x-4">
              <CheckboxComponent
                label="Kế thừa dữ liệu"
                iconName="iconCheckActiveBlueLarge"
                isChecked={isChecked}
                onChange={handleCheckboxChange}
                className="flex-grow"
              />

              <DropdownSelectionComponent
                placeholder="Niên khóa"
                options={['2020', '2021', '2022', '2023']}
                width={144}
                onSelect={(value) =>
                  console.log('Bạn chọn:', value)
                }
                className="flex-grow"
              />
            </div>
            <div className="flex mt-4 space-x-4">
              <IconInfoOutline className="flex-shrink-0" />
              <TextBlockComponent text="Dữ liệu được kế thừa bao gồm các thông tin:<br/>- Thông tin học viên và Danh sách lớp học<br/>- Thông tin môn học<br/>- Phân công giảng dạy" />
            </div>
          </div>
        </div>

        <hr className="mx-6 border-t border-gray-300" />

        <div className="dark:bg-gray-700 rounded-lg">
          <TitleComponent
            text="Cài đặt thời gian"
            size={20}
            align="left"
            weight="bold"
            color="#CC5C00"
            className="m-6"
          />
        </div>

        {/* Flexbox cho dropdown */}
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-between">
          <ClickableIcon
            iconName="iconMinusActiveBlueLarge"
            onClick={handleClick}
            size="sm"
            text="Example Text"
          />
          <TextComponent
            text="Tên hoc kỳ:"
            color="var(--black-text)"
            weight="extrabold"
          />
          <input
            type="text"
            placeholder="Học kỳ 1"
            className="border border-gray-300 outline-none rounded-xl px-2 py-2 w-full md:w-60 "
          />
          <TextComponent
            text="từ"
            color="var(--black-text)"
            weight="thin"
          />
          <CalendarInput />
          <TextComponent
            text="đến"
            color="var(--black-text)"
            weight="thin"
          />
          <CalendarInput />
        </div>
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-between">
          <ClickableIcon
            iconName="iconMinusActiveBlueLarge"
            onClick={handleClick}
            size="sm"
          />
          <TextComponent
            text="Tên hoc kỳ:"
            color="var(--black-text)"
            weight="extrabold"
          />
          <input
            type="text"
            placeholder="Học kỳ 2"
            className="border border-gray-300 outline-none rounded-xl px-2 py-2 w-full md:w-60 "
          />
          <TextComponent
            text="từ"
            color="var(--black-text)"
            weight="thin"
          />
          <CalendarInput />
          <TextComponent
            text="đến"
            color="var(--black-text)"
            weight="thin"
          />
          <CalendarInput />
        </div>
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-start">
          <ClickableIcon
            iconName="iconPlusBlue"
            onClick={handleClick}
            size="sm"
          />
          <TextComponent
            text="Thêm học kỳ mới:"
            color="var(--blue-text)"
            weight="extrabold"
          />
        </div>
        <div className="my-6 mx-6 flex flex-wrap gap-4 items-center justify-center">
          <Button
            size="big"
            type="button"
            style={{
              backgroundColor: 'var(--background-gray)',
              color: 'black',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontFamily: 'var(--font-Mulish)',
            }}
          >
            Hủy
          </Button>
          <Button
            size="big"
            type="button"
            style={{
              backgroundColor: 'var(--background-4)',
              color: 'white',
              outline: 'none',
              border: 'none',
              fontWeight: 'bold',
              fontFamily: 'var(--font-Mulish)',
            }}
          >
            Lưu
          </Button>
        </div>
      </div>
    </form>
  );
};

export default SchoolYearFormEdit;
