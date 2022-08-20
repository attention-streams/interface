import { TEST_ADDRESS_NEVER_USE_SHORTENED } from '../utils/data';

describe('Wallet', () => {
  beforeEach(() => {
    cy.setupWeb3Bridge();
  });

  it('eager connects wallet', () => {
    cy.visit('/');
    cy.get('[data-testid=wallet-connect]').contains(TEST_ADDRESS_NEVER_USE_SHORTENED);
  });
});
