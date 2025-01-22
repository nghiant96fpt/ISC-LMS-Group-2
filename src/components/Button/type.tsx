import React from "react";

export interface ButtonProps {
    className?: 'primary' | 'secondary' | 'outline-primary' | 'outline-secondary';
    icon?: React.ReactNode;
    children: React.ReactNode;
    onClick?: () => void;
    width?: string;
    height?: string;
    disabled?: boolean;
    size?: 'big' | 'mini';
    type?: 'button' | 'submit' | 'reset',
    style?: React.CSSProperties;
}
