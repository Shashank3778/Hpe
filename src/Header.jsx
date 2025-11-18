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
  mergeConfig(
    { AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER },
    'Header additional config'
  );
});

const Header = ({ mainMenuItems, secondaryMenuItems, userMenuItems }) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const intl = useIntl();

  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const [currentPage, setCurrentPage] = useState('home');

  // Load theme state
  useEffect(() => {
    const savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);

    if (savedDark) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  }, []);

  const toggleDarkMode = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem('darkMode', String(newMode));

    if (newMode) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  };

  const toggleSidebar = () => setSidebarCollapsed(!sidebarCollapsed);

  const defaultMainMenu = [
    {
      id: 'home',
      icon: 'home',
      label: 'Home',
      href: `${config.LMS_BASE_URL}/dashboard`,
    },
    {
      id: 'courses',
      icon: 'book-open',
      label: 'Courses',
      href: `${config.LMS_BASE_URL}/courses`,
    },
  ];

  const defaultUserMenu =
    authenticatedUser === null
      ? []
      : [
          {
            id: 'profile',
            icon: 'user',
            label: 'Profile',
            href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
          },
          {
            id: 'account',
            icon: 'settings',
            label: 'Account',
            href: config.ACCOUNT_SETTINGS_URL,
          },
          ...(config.ORDER_HISTORY_URL
            ? [
                {
                  id: 'orders',
                  icon: 'shopping-bag',
                  label: 'Orders',
                  href: config.ORDER_HISTORY_URL,
                },
              ]
            : []),
          {
            id: 'logout',
            icon: 'log-out',
            label: 'Logout',
            href: config.LOGOUT_URL,
          },
        ];

  if (getConfig().AUTHN_MINIMAL_HEADER) return null;

  return (
    <>
      <CustomSidebar
        isCollapsed={sidebarCollapsed}
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        darkMode={darkMode}
        mainMenu={mainMenuItems || defaultMainMenu}
        userMenu={userMenuItems || defaultUserMenu}
        loggedOutItems={[
          { id: 'login', label: 'Login', href: config.LOGIN_URL },
          { id: 'register', label: 'Register', href: `${config.LMS_BASE_URL}/register` },
        ]}
        authenticatedUser={authenticatedUser}
        config={config}
        logoUrl={config.LOGO_URL}
        siteName={config.SITE_NAME}
      />

      <CustomHeader
        title="Dashboard"
        toggleSidebar={toggleSidebar}
        darkMode={darkMode}
        toggleDarkMode={toggleDarkMode}
        sidebarCollapsed={sidebarCollapsed}
      />
    </>
  );
};

export default Header;
