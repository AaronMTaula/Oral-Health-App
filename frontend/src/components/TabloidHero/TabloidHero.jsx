import React, { useEffect, useRef, useState } from 'react';
import './TabloidHero.css';
import { NAVBAR_CURVE, getCurveAngle, getCurveY, TABLOID_COMPOSITION_SCALE } from '../navbarCurve';
import LetterA from './LetterA';
import LetterT from './LetterT';
import toothbrushImage from './toothbrush.svg';
import flossImage from './floss.svg';

const TabloidHero = ({ isScrolled = false, scale = 1, letterHeight = 160 }) => {
  const heroRef  = useRef(null);
  const leftRef  = useRef(null);
  const rightRef = useRef(null);

  const [letterOffsets, setLetterOffsets] = useState({ left: [], right: [] });
  const [letterAngles, setLetterAngles] = useState({ left: [], right: [] });

  const ATA_LEFT  = [
    { key: 'l-a1', Component: LetterA },
    { key: 'l-t',  Component: LetterT },
    { key: 'l-a2', Component: LetterA },
  ];

  const ATA_RIGHT = [
    { key: 'r-a1', Component: LetterA },
    { key: 'r-t',  Component: LetterT },
    { key: 'r-a2', Component: LetterA },
  ];

  // Shared vertical raise for curved hero layout
  const TOP_PADDING = -110;

  const leftScalesY   = [1.25, 1.1,  1.05];
  const rightScalesY  = [1.05, 1.1,  1.25];
  const leftOffsetsX  = [-20,  0,    20  ];
  const rightOffsetsX = [-20,  0,    20  ];
  const leftOffsetsY  = [0,    12,   24  ];
  const rightOffsetsY = [24,   12,   0   ];

  const updateLetterOffsets = () => {
    if (!heroRef.current) return;
    const heroWidth = heroRef.current.offsetWidth;
    const leftContainer  = leftRef.current;
    const leftWidth      = leftContainer?.offsetWidth || (heroWidth * 0.35);
    const left = ATA_LEFT.map((_, i) => {
      const x = (i + 0.5) * (leftWidth / ATA_LEFT.length);
      return getCurveY(x, heroWidth, NAVBAR_CURVE) + TOP_PADDING + leftOffsetsY[i];
    });
    const leftAngles = ATA_LEFT.map((_, i) => {
      const x = (i + 0.5) * (leftWidth / ATA_LEFT.length);
      return getCurveAngle(x, heroWidth, NAVBAR_CURVE);
    });

    const rightContainer = rightRef.current;
    const rightWidth     = rightContainer?.offsetWidth || (heroWidth * 0.35);
    const right = ATA_RIGHT.map((_, i) => {
      const x = (i + 0.5) * (rightWidth / ATA_RIGHT.length);
      return getCurveY(heroWidth - rightWidth + x, heroWidth, NAVBAR_CURVE) + TOP_PADDING + rightOffsetsY[i];
    });
    const rightAngles = ATA_RIGHT.map((_, i) => {
      const x = (i + 0.5) * (rightWidth / ATA_RIGHT.length);
      return getCurveAngle(heroWidth - rightWidth + x, heroWidth, NAVBAR_CURVE);
    });

    setLetterOffsets({ left, right });
    setLetterAngles({ left: leftAngles, right: rightAngles });
  };

  useEffect(() => {
    updateLetterOffsets();
    window.addEventListener('resize', updateLetterOffsets);
    const resizeObserver = heroRef.current
      ? new ResizeObserver(() => {
        updateLetterOffsets();
      })
      : null;
    resizeObserver?.observe(heroRef.current);
    return () => {
      window.removeEventListener('resize', updateLetterOffsets);
      resizeObserver?.disconnect();
    };
  }, [isScrolled]);

  return (
    <div
      className={`tabloid-hero${isScrolled ? ' tabloid-hero--scrolled' : ''}`}
      ref={heroRef}
      style={{
        transform: isScrolled ? 'none' : `scale(${TABLOID_COMPOSITION_SCALE * scale})`,
        '--tabloid-letter-height': `${letterHeight}px`,
      }}
    >
      <img className="tabloid-hero-side-image tabloid-hero-side-image--left" src={toothbrushImage} alt="Toothbrush" />
      <img className="tabloid-hero-side-image tabloid-hero-side-image--right" src={flossImage} alt="Dental floss" />

      {/* LEFT ATA SVG CONTAINER */}
      <div className="ata-container ata-left-container" ref={leftRef}>
        {ATA_LEFT.map(({ key, Component }, i) => (
          <div
            key={key}
            className="ata-letter-wrapper ata-left"
            style={{
              transform: `
                translateY(${letterOffsets.left[i] || 0}px)
                translateX(${leftOffsetsX[i]}px)
                rotate(${letterAngles.left[i] || 0}rad)
                scaleY(${leftScalesY[i]})
              `,
            }}
          >
            <Component className="ata-svg-item" />
          </div>
        ))}
      </div>

      {/* RIGHT ATA SVG CONTAINER */}
      <div className="ata-container ata-right-container" ref={rightRef}>
        {ATA_RIGHT.map(({ key, Component }, i) => (
          <div
            key={key}
            className="ata-letter-wrapper ata-right"
            style={{
              transform: `
                translateY(${letterOffsets.right[i] || 0}px)
                translateX(${rightOffsetsX[i]}px)
                rotate(${letterAngles.right[i] || 0}rad)
                scaleY(${rightScalesY[i]})
              `,
            }}
          >
            <Component className="ata-svg-item" />
          </div>
        ))}
      </div>
    </div>
  );
};

export default TabloidHero;