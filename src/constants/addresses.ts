import { SupportedChainId } from './chains';

type AddressMap = { [chainId: number]: string };

export const ARENA_ADDRESS: AddressMap = {
  [SupportedChainId.RINKEBY]: '0x99b4ba32a258Add555B751C8C8B6a6673a284247',
};
