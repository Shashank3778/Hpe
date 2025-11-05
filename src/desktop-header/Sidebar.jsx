import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { initLucideIcons } from '../utils/iconUtils';
import './Sidebar.css';

const Sidebar = ({
isCollapsed,
darkMode,
loggedIn,
userMenu,
}) => {
useEffect(() => {
initLucideIcons();
}, [isCollapsed, darkMode]);

const getLogoSrc = () => {
if (isCollapsed) {
return '[https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866](https://page.gensparksite.com/v1/base64_upload/54d382973dd8c88b434a48567fa6c866)';
}
return darkMode
? '[https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd](https://page.gensparksite.com/v1/base64_upload/ad05d62f61694c1b9e0c098a49605edd)'
: '[https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6](https://page.gensparksite.com/v1/base64_upload/da846373020a3c31a9216cdb58c175b6)';
};

const menuItems = [
{ id: 'home', icon: 'home', label: 'Home' },
{ id: 'dashboard', icon: 'layout-dashboard', label: 'My Dashboard' },
{ id: 'courses', icon: 'book-open', label: 'Courses' },
{ id: 'learning-paths', icon: 'route', label: 'Learning Paths' },
{ id: 'ai-studio', icon: 'bot', label: 'AI Studio' },
];

return (
<aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}> <div className="sidebar-header"> <div className="logo-container"> <img
         className="logo-img"
         src={getLogoSrc()}
         alt="Striverra Learn"
       /> </div> </div>

```
  <ul className="nav-menu">
    {menuItems.map(item => (
      <li key={item.id} className="nav-item">
        <a className="nav-link">
          <i data-lucide={item.icon}></i>
          <span>{item.label}</span>
        </a>
      </li>
    ))}
  </ul>

  {loggedIn && userMenu && userMenu.length > 0 && (
    <div className="user-menu">
      <div className="user-menu-header">
        <div className="user-avatar">U</div>
        <div className="user-info">
          <div className="user-name">My Account</div>
        </div>
      </div>
      <ul className="user-menu-items nav-menu">
        {userMenu[0].items.map((item) => (
          <li key={item.href} className="nav-item">
            <a href={item.href} className="nav-link">
              <i data-lucide="chevron-right"></i>
              <span>{item.content}</span>
            </a>
          </li>
        ))}
      </ul>
    </div>
  )}
</aside>


);
};

Sidebar.propTypes = {
isCollapsed: PropTypes.bool.isRequired,
darkMode: PropTypes.bool.isRequired,
loggedIn: PropTypes.bool.isRequired,
userMenu: PropTypes.array,
};

Sidebar.defaultProps = {
userMenu: [],
};

export default Sidebar;
