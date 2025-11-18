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
  var handleNavClick = function handleNavClick(item) {
    if (item.href) window.location.href = item.href;else setCurrentPage(item.id);
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(isCollapsed ? 'collapsed' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    src: logoUrl,
    alt: siteName
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
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  })), authenticatedUser ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, authenticatedUser.username.charAt(0).toUpperCase()), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, authenticatedUser.username)), /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      onClick: function onClick() {
        return handleNavClick(item);
      }
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  }))) : /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, loggedOutItems.map(function (item) {
    return /*#__PURE__*/React.createElement("a", {
      key: item.id,
      className: "nav-link logged-out-link",
      href: item.href
    }, item.label);
  })));
};
export default CustomSidebar;
//# sourceMappingURL=CustomSidebar.js.map