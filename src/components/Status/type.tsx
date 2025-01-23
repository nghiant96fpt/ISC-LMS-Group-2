export interface StatusProps {
    type: 'studying' | 'dropped' | 'graduated' | 'classTransferred' | 'schoolTransferred';
    label?: string; // Custom label text (optional override for default label)
    styles?: {
        container?: React.CSSProperties; // Style for the container
        dot?: React.CSSProperties;       // Style for the dot
        label?: React.CSSProperties;     // Style for the label text
    };
    className?: string; // Additional class names for the container
    height?: string | number; // Custom height for the component
    width?: string | number; // Custom width for the component
    margin?: string | number; // Custom margin for the component
    padding?: string | number; // Custom padding for the component
    fontSize?: string | number; // Custom font size for the label text
    borderRadius?: string | number; // Custom border radius for the container
    gap?: string | number; // Custom gap between dot and label text
    border?: string; // Custom border style for the container
}
