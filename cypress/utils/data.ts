import { shortenAddress } from '../../src/utils';
import { Wallet } from '@ethersproject/wallet';

// todo: figure out how env vars actually work in CI
// const TEST_PRIVATE_KEY = Cypress.env('INTEGRATION_TEST_PRIVATE_KEY')
export const TEST_PRIVATE_KEY = '0xe580410d7c37d26c6ad1a837bbae46bc27f9066a466fb3a66e770523b4666d19';
export const TEST_PRIVATE_KEY_2 = '44e229c344b78a83ebe4cbd9e8c4c368f07471465f686a33d0a6e7d9e9cf2449';

// address of the above key
export const TEST_ADDRESS_NEVER_USE = new Wallet(TEST_PRIVATE_KEY).address;
export const TEST_ADDRESS_NEVER_USE_2 = new Wallet(TEST_PRIVATE_KEY_2).address;

export const TEST_ADDRESS_NEVER_USE_SHORTENED = shortenAddress(TEST_ADDRESS_NEVER_USE);

export const SAMPLE_ERROR_MESSAGE = 'An error occurred';
