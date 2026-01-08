function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
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
import { initLucideIcons } from '../utils/iconUtils';
import { desktopLoggedOutItemsDataShape } from './DesktopLoggedOutItems';
import { desktopHeaderMainOrSecondaryMenuDataShape } from './DesktopHeaderMainOrSecondaryMenu';
import { desktopUserMenuDataShape } from './DesktopHeaderUserMenu';
import messages from '../Header.messages';
import logoDark from '../assets/logo-dark.png';
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
  var iconStyle = {
    width: '20px',
    height: '20px',
    flexShrink: 0
  };
  var iconStyles = {
    width: '24px',
    height: '24px'
  };
  useEffect(function () {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode]);

  // -------------------------------------------------------------
  // 🔥 DARK MODE SYNC: check cookie FIRST and APPLY theme
  // -------------------------------------------------------------
  useEffect(function () {
    var getCookie = function getCookie(name) {
      var _document$cookie$spli;
      return (_document$cookie$spli = document.cookie.split('; ').find(function (row) {
        return row.startsWith(name + '=');
      })) === null || _document$cookie$spli === void 0 ? void 0 : _document$cookie$spli.split('=')[1];
    };
    var checkDarkMode = function checkDarkMode() {
      var html = document.documentElement;
      var body = document.body;
      var cookieTheme = getCookie('indigo-toggle-dark');
      var mfeTheme = localStorage.getItem('theme');
      var paragonTheme = localStorage.getItem('paragon.theme.variant');
      var legacyTheme = localStorage.getItem('hexis-theme');

      // --------------------------
      // 1️⃣ COOKIE TAKES PRIORITY
      // --------------------------
      if (cookieTheme === 'dark' || cookieTheme === 'light') {
        var _isDark = cookieTheme === 'dark';
        var currentTheme = html.getAttribute('data-theme');
        if (_isDark && currentTheme === 'dark' || !_isDark && currentTheme === 'light') {
          setDarkMode(_isDark);
          return;
        }
        if (_isDark) {
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
        setDarkMode(_isDark);
        return; // cookie decides theme completely
      }

      // --------------------------
      // 2️⃣ FALLBACK: localStorage
      // --------------------------
      var isDark = legacyTheme === 'dark' || mfeTheme === 'dark' || paragonTheme === 'dark';
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
  useEffect(function () {
    var mainContent = document.querySelector('#main');
    if (mainContent) {
      mainContent.style.marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
      mainContent.style.transition = 'margin-left 0.3s ease';
    }
  }, [sidebarCollapsed]);

  // -------------------------------------------------------------
  // 🔥 Toggle Dark Mode (MFE → Legacy sync)
  // -------------------------------------------------------------
  var toggleDarkMode = function toggleDarkMode() {
    var html = document.documentElement;
    var body = document.body;
    var newDarkMode = !darkMode;
    var themeValue = newDarkMode ? 'dark' : 'light';

    // Cross-domain cookie
    document.cookie = "indigo-toggle-dark=".concat(themeValue, ";path=/;domain=.striverra.com;max-age=7776000;Secure;SameSite=None");

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
  var toggleSidebar = function toggleSidebar() {
    return setSidebarCollapsed(!sidebarCollapsed);
  };
  var getPageTitle = function getPageTitle() {
    var path = window.location.pathname;
    if (path.includes('dashboard')) return intl.formatMessage({
      id: 'header.title.dashboard',
      defaultMessage: 'My Dashboard'
    });
    if (path.includes('courses')) return intl.formatMessage({
      id: 'header.title.courses',
      defaultMessage: 'Courses'
    });
    if (path.includes('programs')) return intl.formatMessage({
      id: 'header.title.programs',
      defaultMessage: 'Learning Paths'
    });
    return getConfig().SITE_NAME || 'Learning Platform';
  };
  var getIconForMenuItem = function getIconForMenuItem(item, index) {
    var href = (item.href || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    if (content.includes('home') || href.endsWith('/') || href.endsWith('/home')) return 'home';
    if (content.includes('dashboard') || href.includes('dashboard')) return 'layout-dashboard';
    if (content.includes('course') || href.includes('/courses')) return 'book-open';
    if (content.includes('program') || content.includes('learning path') || href.includes('program')) return 'route';
    var defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route'];
    return defaultIcons[index] || 'circle';
  };
  var getIconForUserMenuItem = function getIconForUserMenuItem(item) {
    var href = (item.href || '').toLowerCase();
    var content = (item.content || '').toLowerCase();
    if (content.includes('dashboard') || href.includes('dashboard')) return 'gauge';
    if (content.includes('analytic') || href.includes('analytic')) return 'bar-chart-3';
    if (content.includes('profile') || href.includes('profile')) return 'user';
    if (content.includes('account') || content.includes('setting') || href.includes('account') || href.includes('setting')) return 'settings';
    if (content.includes('order') || content.includes('history') || href.includes('order')) return 'shopping-bag';
    if (content.includes('logout') || content.includes('sign out') || href.includes('logout')) return 'log-out';
    return 'circle';
  };
  var getLogoSrc = function getLogoSrc() {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return logo || (darkMode ? logoDark : logoDark);
  };
  var buildCorrectMenu = function buildCorrectMenu() {
    var _getConfig$FEATURES$E, _getConfig$FEATURES;
    var baseUrl = getConfig().LMS_BASE_URL;
    var discoveryEnabled = (_getConfig$FEATURES$E = (_getConfig$FEATURES = getConfig().FEATURES) === null || _getConfig$FEATURES === void 0 ? void 0 : _getConfig$FEATURES.ENABLE_DISCOVERY) !== null && _getConfig$FEATURES$E !== void 0 ? _getConfig$FEATURES$E : false;
    var menuItems = [];

    // ✅ HOME → {LMS_BASE_URL}/home/
    menuItems.push({
      href: "".concat(baseUrl, "/home/"),
      content: intl.formatMessage({
        id: 'header.links.home',
        defaultMessage: 'Home'
      }),
      icon: 'home'
    });
    menuItems.push({
      href: "".concat(baseUrl, "/dashboard"),
      content: intl.formatMessage({
        id: 'header.links.my.dashboard',
        defaultMessage: 'My Dashboard'
      }),
      icon: 'layout-dashboard'
    });
    menuItems.push({
      href: "".concat(baseUrl, "/courses"),
      content: intl.formatMessage({
        id: 'header.links.courses',
        defaultMessage: 'Courses'
      }),
      icon: 'book-open'
    });
    if (discoveryEnabled) {
      menuItems.push({
        href: "".concat(baseUrl, "/programs"),
        content: intl.formatMessage({
          id: 'header.links.programs',
          defaultMessage: 'Learning Paths'
        }),
        icon: 'route'
      });
    }
    var processedItems = new Set(['/', '/dashboard', '/courses', '/programs', '/home/']);
    if (mainMenu && mainMenu.length > 0) {
      mainMenu.forEach(function (item) {
        var href = item.href || '';
        var content = (item.content || '').toLowerCase();
        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) return;
        var cleanHref = href.replace(baseUrl, '').toLowerCase();
        if (!processedItems.has(cleanHref) && !cleanHref.endsWith('/') && !cleanHref.endsWith('/home')) {
          menuItems.push(_objectSpread(_objectSpread({}, item), {}, {
            icon: getIconForMenuItem(item, menuItems.length)
          }));
          processedItems.add(cleanHref);
        }
      });
    }
    if (secondaryMenu && secondaryMenu.length > 0) {
      secondaryMenu.forEach(function (item) {
        var href = item.href || '';
        var content = (item.content || '').toLowerCase();
        if (content.includes('ai') || content.includes('studio') || href.includes('ai-studio')) return;
        var cleanHref = href.replace(baseUrl, '').toLowerCase();
        if (!processedItems.has(cleanHref)) {
          menuItems.push(_objectSpread(_objectSpread({}, item), {}, {
            icon: getIconForMenuItem(item, menuItems.length)
          }));
          processedItems.add(cleanHref);
        }
      });
    }
    return menuItems;
  };
  var completeMenu = buildCorrectMenu();
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
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, completeMenu.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "nav-link ".concat(window.location.pathname === item.href ? 'active' : '')
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon || getIconForMenuItem(item, index),
      style: iconStyle
    }), /*#__PURE__*/React.createElement("span", null, item.content)));
  }))), loggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    },
    role: "button",
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter' || e.key === ' ') setUserMenuOpen(!userMenuOpen);
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
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down',
    style: iconStyle
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
        "data-lucide": getIconForUserMenuItem(item),
        style: iconStyle
      }), /*#__PURE__*/React.createElement("span", null, item.content)));
    }));
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "gauge",
    style: iconStyle
  }), /*#__PURE__*/React.createElement("span", null, "Dashboard"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().ACCOUNT_PROFILE_URL, "/u/").concat(username),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user",
    style: iconStyle
  }), /*#__PURE__*/React.createElement("span", null, "Profile"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: getConfig().ACCOUNT_SETTINGS_URL,
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "settings",
    style: iconStyle
  }), /*#__PURE__*/React.createElement("span", null, "Account"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: getConfig().LOGOUT_URL,
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "log-out",
    style: iconStyle
  }), /*#__PURE__*/React.createElement("span", null, "Sign Out")))))) : /*#__PURE__*/React.createElement("div", {
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
    "data-lucide": "menu",
    style: iconStyles
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, getPageTitle()), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    title: "Toggle dark mode",
    "aria-label": darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon',
    style: iconStyle
  }))));
};

// Prop types
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