var _excluded = ["store"];
function _typeof(o) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (o) { return typeof o; } : function (o) { return o && "function" == typeof Symbol && o.constructor === Symbol && o !== Symbol.prototype ? "symbol" : typeof o; }, _typeof(o); }
function ownKeys(e, r) { var t = Object.keys(e); if (Object.getOwnPropertySymbols) { var o = Object.getOwnPropertySymbols(e); r && (o = o.filter(function (r) { return Object.getOwnPropertyDescriptor(e, r).enumerable; })), t.push.apply(t, o); } return t; }
function _objectSpread(e) { for (var r = 1; r < arguments.length; r++) { var t = null != arguments[r] ? arguments[r] : {}; r % 2 ? ownKeys(Object(t), !0).forEach(function (r) { _defineProperty(e, r, t[r]); }) : Object.getOwnPropertyDescriptors ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(t)) : ownKeys(Object(t)).forEach(function (r) { Object.defineProperty(e, r, Object.getOwnPropertyDescriptor(t, r)); }); } return e; }
function _objectWithoutProperties(e, t) { if (null == e) return {}; var o, r, i = _objectWithoutPropertiesLoose(e, t); if (Object.getOwnPropertySymbols) { var n = Object.getOwnPropertySymbols(e); for (r = 0; r < n.length; r++) o = n[r], -1 === t.indexOf(o) && {}.propertyIsEnumerable.call(e, o) && (i[o] = e[o]); } return i; }
function _objectWithoutPropertiesLoose(r, e) { if (null == r) return {}; var t = {}; for (var n in r) if ({}.hasOwnProperty.call(r, n)) { if (-1 !== e.indexOf(n)) continue; t[n] = r[n]; } return t; }
function _defineProperties(e, r) { for (var t = 0; t < r.length; t++) { var o = r[t]; o.enumerable = o.enumerable || !1, o.configurable = !0, "value" in o && (o.writable = !0), Object.defineProperty(e, _toPropertyKey(o.key), o); } }
function _createClass(e, r, t) { return r && _defineProperties(e.prototype, r), t && _defineProperties(e, t), Object.defineProperty(e, "prototype", { writable: !1 }), e; }
function _classCallCheck(a, n) { if (!(a instanceof n)) throw new TypeError("Cannot call a class as a function"); }
function _defineProperty(e, r, t) { return (r = _toPropertyKey(r)) in e ? Object.defineProperty(e, r, { value: t, enumerable: !0, configurable: !0, writable: !0 }) : e[r] = t, e; }
function _toPropertyKey(t) { var i = _toPrimitive(t, "string"); return "symbol" == _typeof(i) ? i : i + ""; }
function _toPrimitive(t, r) { if ("object" != _typeof(t) || !t) return t; var e = t[Symbol.toPrimitive]; if (void 0 !== e) { var i = e.call(t, r || "default"); if ("object" != _typeof(i)) return i; throw new TypeError("@@toPrimitive must return a primitive value."); } return ("string" === r ? String : Number)(t); }
/* eslint-disable import/no-extraneous-dependencies */

import React from 'react';
import PropTypes from 'prop-types';
import '@testing-library/jest-dom';
import '@testing-library/jest-dom/extend-expect';
import { getConfig, mergeConfig } from '@edx/frontend-platform';
import { configure as configureLogging } from '@edx/frontend-platform/logging';
import { configure as configureI18n } from '@edx/frontend-platform/i18n';
import { configure as configureAuth, MockAuthService } from '@edx/frontend-platform/auth';
import { render as rtlRender } from '@testing-library/react';
import { IntlProvider } from 'react-intl';
import AppProvider from '@edx/frontend-platform/react/AppProvider';
import appMessages from './i18n';

