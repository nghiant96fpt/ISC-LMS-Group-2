import React from 'react';

interface IconOutlineArrowLeftSingleProps {
  className?: string;
}

const IconOutlineArrowLeftSingle: React.FC<
IconOutlineArrowLeftSingleProps
> = ({ className, ...props }) => {
  return (
    <svg
      className={`shrink-0 size-5${className}`}
      xmlns="http://www.w3.org/2000/svg"
      width={24}
      height={24}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
      {...props}

    >
      <path d="m15 18-6-6 6-6" />
    </svg>
  );
};

export default IconOutlineArrowLeftSingle;
