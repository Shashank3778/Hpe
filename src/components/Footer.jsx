import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';

ensureConfig(['LMS_BASE_URL', 'LOGO_URL']);

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

const Footer = () => {
  const { config } = useContext(AppContext);
  const currentYear = new Date().getFullYear();
  const baseUrl = config.LMS_BASE_URL;
  const logoUrl = config.LOGO_URL;
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  const footerLinks = [
    { label: 'Support', href: `${baseUrl}/support` },
    { label: 'Privacy Policy', href: `${baseUrl}/privacy` },
    { label: 'Terms', href: `${baseUrl}/tos` },
  ];

  // Sync footer with sidebar state from header component
  useEffect(() => {
    const checkSidebarState = () => {
      const sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        const isCollapsed = sidebar.classList.contains('collapsed');
        setSidebarCollapsed(isCollapsed);
      }
    };

    // Initial check
    checkSidebarState();

    // Watch for sidebar class changes
    const observer = new MutationObserver(checkSidebarState);
    const sidebar = document.querySelector('.sidebar');
    
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // Fallback: periodic check for sidebar state
    const interval = setInterval(checkSidebarState, 100);

    return () => {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);

  return (
    <footer className={`main-footer ${sidebarCollapsed ? 'sidebar-collapsed' : ''}`}>
      <div className="footer-content">
        <div className="footer-logo-container">
          <a href={baseUrl} rel="noreferrer">
            <img 
              className="footer-logo-img"
              src={logoUrl} 
              alt="Logo" 
            />
          </a>
        </div>

        <nav className="footer-links">
          {footerLinks.map((link) => (
            <a 
              key={link.label}
              href={link.href} 
              className="footer-link"
              rel="noreferrer"
            >
              {link.label}
            </a>
          ))}
        </nav>
      </div>

      <div className="footer-bottom">
        © {currentYear} Hexis Academy. All rights reserved.
      </div>
    </footer>
  );
};

export { EVENT_NAMES };
export default Footer;
