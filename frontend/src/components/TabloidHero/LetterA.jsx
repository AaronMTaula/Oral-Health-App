import React from 'react';

const LetterA = ({ className = '', fill = 'currentColor', style = {} }) => {
  return (
    <svg
      viewBox="0 0 100 130"
      className={`ata-svg-letter ata-svg-a ${className}`}
      style={style}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M 30 0 L 70 0 L 100 130 L 73 130 L 63 88 L 37 88 L 27 130 L 0 130 Z M 42 64 L 58 64 L 50 30 Z" />
    </svg>
  );
};

export default LetterA;
