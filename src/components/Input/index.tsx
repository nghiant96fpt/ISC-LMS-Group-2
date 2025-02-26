import React, { forwardRef } from 'react';
import { inputProps } from './type';

const Input = forwardRef<HTMLInputElement, inputProps>(({ placeholder, outline, disabled, icon, size, style, className, type }, ref) => {
  return (
    <div
      className={`relative rounded-md ${disabled ? 'bg-slate-100' : ''}`}
      style={{
        width: style?.width ?? (size === 'sm' ? 150 : size === 'md' ? 410 : size === 'lg' ? 890 : undefined),
        ...style,
      }}
    >
      {icon && <div className={`absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none ${outline ? 'text-orange-text' : 'text-slate-400'}`}>{icon}</div>}
      <input
        ref={ref}
        className={`border-2 border-solid w-full h-11 ${
          outline === 'primary-outline' ? 'border-orange-text' : 'border-gray-300'
        } rounded-md py-1 px-3 ${icon ? 'pl-10' : ''} 
          focus:ring-1 focus:ring-sky-500 focus:outline-none focus:border-sky-500 ${className}`}
        placeholder={placeholder}
        disabled={disabled}
        type={type}
      />
    </div>
  );
});

export default Input;
