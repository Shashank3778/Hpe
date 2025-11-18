import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from './uitils/iconUtils';

const CustomSidebar = ({
  isCollapsed,
  currentPage,
  setCurrentPage,
  darkMode,
  mainMenu,
  userMenu,
  loggedOutItems,
  authenticatedUser,
  config,
  logoUrl,
  siteName,
}) => {
  const [userMenuOpen, setUserMenuOpen] = useState(false);

  useEffect(() => {
    initLucideIcons();
  }, [currentPage, userMenuOpen, isCollapsed, darkMode]);

  const handleNavClick = (item) => {
    if (item.href) window.location.href = item.href;
    else setCurrentPage(item.id);
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img className="logo-img" src={logoUrl} alt={siteName} />
        </div>
      </div>

      <ul className="nav-menu">
        {mainMenu.map((item) => (
          <li key={item.id} className="nav-item">
            <a
              className={`nav-link ${
                currentPage === item.id ? 'active' : ''
              }`}
              onClick={() => handleNavClick(item)}
            >
              <i data-lucide={item.icon}></i>
              <span>{item.label}</span>
            </a>
          </li>
        ))}
      </ul>

      {authenticatedUser ? (
        <div className="user-menu">
          <div
            className="user-menu-header"
            onClick={() => setUserMenuOpen(!userMenuOpen)}
          >
            <div className="user-avatar">
              {authenticatedUser.username.charAt(0).toUpperCase()}
            </div>
            <div className="user-info">
              <div className="user-name">{authenticatedUser.username}</div>
            </div>
            <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'}></i>
          </div>

          {userMenuOpen && (
            <ul className="user-menu-items nav-menu">
              {userMenu.map((item) => (
                <li key={item.id}>
                  <a className="nav-link" onClick={() => handleNavClick(item)}>
                    <i data-lucide={item.icon}></i>
                    <span>{item.label}</span>
                  </a>
                </li>
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="user-menu">
          {loggedOutItems.map((item) => (
            <a key={item.id} className="nav-link logged-out-link" href={item.href}>
              {item.label}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
};

export default CustomSidebar;
