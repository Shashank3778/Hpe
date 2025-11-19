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

  const getLogoSrc = () => {
    if (isCollapsed) {
      return logoUrl || 'https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866';
    }
    return logoUrl || (darkMode 
      ? 'https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd'
      : 'https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6');
  };

  const handleNavClick = (item) => {
    if (item.href) {
      window.location.href = item.href;
    } else {
      setCurrentPage(item.id);
    }
  };

  const handleUserMenuClick = (item) => {
    if (item.id === 'signout') {
      window.location.href = item.href;
    } else if (item.href) {
      window.location.href = item.href;
    } else {
      setCurrentPage(item.id);
    }
    setUserMenuOpen(false);
  };

  const getUserInitials = () => {
    if (!authenticatedUser || !authenticatedUser.username) return 'U';
    return authenticatedUser.username.charAt(0).toUpperCase();
  };

  const getUserName = () => {
    if (!authenticatedUser) return 'Guest';
    return authenticatedUser.username || 'User';
  };

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      <div className="sidebar-header">
        <div className="logo-container">
          <img 
            className="logo-img"
            key={`${isCollapsed}-${darkMode}`}
            src={getLogoSrc()} 
            alt={siteName || 'Learning Platform'} 
            data-testid="img-logo"
          />
        </div>
      </div>
      
      <ul className="nav-menu">
        {mainMenu.map(item => (
          <li key={item.id} className="nav-item">
            <a 
              className={`nav-link ${currentPage === item.id ? 'active' : ''}`}
              onClick={() => handleNavClick(item)}
              data-testid={`link-nav-${item.id}`}
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
            data-testid="button-user-menu-toggle"
          >
            <div className="user-avatar">
              {getUserInitials()}
            </div>
            <div className="user-info">
              <div className="user-name">{getUserName()}</div>
            </div>
            <i data-lucide={userMenuOpen ? 'chevron-up' : 'chevron-down'}></i>
          </div>
          
          {userMenuOpen && (
            <ul className="user-menu-items nav-menu">
              {userMenu.map(item => (
                <li key={item.id} className="nav-item">
                  <a 
                    className="nav-link" 
                    onClick={() => handleUserMenuClick(item)}
                    data-testid={`link-user-${item.id}`}
                  >
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
          {loggedOutItems.map(item => (
            <a 
              key={item.id}
              href={item.href}
              className="nav-link logged-out-link"
              data-testid={`link-${item.id}`}
            >
              {item.label}
            </a>
          ))}
        </div>
      )}
    </aside>
  );
};

CustomSidebar.propTypes = {
  isCollapsed: PropTypes.bool.isRequired,
  currentPage: PropTypes.string.isRequired,
  setCurrentPage: PropTypes.func.isRequired,
  darkMode: PropTypes.bool.isRequired,
  mainMenu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
  userMenu: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    icon: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string,
  })).isRequired,
  loggedOutItems: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    label: PropTypes.string.isRequired,
    href: PropTypes.string.isRequired,
  })).isRequired,
  authenticatedUser: PropTypes.object,
  config: PropTypes.object.isRequired,
  logoUrl: PropTypes.string,
  siteName: PropTypes.string,
};

export default CustomSidebar;