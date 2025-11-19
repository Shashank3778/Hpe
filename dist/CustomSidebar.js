function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './uitils/iconUtils';
var CustomSidebar = function CustomSidebar(_ref) {
  var isCollapsed = _ref.isCollapsed,
    currentPage = _ref.currentPage,
    setCurrentPage = _ref.setCurrentPage,
    darkMode = _ref.darkMode,
    mainMenu = _ref.mainMenu,
    userMenu = _ref.userMenu,
    loggedOutItems = _ref.loggedOutItems,
    authenticatedUser = _ref.authenticatedUser,
    config = _ref.config,
    logoUrl = _ref.logoUrl,
    siteName = _ref.siteName;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    userMenuOpen = _useState2[0],
    setUserMenuOpen = _useState2[1];
  useEffect(function () {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);
  var getLogoSrc = function getLogoSrc() {
    if (isCollapsed) {
      return logoUrl || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return logoUrl || (darkMode ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd' : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };
  var handleNavClick = function handleNavClick(item) {
    if (item.href) {
      window.location.href = item.href;
    } else {
      setCurrentPage(item.id);
    }
  };
  var handleUserMenuClick = function handleUserMenuClick(item) {
    if (item.id === 'signout') {
      window.location.href = item.href;
    } else if (item.href) {
      window.location.href = item.href;
    } else {
      setCurrentPage(item.id);
    }
    setUserMenuOpen(false);
  };
  var getUserInitials = function getUserInitials() {
    if (!authenticatedUser || !authenticatedUser.username) return 'U';
    return authenticatedUser.username.charAt(0).toUpperCase();
  };
  var getUserName = function getUserName() {
    if (!authenticatedUser) return 'Guest';
    return authenticatedUser.username || 'User';
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(isCollapsed ? 'collapsed' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    key: "".concat(isCollapsed, "-").concat(darkMode),
    src: getLogoSrc(),
    alt: siteName || 'Learning Platform',
    "data-testid": "img-logo"
  }))), /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, mainMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link ".concat(currentPage === item.id ? 'active' : ''),
      onClick: function onClick() {
        return handleNavClick(item);
      },
      "data-testid": "link-nav-".concat(item.id)
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  })), authenticatedUser ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    },
    "data-testid": "button-user-menu-toggle"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, getUserInitials()), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, getUserName())), /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      onClick: function onClick() {
        return handleUserMenuClick(item);
      },
      "data-testid": "link-user-".concat(item.id)
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, loggedOutItems.map(function (item) {
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      href: item.href,
      className: "nav-link logged-out-link",
      "data-testid": "link-".concat(item.id)
    }, item.label);
  })));
};
CustomSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  mainMenu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string
  })).isRequired,
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string
  })).isRequired,
  loggedOutItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired
  })).isRequired,
  authenticatedUser: PropTypes.object,
  config: PropTypes.object.isRequired,
  logoUrl: PropTypes.string,
  siteName: PropTypes.string
};
export default CustomSidebar;
//# sourceMappingURL=CustomSidebar.js.map