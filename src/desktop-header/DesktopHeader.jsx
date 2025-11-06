// DesktopHeader.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { initLucideIcons } from '../../utils/iconUtils';

import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import Sidebar from './Sidebar';
import './Sidebar.css'; // keep your sidebar CSS

import messages from '../Header.messages';

const DesktopHeader = ({
  mainMenu,
  secondaryMenu,
  userMenu,
  loggedOutItems,
  logo,
  logoAltText,
  logoDestination,
  avatar,
  username,
  loggedIn,
}) => {
  const intl = useIntl();

  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    initLucideIcons();
  }, [isCollapsed, darkMode]);

  const toggleSidebar = () => setIsCollapsed((prev) => !prev);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };

  const renderMainMenu = () => <DesktopMainMenuSlot menu={mainMenu} />;
  const renderSecondaryMenu = () => <DesktopSecondaryMenuSlot menu={secondaryMenu} />;

  const renderLoggedOutItems = () =>
    loggedOutItems?.length > 0 ? (
      <nav
        aria-label={intl.formatMessage(messages['header.label.secondary.nav'])}
        className="nav secondary-menu-container align-items-center ml-auto"
      >
        {loggedOutItems.map((item, idx) => (
          <a key={idx} href={item.href} className="nav-link">
            {item.content}
          </a>
        ))}
      </nav>
    ) : null;

  const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;
  const sidebarWidth = isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  // ---- INLINE STYLES ----
  const mainHeaderStyle = {
    height: 'var(--header-height)',
    backgroundColor: 'var(--light-bg)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    gap: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 900,
  };

  const toggleButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease',
  };

  const pageTitleStyle = {
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
    flex: 1,
  };

  return (
    <div style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Sidebar */}
      <Sidebar
        isCollapsed={isCollapsed}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        userMenuOpen={userMenuOpen}
        setUserMenuOpen={setUserMenuOpen}
        darkMode={darkMode}
        avatar={avatar}
        username={username}
        userMenu={userMenu}
        loggedIn={loggedIn}
      />

      {/* Main content area */}
      <div
        className="site-header-desktop-container"
        style={{
          flex: 1,
          marginLeft: `calc(${sidebarWidth})`,
          transition: 'margin-left 0.3s ease',
        }}
      >
        <header style={mainHeaderStyle}>
          {/* Sidebar toggle button */}
          <button
            type="button"
            style={toggleButtonStyle}
            onClick={toggleSidebar}
            aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
            title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          >
            <i
              data-lucide={isCollapsed ? 'menu' : 'chevron-left'}
              style={{ width: 24, height: 24 }}
            ></i>
          </button>

          {/* Dark mode toggle */}
          <button
            type="button"
            style={toggleButtonStyle}
            onClick={toggleDarkMode}
            aria-label="Toggle dark mode"
            title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
          >
            <i data-lucide={darkMode ? 'sun' : 'moon'} style={{ width: 24, height: 24 }}></i>
          </button>

          {/* Page Title (optional; replace or remove as needed) */}
          <h1 style={pageTitleStyle}>Dashboard</h1>

          {/* Menus (if you want them inline in the header) */}
          <div style={{ marginLeft: 'auto', display: 'flex', alignItems: 'center', gap: '16px' }}>
            {loggedIn ? renderSecondaryMenu() : renderLoggedOutItems()}
          </div>
        </header>

        {/* Main Page Content Area */}
        <main id="main" style={{ padding: '20px' }}>
          <p>Your main content goes here...</p>
        </main>
      </div>
    </div>
  );
};

DesktopHeader.propTypes = {
  mainMenu: PropTypes.array,
  secondaryMenu: PropTypes.array,
  userMenu: PropTypes.array,
  loggedOutItems: PropTypes.array,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
};

DesktopHeader.defaultProps = {
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false,
};

export default DesktopHeader;
