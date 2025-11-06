import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from '../../utils/iconUtils';
import './DesktopHeader.css';

/**
 * Custom minimalist Desktop Header
 */
const DesktopHeader = ({ title, toggleSidebar, darkMode, toggleDarkMode }) => {
  useEffect(() => {
    initLucideIcons();
  }, [darkMode]);

  return (
    <header className="main-header">
      {/* Sidebar Toggle */}
      <button
        className="header-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <i data-lucide="menu"></i>
      </button>

      {/* Page Title */}
      <h1 className="page-title">{title}</h1>

      {/* Dark Mode Switch */}
      <button
        className="dark-mode-toggle"
        onClick={toggleDarkMode}
        title="Toggle dark mode"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <i data-lucide={darkMode ? 'sun' : 'moon'}></i>
      </button>
    </header>
  );
};

DesktopHeader.propTypes = {
  title: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
};

DesktopHeader.defaultProps = {
  title: 'Home',
};

export default DesktopHeader;
