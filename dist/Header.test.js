/* eslint-disable react/prop-types */
import React from 'react';
import { IntlProvider } from '@edx/frontend-platform/i18n';
import TestRenderer from 'react-test-renderer';
import { AppContext } from '@edx/frontend-platform/react';
import { Context as ResponsiveContext } from 'react-responsive';
import Header from './index';
var HeaderComponent = function HeaderComponent(_ref) {
  var width = _ref.width,
    contextValue = _ref.contextValue;
  return /*#__PURE__*/React.createElement(ResponsiveContext.Provider, {
    value: width
  }, /*#__PURE__*/React.createElement(IntlProvider, {
    locale: "en",
    messages: {}
  }, /*#__PURE__*/React.createElement(AppContext.Provider, {
    value: contextValue
  }, /*#__PURE__*/React.createElement(Header, null))));
};
describe('<Header />', function () {
  it('renders correctly for anonymous desktop', function () {
    var contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL
      }
    };
    var component = /*#__PURE__*/React.createElement(HeaderComponent, {
      width: {
        width: 1280
      },
      contextValue: contextValue
    });

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    var wrapper = TestRenderer.create(component);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('renders correctly for authenticated desktop', function () {
    var contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false
      },
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL
      }
    };
    var component = /*#__PURE__*/React.createElement(HeaderComponent, {
      width: {
        width: 1280
      },
      contextValue: contextValue
    });

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    var wrapper = TestRenderer.create(component);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('renders correctly for anonymous mobile', function () {
    var contextValue = {
      authenticatedUser: null,
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL
      }
    };
    var component = /*#__PURE__*/React.createElement(HeaderComponent, {
      width: {
        width: 500
      },
      contextValue: contextValue
    });

    // FIXME: react-test-renderer is deprecated. Convert to @testing-library/react.
    var wrapper = TestRenderer.create(component);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
  it('renders correctly for authenticated mobile', function () {
    var contextValue = {
      authenticatedUser: {
        userId: 'abc123',
        username: 'edX',
        roles: [],
        administrator: false
      },
      config: {
        LMS_BASE_URL: process.env.LMS_BASE_URL,
        SITE_NAME: process.env.SITE_NAME,
        LOGIN_URL: process.env.LOGIN_URL,
        LOGOUT_URL: process.env.LOGOUT_URL,
        LOGO_URL: process.env.LOGO_URL
      }
    };
    var component = /*#__PURE__*/React.createElement(HeaderComponent, {
      width: {
        width: 500
      },
      contextValue: contextValue
    });
    var wrapper = TestRenderer.create(component);
    expect(wrapper.toJSON()).toMatchSnapshot();
  });
});