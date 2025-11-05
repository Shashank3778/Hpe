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
import React, { useContext, useMemo, useState } from 'react';
import Responsive from 'react-responsive';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { AppContext } from '@edx/frontend-platform/react';
import { APP_CONFIG_INITIALIZED, ensureConfig, mergeConfig, getConfig, subscribe } from '@edx/frontend-platform';
import messages from './Header.messages';

// 🧩 Direct icon components (no utils needed)
import { Menu, Moon, Sun } from 'lucide-react';

/**
 * ✅ Configuration Setup (required by Open edX)
 */
ensureConfig(['LMS_BASE_URL', 'LOGOUT_URL', 'LOGIN_URL', 'SITE_NAME', 'LOGO_URL', 'ORDER_HISTORY_URL', 'ACCOUNT_PROFILE_URL', 'ACCOUNT_SETTINGS_URL'], 'Header component');
subscribe(APP_CONFIG_INITIALIZED, function () {
  mergeConfig({
    AUTHN_MINIMAL_HEADER: !!process.env.AUTHN_MINIMAL_HEADER
  }, 'Header additional config');
});

/**
 * Utility component for building menu links
 */
function MenuLinks(_ref) {
  var _items$;
  var items = _ref.items;
  if (!items || items.length === 0) return null;
  var flattened = (_items$ = items[0]) !== null && _items$ !== void 0 && _items$.items && items[0].heading !== undefined ? items[0].items : items;
  return /*#__PURE__*/React.createElement("nav", {
    className: "header-nav",
    "aria-label": "Primary"
  }, flattened.filter(function (i) {
    return (i === null || i === void 0 ? void 0 : i.type) === 'item';
  }).map(function (i, idx) {
    return /*#__PURE__*/React.createElement("a", {
      key: idx,
      href: i.href,
      "aria-current": i.isActive ? 'page' : undefined
    }, i.content);
  }));
}

/**
 * 🎨 Full-featured custom header using lucide-react
 */
