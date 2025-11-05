// Sidebar.jsx
import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from '../../utils/iconUtils';
import './Sidebar.css';

const Sidebar = ({
  isCollapsed,
  currentPage,
  setCurrentPage,
  userMenuOpen,
  setUserMenuOpen,
  darkMode,
  avatar,
  username,
  userMenu,
  loggedIn,
}) => {
  const defaultUserName = username || "John Doe";

  const menuItems = [
    { id: 'home', icon: 'home', label: 'Home' },
    { id: 'dashboard', icon: 'layout-dashboard', label: 'My Dashboard' },
    { id: 'courses', icon: 'book-open', label: 'Courses' },
    { id: 'learning-paths', icon: 'route', label: 'Learning Paths' },
    { id: 'ai-studio', icon: 'bot', label: 'AI Studio' }
  ];

  useEffect(() => {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);

  // Handler for user menu clicks
  const handleUserMenuClick = (itemId) => {
    if (itemId === 'signout') {
      console.log('Signing out...');
      alert('Signing out...');
      // Implement actual logout logic here
    } else {
      setCurrentPage(itemId);
    }
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          {/* Put your logo here */}
          <img
            className="logo-img"
            src={
              isCollapsed
                ? 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866'
                : darkMode
                ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd'
                : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6'
            }
            alt="Striverra Learn"
          />
        </div>
      </div>

      <ul className="nav-menu">
        {menuItems.map(item => (
          <li key={item.id} className="nav-item">
            <a
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => setCurrentPage(item.id)}
              role="button"
              tabIndex={0}
            >
              <i data-lucide={item.icon}></i>
              {!isCollapsed && <span>{item.label}</span>}
            </a>
          </li>
        ))}
      </ul>

      <div className="user-menu">
        <div
          className="user-menu-header"
          onClick={() => setUserMenuOpen(!userMenuOpen)}
          role="button"
          tabIndex={0}
        >
          <div className="user-avatar" style={{ backgroundImage: avatar ? `url(${avatar})` : undefined }}>
            {!avatar && defaultUserName.split(' ').map(n => n[0]).join('')}
          </div>
          {!isCollapsed && (
            <div className="user-info">
              <div className="user-name">{defaultUserName}</div>
            </div>
          )}
          {!isCollapsed && <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'}></i>}
        </div>

        {userMenuOpen && (
          <ul className="user-menu-items nav-menu">
            {loggedIn && userMenu && userMenu.length > 0
              ? userMenu.map(item => (
                <li key={item.id} className="nav-item">
                  <a
                    className="nav-link"
                    onClick={() => handleUserMenuClick(item.id)}
                    role="button"
                    tabIndex={0}
                  >
                    <i data-lucide={item.icon}></i>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))
              : (
                <li className="nav-item">
                  <a className="nav-link" href={getConfig().LOGIN_URL}>
                    Login
                  </a>
                </li>
              )}
          </ul>
        )}
      </div>
    </aside>
  );
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
  loggedIn: PropTypes.bool,
};

Sidebar.defaultProps = {
  avatar: null,
  username: null,
  userMenu: [],
  loggedIn: false,
};

export default Sidebar;
