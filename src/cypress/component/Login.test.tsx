import { mount } from 'cypress-react-unit-test';
import Login from 'Pages/auth/login';
import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import Store from 'Redux/Store';

describe('Login', () => {
  it('renders forgot password react link', () => {
    mount(
      <Provider store={Store}>
        <Router>
          <Login />
        </Router>
      </Provider>
    );
    cy.contains('Forgot password?').should('be.visible');
  });
});
