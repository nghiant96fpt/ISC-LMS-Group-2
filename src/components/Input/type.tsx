import React from "react";

export interface inputProps {
  outline?: 'primary-outline', 
  disabled?: boolean, 
  placeholder?: string,
  icon?: React.ReactNode,
  size?: 'sm' | 'md' | 'lg',
  style?: React.CSSProperties,
  className?: string,
  type?: 'text' | 'password',
};

// cách sử dụng ref tránh lỗi nhất (theo chatGPT): const aRef = useRef<HTMLInputElement>(null);