import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { initLucideIcons } from '../utils/iconUtils';
import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import DesktopLoggedOutItemsSlot from '../plugin-slots/DesktopLoggedOutItemsSlot';
import LogoSlot from '../plugin-slots/LogoSlot';
import Sidebar from './Sidebar';
import messages from '../Header.messages';
import './Sidebar.css';

const DesktopHeader = ({
mainMenu,
secondaryMenu,
userMenu,
loggedOutItems,
logo,
logoAltText,
logoDestination,
loggedIn,
}) => {
const intl = useIntl();
const logoProps = { src: logo, alt: logoAltText, href: logoDestination };

const [sidebarOpen, setSidebarOpen] = useState(false);
const [darkMode, setDarkMode] = useState(false);

useEffect(() => {
initLucideIcons();
}, [darkMode, sidebarOpen]);

return (
<> <Sidebar
     isCollapsed={!sidebarOpen}
     darkMode={darkMode}
     loggedIn={loggedIn}
     userMenu={userMenu}
   /> <header className="main-header">
<button
className="header-toggle-btn"
onClick={() => setSidebarOpen(!sidebarOpen)}
aria-label="Toggle sidebar"
> <i data-lucide="menu"></i> </button>

```
    <div className="header-center">
      <a href={logoDestination} className="logo-link">
        <LogoSlot {...logoProps} />
      </a>
      <h1 className="page-title">
        {intl.formatMessage(messages['header.links.courses'])}
      </h1>
    </div>

    <div className="header-right">
      <nav className="main-nav">
        <DesktopMainMenuSlot menu={mainMenu} />
      </nav>

      {loggedIn ? (
        <DesktopSecondaryMenuSlot menu={secondaryMenu} />
      ) : (
        <DesktopLoggedOutItemsSlot items={loggedOutItems} />
      )}

      <button
        className="dark-mode-toggle"
        onClick={() => setDarkMode(!darkMode)}
        title="Toggle dark mode"
        aria-label={darkMode ? 'Switch to light mode' : 'Switch to dark mode'}
      >
        <i data-lucide={darkMode ? 'sun' : 'moon'}></i>
      </button>
    </div>
  </header>
</>


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
loggedIn: false,
};

export default DesktopHeader;
