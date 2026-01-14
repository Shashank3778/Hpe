import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { initLucideIcons } from '../utils/iconUtils';
import { desktopLoggedOutItemsDataShape } from './DesktopLoggedOutItems';
import { desktopHeaderMainOrSecondaryMenuDataShape } from './DesktopHeaderMainOrSecondaryMenu';
import { desktopUserMenuDataShape } from './DesktopHeaderUserMenu';
import messages from '../Header.messages';
import logoDark from '../assets/logo-dark.png';


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
  const [userFullName, setUserFullName] = useState('');
  const [userInitials, setUserInitials] = useState('U');

  const iconStyle = { width: '20px', height: '20px', flexShrink: 0 };
  const iconStyles = { width: '24px', height: '24px' };
  
  useEffect(() => {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode]);

  // ✅ Fetch user's full name from Open edX API
  useEffect(() => {
    const fetchUserData = async () => {
      if (!loggedIn || !username) {
        setUserFullName('User');
        setUserInitials('U');
        return;
      }

      try {
        const baseUrl = getConfig().LMS_BASE_URL;
        const accountApiUrl = `${baseUrl}/api/user/v1/accounts/${username}`;
        
        const response = await fetch(accountApiUrl, {
          credentials: 'include',
          headers: {
            'Accept': 'application/json',
          },
        });

        if (response.ok) {
          const userData = await response.json();
          const fullName = userData.name || username;
          setUserFullName(fullName);
          
          // Calculate initials from full name
          const nameParts = fullName.trim().split(/\s+/).filter(part => part.length > 0);
          let initials = 'U';
          
          if (nameParts.length === 0) {
            initials = 'U';
          } else if (nameParts.length === 1) {
            // Only first name: take first letter
            initials = nameParts[0][0].toUpperCase();
          } else {
            // First name + Last name: take first letter of each
            initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
          }
          
          setUserInitials(initials);
        } else {
          setUserFullName(username);
          setUserInitials(username[0].toUpperCase());
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setUserFullName(username);
        setUserInitials(username[0].toUpperCase());
      }
    };

    fetchUserData();
  }, [username, loggedIn]);

  // -------------------------------------------------------------
  // 🔥 DARK MODE SYNC: check cookie FIRST and APPLY theme
  // -------------------------------------------------------------
  useEffect(() => {
    const getCookie = (name) => {
      return document.cookie
        .split('; ')
        .find(row => row.startsWith(name + '='))?.split('=')[1];
    };

    const checkDarkMode = () => {
      const html = document.documentElement;
      const body = document.body;

      const cookieTheme = getCookie('indigo-toggle-dark');
      const mfeTheme = localStorage.getItem('theme');
      const paragonTheme = localStorage.getItem('paragon.theme.variant');
      const legacyTheme = localStorage.getItem('hexis-theme');

      // --------------------------
      // 1️⃣ COOKIE TAKES PRIORITY
      // --------------------------
      if (cookieTheme === 'dark' || cookieTheme === 'light') {
        const isDark = cookieTheme === 'dark';

        const currentTheme = html.getAttribute('data-theme');
        if (
          (isDark && currentTheme === 'dark') ||
          (!isDark && currentTheme === 'light')
        ) {
          setDarkMode(isDark);
          return;
        }

        if (isDark) {
          html.classList.add('pgn__dark-mode');
          body.classList.add('pgn__dark-mode');
          html.setAttribute('data-theme', 'dark');
          body.setAttribute('data-theme', 'dark');
        } else {
          html.classList.remove('pgn__dark-mode');
          body.classList.remove('pgn__dark-mode');
          html.setAttribute('data-theme', 'light');
          body.setAttribute('data-theme', 'light');
        }

        setDarkMode(isDark);
        return; // cookie decides theme completely
      }

      // --------------------------
      // 2️⃣ FALLBACK: localStorage
      // --------------------------
      const isDark =
        legacyTheme === 'dark' ||
        mfeTheme === 'dark' ||
        paragonTheme === 'dark';

      if (isDark) {
        html.classList.add('pgn__dark-mode');
        body.classList.add('pgn__dark-mode');
        html.setAttribute('data-theme', 'dark');
        body.setAttribute('data-theme', 'dark');
      } else {
        html.classList.remove('pgn__dark-mode');
        body.classList.remove('pgn__dark-mode');
        html.setAttribute('data-theme', 'light');
        body.setAttribute('data-theme', 'light');
      }

      setDarkMode(isDark);
    };

    // ✅ Run once on mount to apply theme based on cookie/localStorage
    checkDarkMode();

    // ❌ MutationObserver REMOVED – no more infinite loop / hanging
  }, []);

  // ------------------------------
  // Sidebar Handling
  // ------------------------------
  useEffect(() => {
    const mainContent = document.querySelector('#main');
    if (mainContent) {
      mainContent.style.marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
      mainContent.style.transition = 'margin-left 0.3s ease';
    }
  }, [sidebarCollapsed]);

  // -------------------------------------------------------------
  // 🔥 Toggle Dark Mode (MFE → Legacy sync)
  // -------------------------------------------------------------
  const toggleDarkMode = () => {
    const html = document.documentElement;
    const body = document.body;

    const newDarkMode = !darkMode;
    const themeValue = newDarkMode ? 'dark' : 'light';

    // Cross-domain cookie
    document.cookie =
      `indigo-toggle-dark=${themeValue};path=/;domain=.striverra.com;max-age=7776000;Secure;SameSite=None`;

    // Update MFE storages
    localStorage.setItem('theme', themeValue);
    localStorage.setItem('paragon.theme.variant', themeValue);

    // Update legacy localStorage (sync back)
    localStorage.setItem('hexis-theme', themeValue);

    if (newDarkMode) {
      html.classList.add('pgn__dark-mode');
      body.classList.add('pgn__dark-mode');
      html.setAttribute('data-theme', 'dark');
      body.setAttribute('data-theme', 'dark');
    } else {
      html.classList.remove('pgn__dark-mode');
      body.classList.remove('pgn__dark-mode');
      html.setAttribute('data-theme', 'light');
      body.setAttribute('data-theme', 'light');
    }

    setDarkMode(newDarkMode);
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes('dashboard')) return intl.formatMessage({ id: 'header.title.dashboard', defaultMessage: 'My Dashboard' });
    if (path.includes('courses')) return intl.formatMessage({ id: 'header.title.courses', defaultMessage: 'Courses' });
    if (path.includes('programs')) return intl.formatMessage({ id: 'header.title.programs', defaultMessage: 'Learning Paths' });
    return getConfig().SITE_NAME || 'Learning Platform';
  };

  const getIconForMenuItem = (item, index) => {
    const href = (item.href || '').toLowerCase();
    const content = (item.content || '').toLowerCase();

    if (content.includes('home') || href.endsWith('/') || href.endsWith('/home')) return 'home';
    if (content.includes('dashboard') || href.includes('dashboard')) return 'layout-dashboard';
    if (content.includes('course') || href.includes('/courses')) return 'book-open';
    if (content.includes('program') || content.includes('learning path') || href.includes('program')) return 'route';

    const defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route'];
    return defaultIcons[index] || 'circle';
  };

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

  const getLogoSrc = () => {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return (
      logo ||
      (darkMode
        ? logoDark
        : logoDark)
    );
  };

  const buildCorrectMenu = () => {
    const baseUrl = getConfig().LMS_BASE_URL;
    const menuItems = [];

    // ✅ HOME → {LMS_BASE_URL}/home/
    menuItems.push({
      href: `${baseUrl}`,
      content: intl.formatMessage({ id: 'header.links.home', defaultMessage: 'Home' }),
      icon: 'home',
    });

    menuItems.push({
      href: `${baseUrl}/dashboard`,
      content: intl.formatMessage({ id: 'header.links.my.dashboard', defaultMessage: 'My Dashboard' }),
      icon: 'layout-dashboard',
    });

    menuItems.push({
      href: `${baseUrl}/courses`,
      content: intl.formatMessage({ id: 'header.links.courses', defaultMessage: 'Courses' }),
      icon: 'book-open',
    });

    // ✅ ALWAYS SHOW LEARNING PATHS
    menuItems.push({
      href: `${baseUrl}/ddashboard/programs/`,
      content: intl.formatMessage({ id: 'header.links.programs', defaultMessage: 'Learning Paths' }),
      icon: 'route',
    });

    const processedItems = new Set(['/', '/dashboard', '/courses', '/programs', '/home/']);

    if (mainMenu && mainMenu.length > 0) {
      mainMenu.forEach((item) => {
        const href = item.href || '';
        const content = (item.content || '').toLowerCase();

        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) return;

        const cleanHref = href.replace(baseUrl, '').toLowerCase();

        if (!processedItems.has(cleanHref) && !cleanHref.endsWith('/') && !cleanHref.endsWith('/home')) {
          menuItems.push({ ...item, icon: getIconForMenuItem(item, menuItems.length) });
          processedItems.add(cleanHref);
        }
      });
    }

    if (secondaryMenu && secondaryMenu.length > 0) {
      secondaryMenu.forEach((item) => {
        const href = item.href || '';
        const content = (item.content || '').toLowerCase();

        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) return;

        const cleanHref = href.replace(baseUrl, '').toLowerCase();

        if (!processedItems.has(cleanHref)) {
          menuItems.push({ ...item, icon: getIconForMenuItem(item, menuItems.length) });
          processedItems.add(cleanHref);
        }
      });
    }

    return menuItems;
  };

  const completeMenu = buildCorrectMenu();

  return (
    <>
      <aside className={`sidebar ${sidebarCollapsed ? 'collapsed' : ''}`}>
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

        <nav className="sidebar-nav">
          <ul className="nav-menu">
            {completeMenu.map((item, index) => (
              <li key={index} className="nav-item">
                <a href={item.href} className={`nav-link ${window.location.pathname === item.href ? 'active' : ''}`}>
                  <i data-lucide={item.icon || getIconForMenuItem(item, index)} style={iconStyle} />
                  <span>{item.content}</span>
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {loggedIn ? (
          <div className="user-menu">
            <div
              className="user-menu-header"
              onClick={() => setUserMenuOpen(!userMenuOpen)}
              role="button"
              tabIndex={0}
              onKeyPress={(e) => {
                if (e.key === 'Enter' || e.key === ' ') setUserMenuOpen(!userMenuOpen);
              }}
            >
              <div className="user-avatar">
                {avatar ? (
                  <img src={avatar} alt={userFullName || username} />
                ) : (
                  <span>{userInitials}</span>
                )}
              </div>
              <div className="user-info">
                <div className="user-name">{userFullName || username || 'User'}</div>
              </div>
              <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'} style={iconStyle} />
            </div>

            {userMenuOpen && (
              <ul className="user-menu-items nav-menu">
                {userMenu && userMenu.length > 0 ? (
                  userMenu.map((section, sectionIndex) => (
                    <React.Fragment key={sectionIndex}>
                      {section.items &&
                        section.items.map((item, itemIndex) => (
                          <li key={itemIndex} className="nav-item">
                            <a href={item.href} className="nav-link">
                              <i data-lucide={getIconForUserMenuItem(item)} style={iconStyle} />
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
                        <i data-lucide="gauge" style={iconStyle} />
                        <span>Dashboard</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={`${getConfig().ACCOUNT_PROFILE_URL}/u/${username}`} className="nav-link">
                        <i data-lucide="user" style={iconStyle} />
                        <span>Profile</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={getConfig().ACCOUNT_SETTINGS_URL} className="nav-link">
                        <i data-lucide="settings" style={iconStyle} />
                        <span>Account</span>
                      </a>
                    </li>
                    <li className="nav-item">
                      <a href={getConfig().LOGOUT_URL} className="nav-link">
                        <i data-lucide="log-out" style={iconStyle} />
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
                <a key={index} href={item.href} className="nav-link logged-out-link">
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

      <header
        className="main-header"
        style={{ marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)' }}
      >
        <button className="header-toggle-btn" onClick={toggleSidebar} aria-label="Toggle sidebar">
          <i data-lucide="menu" style={iconStyles} />
        </button>

        <h1 className="page-title">{getPageTitle()}</h1>

        <button
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          title="Toggle dark mode"
          aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          <i data-lucide={darkMode ? 'sun' : 'moon'} style={iconStyle} />
        </button>
      </header>
    </>
  );
};

// Prop types
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
