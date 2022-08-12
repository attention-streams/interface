import { FAKE_BLOCK_HASH } from '../../fake_tx_data';
import MULTICALL2_ABI from '../../../../src/abis/MULTICALL2.json';
import { CustomizedBridgeContext } from '../CustomizedBridge';
import { AbiHandler } from '../AbiHandler';

function isTheSameAddress(address1: string, address2: string) {
  return address1.toLowerCase() === address2.toLowerCase();
}

export class BaseMulticallHandler extends AbiHandler {
  abi = MULTICALL2_ABI;

  async tryBlockAndAggregate(context: CustomizedBridgeContext, decodedInput: any[]) {
    const [_requireSuccess, calls] = decodedInput;
    const results: any[] = [];
    for (const call of calls) {
      const [callAddress, callInput] = call;
      for (const contractAddress in context.handlers) {
        if (isTheSameAddress(contractAddress, callAddress)) {
          await context.handlers[contractAddress].handleCall(context, callInput, (r: string) =>
            results.push([true, r]),
          );
        }
      }
    }
    return [0, FAKE_BLOCK_HASH, results];
  }
}

export const getMulticallHandler = () => new BaseMulticallHandler();
