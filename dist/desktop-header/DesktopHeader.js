function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var DesktopHeader = function DesktopHeader(_ref) {
  var mainMenu = _ref.mainMenu,
    secondaryMenu = _ref.secondaryMenu,
    userMenu = _ref.userMenu,
    loggedOutItems = _ref.loggedOutItems,
    logo = _ref.logo,
    logoAltText = _ref.logoAltText,
    logoDestination = _ref.logoDestination,
    avatar = _ref.avatar,
    username = _ref.username,
    loggedIn = _ref.loggedIn;
  var intl = useIntl();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarCollapsed = _useState2[0],
    setSidebarCollapsed = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    userMenuOpen = _useState4[0],
    setUserMenuOpen = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    darkMode = _useState6[0],
    setDarkMode = _useState6[1];
  var _useState7 = useState('home'),
    _useState8 = _slicedToArray(_useState7, 2),
    currentPage = _useState8[0],
    setCurrentPage = _useState8[1];

  // Initialize icons when component mounts and when state changes
  useEffect(function () {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode, currentPage]);

  // Load dark mode preference from localStorage
  useEffect(function () {
    var savedDarkMode = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDarkMode);
    if (savedDarkMode) {
      document.documentElement.setAttribute('data-theme', 'dark');
    }
  }, []);

  // Toggle dark mode
  var toggleDarkMode = function toggleDarkMode() {
    var newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', String(newDarkMode));
    document.documentElement.setAttribute('data-theme', newDarkMode ? 'dark' : 'light');
  };

  // Toggle sidebar collapse
  var toggleSidebar = function toggleSidebar() {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get page title from URL
  var getPageTitle = function getPageTitle() {
    var path = window.location.pathname;
    if (path.includes('dashboard')) {
      return intl.formatMessage(messages['header.links.courses'] || {
        id: 'header.links.courses',
        defaultMessage: 'Dashboard'
      });
    }
    if (path.includes('courses')) {
      return intl.formatMessage(messages['header.links.courses'] || {
        id: 'header.links.courses',
        defaultMessage: 'Courses'
      });
    }
    return getConfig().SITE_NAME || 'Learning Platform';
  };

  // Map menu items to include icons
  var getIconForMenuItem = function getIconForMenuItem(item, index) {
    var iconMap = {
      'dashboard': 'layout-dashboard',
      'courses': 'book-open',
      'programs': 'route',
      'home': 'home'
    };

    // Try to match by href
    var href = item.href || '';
    if (href.includes('dashboard')) return 'layout-dashboard';
    if (href.includes('courses')) return 'book-open';
    if (href.includes('programs') || href.includes('learning')) return 'route';

    // Default icons based on position
    var defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route', 'bot'];
    return defaultIcons[index] || 'circle';
  };

  // Map user menu items to include icons
  var getIconForUserMenuItem = function getIconForUserMenuItem(item) {
    var href = item.href || '';
    var content = (item.content || '').toLowerCase();
    if (href.includes('dashboard') || content.includes('dashboard')) return 'gauge';
    if (href.includes('profile') || content.includes('profile')) return 'user';
    if (href.includes('account') || href.includes('settings') || content.includes('account')) return 'settings';
    if (href.includes('order') || content.includes('order')) return 'shopping-bag';
    if (href.includes('logout') || content.includes('logout') || content.includes('sign out')) return 'log-out';
    return 'circle';
  };

  // Determine which logo to show
  var getLogoSrc = function getLogoSrc() {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    // Use appropriate logo based on dark mode
    return logo || (darkMode ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd' : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(sidebarCollapsed ? 'collapsed' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("a", {
    href: logoDestination
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    key: "".concat(sidebarCollapsed, "-").concat(darkMode),
    src: getLogoSrc(),
    alt: logoAltText
  })))), /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, mainMenu && mainMenu.length > 0 ? mainMenu.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "nav-link ".concat(window.location.pathname === item.href ? 'active' : '')
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": getIconForMenuItem(item, index)
    }), /*#__PURE__*/React.createElement("span", null, item.content)));
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/"),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "home"
  }), /*#__PURE__*/React.createElement("span", null, "Home"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    className: "nav-link active"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "layout-dashboard"
  }), /*#__PURE__*/React.createElement("span", null, "My Dashboard"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/courses"),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "book-open"
  }), /*#__PURE__*/React.createElement("span", null, "Courses")))), secondaryMenu && secondaryMenu.length > 0 && secondaryMenu.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: "secondary-".concat(index),
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "nav-link"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": getIconForMenuItem(item, index + mainMenu.length)
    }), /*#__PURE__*/React.createElement("span", null, item.content)));
  })), loggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    },
    role: "button",
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        setUserMenuOpen(!userMenuOpen);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: username
  }) : /*#__PURE__*/React.createElement("span", null, username ? username.split(' ').map(function (n) {
    return n[0];
  }).join('').toUpperCase() : 'U')), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, username || 'User')), /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenu && userMenu.length > 0 ? userMenu.map(function (section, sectionIndex) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: sectionIndex
    }, section.items && section.items.map(function (item, itemIndex) {
      return /*#__PURE__*/React.createElement("li", {
        key: itemIndex,
        className: "nav-item"
      }, /*#__PURE__*/React.createElement("a", {
        href: item.href,
        className: "nav-link"
      }, /*#__PURE__*/React.createElement("i", {
        "data-lucide": getIconForUserMenuItem(item)
      }), /*#__PURE__*/React.createElement("span", null, item.content)));
    }));
  }) : /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: getConfig().LOGOUT_URL,
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "log-out"
  }), /*#__PURE__*/React.createElement("span", null, "Logout"))))) : /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, loggedOutItems && loggedOutItems.length > 0 ? loggedOutItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("a", {
      key: index,
      href: item.href,
      className: "nav-link logged-out-link"
    }, item.content);
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: getConfig().LOGIN_URL,
    className: "nav-link logged-out-link"
  }, "Login"), /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/register"),
    className: "nav-link logged-out-link"
  }, "Register")))), /*#__PURE__*/React.createElement("header", {
    className: "main-header",
    style: {
      marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: toggleSidebar,
    "aria-label": "Toggle sidebar"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, getPageTitle()), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    title: "Toggle dark mode",
    "aria-label": darkMode ? "Switch to light mode" : "Switch to dark mode"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? "sun" : "moon"
  }))));
};
export var desktopHeaderDataShape = {
  mainMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  secondaryMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  userMenu: desktopUserMenuDataShape,
  loggedOutItems: desktopLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool
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
  loggedIn: desktopHeaderDataShape.loggedIn
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
  loggedIn: false
};
export default DesktopHeader;
//# sourceMappingURL=DesktopHeader.js.map