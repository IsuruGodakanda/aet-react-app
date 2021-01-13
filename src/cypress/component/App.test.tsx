import App from 'App';
import { mount } from 'cypress-react-unit-test';
import React from 'react';

describe('App', () => {
  it('renders app component', () => {
    mount(<App>Test</App>);
  });
});
