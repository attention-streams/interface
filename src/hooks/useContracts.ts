import { Contract } from '@ethersproject/contracts';
import ArenaJson from '@attentionstreams/contracts/artifacts/contracts/main/Arena.sol/Arena.json';
import { ARENA_ADDRESS, MULTICALL2_ADDRESS } from 'constants/addresses';
import useActiveWeb3React from 'hooks/useActiveWeb3React';
import { useMemo } from 'react';
import { Arena } from 'types/contracts/Arena';
import useWeb3React from 'hooks/useWeb3';
import MULTICALL2_ABI from 'abis/MULTICALL2.json';

import { getContract } from '../utils';

const { abi: ArenaABI } = ArenaJson;

// returns null on errors
export function useContract<T extends Contract = Contract>(
  addressOrAddressMap: string | { [chainId: number]: string } | undefined,
  ABI: any,
  withSignerIfPossible = true,
): T | null {
  const { library, account, chainId } = useActiveWeb3React();

  return useMemo(() => {
    if (!addressOrAddressMap || !ABI || !library || !chainId) return null;
    let address: string | undefined;
    if (typeof addressOrAddressMap === 'string') address = addressOrAddressMap;
    else address = addressOrAddressMap[chainId];
    if (!address) return null;
    try {
      return getContract(address, ABI, library, withSignerIfPossible && account ? account : undefined);
    } catch (error) {
      console.error('Failed to get contract', error);
      return null;
    }
  }, [addressOrAddressMap, ABI, library, chainId, withSignerIfPossible, account]) as T;
}

export function useArenaContract() {
  return useContract<Arena>(ARENA_ADDRESS, ArenaABI, true);
}

export function useMulticall2Contract() {
  const { chainId } = useWeb3React();
  const address = useMemo(() => (chainId ? MULTICALL2_ADDRESS[chainId] : undefined), [chainId]);
  return useContract(address, MULTICALL2_ABI);
}
