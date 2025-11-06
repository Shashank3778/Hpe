import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './utils/iconUtils';
var CustomHeader = function CustomHeader(_ref) {
  var title = _ref.title,
    toggleSidebar = _ref.toggleSidebar,
    darkMode = _ref.darkMode,
    toggleDarkMode = _ref.toggleDarkMode,
    sidebarCollapsed = _ref.sidebarCollapsed;
  useEffect(function () {
    initLucideIcons();
  }, [darkMode]);
  return /*#__PURE__*/React.createElement("header", {
    className: "main-header",
    style: {
      marginLeft: sidebarCollapsed ? '60px' : '240px',
      transition: 'margin-left 0.3s ease'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: toggleSidebar,
    "aria-label": "Toggle sidebar",
    "data-testid": "button-toggle-sidebar"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    title: "Toggle dark mode",
    "aria-label": darkMode ? "Switch to light mode" : "Switch to dark mode",
    "data-testid": "button-toggle-darkmode"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? "sun" : "moon"
  })));
};
CustomHeader.propTypes = {
  title: PropTypes.string.isRequired,
  toggleSidebar: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  toggleDarkMode: PropTypes.func.isRequired,
  sidebarCollapsed: PropTypes.bool.isRequired
};
export default CustomHeader;
//# sourceMappingURL=CustomHeader.js.map