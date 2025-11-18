function _toConsumableArray(r) { return _arrayWithoutHoles(r) || _iterableToArray(r) || _unsupportedIterableToArray(r) || _nonIterableSpread(); }
function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _iterableToArray(r) { if ("undefined" != typeof Symbol && null != r[Symbol.iterator] || null != r["@@iterator"]) return Array.from(r); }
function _arrayWithoutHoles(r) { if (Array.isArray(r)) return _arrayLikeToArray(r); }
function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useContext, useState, useEffect } from 'react';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { APP_CONFIG_INITIALIZED, ensureConfig, mergeConfig, getConfig, subscribe } from '@edx/frontend-platform';
import PropTypes from 'prop-types';
import CustomHeader from './CustomHeader';
import CustomSidebar from './CustomSidebar';
import './Header.css';
ensureConfig(['LMS_BASE_URL', 'LOGOUT_URL', 'LOGIN_URL', 'SITE_NAME', 'LOGO_URL', 'ORDER_HISTORY_URL', 'ACCOUNT_PROFILE_URL', 'ACCOUNT_SETTINGS_URL'], 'Header component');
subscribe(APP_CONFIG_INITIALIZED, function () {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER
  }, 'Header additional config');
});
var Header = function Header(_ref) {
  var mainMenuItems = _ref.mainMenuItems,
    secondaryMenuItems = _ref.secondaryMenuItems,
    userMenuItems = _ref.userMenuItems;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser,
    config = _useContext.config;
  var intl = useIntl();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarCollapsed = _useState2[0],
    setSidebarCollapsed = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    darkMode = _useState4[0],
    setDarkMode = _useState4[1];
  var _useState5 = useState('home'),
    _useState6 = _slicedToArray(_useState5, 2),
    currentPage = _useState6[0],
    setCurrentPage = _useState6[1];

  // Load theme state
  useEffect(function () {
    var savedDark = localStorage.getItem('darkMode') === 'true';
    setDarkMode(savedDark);
    if (savedDark) {
      document.body.classList.add('theme-dark');
      document.body.classList.remove('theme-light');
    } else {
      document.body.classList.add('theme-light');
      document.body.classList.remove('theme-dark');
    }
  }, []);
  var toggleDarkMode = function toggleDarkMode() {
    var newMode = !darkMode;
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
  var toggleSidebar = function toggleSidebar() {
    return setSidebarCollapsed(!sidebarCollapsed);
  };
  var defaultMainMenu = [{
    id: 'home',
    icon: 'home',
    label: 'Home',
    href: "".concat(config.LMS_BASE_URL, "/dashboard")
  }, {
    id: 'courses',
    icon: 'book-open',
    label: 'Courses',
    href: "".concat(config.LMS_BASE_URL, "/courses")
  }];
  var defaultUserMenu = authenticatedUser === null ? [] : [{
    id: 'profile',
    icon: 'user',
    label: 'Profile',
    href: "".concat(config.ACCOUNT_PROFILE_URL, "/u/").concat(authenticatedUser.username)
  }, {
    id: 'account',
    icon: 'settings',
    label: 'Account',
    href: config.ACCOUNT_SETTINGS_URL
  }].concat(_toConsumableArray(config.ORDER_HISTORY_URL ? [{
    id: 'orders',
    icon: 'shopping-bag',
    label: 'Orders',
    href: config.ORDER_HISTORY_URL
  }] : []), [{
    id: 'logout',
    icon: 'log-out',
    label: 'Logout',
    href: config.LOGOUT_URL
  }]);
  if (getConfig().AUTHN_MINIMAL_HEADER) return null;
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(CustomSidebar, {
    isCollapsed: sidebarCollapsed,
    currentPage: currentPage,
    setCurrentPage: setCurrentPage,
    darkMode: darkMode,
    mainMenu: mainMenuItems || defaultMainMenu,
    userMenu: userMenuItems || defaultUserMenu,
    loggedOutItems: [{
      id: 'login',
      label: 'Login',
      href: config.LOGIN_URL
    }, {
      id: 'register',
      label: 'Register',
      href: "".concat(config.LMS_BASE_URL, "/register")
    }],
    authenticatedUser: authenticatedUser,
    config: config,
    logoUrl: config.LOGO_URL,
    siteName: config.SITE_NAME
  }), /*#__PURE__*/React.createElement(CustomHeader, {
    title: "Dashboard",
    toggleSidebar: toggleSidebar,
    darkMode: darkMode,
    toggleDarkMode: toggleDarkMode,
    sidebarCollapsed: sidebarCollapsed
  }));
};
export default Header;
//# sourceMappingURL=Header.js.map