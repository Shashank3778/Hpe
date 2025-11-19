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
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Initialize icons when component mounts and when state changes
  useEffect(() => {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode, currentPage]);

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

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
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

  // Map menu items to include icons
  const getIconForMenuItem = (item, index) => {
    const iconMap = {
      'dashboard': 'layout-dashboard',
      'courses': 'book-open',
      'programs': 'route',
      'home': 'home',
    };
    
    // Try to match by href
    const href = item.href || '';
    if (href.includes('dashboard')) return 'layout-dashboard';
    if (href.includes('courses')) return 'book-open';
    if (href.includes('programs') || href.includes('learning')) return 'route';
    
    // Default icons based on position
    const defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route', 'bot'];
    return defaultIcons[index] || 'circle';
  };

  // Map user menu items to include icons
  const getIconForUserMenuItem = (item) => {
    const href = item.href || '';
    const content = (item.content || '').toLowerCase();
    
    if (href.includes('dashboard') || content.includes('dashboard')) return 'gauge';
    if (href.includes('profile') || content.includes('profile')) return 'user';
    if (href.includes('account') || href.includes('settings') || content.includes('account')) return 'settings';
    if (href.includes('order') || content.includes('order')) return 'shopping-bag';
    if (href.includes('logout') || content.includes('logout') || content.includes('sign out')) return 'log-out';
    
    return 'circle';
  };

  // Determine which logo to show
  const getLogoSrc = () => {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    // Use appropriate logo based on dark mode
    return logo || (darkMode 
      ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd'
      : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };

  return (
    <>
      {/* Sidebar - Always visible on desktop */}
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
        {/* Sidebar Header */}
        <div className="sidebar-header">
          <div className="logo-container">
            <a href={logoDestination}>
              <img 
                className="logo-img"
                key={`${sidebarCollapsed}-${darkMode}`}
                src={getLogoSrc()} 
                alt={logoAltText} 
              />
            </a>
          </div>
        </div>
        
        {/* Main Menu Navigation */}
        <ul className="nav-menu">
          {mainMenu && mainMenu.length > 0 ? (
            mainMenu.map((item, index) => (
              <li key={index} className="nav-item">
                <a 
                  href={item.href} 
                  className={`nav-link ${window.location.pathname === item.href ? 'active' : ''}`}
                >
                  <i data-lucide={getIconForMenuItem(item, index)}></i>
                  <span>{item.content}</span>
                </a>
              </li>
            ))
          ) : (
            <>
              <li className="nav-item">
                <a href={`${getConfig().LMS_BASE_URL}/`} className="nav-link">
                  <i data-lucide="home"></i>
                  <span>Home</span>
                </a>
              </li>
              <li className="nav-item">
                <a href={`${getConfig().LMS_BASE_URL}/dashboard`} className="nav-link active">
                  <i data-lucide="layout-dashboard"></i>
                  <span>My Dashboard</span>
                </a>
              </li>
              <li className="nav-item">
                <a href={`${getConfig().LMS_BASE_URL}/courses`} className="nav-link">
                  <i data-lucide="book-open"></i>
                  <span>Courses</span>
                </a>
              </li>
            </>
          )}
          
          {/* Secondary Menu */}
          {secondaryMenu && secondaryMenu.length > 0 && secondaryMenu.map((item, index) => (
            <li key={`secondary-${index}`} className="nav-item">
              <a 
                href={item.href} 
                className="nav-link"
              >
                <i data-lucide={getIconForMenuItem(item, index + mainMenu.length)}></i>
                <span>{item.content}</span>
              </a>
            </li>
          ))}
        </ul>
        
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
                  <span>{username ? username.split(' ').map(n => n[0]).join('').toUpperCase() : 'U'}</span>
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
                          >
                            <i data-lucide={getIconForUserMenuItem(item)}></i>
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

      {/* Main Header */}
      <header 
        className="main-header"
        style={{
          marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)',
        }}
      >
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
