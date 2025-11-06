function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { initLucideIcons } from '../../utils/iconUtils';
import './Sidebar.css';

/**
 * Sidebar navigation + user menu
 */
var Sidebar = function Sidebar(_ref) {
  var isCollapsed = _ref.isCollapsed,
    darkMode = _ref.darkMode,
    authenticatedUser = _ref.authenticatedUser;
  var _useState = useState('home'),
    _useState2 = _slicedToArray(_useState, 2),
    currentPage = _useState2[0],
    setCurrentPage = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    userMenuOpen = _useState4[0],
    setUserMenuOpen = _useState4[1];
  var userName = (authenticatedUser === null || authenticatedUser === void 0 ? void 0 : authenticatedUser.username) || 'Guest';
  var menuItems = [{
    id: 'home',
    icon: 'home',
    label: 'Home'
  }, {
    id: 'dashboard',
    icon: 'layout-dashboard',
    label: 'My Dashboard'
  }, {
    id: 'courses',
    icon: 'book-open',
    label: 'Courses'
  }, {
    id: 'learning-paths',
    icon: 'route',
    label: 'Learning Paths'
  }, {
    id: 'ai-studio',
    icon: 'bot',
    label: 'AI Studio'
  }];
  var userMenuItems = [{
    id: 'profile',
    icon: 'user',
    label: 'Profile'
  }, {
    id: 'account',
    icon: 'settings',
    label: 'Account'
  }, {
    id: 'signout',
    icon: 'log-out',
    label: 'Sign Out'
  }];
  useEffect(function () {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);
  var config = getConfig();
  var handleMenuClick = function handleMenuClick(itemId) {
    switch (itemId) {
      case 'home':
      case 'dashboard':
        window.location.href = "".concat(config.LMS_BASE_URL, "/dashboard");
        break;
      case 'courses':
        window.location.href = "".concat(config.LMS_BASE_URL, "/courses");
        break;
      case 'learning-paths':
        window.location.href = "".concat(config.LMS_BASE_URL, "/learning-paths");
        break;
      case 'ai-studio':
        window.location.href = "".concat(config.LMS_BASE_URL, "/ai-studio");
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };
  var handleUserMenuClick = function handleUserMenuClick(itemId) {
    switch (itemId) {
      case 'profile':
        window.location.href = "".concat(config.ACCOUNT_PROFILE_URL, "/u/").concat(userName);
        break;
      case 'account':
        window.location.href = config.ACCOUNT_SETTINGS_URL;
        break;
      case 'signout':
        window.location.href = config.LOGOUT_URL;
        break;
      default:
        console.log('Unknown user menu item');
    }
  };
  var getLogoSrc = function getLogoSrc() {
    if (isCollapsed) {
      return 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return darkMode ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd' : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6';
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(isCollapsed ? 'collapsed' : 'open')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    key: "".concat(isCollapsed, "-").concat(darkMode),
    src: getLogoSrc(),
    alt: "Striverra Learn"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, menuItems.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link ".concat(currentPage === item.id ? 'active' : ''),
      onClick: function onClick() {
        return handleMenuClick(item.id);
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  })), authenticatedUser && /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, userName.split(' ').map(function (n) {
    return n[0];
  }).join('')), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, userName)), /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenuItems.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      onClick: function onClick() {
        return handleUserMenuClick(item.id);
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  }))));
};
Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  authenticatedUser: PropTypes.object
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map