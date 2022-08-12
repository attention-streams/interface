// ***********************************************************
// This file is processed and loaded automatically before your test files.
//
// You can read more here:
// https://on.cypress.io/configuration
// ***********************************************************

// Import commands.ts using ES2015 syntax:
import './commands';
import { AbiHandler } from '../utils/ethbridge/AbiHandler';

declare global {
  namespace Cypress {
    interface Chainable {
      /**
       * Custom command to select DOM element by data-cy attribute.
       * @example cy.dataCy('greeting')
       */
      setupWeb3Bridge(): void;

      setAbiHandler(address: string, handler: AbiHandler): void;
    }
  }
}
