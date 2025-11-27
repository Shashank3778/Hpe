import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Import your icon utility
import { initLucideIcons } from '../utils/iconUtils';

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

  // Initialize icons when component mounts and when state changes
  useEffect(() => {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode]);

  useEffect(() => {
    const checkDarkMode = () => {
      const htmlElement = document.documentElement;
      const bodyElement = document.body;
      const isDark = 
        htmlElement.classList.contains('pgn__dark-mode') ||
        bodyElement.classList.contains('pgn__dark-mode') ||
        htmlElement.getAttribute('data-theme') === 'dark' ||
        bodyElement.getAttribute('data-theme') === 'dark' ||
        localStorage.getItem('theme') === 'dark' ||
        localStorage.getItem('paragon.theme.variant') === 'dark';
      
      setDarkMode(isDark);
    };

    checkDarkMode();

    // Listen for theme changes from Open edX
    const observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });

    return () => observer.disconnect();
  }, []);

  // Apply body margin when sidebar state changes
  useEffect(() => {
    const mainContent = document.querySelector('#main');
    if (mainContent) {
      mainContent.style.marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
      mainContent.style.transition = 'margin-left 0.3s ease';
    }
  }, [sidebarCollapsed]);

  // Toggle dark mode using Open edX default method
  const toggleDarkMode = () => {
    const htmlElement = document.documentElement;
    const bodyElement = document.body;
    const newDarkMode = !darkMode;

    if (newDarkMode) {
      // Enable dark mode (Paragon style)
      htmlElement.classList.add('pgn__dark-mode');
      bodyElement.classList.add('pgn__dark-mode');
      htmlElement.setAttribute('data-theme', 'dark');
      bodyElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('paragon.theme.variant', 'dark');
    } else {
      // Disable dark mode
      htmlElement.classList.remove('pgn__dark-mode');
      bodyElement.classList.remove('pgn__dark-mode');
      htmlElement.setAttribute('data-theme', 'light');
      bodyElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('paragon.theme.variant', 'light');
    }

    setDarkMode(newDarkMode);

    // Trigger Paragon theme change event
    const event = new CustomEvent('paragon.themeChanged', {
      detail: { theme: newDarkMode ? 'dark' : 'light' }
    });
    window.dispatchEvent(event);

    // Also trigger generic theme change event
    const themeEvent = new CustomEvent('themeChanged', {
      detail: { darkMode: newDarkMode }
    });
    window.dispatchEvent(themeEvent);
  };

  // Toggle sidebar collapse
  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get page title from URL
  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes('dashboard')) {
      return intl.formatMessage({ id: 'header.title.dashboard', defaultMessage: 'My Dashboard' });
    }
    if (path.includes('courses')) {
      return intl.formatMessage({ id: 'header.title.courses', defaultMessage: 'Courses' });
    }
    if (path.includes('programs')) {
      return intl.formatMessage({ id: 'header.title.programs', defaultMessage: 'Learning Paths' });
    }
    return getConfig().SITE_NAME || 'Learning Platform';
  };

  // Enhanced icon mapping function
  const getIconForMenuItem = (item, index) => {
    const href = (item.href || '').toLowerCase();
    const content = (item.content || '').toLowerCase();
    
    // Match by content/href keywords
    if (content.includes('home') || href.endsWith('/') || href.endsWith('/home')) return 'home';
    if (content.includes('dashboard') || href.includes('dashboard')) return 'layout-dashboard';
    if (content.includes('course') || href.includes('/courses')) return 'book-open';
    if (content.includes('program') || content.includes('learning path') || href.includes('program')) return 'route';
    
    // Fallback to position-based icons
    const defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route'];
    return defaultIcons[index] || 'circle';
  };

  // Map user menu items to include icons
  const getIconForUserMenuItem = (item) => {
    const href = (item.href || '').toLowerCase();
    const content = (item.content || '').toLowerCase();
    
    if (content.includes('dashboard') || href.includes('dashboard')) return 'gauge';
    if (content.includes('analytic') || href.includes('analytic')) return 'bar-chart-3';
    if (content.includes('profile') || href.includes('profile')) return 'user';
    if (content.includes('account') || content.includes('setting') || href.includes('account') || href.includes('setting')) return 'settings';
    if (content.includes('order') || content.includes('history') || href.includes('order')) return 'shopping-bag';
    if (content.includes('logout') || content.includes('sign out') || href.includes('logout')) return 'log-out';
    
    return 'circle';
  };

  // Determine which logo to show
  const getLogoSrc = () => {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return logo || (darkMode 
      ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd'
      : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };

  // ✅ FIXED: Transform and build correct menu structure
  const buildCorrectMenu = () => {
    const baseUrl = getConfig().LMS_BASE_URL;
    const customMenu = [];

    // Always add Home first
    customMenu.push({
      href: logoDestination || `${baseUrl}/`,
      content: intl.formatMessage({ id: 'header.links.home', defaultMessage: 'Home' }),
      icon: 'home',
    });

    // Track what we've added to avoid duplicates
    let hasDashboard = false;
    let hasCourses = false;
    let hasLearningPaths = false;

    // Process mainMenu
    if (mainMenu && mainMenu.length > 0) {
      mainMenu.forEach((item) => {
        const href = item.href || '';
        const content = (item.content || '').toLowerCase();

        // Skip AI Studio items
        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) {
          return;
        }

        // Dashboard
        if (href.includes('/dashboard')) {
          if (!hasDashboard) {
            customMenu.push({
              href: `${baseUrl}/dashboard`,
              content: intl.formatMessage({ id: 'header.links.my.dashboard', defaultMessage: 'My Dashboard' }),
              icon: 'layout-dashboard',
            });
            hasDashboard = true;
          }
        }
        // Courses
        else if (href.includes('/courses')) {
          if (!hasCourses) {
            customMenu.push({
              href: `${baseUrl}/courses`,
              content: intl.formatMessage({ id: 'header.links.courses', defaultMessage: 'Courses' }),
              icon: 'book-open',
            });
            hasCourses = true;
          }
        }
        // Learning Paths
        else if (href.includes('program') || content.includes('program') || content.includes('learning path')) {
          if (!hasLearningPaths) {
            customMenu.push({
              href: `${baseUrl}/programs`,
              content: intl.formatMessage({ id: 'header.links.programs', defaultMessage: 'Learning Paths' }),
              icon: 'route',
            });
            hasLearningPaths = true;
          }
        }
        // Keep other items
        else if (!href.endsWith('/') && !href.endsWith('/home')) {
          customMenu.push(item);
        }
      });
    }

    // Process secondaryMenu
    if (secondaryMenu && secondaryMenu.length > 0) {
      secondaryMenu.forEach((item) => {
        const content = (item.content || '').toLowerCase();
        const href = (item.href || '').toLowerCase();
        
        // Skip AI Studio items
        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) {
          return;
        }

        // Track items in secondary menu
        if (href.includes('/dashboard')) {
          hasDashboard = true;
        } else if (href.includes('/courses')) {
          hasCourses = true;
        } else if (href.includes('program')) {
          hasLearningPaths = true;
        }
        
        customMenu.push(item);
      });
    }

    // ✅ Ensure Dashboard exists
    if (!hasDashboard) {
      customMenu.splice(1, 0, {
        href: `${baseUrl}/dashboard`,
        content: intl.formatMessage({ id: 'header.links.my.dashboard', defaultMessage: 'My Dashboard' }),
        icon: 'layout-dashboard',
      });
    }

    // ✅ Ensure Courses exists
    if (!hasCourses) {
      const dashboardIndex = customMenu.findIndex(item => item.href?.includes('/dashboard'));
      const insertIndex = dashboardIndex >= 0 ? dashboardIndex + 1 : 2;
      customMenu.splice(insertIndex, 0, {
        href: `${baseUrl}/courses`,
        content: intl.formatMessage({ id: 'header.links.courses', defaultMessage: 'Courses' }),
        icon: 'book-open',
      });
    }

    // ✅ Ensure Learning Paths exists
    if (!hasLearningPaths) {
      customMenu.push({
        href: `${baseUrl}/programs`,
        content: intl.formatMessage({ id: 'header.links.programs', defaultMessage: 'Learning Paths' }),
        icon: 'route',
      });
    }

    return customMenu;
  };

  const completeMenu = buildCorrectMenu();

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
        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {completeMenu.map((item, index) => (
              <li key={index} className="nav-item">
                <a 
                  href={item.href} 
                  className={`nav-link ${window.location.pathname === item.href ? 'active' : ''}`}
                >
                  <i data-lucide={item.icon || getIconForMenuItem(item, index)}></i>
                  <span>{item.content}</span>
                </a>
              </li>
            ))}
          </ul>
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
                  <>
                    <li className="nav-item">
                      <a href={`${getConfig().LMS_BASE_URL}/dashboard`} className="nav-link">
                        <i data-lucide="gauge"></i>
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`} className="nav-link">
                        <i data-lucide="user"></i>
                        <span>Profile</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={getConfig().ACCOUNT_SETTINGS_URL} className="nav-link">
                        <i data-lucide="settings"></i>
                        <span>Account</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={getConfig().LOGOUT_URL} className="nav-link">
                        <i data-lucide="log-out"></i>
                        <span>Sign Out</span>
                      </a>
                    </li>
                  </>
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