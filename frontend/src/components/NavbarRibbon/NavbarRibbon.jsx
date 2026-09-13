import React from 'react';
import './NavbarRibbon.css';

const NavbarRibbon = ({ isScrolled = false, navbarColor = '#e08fff', verticalShift = 90 }) => {
  return (
    <>
      {/* Ribbon background arch */}
      <div
        className={`ribbon-container ${isScrolled ? 'scrolled' : ''}`}
        style={{ top: isScrolled ? 0 : `${verticalShift}px` }}
      >
        <svg className="svg-arch" viewBox="0 0 1000 650" preserveAspectRatio="none">
          <path
            fill={navbarColor}
            d={
              isScrolled
                ? 'M 0 0 Q 500 0 1000 0 L 1000 350 Q 500 300 0 350 Z'
                : 'M 0 400 Q 500 0 1100 450 L1100 700 Q 500 200 0 650 Z'
            }
          />
        </svg>
      </div>

      {/* Secondary / Green arch container */}
      <div
        className={`green-container ${isScrolled ? 'scrolled' : ''}`}
        style={{ top: isScrolled ? 0 : `${verticalShift + 80}px` }}
      >
        <svg className="svg-arch" viewBox="0 0 1000 250" preserveAspectRatio="none">
          <path fill="transparent" d="M0,250 Q500,30 1000,250 L1000,250 L0,250 Z" />
        </svg>
      </div>
    </>
  );
};

export default NavbarRibbon;
