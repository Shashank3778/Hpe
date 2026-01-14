function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
function _regenerator() { /*! regenerator-runtime -- Copyright (c) 2014-present, Facebook, Inc. -- license (MIT): https://github.com/babel/babel/blob/main/packages/babel-helpers/LICENSE */ var e, t, r = "function" == typeof Symbol ? Symbol : {}, n = r.iterator || "@@iterator", o = r.toStringTag || "@@toStringTag"; function i(r, n, o, i) { var c = n && n.prototype instanceof Generator ? n : Generator, u = Object.create(c.prototype); return _regeneratorDefine2(u, "_invoke", function (r, n, o) { var i, c, u, f = 0, p = o || [], y = !1, G = { p: 0, n: 0, v: e, a: d, f: d.bind(e, 4), d: function d(t, r) { return i = t, c = 0, u = e, G.n = r, a; } }; function d(r, n) { for (c = r, u = n, t = 0; !y && f && !o && t < p.length; t++) { var o, i = p[t], d = G.p, l = i[2]; r > 3 ? (o = l === n) && (u = i[(c = i[4]) ? 5 : (c = 3, 3)], i[4] = i[5] = e) : i[0] <= d && ((o = r < 2 && d < i[1]) ? (c = 0, G.v = n, G.n = i[1]) : d < l && (o = r < 3 || i[0] > n || n > l) && (i[4] = r, i[5] = n, G.n = l, c = 0)); } if (o || r > 1) return a; throw y = !0, n; } return function (o, p, l) { if (f > 1) throw TypeError("Generator is already running"); for (y && 1 === p && d(p, l), c = p, u = l; (t = c < 2 ? e : u) || !y;) { i || (c ? c < 3 ? (c > 1 && (G.n = -1), d(c, u)) : G.n = u : G.v = u); try { if (f = 2, i) { if (c || (o = "next"), t = i[o]) { if (!(t = t.call(i, u))) throw TypeError("iterator result is not an object"); if (!t.done) return t; u = t.value, c < 2 && (c = 0); } else 1 === c && (t = i["return"]) && t.call(i), c < 2 && (u = TypeError("The iterator does not provide a '" + o + "' method"), c = 1); i = e; } else if ((t = (y = G.n < 0) ? u : r.call(n, G)) !== a) break; } catch (t) { i = e, c = 1, u = t; } finally { f = 1; } } return { value: t, done: y }; }; }(r, o, i), !0), u; } var a = {}; function Generator() {} function GeneratorFunction() {} function GeneratorFunctionPrototype() {} t = Object.getPrototypeOf; var c = [][n] ? t(t([][n]())) : (_regeneratorDefine2(t = {}, n, function () { return this; }), t), u = GeneratorFunctionPrototype.prototype = Generator.prototype = Object.create(c); function f(e) { return Object.setPrototypeOf ? Object.setPrototypeOf(e, GeneratorFunctionPrototype) : (e.__proto__ = GeneratorFunctionPrototype, _regeneratorDefine2(e, o, "GeneratorFunction")), e.prototype = Object.create(u), e; } return GeneratorFunction.prototype = GeneratorFunctionPrototype, _regeneratorDefine2(u, "constructor", GeneratorFunctionPrototype), _regeneratorDefine2(GeneratorFunctionPrototype, "constructor", GeneratorFunction), GeneratorFunction.displayName = "GeneratorFunction", _regeneratorDefine2(GeneratorFunctionPrototype, o, "GeneratorFunction"), _regeneratorDefine2(u), _regeneratorDefine2(u, o, "Generator"), _regeneratorDefine2(u, n, function () { return this; }), _regeneratorDefine2(u, "toString", function () { return "[object Generator]"; }), (_regenerator = function _regenerator() { return { w: i, m: f }; })(); }
function _regeneratorDefine2(e, r, n, t) { var i = Object.defineProperty; try { i({}, "", {}); } catch (e) { i = 0; } _regeneratorDefine2 = function _regeneratorDefine(e, r, n, t) { function o(r, n) { _regeneratorDefine2(e, r, function (e) { return this._invoke(r, n, e); }); } r ? i ? i(e, r, { value: n, enumerable: !t, configurable: !t, writable: !t }) : e[r] = n : (o("next", 0), o("throw", 1), o("return", 2)); }, _regeneratorDefine2(e, r, n, t); }
function asyncGeneratorStep(n, t, e, r, o, a, c) { try { var i = n[a](c), u = i.value; } catch (n) { return void e(n); } i.done ? t(u) : Promise.resolve(u).then(r, o); }
function _asyncToGenerator(n) { return function () { var t = this, e = arguments; return new Promise(function (r, o) { var a = n.apply(t, e); function _next(n) { asyncGeneratorStep(a, r, o, _next, _throw, "next", n); } function _throw(n) { asyncGeneratorStep(a, r, o, _next, _throw, "throw", n); } _next(void 0); }); }; }
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
  var _useState7 = useState(''),
    _useState8 = _slicedToArray(_useState7, 2),
    userFullName = _useState8[0],
    setUserFullName = _useState8[1];
  var _useState9 = useState('U'),
    _useState0 = _slicedToArray(_useState9, 2),
    userInitials = _useState0[0],
    setUserInitials = _useState0[1];
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

  // ✅ Fetch user's full name from Open edX API
  useEffect(function () {
    var fetchUserData = /*#__PURE__*/function () {
      var _ref2 = _asyncToGenerator(/*#__PURE__*/_regenerator().m(function _callee() {
        var baseUrl, accountApiUrl, response, userData, fullName, nameParts, initials, _t;
        return _regenerator().w(function (_context) {
          while (1) switch (_context.p = _context.n) {
            case 0:
              if (!(!loggedIn || !username)) {
                _context.n = 1;
                break;
              }
              setUserFullName('User');
              setUserInitials('U');
              return _context.a(2);
            case 1:
              _context.p = 1;
              baseUrl = getConfig().LMS_BASE_URL;
              accountApiUrl = "".concat(baseUrl, "/api/user/v1/accounts/").concat(username);
              _context.n = 2;
              return fetch(accountApiUrl, {
                credentials: 'include',
                headers: {
                  'Accept': 'application/json'
                }
              });
            case 2:
              response = _context.v;
              if (!response.ok) {
                _context.n = 4;
                break;
              }
              _context.n = 3;
              return response.json();
            case 3:
              userData = _context.v;
              fullName = userData.name || username;
              setUserFullName(fullName);

              // Calculate initials from full name
              nameParts = fullName.trim().split(/\s+/).filter(function (part) {
                return part.length > 0;
              });
              initials = 'U';
              if (nameParts.length === 0) {
                initials = 'U';
              } else if (nameParts.length === 1) {
                // Only first name: take first letter
                initials = nameParts[0][0].toUpperCase();
              } else {
                // First name + Last name: take first letter of each
                initials = (nameParts[0][0] + nameParts[nameParts.length - 1][0]).toUpperCase();
              }
              setUserInitials(initials);
              _context.n = 5;
              break;
            case 4:
              setUserFullName(username);
              setUserInitials(username[0].toUpperCase());
            case 5:
              _context.n = 7;
              break;
            case 6:
              _context.p = 6;
              _t = _context.v;
              console.error('Error fetching user data:', _t);
              setUserFullName(username);
              setUserInitials(username[0].toUpperCase());
            case 7:
              return _context.a(2);
          }
        }, _callee, null, [[1, 6]]);
      }));
      return function fetchUserData() {
        return _ref2.apply(this, arguments);
      };
    }();
    fetchUserData();
  }, [username, loggedIn]);

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
    var baseUrl = getConfig().LMS_BASE_URL;
    var menuItems = [];

    // ✅ HOME → {LMS_BASE_URL}/home/
    menuItems.push({
      href: "".concat(baseUrl),
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

    // ✅ ALWAYS SHOW LEARNING PATHS
    menuItems.push({
      href: "".concat(baseUrl, "/ddashboard/programs/"),
      content: intl.formatMessage({
        id: 'header.links.programs',
        defaultMessage: 'Learning Paths'
      }),
      icon: 'route'
    });
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
    alt: userFullName || username
  }) : /*#__PURE__*/React.createElement("span", null, userInitials)), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, userFullName || username || 'User')), /*#__PURE__*/React.createElement("i", {
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