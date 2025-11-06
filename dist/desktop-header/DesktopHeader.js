function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// DesktopHeader.jsx
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import { initLucideIcons } from '../../utils/iconUtils';
import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import Sidebar from './Sidebar';
import './Sidebar.css'; // keep your sidebar CSS

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
    isCollapsed = _useState2[0],
    setIsCollapsed = _useState2[1];
  var _useState3 = useState('home'),
    _useState4 = _slicedToArray(_useState3, 2),
    currentPage = _useState4[0],
    setCurrentPage = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    userMenuOpen = _useState6[0],
    setUserMenuOpen = _useState6[1];
  var _useState7 = useState(false),
    _useState8 = _slicedToArray(_useState7, 2),
    darkMode = _useState8[0],
    setDarkMode = _useState8[1];
  useEffect(function () {
    initLucideIcons();
  }, [isCollapsed, darkMode]);
  var toggleSidebar = function toggleSidebar() {
    return setIsCollapsed(function (prev) {
      return !prev;
    });
  };
  var toggleDarkMode = function toggleDarkMode() {
    var next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };
  var renderMainMenu = function renderMainMenu() {
    return /*#__PURE__*/React.createElement(DesktopMainMenuSlot, {
      menu: mainMenu
    });
  };
  var renderSecondaryMenu = function renderSecondaryMenu() {
    return /*#__PURE__*/React.createElement(DesktopSecondaryMenuSlot, {
      menu: secondaryMenu
    });
  };
  var renderLoggedOutItems = function renderLoggedOutItems() {
    return (loggedOutItems === null || loggedOutItems === void 0 ? void 0 : loggedOutItems.length) > 0 ? /*#__PURE__*/React.createElement("nav", {
      "aria-label": intl.formatMessage(messages['header.label.secondary.nav']),
      className: "nav secondary-menu-container align-items-center ml-auto"
    }, loggedOutItems.map(function (item, idx) {
      return /*#__PURE__*/React.createElement("a", {
        key: idx,
        href: item.href,
        className: "nav-link"
      }, item.content);
    })) : null;
  };
  var logoClasses = getConfig().AUTHN_MINIMAL_HEADER ? 'mw-100' : null;
  var sidebarWidth = isCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';

  // ---- INLINE STYLES ----
  var mainHeaderStyle = {
    height: 'var(--header-height)',
    backgroundColor: 'var(--light-bg)',
    borderBottom: '1px solid var(--border-color)',
    display: 'flex',
    alignItems: 'center',
    padding: '0 30px',
    gap: '20px',
    position: 'sticky',
    top: 0,
    zIndex: 900
  };
  var toggleButtonStyle = {
    background: 'none',
    border: 'none',
    cursor: 'pointer',
    padding: '8px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    color: 'var(--text-primary)',
    transition: 'all 0.2s ease'
  };
  var pageTitleStyle = {
    fontSize: '24px',
    fontWeight: 600,
    color: 'var(--text-primary)',
    margin: 0,
    flex: 1
  };
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex',
      minHeight: '100vh'
    }
  }, /*#__PURE__*/React.createElement(Sidebar, {
    isCollapsed: isCollapsed,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    userMenuOpen: userMenuOpen,
    setUserMenuOpen: setUserMenuOpen,
    darkMode: darkMode,
    avatar: avatar,
    username: username,
    userMenu: userMenu,
    loggedIn: loggedIn
  }), /*#__PURE__*/React.createElement("div", {
    className: "site-header-desktop-container",
    style: {
      flex: 1,
      marginLeft: "calc(".concat(sidebarWidth, ")"),
      transition: 'margin-left 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("header", {
    style: mainHeaderStyle
  }, /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: toggleButtonStyle,
    onClick: toggleSidebar,
    "aria-label": isCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
    title: isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": isCollapsed ? 'menu' : 'chevron-left',
    style: {
      width: 24,
      height: 24
    }
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    style: toggleButtonStyle,
    onClick: toggleDarkMode,
    "aria-label": "Toggle dark mode",
    title: darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon',
    style: {
      width: 24,
      height: 24
    }
  })), /*#__PURE__*/React.createElement("h1", {
    style: pageTitleStyle
  }, "Dashboard"), /*#__PURE__*/React.createElement("div", {
    style: {
      marginLeft: 'auto',
      display: 'flex',
      alignItems: 'center',
      gap: '16px'
    }
  }, loggedIn ? renderSecondaryMenu() : renderLoggedOutItems())), /*#__PURE__*/React.createElement("main", {
    id: "main",
    style: {
      padding: '20px'
    }
  }, /*#__PURE__*/React.createElement("p", null, "Your main content goes here..."))));
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
  loggedIn: PropTypes.bool
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