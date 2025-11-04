import React, { useContext, useMemo, useState } from 'react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';

import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import {
  APP_CONFIG_INITIALIZED,
  ensureConfig,
  mergeConfig,
  getConfig,
  subscribe,
} from '@edx/frontend-platform';

import messages from './Header.messages';

// 🧩 Direct icon components (no utils needed)
import { Menu, Moon, Sun } from 'lucide-react';


/**
 * ✅ Configuration Setup (required by Open edX)
 */
ensureConfig(
  [
    'LMS_BASE_URL',
    'LOGOUT_URL',
    'LOGIN_URL',
    'SITE_NAME',
    'LOGO_URL',
    'ORDER_HISTORY_URL',
    'ACCOUNT_PROFILE_URL',
    'ACCOUNT_SETTINGS_URL',
  ],
  'Header component',
);

subscribe(APP_CONFIG_INITIALIZED, () => {
  mergeConfig(
    {
      AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER,
    },
    'Header additional config',
  );
});

/**
 * Utility component for building menu links
 */
function MenuLinks({ items }) {
  if (!items || items.length === 0) return null;

  const flattened =
    items[0]?.items && (items[0].heading !== undefined)
      ? items[0].items
      : items;

  return (
    <nav className="header-nav" aria-label="Primary">
      {flattened
        .filter((i) => i?.type === 'item')
        .map((i, idx) => (
          <a key={idx} href={i.href} aria-current={i.isActive ? 'page' : undefined}>
            {i.content}
          </a>
        ))}
    </nav>
  );
}

/**
 * 🎨 Full-featured custom header using lucide-react
 */
const Header = ({
  mainMenuItems,
  secondaryMenuItems,
  userMenuItems,
  toggleSidebar,
}) => {
  const { authenticatedUser, config } = useContext(AppContext);
  const intl = useIntl();

  const [darkMode, setDarkMode] = useState(false);

  const toggleDarkMode = () => {
    const next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };

  /** Default menus (same as original Open edX header) */
  const defaultMainMenu = useMemo(
    () => [
      {
        type: 'item',
        href: `${config.LMS_BASE_URL}/dashboard`,
        content: intl.formatMessage(messages['header.links.courses']),
      },
    ],
    [config.LMS_BASE_URL, intl],
  );

  const defaultUserMenu = useMemo(() => {
    if (!authenticatedUser) return [];
    return [
      {
        heading: '',
        items: [
          {
            type: 'item',
            href: `${config.LMS_BASE_URL}/dashboard`,
            content: intl.formatMessage(messages['header.user.menu.dashboard']),
          },
          {
            type: 'item',
            href: `${config.ACCOUNT_PROFILE_URL}/u/${authenticatedUser.username}`,
            content: intl.formatMessage(messages['header.user.menu.profile']),
          },
          {
            type: 'item',
            href: config.ACCOUNT_SETTINGS_URL,
            content: intl.formatMessage(messages['header.user.menu.account.settings']),
          },
          ...(config.ORDER_HISTORY_URL
            ? [
                {
                  type: 'item',
                  href: config.ORDER_HISTORY_URL,
                  content: intl.formatMessage(messages['header.user.menu.order.history']),
                },
              ]
            : []),
          {
            type: 'item',
            href: config.LOGOUT_URL,
            content: intl.formatMessage(messages['header.user.menu.logout']),
          },
        ],
      },
    ];
  }, [authenticatedUser, config, intl]);

  const loggedOutItems = useMemo(
    () => [
      {
        type: 'item',
        href: config.LOGIN_URL,
        content: intl.formatMessage(messages['header.user.menu.login']),
      },
      {
        type: 'item',
        href: `${config.LMS_BASE_URL}/register`,
        content: intl.formatMessage(messages['header.user.menu.register']),
      },
    ],
    [config, intl],
  );

  const mainMenu = getConfig().AUTHN_MINIMAL_HEADER ? [] : (mainMenuItems || defaultMainMenu);
  const secondaryMenu = getConfig().AUTHN_MINIMAL_HEADER ? [] : (secondaryMenuItems || []);
  const userMenu =
    authenticatedUser === null
      ? []
      : getConfig().AUTHN_MINIMAL_HEADER
      ? []
      : userMenuItems || defaultUserMenu;

  const loggedIn = authenticatedUser !== null;
  const username = loggedIn ? authenticatedUser.username : null;

  const headerProps = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: `${config.LMS_BASE_URL}/dashboard`,
    loggedIn,
    username,
    avatar: loggedIn ? authenticatedUser.avatar : null,
    mainMenu,
    secondaryMenu,
    userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems,
  };

  /** Authentication area */
  const AuthArea = () =>
    loggedIn ? (
      <>
        <span className="user-name">
          {intl.formatMessage({ id: 'header.user.greeting', defaultMessage: 'Hi,' })} {username}
        </span>
        <a href={config.LOGOUT_URL}>
          {intl.formatMessage(messages['header.user.menu.logout'])}
        </a>
      </>
    ) : (
      <>
        <a href={config.LOGIN_URL}>
          {intl.formatMessage(messages['header.user.menu.login'])}
        </a>
        <a href={`${config.LMS_BASE_URL}/register`}>
          {intl.formatMessage(messages['header.user.menu.register'])}
        </a>
      </>
    );

  /** Final visual layout */
  const CustomBar = () => (
    <header className={`main-header ${darkMode ? 'dark' : ''}`}>
      <button
        type="button"
        className="header-toggle-btn"
        onClick={toggleSidebar}
        aria-label="Toggle sidebar"
      >
        <Menu size={24} />
      </button>

      <img
        className="header-logo"
        src={headerProps.logo}
        alt={headerProps.logoAltText}
        onClick={() => (window.location.href = headerProps.logoDestination)}
      />

      <MenuLinks items={headerProps.mainMenu} />
      <MenuLinks items={headerProps.secondaryMenu} />

      <div className="header-right">
        <AuthArea />
        <button
          type="button"
          className="dark-mode-toggle"
          onClick={toggleDarkMode}
          aria-label="Toggle dark mode"
          title={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
        >
          {darkMode ? <Sun size={22} /> : <Moon size={22} />}
        </button>
      </div>
    </header>
  );

  return (
    <>
      <Responsive maxWidth={769}>
        <CustomBar />
      </Responsive>
      <Responsive minWidth={769}>
        <CustomBar />
      </Responsive>
    </>
  );
};

Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
  toggleSidebar: () => {},
};

Header.propTypes = {
  mainMenuItems: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  secondaryMenuItems: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  userMenuItems: PropTypes.arrayOf(
    PropTypes.shape({
      heading: PropTypes.string,
      items: PropTypes.arrayOf(
        PropTypes.shape({
          type: PropTypes.oneOf(['item', 'menu']),
          href: PropTypes.string,
          content: PropTypes.string,
          isActive: PropTypes.bool,
        }),
      ),
    }),
  ),
  toggleSidebar: PropTypes.func,
};

export default Header;
