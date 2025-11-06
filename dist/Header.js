function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState, useEffect, useContext } from 'react';
import { getConfig, AppContext } from '@edx/frontend-platform/react';
import DesktopHeader from './desktop-header/DesktopHeader';
import Sidebar from './Sidebar';

/**
 * Wrapper Header component
 * Combines header + sidebar + dark mode logic.
 */
var Header = function Header() {
  var _useContext = useContext(AppContext),
    authenticatedUser = _useContext.authenticatedUser;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarOpen = _useState2[0],
    setSidebarOpen = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    darkMode = _useState4[0],
    setDarkMode = _useState4[1];
  var toggleSidebar = function toggleSidebar() {
    setSidebarOpen(!sidebarOpen);
  };
  var toggleDarkMode = function toggleDarkMode() {
    var newMode = !darkMode;
    setDarkMode(newMode);
    document.documentElement.setAttribute('data-theme', newMode ? 'dark' : 'light');
  };

  // Shift body when sidebar opens
  useEffect(function () {
    document.body.classList.toggle('sidebar-open', sidebarOpen);
  }, [sidebarOpen]);
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement(DesktopHeader, {
    title: "Home",
    toggleSidebar: toggleSidebar,
    darkMode: darkMode,
    toggleDarkMode: toggleDarkMode
  }), /*#__PURE__*/React.createElement(Sidebar, {
    isCollapsed: !sidebarOpen,
    currentPage: "home",
    setCurrentPage: function setCurrentPage() {},
    userMenuOpen: false,
    setUserMenuOpen: function setUserMenuOpen() {},
    darkMode: darkMode,
    authenticatedUser: authenticatedUser
  }));
};
export default Header;
//# sourceMappingURL=Header.js.map