export type DropdownOption = {
  label: string;
  value: string;
};

export type DropdownStatus = 'normal' | 'error' | 'disabled';

export type DropdownSize = 'medium' | 'long' | 'short';

export type DropdownBorder = 'visible' | 'hidden';

export interface DropdownProps {
  options: DropdownOption[];
  onSelect: (option: DropdownOption) => void;
  placeholder?: string;
  border?: DropdownBorder;
  borderColor?: string;
  size?: DropdownSize;
  iconLeft?: React.ReactNode;
  status?: DropdownStatus;
  disabled?: boolean;
  showArrow?: boolean;
  iconColor?: string;
  backgroundColorSelected?: string;
  backgroundColor?: string;
}
