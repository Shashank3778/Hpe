import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
// Import the local images.
// import hpeLogo from './assets/logo.svg';

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

  // Construct the dynamic URL for the Striverra logo link.
  const homeUrl = `${config.LMS_BASE_URL}`;

  return (
    <div className="wrapper wrapper-footer">
      <footer id="footer" className="tutor-container">
        <div className="footer-top">
          <div className="powered-area">
            <ul className="logo-list">
                {/* MODIFIED: Using the dynamic dashboard URL and imported image */}
                <a href={homeUrl} rel="noreferrer" target="_blank">
                  <img
                    src={`${config.LOGO_URL}`}
                    alt="Logo"
                  />
                </a>
            </ul>
          </div>
        </div>
      </footer>
    </div>
  );
};
export { EVENT_NAMES };
export default Footer;
