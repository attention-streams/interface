import { JsonRpcProvider } from '@ethersproject/providers';

import { NETWORK_URLS, SupportedChainId } from './chains';

export const Providers: { [chainId: number]: JsonRpcProvider } = {
  [SupportedChainId.GOERLI]: new JsonRpcProvider(NETWORK_URLS[SupportedChainId.GOERLI]),
};
