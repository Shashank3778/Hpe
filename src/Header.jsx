import React, { useContext, useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';
import PropTypes from 'prop-types';
import CustomHeader from './CustomHeader';
import CustomSidebar from './CustomSidebar';
import './Header.css';

ensureConfig([
  'LMS_BASE_URL',
  'LOGOUT_URL',
  'LOGIN_URL',
  'SITE_NAME',
  'LOGO_URL',
  'ORDER_HISTORY_URL',
  'ACCOUNT_PROFILE_URL',
  'ACCOUNT_SETTINGS_URL',
], 'Header component');

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
  }, 'Header additional config');
});

const Header = ({
  mainMenuItems,
  secondaryMenuItems,
  userMenuItems,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const intl = useIntl();
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  useEffect(() => {
    const savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    if (newDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  };

  const toggleSidebar = () => {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  const defaultMainMenu = [
    {
      id: 'home',
      icon: 'home',
      label: intl.formatMessage({ id: 'header.links.home', defaultMessage: 'Home' }),
      href: `${config.LMS_BASE_URL}/dashboard`,
    },
    {
      id: 'dashboard',
      icon: 'layout-dashboard',
      label: intl.formatMessage({ id: 'header.links.dashboard', defaultMessage: 'My Dashboard' }),
      href: `${config.LMS_BASE_URL}/dashboard`,
    },
    {
      id: 'courses',
      icon: 'book-open',
      label: intl.formatMessage({ id: 'header.links.courses', defaultMessage: 'Courses' }),
      href: `${config.LMS_BASE_URL}/courses`,
    },
    {
      id: 'programs',
      icon: 'route',
      label: intl.formatMessage({ id: 'header.links.programs', defaultMessage: 'Programs' }),
      href: `${config.LMS_BASE_URL}/programs`,
    },
  ];

  const defaultUserMenu = authenticatedUser === null ? [] : [
    {
      id: 'user-dashboard',
      icon: 'gauge',
      label: intl.formatMessage({ id: 'header.user.menu.dashboard', defaultMessage: 'Dashboard' }),
      href: `${config.LMS_BASE_URL}/dashboard`,
    },
    {
      id: 'profile',
      icon: 'user',
      label: intl.formatMessage({ id: 'header.user.menu.profile', defaultMessage: 'Profile' }),
      href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
    },
    {
      id: 'account',
      icon: 'settings',
      label: intl.formatMessage({ id: 'header.user.menu.account.settings', defaultMessage: 'Account' }),
      href: config.ACCOUNT_SETTINGS_URL,
    },
    ...(config.ORDER_HISTORY_URL ? [{
      id: 'order-history',
      icon: 'shopping-bag',
      label: intl.formatMessage({ id: 'header.user.menu.order.history', defaultMessage: 'Order History' }),
      href: config.ORDER_HISTORY_URL,
    }] : []),
    {
      id: 'signout',
      icon: 'log-out',
      label: intl.formatMessage({ id: 'header.user.menu.logout', defaultMessage: 'Sign Out' }),
      href: config.LOGOUT_URL,
    },
  ];

  const mainMenu = mainMenuItems || defaultMainMenu;
  const userMenu = authenticatedUser === null ? [] : userMenuItems || defaultUserMenu;

  const loggedOutItems = [
    {
      id: 'login',
      label: intl.formatMessage({ id: 'header.user.menu.login', defaultMessage: 'Login' }),
      href: config.LOGIN_URL,
    },
    {
      id: 'register',
      label: intl.formatMessage({ id: 'header.user.menu.register', defaultMessage: 'Register' }),
      href: `${config.LMS_BASE_URL}/register`,
    },
  ];

  const getPageTitle = () => {
    const path = window.location.pathname;
    if (path.includes('dashboard')) return intl.formatMessage({ id: 'header.title.dashboard', defaultMessage: 'Dashboard' });
    if (path.includes('courses')) return intl.formatMessage({ id: 'header.title.courses', defaultMessage: 'Courses' });
    if (path.includes('programs')) return intl.formatMessage({ id: 'header.title.programs', defaultMessage: 'Programs' });
    return config.SITE_NAME || intl.formatMessage({ id: 'header.title.default', defaultMessage: 'Learning Platform' });
  };

  if (getConfig().AUTHN_MINIMAL_HEADER) {
    return null;
  }

  return (
    <>
      <CustomSidebar
        isCollapsed={sidebarCollapsed}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        mainMenu={mainMenu}
        userMenu={userMenu}
        loggedOutItems={loggedOutItems}
        authenticatedUser={authenticatedUser}
        config={config}
        logoUrl={config.LOGO_URL}
        siteName={config.SITE_NAME}
      />
      <CustomHeader
        title={getPageTitle()}
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarCollapsed={sidebarCollapsed}
      />
    </>
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
};

Header.propTypes = {
  mainMenuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
  })),
  secondaryMenuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
  })),
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string,
    icon: PropTypes.string,
    label: PropTypes.string,
    href: PropTypes.string,
  })),
};

export default Header;