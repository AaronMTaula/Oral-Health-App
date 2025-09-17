// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/useAuth';
import AtaataLogoImg from '../Logo/Ataata.svg'; // <-- your SVG file
import '../index.css';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const navigate = useNavigate();
  const { currentUser, logout } = useAuth();
  const navRefs = useRef([]);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    const updatePositions = () => {
      const leftLinks = navRefs.current.filter((_, i) => i <= 1); // Home + Profile
      const rightLinks = navRefs.current.filter((_, i) => i > 1); // Logout/Login + Settings

      // Quadratic Bézier points for Y-axis (transparent green curve)
      const P0 = { x: 0, y: 250 };
      const P1 = { x: 500, y: 30 };
      const P2 = { x: 1000, y: 250 };
      const verticalOffset = 10;

      // Logo container
      const logo = document.querySelector('.logo-container');
      const logoWidth = logo?.offsetWidth || 200;
      const logoX = window.innerWidth / 2 - logoWidth / 2; // left edge
      const logoRightX = logoX + logoWidth; // right edge

      const gap = 160; // gap from logo edge

      // Left links positions
      const profileX = logoX - gap; // profile left of logo
      const homeX = profileX - gap;  // home left of profile

      leftLinks.forEach((el, i) => {
        if (!el) return;
        const x = i === 0 ? homeX : profileX;
        const t = x / window.innerWidth;
        const yCurve = (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y;

        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.transform = 'translateX(0%)';
        el.style.top = `${isScrolled ? 60 : yCurve - (el.offsetHeight || 24) - verticalOffset}px`;
        el.style.transition = 'top 0.6s ease, left 0.6s ease';
      });

      // Right links positions
      const logoutX = logoRightX + gap - 100;
      const settingsX = logoutX + gap;

      rightLinks.forEach((el, i) => {
        if (!el) return;
        const x = i === 0 ? logoutX : settingsX;
        const t = x / window.innerWidth;
        const yCurve = (1 - t) ** 2 * P0.y + 2 * (1 - t) * t * P1.y + t ** 2 * P2.y;

        el.style.position = 'absolute';
        el.style.left = `${x}px`;
        el.style.transform = 'translateX(0%)';
        el.style.top = `${isScrolled ? 60 : yCurve - (el.offsetHeight || 24) - verticalOffset}px`;
        el.style.transition = 'top 0.6s ease, left 0.6s ease';
      });
    };

    updatePositions();
    window.addEventListener('resize', updatePositions);
    return () => window.removeEventListener('resize', updatePositions);
  }, [isScrolled]);

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/auth');
    } catch (error) {
      console.error('Logout failed', error);
    }
  };

  return (
    <>
      <style>{`
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
        
        /* 🔹 Logo grow/shrink when scrolling */
        .logo-container {
          position: fixed; 
          top: 30px; 
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
          background-color: #00539b;
          transition: all 0.4s ease-in-out; /* smooth scaling */
        }
        .logo-container.scrolled {
          width: 250px;   /* bigger when scrolled */
          height: 250px;
          top: 20px;      /* move slightly up */
        }
        .inner-circle {
          width: 150px; 
          height: 150px; 
          border-radius: 50%;
          background-color: white;
          display: flex;
          justify-content: center;
          align-items: center;
          transition: all 0.4s ease-in-out;
        }
        .logo-container.scrolled .inner-circle {
          width: 180px;   /* inner circle grows too */
          height: 180px;
        }
        .logo-svg {
          height: 250px; 
          width: auto;
          transform: translateY(10px);
          transition: all 0.4s ease-in-out;
        }
        .logo-container.scrolled .logo-svg {
          height: 300px;  /* logo svg grows */
        }
        
        .nav-links { position: fixed; left: 0; top: 0; width: 100%; z-index: 1002; pointer-events: none; }
        .nav-link { text-decoration: none; color: white; cursor: pointer; white-space: nowrap; pointer-events: auto; font-size: 1.25rem; font-weight: 500; transition: color 0.2s, top 0.6s ease, left 0.6s ease; }
        .nav-link:hover { color: #ffd700; }
      `}</style>

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

      {/* Green ribbon (invisible) */}
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
      <div className={`logo-container ${isScrolled ? 'scrolled' : ''}`}>
        <div className="inner-circle">
          <img src={AtaataLogoImg} alt="Ataata Logo" className="logo-svg" />
        </div>
      </div>
    </>
  );
};

export default Navbar;
