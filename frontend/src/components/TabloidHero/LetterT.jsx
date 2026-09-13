import React from 'react';

const LetterT = ({ className = '', fill = 'currentColor', style = {} }) => {
  return (
    <svg
      viewBox="0 0 90 130"
      className={`ata-svg-letter ata-svg-t ${className}`}
      style={style}
      fill={fill}
      xmlns="http://www.w3.org/2000/svg"
      preserveAspectRatio="none"
    >
      <path d="M 0 0 L 90 0 L 90 26 L 58 26 L 58 130 L 32 130 L 32 26 L 0 26 Z" />
    </svg>
  );
};

export default LetterT;
