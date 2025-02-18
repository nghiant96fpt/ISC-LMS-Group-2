import React, { useState, useEffect } from "react";
import { CheckboxProps } from "./type";
import IconImages from '../IconImages'; 

const CheckboxComponent: React.FC<CheckboxProps> = ({
  label,
  isChecked,
  isIndeterminate = false,                             // Trạng thái "chưa xác định"
  onChange, 
  customStyles = {},
  iconName,                            
}) => {
  const [checked, setChecked] = useState(isChecked);    // Lưu trạng thái đã checked

  useEffect(() => {
    setChecked(isChecked);                              // Đồng bộ trạng thái isChecked với state checked
  }, [isChecked]);

                                                        // Nếu có iconName truyền vào, tìm icon tương ứng từ IconImages
  let iconToDisplay;

  if (iconName && IconImages[iconName]) {
                                                        // Nếu iconName hợp lệ, sử dụng icon đó
    iconToDisplay = IconImages[iconName];
  } else {
                                                        // Nếu không truyền iconName, chọn icon mặc định theo trạng thái
    if (isIndeterminate) {
      iconToDisplay = checked
        ? IconImages.iconMinusActiveBlueLarge
        : IconImages.iconMinusActiveGrayLarge;
    } else {
      iconToDisplay = checked
        ? IconImages.iconCheckActiveBlueLarge
        : IconImages.iconCheckActiveGrayLarge;
    }
  }

                                                          // Cập nhật trạng thái khi người dùng thay đổi checkbox
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setChecked(event.target.checked);
    onChange(event);                                      // Gọi onChange nếu có
  };

  return (
    <label className="flex items-center cursor-pointer select-none relative text-lg my-2" style={customStyles.container}>
      <input
        type="checkbox"
        checked={checked}
        onChange={handleChange}
        className="absolute opacity-0 w-0 h-0 cursor-pointer peer"
        style={customStyles.input}
      />
      <span className="relative flex justify-center items-center w-5 h-5 bg-white border-solid border-2 border-blue-status rounded transition-colors peer-checked:bg-blue-600" style={customStyles.checkmark}>
        {checked && iconToDisplay && (
          <img src={iconToDisplay} alt="Checkbox icon" className="w-full h-full" />
        )}
      </span>
      {label && (
        <span className="ml-3 text-gray-800 transition-colors" style={customStyles.label}>
          {label}
        </span>
      )}
    </label>
  );
};

export default CheckboxComponent;
