import React, { useContext } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';

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

  // Get base URL from config
  var baseUrl = config.LMS_BASE_URL;
  var logoUrl = config.LOGO_URL;

  // Construct footer links with base URL
  var footerLinks = [{
    label: 'Support',
    href: "".concat(baseUrl, "/support")
  }, {
    label: 'Privacy Policy',
    href: "".concat(baseUrl, "/privacy")
  }, {
    label: 'Terms',
    href: "".concat(baseUrl, "/terms")
  }];
  return /*#__PURE__*/React.createElement("footer", {
    className: "main-footer"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-content"
  }, /*#__PURE__*/React.createElement("div", {
    className: "footer-logo-container"
  }, /*#__PURE__*/React.createElement("a", {
    href: baseUrl,
    rel: "noreferrer"
  }, /*#__PURE__*/React.createElement("img", {
    className: "footer-logo-img",
    src: logoUrl,
    alt: "Logo"
  }))), /*#__PURE__*/React.createElement("nav", {
    className: "footer-links"
  }, footerLinks.map(function (link) {
    return /*#__PURE__*/React.createElement("a", {
      key: link.label,
      href: link.href,
      className: "footer-link",
      rel: "noreferrer"
    }, link.label);
  }))), /*#__PURE__*/React.createElement("div", {
    className: "footer-bottom"
  }, "\xA9 ", currentYear, " Striverra. All rights reserved."));
};
export { EVENT_NAMES };
export default Footer;
//# sourceMappingURL=Footer.js.map