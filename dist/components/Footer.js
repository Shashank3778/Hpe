import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
// Import the local images.
// import hpeLogo from './assets/logo.svg';

// Ensure the LMS_BASE_URL is available from the MFE configuration.
ensureConfig(['LMS_BASE_URL', 'LOGO_URL']);
var EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link'
};
var Footer = function Footer() {
  // Get the MFE config object using the AppContext.
  var _useContext = useContext(AppContext),
    config = _useContext.config;

  // Get the current year dynamically for the copyright notice.
  var currentYear = new Date().getFullYear();

  // Construct the dynamic URL for the Striverra logo link.
  var homeUrl = "".concat(config.LMS_BASE_URL);
  return /*#__PURE__*/React.createElement("div", {
    className: "wrapper wrapper-footer"
  }, /*#__PURE__*/React.createElement("footer", {
    id: "footer",
    className: "tutor-container"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-top"
  }, /*#__PURE__*/React.createElement("div", {
    className: "powered-area"
  }, /*#__PURE__*/React.createElement("ul", {
    className: "logo-list"
  }, /*#__PURE__*/React.createElement("a", {
    href: homeUrl,
    rel: "noreferrer",
    target: "_blank"
  }, /*#__PURE__*/React.createElement("img", {
    src: "".concat(config.LOGO_URL),
    alt: "Logo"
  })))))));
};
export { EVENT_NAMES };
export default Footer;
//# sourceMappingURL=Footer.js.map