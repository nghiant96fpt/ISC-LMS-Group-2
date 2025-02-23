import React from "react";

export interface inputProps {
  outline?: 'primary-outline';
  disabled?: boolean;
  placeholder?: string;
  icon?: React.ReactNode;
  size?: 'sm' | 'md' | 'lg';
  style?: React.CSSProperties;
  className?: string;
  type?: 'text' | 'password';
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  ref: React.RefObject<any>;
};
