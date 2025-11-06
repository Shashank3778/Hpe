import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { getConfig } from '@edx/frontend-platform';
import { initLucideIcons } from './desktop-header/utils/iconUtils';
import './Sidebar.css';

/**
 * Sidebar navigation + user menu
 */
const Sidebar = ({
  isCollapsed,
  darkMode,
  authenticatedUser,
}) => {
  const [currentPage, setCurrentPage] = useState('home');
  const [userMenuOpen, setUserMenuOpen] = useState(false);
  const userName = authenticatedUser?.username || 'Guest';

  const menuItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'dashboard', icon: 'layout-dashboard', label: 'My Dashboard' },
    { id: 'courses', icon: 'book-open', label: 'Courses' },
    { id: 'learning-paths', icon: 'route', label: 'Learning Paths' },
    { id: 'ai-studio', icon: 'bot', label: 'AI Studio' },
  ];

  const userMenuItems = [
    { id: 'profile', icon: 'user', label: 'Profile' },
    { id: 'account', icon: 'settings', label: 'Account' },
    { id: 'signout', icon: 'log-out', label: 'Sign Out' },
  ];

  useEffect(() => {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);

  const config = getConfig();

  const handleMenuClick = (itemId) => {
    switch (itemId) {
      case 'home':
      case 'dashboard':
        window.location.href = `${config.LMS_BASE_URL}/dashboard`;
        break;
      case 'courses':
        window.location.href = `${config.LMS_BASE_URL}/courses`;
        break;
      case 'learning-paths':
        window.location.href = `${config.LMS_BASE_URL}/learning-paths`;
        break;
      case 'ai-studio':
        window.location.href = `${config.LMS_BASE_URL}/ai-studio`;
        break;
      default:
        console.log('Unknown menu item:', itemId);
    }
  };

  const handleUserMenuClick = (itemId) => {
    switch (itemId) {
      case 'profile':
        window.location.href = `${config.ACCOUNT_PROFILE_URL}/u/${userName}`;
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

  const getLogoSrc = () => {
    if (isCollapsed) {
      return 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return darkMode
      ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd'
      : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6';
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : 'open'}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img
            className="logo-img"
            key={`${isCollapsed}-${darkMode}`}
            src={getLogoSrc()}
            alt="Striverra Learn"
          />
        </div>
      </div>

      <ul className="nav-menu">
        {menuItems.map(item => (
          <li key={item.id} className="nav-item">
            <a
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleMenuClick(item.id)}
            >
              <i data-lucide={item.icon}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {authenticatedUser && (
        <div className="user-menu">
          <div
            className="user-menu-header"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="user-avatar">
              {userName.split(' ').map(n => n[0]).join('')}
            </div>
            <div className="user-info">
              <div className="user-name">{userName}</div>
            </div>
            <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'}></i>
          </div>

          {userMenuOpen && (
            <ul className="user-menu-items nav-menu">
              {userMenuItems.map(item => (
                <li key={item.id} className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => handleUserMenuClick(item.id)}
                  >
                    <i data-lucide={item.icon}></i>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </aside>
  );
};

Sidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  darkMode: PropTypes.bool.isRequired,
  authenticatedUser: PropTypes.object,
};

export default Sidebar;
