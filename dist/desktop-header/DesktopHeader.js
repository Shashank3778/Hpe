function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
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
var DesktopHeader = function DesktopHeader(_ref) {
  var mainMenu = _ref.mainMenu,
    secondaryMenu = _ref.secondaryMenu,
    userMenu = _ref.userMenu,
    loggedOutItems = _ref.loggedOutItems,
    logo = _ref.logo,
    logoAltText = _ref.logoAltText,
    logoDestination = _ref.logoDestination,
    loggedIn = _ref.loggedIn;
  var intl = useIntl();
  var logoProps = {
    src: logo,
    alt: logoAltText,
    href: logoDestination
  };
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    darkMode = _useState4[0],
    setDarkMode = _useState4[1];
  useEffect(function () {
    initLucideIcons();
  }, [darkMode, sidebarOpen]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, " ", /*#__PURE__*/React.createElement(Sidebar, {
    isCollapsed: !sidebarOpen,
    darkMode: darkMode,
    loggedIn: loggedIn,
    userMenu: userMenu
  }), " ", /*#__PURE__*/React.createElement("header", {
    className: "main-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: function onClick() {
      return setSidebarOpen(!sidebarOpen);
    },
    "aria-label": "Toggle sidebar"
  }, " ", /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  }), " "), "```", /*#__PURE__*/React.createElement("div", {
    className: "header-center"
  }, /*#__PURE__*/React.createElement("a", {
    href: logoDestination,
    className: "logo-link"
  }, /*#__PURE__*/React.createElement(LogoSlot, logoProps)), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, intl.formatMessage(messages['header.links.courses']))), /*#__PURE__*/React.createElement("div", {
    className: "header-right"
  }, /*#__PURE__*/React.createElement("nav", {
    className: "main-nav"
  }, /*#__PURE__*/React.createElement(DesktopMainMenuSlot, {
    menu: mainMenu
  })), loggedIn ? /*#__PURE__*/React.createElement(DesktopSecondaryMenuSlot, {
    menu: secondaryMenu
  }) : /*#__PURE__*/React.createElement(DesktopLoggedOutItemsSlot, {
    items: loggedOutItems
  }), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: function onClick() {
      return setDarkMode(!darkMode);
    },
    title: "Toggle dark mode",
    "aria-label": darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon'
  })))));
};
DesktopHeader.propTypes = {
  mainMenu: PropTypes.array,
  secondaryMenu: PropTypes.array,
  userMenu: PropTypes.array,
  loggedOutItems: PropTypes.array,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
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
  loggedIn: false
};
export default DesktopHeader;
//# sourceMappingURL=DesktopHeader.js.map