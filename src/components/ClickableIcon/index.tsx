import React from "react";
import { ClickableIconProps } from "./type";
import IconImages from "../IconImages";
import "./style.css"; 

const sizeClasses = {
  sm: "w-6 h-6",  // 24px
  md: "w-8 h-8",  // 32px
  lg: "w-10 h-10", // 40px
  xl: "w-12 h-12", // 48px
};

const ClickableIcon: React.FC<ClickableIconProps> = ({
  iconName,                                  // Tên biểu tượng được chọn
  onClick,                                   // Hàm gọi lại khi biểu tượng được nhấp
  size = "md",                               // Kích thước mặc định của biểu tượng là 'md'
  customStyles = {},                         // Các kiểu dáng tùy chỉnh (mặc định là một đối tượng rỗng)
}) => {
                                              // Lấy biểu tượng tương ứng từ danh sách IconImages
  const iconToDisplay = IconImages[iconName as keyof typeof IconImages];

  return (
    <button 
      onClick={onClick} 
      className={`clickable-icon ${sizeClasses[size]}`} 
      style={customStyles.container}         // Áp dụng kiểu dáng tùy chỉnh cho container
    >
      {iconToDisplay && (
        <img
          src={iconToDisplay as string}
          alt="Clickable icon"
          className={`clickable-icon-img ${sizeClasses[size]}`}
          style={customStyles.icon}          // Áp dụng kiểu dáng tùy chỉnh cho biểu tượng
        />
      )}
    </button>
  );
};

export default ClickableIcon;