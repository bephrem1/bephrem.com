import type { FunctionComponent } from 'react';
import type { BaseIconProps } from '..';

const ArrowUpRightIcon: FunctionComponent<BaseIconProps> = ({ className, fill, stroke, strokeWidth }) => {
  return (
    <svg
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      fill={fill || 'none'}
      viewBox="0 0 24 24"
      stroke={stroke || 'currentColor'}
      strokeWidth={strokeWidth || 2}
      aria-hidden="true"
      focusable="false"
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M7 17L17 7M7 7h10v10" />
    </svg>
  );
};

export default ArrowUpRightIcon;
