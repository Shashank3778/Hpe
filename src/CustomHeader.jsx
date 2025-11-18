import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './uitils/iconUtils';

const CustomHeader = ({
  title,
  toggleSidebar,
  darkMode,
  toggleDarkMode,
  sidebarCollapsed,
}) => {
  useEffect(() => {
    initLucideIcons();
  }, [darkMode]);

  return (
    <header
      className="main-header"
      style={{
        marginLeft: sidebarCollapsed ? '60px' : '240px',
      }}
    >
      <button className="header-toggle-btn" onClick={toggleSidebar}>
        <i data-lucide="menu"></i>
      </button>

      <h1 className="page-title">{title}</h1>

      <button className="dark-mode-toggle" onClick={toggleDarkMode}>
        <i data-lucide={darkMode ? 'sun' : 'moon'}></i>
      </button>
    </header>
  );
};

export default CustomHeader;
