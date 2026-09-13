// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import AtaataLogoImg from '../Logo/Ataata.svg';
import TabloidHero from './TabloidHero/TabloidHero';
import CurveMask from './CurveMask/CurveMask';
import NavbarRibbon from './NavbarRibbon/NavbarRibbon';
import LogoSpinner from './LogoSpinner';
import '../index.css';
import './Navbar.css';
import { NAVBAR_CURVE, getCurveAngle, getCurveY, TABLOID_COMPOSITION_SCALE } from './navbarCurve';

const routeColors = {
  '/': '#e08fff',
  '/profile': '#6db1ff',
  '/my-providers': '#ff80df',
  '/find-my-teeth': '#ff5b71ff',
  '/lets-talk': '#fe7070',
  '/auth': '#e08fff',
  '/health': '#e696d2ff',
  '/test': '#9ca3af'
};

const NAVBAR_VERTICAL_SHIFT = 90;
const NAV_EDGE_HORIZONTAL_OFFSET = 16;
// Slim top border above the navbar curve (small gap so TabloidHero is visible and doesn't touch navbar)
const MASK_VERTICAL_OFFSET = -8; 
const MASK_COLOR = '#f8f8f8';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [languageDropdown, setLanguageDropdown] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { currentUser, logout } = useAuth();
  const navRefs = useRef([]);
  const logoRef = useRef(null);

  const leftLinks = [
    { name: 'Language', path: '#', isDropdown: true },
    { name: 'FMT', path: '/find-my-teeth' },
    { name: 'Health', path: '/health' }
  ];

  const rightLinks = [
    { name: 'My Providers', path: '/my-providers' },
    { name: "Let's Talk", path: '/lets-talk' },
    ...(import.meta.env.DEV ? [{ name: 'Test', path: '/test' }] : []),
    { name: currentUser ? 'Logout' : 'Login', path: '/auth', action: currentUser ? logout : null }
  ];

  const languages = [
    { name: 'English (NZ)', flag: '🇳🇿', code: 'en' },
    { name: 'Te Reo Māori', flag: '🇳🇿', code: 'mi' },
    { name: 'Gagana Sāmoa', flag: '🇼🇸', code: 'sm' },
    { name: 'Lea Faka-Tonga', flag: '🇹🇴', code: 'to' },
    { name: 'Mandarin (中文)', flag: '🇨🇳', code: 'zh' },
    { name: 'Hindi (हिन्दी)', flag: '🇮🇳', code: 'hi' },
    { name: 'Tagalog', flag: '🇵🇭', code: 'tl' },
    { name: 'Vagahau Niuē', flag: '🇳🇺', code: 'niu' },
    { name: 'Cook Islands Māori', flag: '🇨🇰', code: 'rar' },
    { name: 'Fijian', flag: '🇫🇯', code: 'fj' }
  ];

  const [selectedLanguage, setSelectedLanguage] = useState(languages[0]);

  const [navbarColor, setNavbarColor] = useState(routeColors[location.pathname] || '#e08fff');

  // Update navbar color per route
  useEffect(() => {
    setNavbarColor(routeColors[location.pathname] || '#e08fff');
  }, [location]);

  // Track scroll for logo/nav animation
  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = async (link) => {
    if (link.action) {
      try {
        await link.action();
        navigate('/auth');
      } catch (error) {
        console.error('Action failed', error);
      }
    } else if (!link.isDropdown) {
      navigate(link.path);
    }
  };

  const handleLanguageSelect = (lang) => {
    setSelectedLanguage(lang);
    setLanguageDropdown(false);
  };

