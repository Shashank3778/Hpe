import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';


// Ensure the LMS_BASE_URL is available from the MFE configuration.
ensureConfig(['LMS_BASE_URL', 'LOGO_URL']);

const EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link',
};

const Footer = () => {
  // Get the MFE config object using the AppContext.
  const { config } = useContext(AppContext);

  // Get the current year dynamically for the copyright notice.
  const currentYear = new Date().getFullYear();

  // Get base URL from config
  const baseUrl = config.LMS_BASE_URL;
  const logoUrl = config.LOGO_URL;

  // Construct footer links with base URL
  const footerLinks = [
    { label: 'Support', href: `${baseUrl}/support` },
    { label: 'Privacy Policy', href: `${baseUrl}/privacy` },
    { label: 'Terms', href: `${baseUrl}/terms` },
  ];

  return (
    <footer className="main-footer">
      <div className="footer-content">
        {/* Logo Section */}
        <div className="footer-logo-container">
          <a href={baseUrl} rel="noreferrer">
            <img 
              className="footer-logo-img"
              src={logoUrl} 
              alt="Logo" 
            />
          </a>
        </div>

        {/* Footer Links */}
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

      {/* Copyright Section */}
      <div className="footer-bottom">
        © {currentYear} Striverra. All rights reserved.
      </div>
    </footer>
  );
};

export { EVENT_NAMES };
export default Footer;
