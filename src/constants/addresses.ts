import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };

export const ARENA_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0x29eB89E03F317B87aB3510bE0ED748CBab916D21',
};

export const MULTICALL2_ADDRESS: AddressMap = {
  [SupportedChainId.GOERLI]: '0xbD8f7a4ADb8dd775Bb8F0746C2A2E177110E00F8',
};
