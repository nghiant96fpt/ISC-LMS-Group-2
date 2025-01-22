import React from 'react';
import './style.css';
import { ButtonProps } from './type';

const Button: React.FC<ButtonProps> = ({
    className: className = '',
    disabled = false,
    icon,
    children,
    onClick,
    width,
    height,
    size = 'big',
    type = 'button',
    style,
}) => {
    const buttonClass = `button ${className} ${size}  ${disabled ? 'disabled' : ''}`;

    return (
        <button
            className={buttonClass}
            onClick={onClick}
            style={{ ...style, width, height }}
            type={type}
        >
            {icon && <span className="icon">{icon}</span>}
            {children}
        </button>
    );
};

export default Button;
