import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './utils/iconUtils';
import './DesktopHeader.css';

/**
 * Custom minimalist Desktop Header
 */
var DesktopHeader = function DesktopHeader(_ref) {
  var title = _ref.title,
    toggleSidebar = _ref.toggleSidebar,
    darkMode = _ref.darkMode,
    toggleDarkMode = _ref.toggleDarkMode;
  useEffect(function () {
    initLucideIcons();
  }, [darkMode]);
  return /*#__PURE__*/React.createElement("header", {
    className: "main-header"
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: toggleSidebar,
    "aria-label": "Toggle sidebar"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    title: "Toggle dark mode",
    "aria-label": darkMode ? 'Switch to light mode' : 'Switch to dark mode'
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon'
  })));
};
DesktopHeader.propTypes = {
  title: PropTypes.string,
  toggleSidebar: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired
};
DesktopHeader.defaultProps = {
  title: 'Home'
};
export default DesktopHeader;
//# sourceMappingURL=DesktopHeader.js.map