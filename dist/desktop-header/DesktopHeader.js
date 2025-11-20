function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useIntl } from '@edx/frontend-platform/i18n';
import { getConfig } from '@edx/frontend-platform';

// Import your icon utility
import { initLucideIcons } from '../utils/iconUtils';

// Import only the data shape validators
import { desktopLoggedOutItemsDataShape } from './DesktopLoggedOutItems';
import { desktopHeaderMainOrSecondaryMenuDataShape } from './DesktopHeaderMainOrSecondaryMenu';
import { desktopUserMenuDataShape } from './DesktopHeaderUserMenu';

// i18n
import messages from '../Header.messages';
var DesktopHeader = function DesktopHeader(_ref) {
  var mainMenu = _ref.mainMenu,
    secondaryMenu = _ref.secondaryMenu,
    userMenu = _ref.userMenu,
    loggedOutItems = _ref.loggedOutItems,
    logo = _ref.logo,
    logoAltText = _ref.logoAltText,
    logoDestination = _ref.logoDestination,
    avatar = _ref.avatar,
    username = _ref.username,
    loggedIn = _ref.loggedIn;
  var intl = useIntl();
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarCollapsed = _useState2[0],
    setSidebarCollapsed = _useState2[1];
  var _useState3 = useState(false),
    _useState4 = _slicedToArray(_useState3, 2),
    userMenuOpen = _useState4[0],
    setUserMenuOpen = _useState4[1];
  var _useState5 = useState(false),
    _useState6 = _slicedToArray(_useState5, 2),
    darkMode = _useState6[0],
    setDarkMode = _useState6[1];

  // Initialize icons when component mounts and when state changes
  useEffect(function () {
    initLucideIcons();
  }, [sidebarCollapsed, userMenuOpen, darkMode]);

  // Check if dark mode is enabled (read from Open edX default)
  useEffect(function () {
    // Check Paragon's dark mode
    var checkDarkMode = function checkDarkMode() {
      var htmlElement = document.documentElement;
      var bodyElement = document.body;

      // Check multiple possible dark mode indicators
      var isDark = htmlElement.classList.contains('pgn__dark-mode') || bodyElement.classList.contains('pgn__dark-mode') || htmlElement.getAttribute('data-theme') === 'dark' || bodyElement.getAttribute('data-theme') === 'dark' || localStorage.getItem('theme') === 'dark' || localStorage.getItem('paragon.theme.variant') === 'dark';
      setDarkMode(isDark);
    };
    checkDarkMode();

    // Listen for theme changes from Open edX
    var observer = new MutationObserver(checkDarkMode);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    observer.observe(document.body, {
      attributes: true,
      attributeFilter: ['class', 'data-theme']
    });
    return function () {
      return observer.disconnect();
    };
  }, []);

  // Apply body margin when sidebar state changes
  useEffect(function () {
    var mainContent = document.querySelector('#main');
    if (mainContent) {
      mainContent.style.marginLeft = sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)';
      mainContent.style.transition = 'margin-left 0.3s ease';
    }
  }, [sidebarCollapsed]);

  // Toggle dark mode using Open edX default method
  var toggleDarkMode = function toggleDarkMode() {
    var htmlElement = document.documentElement;
    var bodyElement = document.body;
    var newDarkMode = !darkMode;
    if (newDarkMode) {
      // Enable dark mode (Paragon style)
      htmlElement.classList.add('pgn__dark-mode');
      bodyElement.classList.add('pgn__dark-mode');
      htmlElement.setAttribute('data-theme', 'dark');
      bodyElement.setAttribute('data-theme', 'dark');
      localStorage.setItem('theme', 'dark');
      localStorage.setItem('paragon.theme.variant', 'dark');
    } else {
      // Disable dark mode
      htmlElement.classList.remove('pgn__dark-mode');
      bodyElement.classList.remove('pgn__dark-mode');
      htmlElement.setAttribute('data-theme', 'light');
      bodyElement.setAttribute('data-theme', 'light');
      localStorage.setItem('theme', 'light');
      localStorage.setItem('paragon.theme.variant', 'light');
    }
    setDarkMode(newDarkMode);

    // Trigger Paragon theme change event
    var event = new CustomEvent('paragon.themeChanged', {
      detail: {
        theme: newDarkMode ? 'dark' : 'light'
      }
    });
    window.dispatchEvent(event);

    // Also trigger generic theme change event
    var themeEvent = new CustomEvent('themeChanged', {
      detail: {
        darkMode: newDarkMode
      }
    });
    window.dispatchEvent(themeEvent);
  };

  // Toggle sidebar collapse
  var toggleSidebar = function toggleSidebar() {
    setSidebarCollapsed(!sidebarCollapsed);
  };

  // Get page title from URL
  var getPageTitle = function getPageTitle() {
    var path = window.location.pathname;
    if (path.includes('dashboard')) {
      return intl.formatMessage({
        id: 'header.title.dashboard',
        defaultMessage: 'My Dashboard'
      });
    }
    if (path.includes('courses')) {
      return intl.formatMessage({
        id: 'header.title.courses',
        defaultMessage: 'Courses'
      });
    }
    if (path.includes('programs')) {
      return intl.formatMessage({
        id: 'header.title.programs',
        defaultMessage: 'Learning Paths'
      });
    }
    return getConfig().SITE_NAME || 'Learning Platform';
  };

  // Enhanced icon mapping function - matches your design exactly
  var getIconForMenuItem = function getIconForMenuItem(item, index) {
    var href = (item.href || '').toLowerCase();
    var content = (item.content || '').toLowerCase();

    // Match by content/href keywords
    if (content.includes('home') || href.endsWith('/') || href.endsWith('/home')) return 'home';
    if (content.includes('dashboard') || href.includes('dashboard')) return 'layout-dashboard';
    if (content.includes('course') || href.includes('/courses')) return 'book-open';
    if (content.includes('program') || content.includes('learning path') || href.includes('program')) return 'route';
    if (content.includes('ai') || content.includes('studio') || href.includes('ai')) return 'bot';

    // Fallback to position-based icons matching your design
    var defaultIcons = ['home', 'layout-dashboard', 'book-open', 'route', 'bot'];
    return defaultIcons[index] || 'circle';
  };

  // Map user menu items to include icons - matching your design
  var getIconForUserMenuItem = function getIconForUserMenuItem(item) {
    var href = (item.href || '').toLowerCase();
    var content = (item.content || '').toLowerCase();

    // Match icons from your design
    if (content.includes('dashboard') || href.includes('dashboard')) return 'gauge';
    if (content.includes('analytic') || href.includes('analytic')) return 'bar-chart-3';
    if (content.includes('profile') || href.includes('profile')) return 'user';
    if (content.includes('account') || content.includes('setting') || href.includes('account') || href.includes('setting')) return 'settings';
    if (content.includes('order') || content.includes('history') || href.includes('order')) return 'shopping-bag';
    if (content.includes('logout') || content.includes('sign out') || href.includes('logout')) return 'log-out';
    return 'circle';
  };

  // Determine which logo to show
  var getLogoSrc = function getLogoSrc() {
    if (sidebarCollapsed) {
      return logo || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return logo || (darkMode ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd' : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };

  // Transform and build correct menu structure
  var buildCorrectMenu = function buildCorrectMenu() {
    var baseUrl = getConfig().LMS_BASE_URL;
    var customMenu = [];

    // Always add Home first (same as logo destination)
    customMenu.push({
      href: logoDestination || "".concat(baseUrl, "/"),
      content: intl.formatMessage({
        id: 'header.links.home',
        defaultMessage: 'Home'
      }),
      icon: 'home'
    });

    // Process mainMenu to map old URLs to new structure
    if (mainMenu && mainMenu.length > 0) {
      mainMenu.forEach(function (item) {
        var href = item.href || '';

        // Map "Courses" (old: /dashboard) to "My Dashboard" (new: /dashboard)
        if (href.includes('/dashboard')) {
          customMenu.push({
            href: "".concat(baseUrl, "/dashboard"),
            content: intl.formatMessage({
              id: 'header.links.my.dashboard',
              defaultMessage: 'My Dashboard'
            }),
            icon: 'layout-dashboard'
          });
        }
        // Map "Discover New" or anything with /courses to "Courses" (new: /courses)
        else if (href.includes('/courses')) {
          customMenu.push({
            href: "".concat(baseUrl, "/courses"),
            content: intl.formatMessage({
              id: 'header.links.courses',
              defaultMessage: 'Courses'
            }),
            icon: 'book-open'
          });
        }
        // Keep other items as-is
        else if (!href.endsWith('/') && !href.endsWith('/home')) {
          customMenu.push(item);
        }
      });
    } else {
      // Default menu if no mainMenu provided
      customMenu.push({
        href: "".concat(baseUrl, "/dashboard"),
        content: intl.formatMessage({
          id: 'header.links.my.dashboard',
          defaultMessage: 'My Dashboard'
        }),
        icon: 'layout-dashboard'
      });
      customMenu.push({
        href: "".concat(baseUrl, "/courses"),
        content: intl.formatMessage({
          id: 'header.links.courses',
          defaultMessage: 'Courses'
        }),
        icon: 'book-open'
      });
    }

    // Add secondary menu items
    if (secondaryMenu && secondaryMenu.length > 0) {
      secondaryMenu.forEach(function (item) {
        customMenu.push(item);
      });
    }

    // Check if Learning Paths exists
    var hasLearningPaths = customMenu.some(function (item) {
      return (item.href || '').includes('program') || (item.content || '').toLowerCase().includes('program') || (item.content || '').toLowerCase().includes('learning path');
    });
    if (!hasLearningPaths) {
      customMenu.push({
        href: "".concat(baseUrl, "/programs"),
        content: intl.formatMessage({
          id: 'header.links.programs',
          defaultMessage: 'Learning Paths'
        }),
        icon: 'route'
      });
    }

    // Check if AI Studio exists
    var hasAIStudio = customMenu.some(function (item) {
      return (item.content || '').toLowerCase().includes('ai') || (item.content || '').toLowerCase().includes('studio');
    });
    if (!hasAIStudio) {
      customMenu.push({
        href: "".concat(baseUrl, "/ai-studio"),
        content: intl.formatMessage({
          id: 'header.links.ai.studio',
          defaultMessage: 'AI Studio'
        }),
        icon: 'bot'
      });
    }
    return customMenu;
  };
  var completeMenu = buildCorrectMenu();
  return /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("aside", {
    className: "sidebar ".concat(sidebarCollapsed ? 'collapsed' : '')
  }, /*#__PURE__*/React.createElement("div", {
    className: "sidebar-header"
  }, /*#__PURE__*/React.createElement("div", {
    className: "logo-container"
  }, /*#__PURE__*/React.createElement("a", {
    href: logoDestination
  }, /*#__PURE__*/React.createElement("img", {
    className: "logo-img",
    key: "".concat(sidebarCollapsed, "-").concat(darkMode),
    src: getLogoSrc(),
    alt: logoAltText
  })))), /*#__PURE__*/React.createElement("nav", {
    className: "sidebar-nav"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "nav-menu"
  }, completeMenu.map(function (item, index) {
    return /*#__PURE__*/React.createElement("li", {
      key: index,
      className: "nav-item"
    }, /*#__PURE__*/React.createElement("a", {
      href: item.href,
      className: "nav-link ".concat(window.location.pathname === item.href ? 'active' : '')
    }, /*#__PURE__*/React.createElement("i", {
      "data-lucide": item.icon || getIconForMenuItem(item, index)
    }), /*#__PURE__*/React.createElement("span", null, item.content)));
  }))), loggedIn ? /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-menu-header",
    onClick: function onClick() {
      return setUserMenuOpen(!userMenuOpen);
    },
    role: "button",
    tabIndex: 0,
    onKeyPress: function onKeyPress(e) {
      if (e.key === 'Enter' || e.key === ' ') {
        setUserMenuOpen(!userMenuOpen);
      }
    }
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-avatar"
  }, avatar ? /*#__PURE__*/React.createElement("img", {
    src: avatar,
    alt: username
  }) : /*#__PURE__*/React.createElement("span", null, username ? username.split(' ').map(function (n) {
    return n[0];
  }).join('').toUpperCase() : 'U')), /*#__PURE__*/React.createElement("div", {
    className: "user-info"
  }, /*#__PURE__*/React.createElement("div", {
    className: "user-name"
  }, username || 'User')), /*#__PURE__*/React.createElement("i", {
    "data-lucide": userMenuOpen ? 'chevron-up' : 'chevron-down'
  })), userMenuOpen && /*#__PURE__*/React.createElement("ul", {
    className: "user-menu-items nav-menu"
  }, userMenu && userMenu.length > 0 ? userMenu.map(function (section, sectionIndex) {
    return /*#__PURE__*/React.createElement(React.Fragment, {
      key: sectionIndex
    }, section.items && section.items.map(function (item, itemIndex) {
      return /*#__PURE__*/React.createElement("li", {
        key: itemIndex,
        className: "nav-item"
      }, /*#__PURE__*/React.createElement("a", {
        href: item.href,
        className: "nav-link"
      }, /*#__PURE__*/React.createElement("i", {
        "data-lucide": getIconForUserMenuItem(item)
      }), /*#__PURE__*/React.createElement("span", null, item.content)));
    }));
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/dashboard"),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "gauge"
  }), /*#__PURE__*/React.createElement("span", null, "Dashboard"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().ACCOUNT_PROFILE_URL, "/u/").concat(username),
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "user"
  }), /*#__PURE__*/React.createElement("span", null, "Profile"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: getConfig().ACCOUNT_SETTINGS_URL,
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "settings"
  }), /*#__PURE__*/React.createElement("span", null, "Account"))), /*#__PURE__*/React.createElement("li", {
    className: "nav-item"
  }, /*#__PURE__*/React.createElement("a", {
    href: getConfig().LOGOUT_URL,
    className: "nav-link"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "log-out"
  }), /*#__PURE__*/React.createElement("span", null, "Sign Out")))))) : /*#__PURE__*/React.createElement("div", {
    className: "user-menu"
  }, loggedOutItems && loggedOutItems.length > 0 ? loggedOutItems.map(function (item, index) {
    return /*#__PURE__*/React.createElement("a", {
      key: index,
      href: item.href,
      className: "nav-link logged-out-link"
    }, item.content);
  }) : /*#__PURE__*/React.createElement(React.Fragment, null, /*#__PURE__*/React.createElement("a", {
    href: getConfig().LOGIN_URL,
    className: "nav-link logged-out-link"
  }, "Login"), /*#__PURE__*/React.createElement("a", {
    href: "".concat(getConfig().LMS_BASE_URL, "/register"),
    className: "nav-link logged-out-link"
  }, "Register")))), /*#__PURE__*/React.createElement("header", {
    className: "main-header",
    style: {
      marginLeft: sidebarCollapsed ? 'var(--sidebar-collapsed-width)' : 'var(--sidebar-width)'
    }
  }, /*#__PURE__*/React.createElement("button", {
    className: "header-toggle-btn",
    onClick: toggleSidebar,
    "aria-label": "Toggle sidebar"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": "menu"
  })), /*#__PURE__*/React.createElement("h1", {
    className: "page-title"
  }, getPageTitle()), /*#__PURE__*/React.createElement("button", {
    className: "dark-mode-toggle",
    onClick: toggleDarkMode,
    title: "Toggle dark mode",
    "aria-label": darkMode ? "Switch to light mode" : "Switch to dark mode"
  }, /*#__PURE__*/React.createElement("i", {
    "data-lucide": darkMode ? "sun" : "moon"
  }))));
};
export var desktopHeaderDataShape = {
  mainMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  secondaryMenu: desktopHeaderMainOrSecondaryMenuDataShape,
  userMenu: desktopUserMenuDataShape,
  loggedOutItems: desktopLoggedOutItemsDataShape,
  logo: PropTypes.string,
  logoAltText: PropTypes.string,
  logoDestination: PropTypes.string,
  avatar: PropTypes.string,
  username: PropTypes.string,
  loggedIn: PropTypes.bool
};
DesktopHeader.propTypes = {
  mainMenu: desktopHeaderDataShape.mainMenu,
  secondaryMenu: desktopHeaderDataShape.secondaryMenu,
  userMenu: desktopHeaderDataShape.userMenu,
  loggedOutItems: desktopHeaderDataShape.loggedOutItems,
  logo: desktopHeaderDataShape.logo,
  logoAltText: desktopHeaderDataShape.logoAltText,
  logoDestination: desktopHeaderDataShape.logoDestination,
  avatar: desktopHeaderDataShape.avatar,
  username: desktopHeaderDataShape.username,
  loggedIn: desktopHeaderDataShape.loggedIn
};
DesktopHeader.defaultProps = {
  mainMenu: [],
  secondaryMenu: [],
  userMenu: [],
  loggedOutItems: [],
  logo: null,
  logoAltText: null,
  logoDestination: null,
  avatar: null,
  username: null,
  loggedIn: false
};
export default DesktopHeader;
//# sourceMappingURL=DesktopHeader.js.map