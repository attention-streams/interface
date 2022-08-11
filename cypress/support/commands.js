// ***********************************************
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************

/* eslint-disable no-undef */

import { getCustomizedBridge } from '../utils/ethbridge/customizedbridge';

Cypress.Commands.add('shouldBeCalled', (alias, timesCalled) => {
  expect(
    cy.state('requests').filter((call) => call.alias === alias),
    `${alias} should have been called ${timesCalled} times`,
  ).to.have.length(timesCalled);
});

// https://github.com/cypress-io/cypress/issues/2752#issuecomment-1039285381
Cypress.on('window:before:load', (win) => {
  let copyText;

  if (!win.navigator.clipboard) {
    win.navigator.clipboard = {
      __proto__: {},
    };
  }

  win.navigator.clipboard.__proto__.writeText = (text) => (copyText = text);
  win.navigator.clipboard.__proto__.readText = () => copyText;
});

Cypress.Commands.add('setupWeb3Bridge', () => {
  cy.on('window:before:load', (win) => {
    win.ethereum = getCustomizedBridge();
  });
});

beforeEach(() => {
  cy.on('window:before:load', (win) => {
    cy.spy(win.console, 'error').as('spyWinConsoleError');
    cy.spy(win.console, 'warn').as('spyWinConsoleWarn');
  });
});

afterEach(() => {
  cy.get('@spyWinConsoleError').should('have.callCount', 0);
  cy.get('@spyWinConsoleWarn').should('have.callCount', 0);
});
