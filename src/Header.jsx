import React, { useState, useEffect, useContext } from 'react';
import { getConfig, AppContext } from '@edx/frontend-platform/react';
import DesktopHeader from './DesktopHeader';
import Sidebar from './Sidebar';
import './Header.css';

/**
 * Wrapper Header component
 * Combines header + sidebar + dark mode logic.
 */
const Header = () => {
  const { authenticatedUser } = useContext(AppContext);
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  // Shift body when sidebar opens
  useEffect(() => {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarOpen]);

  return (
    <>
      <DesktopHeader
        title="Home"
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
      />
      <Sidebar
        isCollapsed={!sidebarOpen}
        currentPage="home"
        setCurrentPage={() => {}}
        userMenuOpen={false}
        setUserMenuOpen={() => {}}
        darkMode={darkMode}
        authenticatedUser={authenticatedUser}
      />
    </>
  );
};

export default Header;
