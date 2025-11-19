import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Import your icon utility
import { initLucideIcons } from '../uitils/iconUtils';

// Import only the data shape validators
import { desktopLoggedOutItemsDataShape } from './DesktopLoggedOutItems';
import { desktopHeaderMainOrSecondaryMenuDataShape } from './DesktopHeaderMainOrSecondaryMenu';
import { desktopUserMenuDataShape } from './DesktopHeaderUserMenu';

// i18n
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
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);

  // Initialize icons when component mounts and when state changes
  useEffect(() => {
    initLucideIcons();
  }, [sidebarOpen, userMenuOpen, darkMode]);

  // Load dark mode preference from localStorage
  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle dark mode
  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };

  // Toggle sidebar
  const toggleSidebar = () => {
    setSidebarOpen(!sidebarOpen);
  };

  // Get page title from URL
  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes('dashboard')) {
      return intl.formatMessage(messages['header.links.courses'] || { id: 'header.links.courses', defaultMessage: 'Dashboard' });
    }
    if (path.includes('courses')) {
      return intl.formatMessage(messages['header.links.courses'] || { id: 'header.links.courses', defaultMessage: 'Courses' });
    }
    return getConfig().SITE_NAME || 'Learning Platform';
  };

  return (
    <>
      {/* Main Header */}
      <header className="main-header">
        <button 
          className="header-toggle-btn" 
          onClick={toggleSidebar}
          aria-label="Toggle sidebar"
        >
          <i data-lucide="menu"></i>
        </button>
        <h1 className="page-title">{getPageTitle()}</h1>
        <button 
          className="dark-mode-toggle" 
          onClick={toggleDarkMode} 
          title="Toggle dark mode"
          aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
        >
          <i data-lucide={darkMode ? "sun" : "moon"}></i>
        </button>
      </header>

      {/* Sidebar Overlay */}
      {sidebarOpen && (
        <div 
          className="sidebar-overlay" 
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`sidebar ${sidebarOpen ? 'open' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <a href={logoDestination}>
              <img 
                className="logo-img"
                src={logo} 
                alt={logoAltText} 
              />
            </a>
          </div>
        </div>
        
        {/* Main Menu Navigation */}
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {mainMenu && mainMenu.length > 0 ? (
              mainMenu.map((item, index) => (
                <li key={index} className="nav-item">
                  <a 
                    href={item.href} 
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i data-lucide="circle"></i>
                    <span>{item.content}</span>
                  </a>
                </li>
              ))
            ) : (
              <li className="nav-item">
                <a href={`${getConfig().LMS_BASE_URL}/dashboard`} className="nav-link">
                  <i data-lucide="home"></i>
                  <span>Dashboard</span>
                </a>
              </li>
            )}
          </ul>

          {/* Secondary Menu */}
          {secondaryMenu && secondaryMenu.length > 0 && (
            <ul className="nav-menu">
              {secondaryMenu.map((item, index) => (
                <li key={index} className="nav-item">
                  <a 
                    href={item.href} 
                    className="nav-link"
                    onClick={() => setSidebarOpen(false)}
                  >
                    <i data-lucide="circle"></i>
                    <span>{item.content}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </nav>

        {/* User Menu Section */}
        {loggedIn ? (
          <div className="user-menu">
            <div 
              className="user-menu-header"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  setUserMenuOpen(!userMenuOpen);
                }
              }}
            >
              <div className="user-avatar">
                {avatar ? (
                  <img src={avatar} alt={username} />
                ) : (
                  <span>{username ? username.charAt(0).toUpperCase() : 'U'}</span>
                )}
              </div>
              <div className="user-info">
                <div className="user-name">{username || 'User'}</div>
              </div>
              <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'}></i>
            </div>
            
            {userMenuOpen && (
              <ul className="user-menu-items nav-menu">
                {userMenu && userMenu.length > 0 ? (
                  userMenu.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      {section.items && section.items.map((item, itemIndex) => (
                        <li key={itemIndex} className="nav-item">
                          <a 
                            href={item.href} 
                            className="nav-link"
                            onClick={() => setSidebarOpen(false)}
                          >
                            <i data-lucide="circle"></i>
                            <span>{item.content}</span>
                          </a>
                        </li>
                      ))}
                    </React.Fragment>
                  ))
                ) : (
                  <li className="nav-item">
                    <a href={getConfig().LOGOUT_URL} className="nav-link">
                      <i data-lucide="log-out"></i>
                      <span>Logout</span>
                    </a>
                  </li>
                )}
              </ul>
            )}
          </div>
        ) : (
          <div className="user-menu">
            {loggedOutItems && loggedOutItems.length > 0 ? (
              loggedOutItems.map((item, index) => (
                <a 
                  key={index}
                  href={item.href}
                  className="nav-link logged-out-link"
                >
                  {item.content}
                </a>
              ))
            ) : (
              <>
                <a href={getConfig().LOGIN_URL} className="nav-link logged-out-link">
                  Login
                </a>
                <a href={`${getConfig().LMS_BASE_URL}/register`} className="nav-link logged-out-link">
                  Register
                </a>
              </>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

export const desktopHeaderDataShape = {
  mainMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  secondaryMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  userMenu: desktopUserMenuDataShape,
  loggedOutItems: desktopLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool,
};

DesktopHeader.propTypes = {
  mainMenu: desktopHeaderDataShape.mainMenu,
  secondaryMenu: desktopHeaderDataShape.secondaryMenu,
  userMenu: desktopHeaderDataShape.userMenu,
  loggedOutItems: desktopHeaderDataShape.loggedOutItems,
  logo: desktopHeaderDataShape.logo,
  logoAltText: desktopHeaderDataShape.logoAltText,
  logoDestination: desktopHeaderDataShape.logoDestination,
  avatar: desktopHeaderDataShape.avatar,
  username: desktopHeaderDataShape.username,
  loggedIn: desktopHeaderDataShape.loggedIn,
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
