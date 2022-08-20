import { BigNumber } from '@ethersproject/bignumber/lib.esm';
import ArenaJson from '@attentionstreams/contracts/artifacts/contracts/main/Arena.sol/Arena.json';

import { AbiHandler } from '../AbiHandler';
import { CustomizedBridgeContext } from '../CustomizedBridge';
import { choices } from '../../data';

function isTheSameAddress(address1: string, address2: string) {
  return address1.toLowerCase() === address2.toLowerCase();
}

export class ArenaHandler extends AbiHandler {
  abi = ArenaJson.abi;

  methods = {
    async nextChoiceId(context: CustomizedBridgeContext, decodedInput: [BigNumber]) {
      const [topicId] = decodedInput;
      return [Object.values(choices[topicId.toNumber()]).length];
    },

    async topicChoices(context: CustomizedBridgeContext, decodedInput: [BigNumber, BigNumber]) {
      const [topicId, choiceId] = decodedInput;
      return [Object.values(choices[topicId.toNumber()][choiceId.toNumber()])];
    },
  };
}
