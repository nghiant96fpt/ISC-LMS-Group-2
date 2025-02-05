export interface SubjectButtonProps {
  title: string;
  backgroundColor: 'blue' | 'gray';
  textColor: 'white' | 'black'; 
  iconName?: keyof typeof import('./icons').default;
  disabled?: boolean;
  size?: 'small' | 'medium' | 'large' | 'extra-large';
  iconPosition?: 'left' | 'right';
  onClose?: () => void;
}
