function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
// DesktopHeader.jsx
import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';
import DesktopMainMenuSlot from '../plugin-slots/DesktopMainMenuSlot';
import DesktopSecondaryMenuSlot from '../plugin-slots/DesktopSecondaryMenuSlot';
import Sidebar from './Sidebar'; // Make sure the path to Sidebar.jsx is correct
import '../index.scss';
import './Sidebar.css';
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

  // State for sidebar, current page, user menu, dark mode
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

  // Toggle sidebar collapse
  var toggleSidebar = function toggleSidebar() {
    return setIsCollapsed(!isCollapsed);
  };

  // Toggle dark mode
  var toggleDarkMode = function toggleDarkMode() {
    var next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };

  // Render main and secondary menus as before
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
    return loggedOutItems && loggedOutItems.length > 0 ? /*#__PURE__*/React.createElement("nav", {
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
  return /*#__PURE__*/React.createElement("div", {
    style: {
      display: 'flex'
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
      marginLeft: isCollapsed ? '80px' : '240px'
    }
  }, /*#__PURE__*/React.createElement("header", {
    className: "site-header-desktop ".concat(darkMode ? 'dark' : '')
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-skip sr-only sr-only-focusable",
    href: "#main"
  }, intl.formatMessage(messages['header.label.skip.nav'])), /*#__PURE__*/React.createElement("div", {
    className: "container-fluid ".concat(logoClasses)
  }, /*#__PURE__*/React.createElement("div", {
    className: "nav-container position-relative d-flex align-items-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: logoDestination,
    className: "logo-link"
  }, /*#__PURE__*/React.createElement("img", {
    src: logo,
    alt: logoAltText,
    className: "header-logo"
  })), /*#__PURE__*/React.createElement("nav", {
    "aria-label": intl.formatMessage(messages['header.label.main.nav']),
    className: "nav main-nav"
  }, renderMainMenu()), /*#__PURE__*/React.createElement("nav", {
    "aria-label": intl.formatMessage(messages['header.label.secondary.nav']),
    className: "nav secondary-menu-container align-items-center ml-auto"
  }, loggedIn ? renderSecondaryMenu() : renderLoggedOutItems()), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "header-toggle-btn",
    onClick: toggleSidebar,
    "aria-label": isCollapsed ? 'Expand sidebar' : 'Collapse sidebar',
    title: isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": isCollapsed ? 'menu' : 'chevron-left'
  })), /*#__PURE__*/React.createElement("button", {
    type: "button",
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    "aria-label": "Toggle dark mode",
    title: darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon'
  })))))));
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