// Increase this value to lower links; decrease it to raise them.
const NAV_LINK_VERTICAL_OFFSET = 45;
// Raises only the Language and Login/Logout links into end bumps.
const NAV_EDGE_LINK_OFFSET = 70;

  // ===== Update nav link positions
  useEffect(() => {
    const updatePositions = () => {
      const logo = document.querySelector('.logo-container');
      const logoWidth = logo?.offsetWidth || 200;
      const logoX = window.innerWidth / 2 - logoWidth / 2;
      const logoRightX = logoX + logoWidth;
      const gap = 160;
      const middleGapFactor = 0.8;

      // Left links
      const visibleLeft = leftLinks.filter(link => !link.auth || currentUser);
      const lowerLeftLinks = visibleLeft.filter(link => !link.isDropdown);
      const leftRange = logoX * middleGapFactor;
      let lowerLeftIndex = 0;
      visibleLeft.forEach((link, i) => {
        const el = navRefs.current[i];
        if (!el) return;
        const linkWidth = el.offsetWidth || 24;
        const x = link.isDropdown
          ? NAV_EDGE_HORIZONTAL_OFFSET
          : logoX - (leftRange / (lowerLeftLinks.length + 1))
            * (lowerLeftLinks.length - lowerLeftIndex);
        if (!link.isDropdown) lowerLeftIndex += 1;
        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        const linkHeight = el.offsetHeight || 24;
        const linkCenterX = x + linkWidth / 2;
        const yCurve = getCurveY(linkCenterX, window.innerWidth, NAVBAR_CURVE);
        const angle = getCurveAngle(linkCenterX, window.innerWidth, NAVBAR_CURVE);
        const verticalOffset = i === 0
          ? NAV_LINK_VERTICAL_OFFSET - NAV_EDGE_LINK_OFFSET
          : NAV_LINK_VERTICAL_OFFSET;
        el.style.top = `${isScrolled
          ? 60
          : yCurve + NAVBAR_VERTICAL_SHIFT + verticalOffset - linkHeight / 2
        }px`;
        el.style.transform = isScrolled
          ? 'rotate(0rad)'
          : `rotate(${angle}rad)${i === 0 ? ` scale(${TABLOID_COMPOSITION_SCALE})` : ''}`;
        el.style.transition = 'top 0.2s ease, left 0.2s ease, transform 0.2s ease';
      });

      // Right links
      const visibleRight = rightLinks;
      const lowerRightLinks = visibleRight.filter((link, i) => i !== visibleRight.length - 1);
      const rightRange = window.innerWidth - logoRightX - gap;
      let lowerRightIndex = 0;
      visibleRight.forEach((link, i) => {
        const el = navRefs.current[visibleLeft.length + i];
        if (!el) return;
        const linkWidth = el.offsetWidth || 24;
        const isEdgeLink = i === visibleRight.length - 1;
        const x = isEdgeLink
          ? window.innerWidth - NAV_EDGE_HORIZONTAL_OFFSET - linkWidth
          : logoRightX + (rightRange / (lowerRightLinks.length + 1)) * (lowerRightIndex + 1);
        if (!isEdgeLink) lowerRightIndex += 1;
        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        const linkHeight = el.offsetHeight || 24;
        const linkCenterX = x + linkWidth / 2;
        const yCurve = getCurveY(linkCenterX, window.innerWidth, NAVBAR_CURVE);
        const angle = getCurveAngle(linkCenterX, window.innerWidth, NAVBAR_CURVE);
        const verticalOffset = i === visibleRight.length - 1
          ? NAV_LINK_VERTICAL_OFFSET - NAV_EDGE_LINK_OFFSET
          : NAV_LINK_VERTICAL_OFFSET;
        el.style.top = `${isScrolled
          ? 60
          : yCurve + NAVBAR_VERTICAL_SHIFT + verticalOffset - linkHeight / 2
        }px`;
        el.style.transform = isScrolled
          ? 'rotate(0rad)'
          : `rotate(${angle}rad)${i === visibleRight.length - 1 ? ` scale(${TABLOID_COMPOSITION_SCALE})` : ''}`;
        el.style.transition = 'top 0.2s ease, left 0.2s ease, transform 0.2s ease';
      });
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [isScrolled, currentUser, leftLinks.length, rightLinks.length]);

  return (
    <>
      <style>{`
        .navbar-wrapper { position: relative; z-index: 1000; }
        .spacer { height: 0px; width: 100%; }

        .logo-container {
          position: fixed;
          top: ${NAVBAR_VERTICAL_SHIFT + 30}px;
          left: 50%;
          transform: translateX(-50%);
          width: 200px;
          height: 200px;
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1005;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          background-color: ${navbarColor};
          border: 5px solid #ffffff;
          transition: all 0.6s ease;
          cursor: pointer;
        }
        .logo-container.scrolled { top: 30px; width: 220px; height: 220px; }

        .inner-circle { width: 180px; height: 180px; border-radius: 50%; background-color: white; display: flex; justify-content: center; align-items: center; transition: all 0.4s ease-in-out; }
        .logo-container.scrolled .inner-circle { width: 160px; height: 160px; }
        .nav-links { position: fixed; left: 0; top: 0; width: 100%; pointer-events: auto; }
        .nav-link { text-decoration: none; color: white; cursor: pointer; white-space: nowrap; pointer-events: auto; font-size: 1.25rem; font-weight: 500; transition: color 0.2s, top 0.6s ease, left 0.6s ease, transform 0.6s ease; }
        .nav-link.active, .nav-link:hover { color: #ffd700; }

        .dropdown { position: absolute; top: 1.5rem; left: 0; background: white; color: black; border-radius: 5px; box-shadow: 0 4px 12px rgba(0,0,0,0.2); padding: 0.5rem 0; display: none; min-width: 120px; z-index: 2000; }
        .dropdown.visible { display: block; }
        .dropdown-item { padding: 0.5rem 1rem; cursor: pointer; }
        .dropdown-item:hover { background-color: #f0f0f0; }
          
      `}</style>

      {/* ================= Navbar Wrapper ================= */}
<div className="navbar-wrapper">
  {/* Ribbon background arch & secondary container (Extracted Component) */}
  <NavbarRibbon
    isScrolled={isScrolled}
    navbarColor={navbarColor}
    verticalShift={NAVBAR_VERTICAL_SHIFT}
  />

  {/* Nav Links */}
  <div className="nav-links">
    {leftLinks
      .filter(link => !link.auth || currentUser)
      .map((link, i) => (
        <div
          key={i}
          style={{ position: 'relative' }}
          ref={el => (navRefs.current[i] = el)}
        >
          <a
            onClick={() =>
              link.isDropdown
                ? setLanguageDropdown(!languageDropdown)
                : handleLinkClick(link)
            }
            className={`nav-link${link.isDropdown ? ' edge-nav-link' : ''}`}
          >
            {link.isDropdown ? `${selectedLanguage.flag} ${selectedLanguage.name}` : link.name}
          </a>

          {link.isDropdown && (
            <div className={`dropdown ${languageDropdown ? 'visible' : ''}`}>
              {languages.map((lang, idx) => (
                <div
                  key={idx}
                  className="dropdown-item"
                  onClick={() => handleLanguageSelect(lang)}
                >
                  <span style={{ marginRight: '8px' }}>{lang.flag}</span>
                  <span>{lang.name}</span>
                </div>
              ))}
            </div>
          )}
        </div>
      ))}

    {rightLinks.map((link, i) => (
      <a
        key={i}
        ref={el => (navRefs.current[leftLinks.length + i] = el)}
        onClick={() => handleLinkClick(link)}
        className={`nav-link${i === rightLinks.length - 1 ? ' edge-nav-link' : ''}`}
      >
        {link.name}
      </a>
    ))}
  </div>
</div>

{/* ================= Logo ================= */}
<div
  className="logo-container"
  onClick={() => navigate('/')}
  ref={logoRef}
  style={{
    top: isScrolled ? '30px' : `${30 + NAVBAR_VERTICAL_SHIFT}px`,
    transition: 'top 0.6s ease',
    cursor: 'pointer'
  }}
>
  <div className="inner-circle">

    <LogoSpinner
      src={AtaataLogoImg}
      className="logo-svg"
    />
  </div>
</div>

{/* ================= Hero Section Wrapper ================= */}
<TabloidHero isScrolled={isScrolled} />
<CurveMask
  isScrolled={isScrolled}
  verticalOffset={MASK_VERTICAL_OFFSET}
  color={MASK_COLOR}
/>
<div className="spacer"></div>
    </>
  );
};

export default Navbar;