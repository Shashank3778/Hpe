// Sidebar.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from '../../utils/iconUtils';
import { getConfig } from '@edx/frontend-platform';
import './Sidebar.css';
var Sidebar = function Sidebar(_ref) {
  var isCollapsed = _ref.isCollapsed,
    currentPage = _ref.currentPage,
    setCurrentPage = _ref.setCurrentPage,
    userMenuOpen = _ref.userMenuOpen,
    setUserMenuOpen = _ref.setUserMenuOpen,
    darkMode = _ref.darkMode,
    avatar = _ref.avatar,
    username = _ref.username,
    userMenu = _ref.userMenu,
    loggedIn = _ref.loggedIn;
  var defaultUserName = username || "John Doe";
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
  useEffect(function () {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);
  var handleUserMenuClick = function handleUserMenuClick(itemId) {
    if (itemId === 'signout') {
      alert('Signing out...');
      // Implement logout logic here
    } else {
      setCurrentPage(itemId);
    }
  };
  return /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(isCollapsed ? 'collapsed' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    src: isCollapsed ? 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866' : darkMode ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd' : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6',
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
        return setCurrentPage(item.id);
      },
      role: "button",
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), !isCollapsed && /*#__PURE__*/React.createElement("span", null, item.label)));
  })), /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    },
    role: "button",
    tabIndex: 0
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar",
    style: {
      backgroundImage: avatar ? "url(".concat(avatar, ")") : undefined
    }
  }, !avatar && defaultUserName.split(' ').map(function (n) {
    return n[0];
  }).join('')), !isCollapsed && /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, defaultUserName)), !isCollapsed && /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, loggedIn && userMenu && userMenu.length > 0 ? userMenu.map(function (item) {
    return /*#__PURE__*/React.createElement("li", {
      key: item.id,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      className: "nav-link",
      onClick: function onClick() {
        return handleUserMenuClick(item.id);
      },
      role: "button",
      tabIndex: 0
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon
    }), /*#__PURE__*/React.createElement("span", null, item.label)));
  }) : /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    className: "nav-link",
    href: getConfig().LOGIN_URL
  }, "Login")))));
};
Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  userMenuOpen: PropTypes.bool.isRequired,
  setUserMenuOpen: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  avatar: PropTypes.string,
  username: PropTypes.string,
  userMenu: PropTypes.array,
  loggedIn: PropTypes.bool
};
Sidebar.defaultProps = {
  avatar: null,
  username: null,
  userMenu: [],
  loggedIn: false
};
export default Sidebar;
//# sourceMappingURL=Sidebar.js.map