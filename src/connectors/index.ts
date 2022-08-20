import { InjectedConnector } from '@web3-react/injected-connector';

import { NetworkConnector } from './NetworkConnector';

import { FALLBACK_CHAIN_ID, NETWORK_URLS, SUPPORTED_CHAIN_IDS } from 'constants/chains';

export const network = new NetworkConnector({
  urls: NETWORK_URLS,
  defaultChainId: FALLBACK_CHAIN_ID,
});

export const injected = new InjectedConnector({
  supportedChainIds: SUPPORTED_CHAIN_IDS,
});