// These configuration values are usually set in webpack's EnvironmentPlugin however
// Jest does not use webpack so we need to set these so for testing
process.env.ACCESS_TOKEN_COOKIE_NAME = 'edx-jwt-cookie-header-payload';
process.env.ACCOUNT_PROFILE_URL = 'http://localhost:1995';
process.env.ACCOUNT_SETTINGS_URL = 'http://localhost:1997';
process.env.BASE_URL = 'localhost:1995';
process.env.CREDENTIALS_BASE_URL = 'http://localhost:18150';
process.env.CSRF_TOKEN_API_PATH = '/csrf/api/v1/token';
process.env.ECOMMERCE_BASE_URL = 'http://localhost:18130';
process.env.LANGUAGE_PREFERENCE_COOKIE_NAME = 'openedx-language-preference';
process.env.LMS_BASE_URL = 'http://localhost:18000';
process.env.LOGIN_URL = 'http://localhost:18000/login';
process.env.LOGOUT_URL = 'http://localhost:18000/logout';
process.env.MARKETING_SITE_BASE_URL = 'http://localhost:18000';
process.env.ORDER_HISTORY_URL = 'localhost:1996/orders';
process.env.REFRESH_ACCESS_TOKEN_ENDPOINT = 'http://localhost:18000/login_refresh';
process.env.SEGMENT_KEY = 'segment_whoa';
process.env.SITE_NAME = 'edX';
process.env.USER_INFO_COOKIE_NAME = 'edx-user-info';
process.env.LOGO_URL = 'https://edx-cdn.org/v3/default/logo.svg';
process.env.LOGO_TRADEMARK_URL = 'https://edx-cdn.org/v3/default/logo-trademark.svg';
process.env.LOGO_WHITE_URL = 'https://edx-cdn.org/v3/default/logo-white.svg';
process.env.FAVICON_URL = 'https://edx-cdn.org/v3/default/favicon.ico';
var MockLoggingService = /*#__PURE__*/_createClass(function MockLoggingService() {
  _classCallCheck(this, MockLoggingService);
  _defineProperty(this, "logInfo", jest.fn());
  _defineProperty(this, "logError", jest.fn());
});
export var authenticatedUser = {
  userId: 'abc123',
  username: 'Mock User',
  roles: [],
  administrator: false
};
export function initializeMockApp() {
  mergeConfig({
    INSIGHTS_BASE_URL: process.env.INSIGHTS_BASE_URL || null,
    STUDIO_BASE_URL: process.env.STUDIO_BASE_URL || null,
    TWITTER_URL: process.env.TWITTER_URL || null,
    BASE_URL: process.env.BASE_URL || null,
    LMS_BASE_URL: process.env.LMS_BASE_URL || null,
    LOGIN_URL: process.env.LOGIN_URL || null,
    LOGOUT_URL: process.env.LOGOUT_URL || null,
    REFRESH_ACCESS_TOKEN_ENDPOINT: process.env.REFRESH_ACCESS_TOKEN_ENDPOINT || null,
    ACCESS_TOKEN_COOKIE_NAME: process.env.ACCESS_TOKEN_COOKIE_NAME || null,
    CSRF_TOKEN_API_PATH: process.env.CSRF_TOKEN_API_PATH || null,
    LOGO_URL: process.env.LOGO_URL || null,
    SITE_NAME: process.env.SITE_NAME || null,
    authenticatedUser: {
      userId: 'abc123',
      username: 'Mock User',
      roles: [],
      administrator: false
    }
  });
  var loggingService = configureLogging(MockLoggingService, {
    config: getConfig()
  });
  var authService = configureAuth(MockAuthService, {
    config: getConfig(),
    loggingService: loggingService
  });

  // i18n doesn't have a service class to return.
  configureI18n({
    config: getConfig(),
    loggingService: loggingService,
    messages: [appMessages]
  });
  return {
    loggingService: loggingService,
    authService: authService
  };
}
function render(ui) {
  var _ref = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var _ref$store = _ref.store,
    store = _ref$store === void 0 ? null : _ref$store,
    renderOptions = _objectWithoutProperties(_ref, _excluded);
  var Wrapper = function Wrapper(_ref2) {
    var children = _ref2.children;
    return (
      /*#__PURE__*/
      // eslint-disable-next-line react/jsx-filename-extension
      React.createElement(IntlProvider, {
        locale: "en"
      }, /*#__PURE__*/React.createElement(AppProvider, {
        store: store
      }, children))
    );
  };
  Wrapper.propTypes = {
    children: PropTypes.node.isRequired
  };
  return rtlRender(ui, _objectSpread({
    wrapper: Wrapper
  }, renderOptions));
}

// Re-export everything.
export * from '@testing-library/react';

// Override `render` method.
export { render };