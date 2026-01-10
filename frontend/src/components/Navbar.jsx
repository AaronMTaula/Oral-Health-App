// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import AtaataLogoImg from '../Logo/Ataata.svg';
import '../index.css';

const routeColors = {
  '/': '#e08fff',
  '/profile': '#6db1ff',
  '/my-providers': '#ff80df',
  '/find-my-teeth': '#ff5b71ff',
  '/lets-talk': '#fe7070',
  '/auth': '#e08fff',
  '/health': '#e696d2ff'
};

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [navbarColor, setNavbarColor] = useState('#e08fff');
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  const navRefs = useRef([]);

  const leftLinks = ['Home', 'Profile', 'My Providers', 'FMT'];
  const rightLinks = ["Let's Talk", 'Settings', 'Health', 'Logout'];

  useEffect(() => {
    setNavbarColor(routeColors[location.pathname] || '#e08fff');
  }, [location]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.documentElement.style.setProperty('--navbar-offset', isScrolled ? '60px' : '250px');
  }, [isScrolled]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  useEffect(() => {
    const updatePositions = () => {
      const P0 = { x: 0, y: 250 };
      const P1 = { x: 500, y: 100 }; // flatter curve
      const P2 = { x: 1000, y: 250 };
      const verticalOffset = 10;
      const rotationFactor = 0.4;
      const uniformYOffset = 30; // raise all navlinks by 30px
      const logo = document.querySelector('.logo-container');
      const logoWidth = logo?.offsetWidth || 200;
      const logoX = window.innerWidth / 2 - logoWidth / 2; // left edge
      const logoRightX = logoX + logoWidth; // right edge

      const gap = 160; // gap from logo edge

      // Left links
      const profileX = logoX - gap;
      const homeX = profileX - gap;

      // LEFT LINKS
      const leftRange = logoX * middleGapFactor;
      leftLinks.forEach((text, i) => {
        const el = navRefs.current[i];
        if (!el) return;

        const spacing = leftRange / leftLinks.length;
        const x = logoX - spacing * (leftLinks.length - i);
        const t = x / window.innerWidth;
        const yCurve = (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y;

        const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
        const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
        const angle = Math.atan2(dy, dx) * rotationFactor;

        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${isScrolled ? 60 : yCurve - (el.offsetHeight || 24) - verticalOffset - uniformYOffset}px`;
        el.style.transform = isScrolled ? 'rotate(0rad)' : `rotate(${angle}rad)`;
        el.style.transition = 'top 0.6s ease, left 0.6s ease, transform 0.6s ease';
      });

      // Right links
      const logoutX = logoRightX + gap - 100;
      const settingsX = logoutX + gap;

      rightLinks.forEach((el, i) => {
        if (!el) return;

        const spacing = rightRange / rightLinks.length;
        const x = logoRightX + spacing * (i + 1);
        const t = x / window.innerWidth;
        const yCurve = (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y;

        const dx = 2 * (1 - t) * (P1.x - P0.x) + 2 * t * (P2.x - P1.x);
        const dy = 2 * (1 - t) * (P1.y - P0.y) + 2 * t * (P2.y - P1.y);
        const angle = Math.atan2(dy, dx) * rotationFactor;

        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.top = `${isScrolled ? 60 : yCurve - (el.offsetHeight || 24) - verticalOffset - uniformYOffset}px`;
        el.style.transform = isScrolled ? 'rotate(0rad)' : `rotate(${angle}rad)`;
        el.style.transition = 'top 0.6s ease, left 0.6s ease, transform 0.6s ease';
      });
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [isScrolled, leftLinks.length, rightLinks.length]);

  return (
    <>
      <style>{`
        .navbar-wrapper {
          position: relative;
          z-index: 1000;
        }
        .spacer {
          height: 300px; /* space equal to navbar height */
          width: 100%;
        }
        .ribbon-container, .green-container {
          position: fixed;
          left: 50%;
          transform: translateX(-50%);
          width: 100vw;
          overflow: hidden;
          z-index: 50;
          top: 0;
        }
        .ribbon-container { height: 250px; }
        .green-container { height: 120px; top: 80px; }
        .svg-arch { position: absolute; top: 0; left: 0; width: 100%; height: 100%; z-index: 1; transition: all 0.3s ease-in-out; }
        .svg-arch path { transition: d 0.3s ease-in-out; }

        .logo-container {
          position: fixed; 
          top: 30px; 
          left: 50%; 
          transform: translateX(-50%);
          width: 200px;  /* this is for the outer circle */
          height: 200px; /* this is for the outer circle */
          border-radius: 50%;
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1005;
          box-shadow: 0 4px 12px rgba(0,0,0,0.25);
          background-color: ${navbarColor};
          transition: 
            background-color 0.5s ease,
            transform 0.6s ease,
            width 0.6s ease,
            height 0.6s ease;
        }
        .logo-container.scrolled {
          transform: translate(-50%, -40px);
          width: 220px;
          height: 220px;
        }

        .inner-circle {
          width: 200px;
          height: 200px;
          border-radius: 50%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease-in-out;
        }
        .logo-container.scrolled .inner-circle {
          width: 180px;
          height: 180px;
        }

        .logo-svg {
          height: 325px;
          width: auto;
          transform: translateY(10px);
          transition: height 0.4s ease-in-out, transform 0.6s ease;
        }
        .logo-container.scrolled .logo-svg {
          height: 250px;
          transform: translateY(0px);
        }

        .nav-links { position: fixed; left: 0; top: 0; width: 100%; pointer-events: none; }
        .nav-link {
          text-decoration: none;
          color: white;
          cursor: pointer;
          white-space: nowrap;
          pointer-events: auto;
          font-size: 1.25rem;
          font-weight: 500;
          transition: color 0.2s, top 0.6s ease, left 0.6s ease, transform 0.6s ease;
        }
        .nav-link.active { color: #ffd700; }
        .nav-link:hover { color: #ffd700; }
      `}</style>

      <div className="navbar-wrapper">
        {/* Blue ribbon */}
        <div className="ribbon-container">
          <svg className="svg-arch" viewBox="0 0 1000 650" preserveAspectRatio="none">
            <path
              fill="#00539b"
              d={isScrolled
                ? 'M 0 0 Q 500 0 1000 0 L 1000 350 Q 500 300 0 350 Z'
                : 'M 0 400 Q 500 0 1100 450 L 1100 700 Q 500 200 0 650 Z'}
            />
          </svg>
        </div>

        {/* Green ribbon */}
        <div className="green-container">
          <svg className="svg-arch" viewBox="0 0 1000 250" preserveAspectRatio="none">
            <path fill="transparent" d="M0,250 Q500,30 1000,250 L1000,250 L0,250 Z" />
          </svg>
        </div>

        {/* Navlinks */}
        <div className="nav-links">
          <a ref={(el) => (navRefs.current[0] = el)} onClick={() => navigate('/')} className="nav-link">Home</a>
          {currentUser && <a ref={(el) => (navRefs.current[1] = el)} onClick={() => navigate('/profile')} className="nav-link">Profile</a>}
          <a ref={(el) => (navRefs.current[2] = el)} onClick={currentUser ? handleLogout : () => navigate('/auth')} className="nav-link">{currentUser ? 'Logout' : 'Login'}</a>
          <a ref={(el) => (navRefs.current[3] = el)} className="nav-link">Settings</a>
        </div>

        {/* Logo */}
        <div className="logo-container">
          <div className="inner-circle">
            <img src={AtaataLogoImg} alt="Ataata Logo" className="logo-svg" />
          </div>
        </div>
      </div>

      {/* Spacer pushes content down */}
      <div className="spacer"></div>
    </>
  );
};

export default Navbar;
