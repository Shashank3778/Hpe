import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './uitils/iconUtils';
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
      marginLeft: sidebarCollapsed ? '60px' : '240px'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: toggleSidebar
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, title), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? 'sun' : 'moon'
  })));
};
export default CustomHeader;
//# sourceMappingURL=CustomHeader.js.map