import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from '../utils/iconUtils';
import './Sidebar.css';
var Sidebar = function Sidebar(_ref) {
  var isCollapsed = _ref.isCollapsed,
    darkMode = _ref.darkMode,
    loggedIn = _ref.loggedIn,
    userMenu = _ref.userMenu;
  useEffect(function () {
    initLucideIcons();
  }, [isCollapsed, darkMode]);
  var getLogoSrc = function getLogoSrc() {
    if (isCollapsed) {
      return '[https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866](https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866)';
    }
    return darkMode ? '[https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd](https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd)' : '[https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6](https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6)';
  };
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
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(isCollapsed ? 'collapsed' : '')
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, " ", /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, " ", /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    src: getLogoSrc(),
    alt: "Striverra Learn"
  }), " "), " "), "```", /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, menuItems.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  })), loggedIn && userMenu && userMenu.length > 0 && /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, "U"), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, "My Account"))), /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenu[0].items.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.href,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "nav-link"
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": "chevron-right"
    }), /*#__PURE__*/React.createElement("span", null, item.content)));
  }))));
};
Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userMenu: PropTypes.array
};
Sidebar.defaultProps = {
  userMenu: []
};
export default Sidebar;