var Header = function Header(_ref2) {
  var mainMenuItems = _ref2.mainMenuItems,
    secondaryMenuItems = _ref2.secondaryMenuItems,
    userMenuItems = _ref2.userMenuItems,
    toggleSidebar = _ref2.toggleSidebar;
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser,
    config = _useContext.config;
  var intl = useIntl();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    darkMode = _useState2[0],
    setDarkMode = _useState2[1];
  var toggleDarkMode = function toggleDarkMode() {
    var next = !darkMode;
    setDarkMode(next);
    document.documentElement.classList.toggle('dark-mode', next);
  };

  /** Default menus (same as original Open edX header) */
  var defaultMainMenu = useMemo(function () {
    return [{
      type: 'item',
      href: "".concat(config.LMS_BASE_URL, "/dashboard"),
      content: intl.formatMessage(messages['header.links.courses'])
    }];
  }, [config.LMS_BASE_URL, intl]);
  var defaultUserMenu = useMemo(function () {
    if (!authenticatedUser) return [];
    return [{
      heading: '',
      items: [{
        type: 'item',
        href: "".concat(config.LMS_BASE_URL, "/dashboard"),
        content: intl.formatMessage(messages['header.user.menu.dashboard'])
      }, {
        type: 'item',
        href: "".concat(config.ACCOUNT_PROFILE_URL, "/u/").concat(authenticatedUser.username),
        content: intl.formatMessage(messages['header.user.menu.profile'])
      }, {
        type: 'item',
        href: config.ACCOUNT_SETTINGS_URL,
        content: intl.formatMessage(messages['header.user.menu.account.settings'])
      }].concat(_toConsumableArray(config.ORDER_HISTORY_URL ? [{
        type: 'item',
        href: config.ORDER_HISTORY_URL,
        content: intl.formatMessage(messages['header.user.menu.order.history'])
      }] : []), [{
        type: 'item',
        href: config.LOGOUT_URL,
        content: intl.formatMessage(messages['header.user.menu.logout'])
      }])
    }];
  }, [authenticatedUser, config, intl]);
  var loggedOutItems = useMemo(function () {
    return [{
      type: 'item',
      href: config.LOGIN_URL,
      content: intl.formatMessage(messages['header.user.menu.login'])
    }, {
      type: 'item',
      href: "".concat(config.LMS_BASE_URL, "/register"),
      content: intl.formatMessage(messages['header.user.menu.register'])
    }];
  }, [config, intl]);
  var mainMenu = getConfig().AUTHN_MINIMAL_HEADER ? [] : mainMenuItems || defaultMainMenu;
  var secondaryMenu = getConfig().AUTHN_MINIMAL_HEADER ? [] : secondaryMenuItems || [];
  var userMenu = authenticatedUser === null ? [] : getConfig().AUTHN_MINIMAL_HEADER ? [] : userMenuItems || defaultUserMenu;
  var loggedIn = authenticatedUser !== null;
  var username = loggedIn ? authenticatedUser.username : null;
  var headerProps = {
    logo: config.LOGO_URL,
    logoAltText: config.SITE_NAME,
    logoDestination: "".concat(config.LMS_BASE_URL, "/dashboard"),
    loggedIn: loggedIn,
    username: username,
    avatar: loggedIn ? authenticatedUser.avatar : null,
    mainMenu: mainMenu,
    secondaryMenu: secondaryMenu,
    userMenu: userMenu,
    loggedOutItems: getConfig().AUTHN_MINIMAL_HEADER ? [] : loggedOutItems
  };

  /** Authentication area */
  var AuthArea = function AuthArea() {
    return loggedIn ? /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("span", {
      className: "user-name"
    }, intl.formatMessage({
      id: 'header.user.greeting',
      defaultMessage: 'Hi,'
    }), " ", username), /*#__PURE__*/React.createElement("a", {
      href: config.LOGOUT_URL
    }, intl.formatMessage(messages['header.user.menu.logout']))) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
      href: config.LOGIN_URL
    }, intl.formatMessage(messages['header.user.menu.login'])), /*#__PURE__*/React.createElement("a", {
      href: "".concat(config.LMS_BASE_URL, "/register")
    }, intl.formatMessage(messages['header.user.menu.register'])));
  };

  /** Final visual layout */
  var CustomBar = function CustomBar() {
    return /*#__PURE__*/React.createElement("header", {
      className: "main-header ".concat(darkMode ? 'dark' : '')
    }, /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "header-toggle-btn",
      onClick: toggleSidebar,
      "aria-label": "Toggle sidebar"
    }, /*#__PURE__*/React.createElement(Menu, {
      size: 24
    })), /*#__PURE__*/React.createElement("img", {
      className: "header-logo",
      src: headerProps.logo,
      alt: headerProps.logoAltText,
      onClick: function onClick() {
        return window.location.href = headerProps.logoDestination;
      }
    }), /*#__PURE__*/React.createElement(MenuLinks, {
      items: headerProps.mainMenu
    }), /*#__PURE__*/React.createElement(MenuLinks, {
      items: headerProps.secondaryMenu
    }), /*#__PURE__*/React.createElement("div", {
      className: "header-right"
    }, /*#__PURE__*/React.createElement(AuthArea, null), /*#__PURE__*/React.createElement("button", {
      type: "button",
      className: "dark-mode-toggle",
      onClick: toggleDarkMode,
      "aria-label": "Toggle dark mode",
      title: darkMode ? 'Switch to light mode' : 'Switch to dark mode'
    }, darkMode ? /*#__PURE__*/React.createElement(Sun, {
      size: 22
    }) : /*#__PURE__*/React.createElement(Moon, {
      size: 22
    }))));
  };
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(Responsive, {
    maxWidth: 769
  }, /*#__PURE__*/React.createElement(CustomBar, null)), /*#__PURE__*/React.createElement(Responsive, {
    minWidth: 769
  }, /*#__PURE__*/React.createElement(CustomBar, null)));
};
Header.defaultProps = {
  mainMenuItems: null,
  secondaryMenuItems: null,
  userMenuItems: null,
  toggleSidebar: function toggleSidebar() {}
};
Header.propTypes = {
  mainMenuItems: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  secondaryMenuItems: PropTypes.oneOfType([PropTypes.node, PropTypes.array]),
  userMenuItems: PropTypes.arrayOf(PropTypes.shape({
    heading: PropTypes.string,
    items: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.oneOf(['item', 'menu']),
      href: PropTypes.string,
      content: PropTypes.string,
      isActive: PropTypes.bool
    }))
  })),
  toggleSidebar: PropTypes.func
};
export default Header;