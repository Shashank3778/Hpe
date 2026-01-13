function _slicedToArray(r, e) { return _arrayWithHoles(r) || _iterableToArrayLimit(r, e) || _unsupportedIterableToArray(r, e) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(r, a) { if (r) { if ("string" == typeof r) return _arrayLikeToArray(r, a); var t = {}.toString.call(r).slice(8, -1); return "Object" === t && r.constructor && (t = r.constructor.name), "Map" === t || "Set" === t ? Array.from(r) : "Arguments" === t || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t) ? _arrayLikeToArray(r, a) : void 0; } }
function _arrayLikeToArray(r, a) { (null == a || a > r.length) && (a = r.length); for (var e = 0, n = Array(a); e < a; e++) n[e] = r[e]; return n; }
function _iterableToArrayLimit(r, l) { var t = null == r ? null : "undefined" != typeof Symbol && r[Symbol.iterator] || r["@@iterator"]; if (null != t) { var e, n, i, u, a = [], f = !0, o = !1; try { if (i = (t = t.call(r)).next, 0 === l) { if (Object(t) !== t) return; f = !1; } else for (; !(f = (e = i.call(t)).done) && (a.push(e.value), a.length !== l); f = !0); } catch (r) { o = !0, n = r; } finally { try { if (!f && null != t["return"] && (u = t["return"](), Object(u) !== u)) return; } finally { if (o) throw n; } } return a; } }
function _arrayWithHoles(r) { if (Array.isArray(r)) return r; }
import React, { useContext, useEffect, useState } from 'react';
import { AppContext } from '@edx/frontend-platform/react';
import { ensureConfig } from '@edx/frontend-platform';
ensureConfig(['LMS_BASE_URL', 'LOGO_URL']);
var EVENT_NAMES = {
  FOOTER_LINK: 'edx.bi.footer.link'
};
var Footer = function Footer() {
  var _useContext = useContext(AppContext),
    config = _useContext.config;
  var currentYear = new Date().getFullYear();
  var baseUrl = config.LMS_BASE_URL;
  var logoUrl = config.LOGO_URL;
  var _useState = useState(false),
    _useState2 = _slicedToArray(_useState, 2),
    sidebarCollapsed = _useState2[0],
    setSidebarCollapsed = _useState2[1];
  var footerLinks = [{
    label: 'Home',
    href: "".concat(baseUrl)
  }, {
    label: 'About Us',
    href: "".concat(baseUrl, "/about")
  }, {
    label: 'FAQ',
    href: "".concat(baseUrl, "/privacy")
  }, {
    label: 'Contact Us',
    href: "".concat(baseUrl, "/contact")
  }];

  // Sync footer with sidebar state from header component
  useEffect(function () {
    var checkSidebarState = function checkSidebarState() {
      var sidebar = document.querySelector('.sidebar');
      if (sidebar) {
        var isCollapsed = sidebar.classList.contains('collapsed');
        setSidebarCollapsed(isCollapsed);
      }
    };

    // Initial check
    checkSidebarState();

    // Watch for sidebar class changes
    var observer = new MutationObserver(checkSidebarState);
    var sidebar = document.querySelector('.sidebar');
    if (sidebar) {
      observer.observe(sidebar, {
        attributes: true,
        attributeFilter: ['class']
      });
    }

    // Fallback: periodic check for sidebar state
    var interval = setInterval(checkSidebarState, 100);
    return function () {
      observer.disconnect();
      clearInterval(interval);
    };
  }, []);
  return /*#__PURE__*/React.createElement("footer", {
    className: "main-footer ".concat(sidebarCollapsed ? 'sidebar-collapsed' : '')
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
  }, "Copyrights \xA9", currentYear, " . All Rights Reserved."));
};
export { EVENT_NAMES };
export default Footer;
//# sourceMappingURL=Footer.js.map