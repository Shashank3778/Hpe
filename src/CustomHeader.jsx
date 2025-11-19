import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './uitils/iconUtils';

const CustomHeader = ({ title, toggleSidebar, darkMode, toggleDarkMode, sidebarCollapsed }) => {
  useEffect(() => {
    initLucideIcons();
  }, [darkMode]);

  return (
    <header 
      className="main-header"
      style={{
        marginLeft: sidebarCollapsed ? '60px' : '240px',
        transition: 'margin-left 0.3s ease',
      }}
    >
      <button 
        className="header-toggle-btn" 
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
        data-testid="button-toggle-sidebar"
      >
        <i data-lucide="menu"></i>
      </button>
      <h1 className="page-title">{title}</h1>
      <button 
        className="dark-mode-toggle" 
        onClick={toggleDarkMode} 
        title="Toggle dark mode"
        aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        data-testid="button-toggle-darkmode"
      >
        <i data-lucide={darkMode ? "sun" : "moon"}></i>
      </button>
    </header>
  );
};

CustomHeader.propTypes = {
  title: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  sidebarCollapsed: PropTypes.bool.isRequired,
};

export default CustomHeader;