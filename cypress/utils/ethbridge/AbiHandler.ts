import { decodeEthCall, encodeEthResult } from './abiutils';
import { CustomizedBridgeContext } from './CustomizedBridge';

export class AbiHandler {
  abi = {};

  methods: { [name: string]: (...args: any[]) => any } = {};

  async handleCall(context: CustomizedBridgeContext, data: string, setResult?: (arg0: string) => void) {
    const decoded = decodeEthCall(this.abi, data);
    console.log('decoded');
    console.log(decoded);
    if (decoded.method === 'multicall') {
      const [deadline, [data]] = decoded.inputs;
      await this.handleCall(context, data, setResult);
      return;
    }
    const method = this.methods[decoded.method];
    if (method) {
      const res = await method(context, decoded.inputs);
      setResult?.(encodeEthResult(this.abi, decoded.method, res));
    }
  }

  async handleTransaction(context: CustomizedBridgeContext, data: string, setResult: (arg0: string) => void) {
    await this.handleCall(context, data);
    setResult(context.getFakeTransactionHash());
  }
}
