// DesktopHeader.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import Sidebar from './Sidebar';  // Make sure the path to Sidebar.jsx is correct
import '../index.scss';
import './Sidebar.css';

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

  // State for sidebar, current page, user menu, dark mode
  const [isCollapsed, setIsCollapsed] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Toggle sidebar collapse
  const toggleSidebar = () => setIsCollapsed(!isCollapsed);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };

  // Render main and secondary menus as before
  const renderMainMenu = () => <DesktopMainMenuSlot menu={mainMenu} />;
  const renderSecondaryMenu = () => <DesktopSecondaryMenuSlot menu={secondaryMenu} />;
  const renderLoggedOutItems = () => loggedOutItems && loggedOutItems.length > 0 ? (
    <nav aria-label={intl.formatMessage(messages['header.label.secondary.nav'])} className="nav secondary-menu-container align-items-center ml-auto">
      {loggedOutItems.map((item, idx) => (
        <a key={idx} href={item.href} className="nav-link">{item.content}</a>
      ))}
    </nav>
  ) : null;

  const logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;

  return (
    <div style={{ display: 'flex' }}>
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
      <div className={`site-header-desktop-container`} style={{ flex: 1, marginLeft: isCollapsed ? '80px' : '240px' }}>
        <header className={`site-header-desktop ${darkMode ? 'dark' : ''}`}>
          <a className="nav-skip sr-only sr-only-focusable" href="#main">
            {intl.formatMessage(messages['header.label.skip.nav'])}
          </a>
          <div className={`container-fluid ${logoClasses}`}>
            <div className="nav-container position-relative d-flex align-items-center">
              <a href={logoDestination} className="logo-link">
                <img src={logo} alt={logoAltText} className="header-logo" />
              </a>
              <nav aria-label={intl.formatMessage(messages['header.label.main.nav'])} className="nav main-nav">
                {renderMainMenu()}
              </nav>
              <nav aria-label={intl.formatMessage(messages['header.label.secondary.nav'])} className="nav secondary-menu-container align-items-center ml-auto">
                {loggedIn ? renderSecondaryMenu() : renderLoggedOutItems()}
              </nav>
              {/* Sidebar toggle button */}
              <button
                type="button"
                className="header-toggle-btn"
                onClick={toggleSidebar}
                aria-label={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
                title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
              >
                <i data-lucide={isCollapsed ? 'menu' : 'chevron-left'}></i>
              </button>
              {/* Dark mode toggle button */}
              <button
                type="button"
                className="dark-mode-toggle"
                onClick={toggleDarkMode}
                aria-label="Toggle dark mode"
                title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
              >
                <i data-lucide={darkMode ? 'sun' : 'moon'}></i>
              </button>
            </div>
          </div>
        </header>
        {/* Main content can be added here if needed */}
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
