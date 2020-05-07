/* eslint-disable @typescript-eslint/no-explicit-any */
import Web3 from 'web3';
import { reduce, each } from 'lodash';
import decoder from 'abi-decoder-web3jsfix';
import abis from 'abis.json';

function getSignatureMap(): object {
  const web3 = new Web3();

  return reduce(
    abis,
    (acc, contracts, ver) => {
      reduce(
        contracts,
        (accum: any, methods, contract) => {
          each(methods, (method) => {
            if (method.type !== 'function') return;

            const abiVer = { ver, contract };
            const hash = web3.eth.abi.encodeFunctionSignature(method);

            if (Array.isArray(accum[hash])) {
              accum[hash].push(abiVer);
            } else {
              accum[hash] = [abiVer];
            }
          });
          return accum;
        },
        acc
      );
      return acc;
    },
    {}
  );
}

function decodeInput(input: string): object {
  if (!input) return null;
  const xInput = `0x${input}`;
  const signatures: any = getSignatureMap();

  // find signature
  const method = xInput.slice(0, 10);
  const abiVersions = signatures[method];
  if (!Array.isArray(abiVersions)) return null;
  const abiVer = abiVersions[0];
  // eslint-disable-next-line @typescript-eslint/ban-ts-ignore
  // @ts-ignore
  const abi = abis[abiVer.ver][abiVer.contract];
  if (!abi) throw new Error('Could not find abi');
  decoder.addABI(abi);
  // decode
  const decoded = decoder.decodeMethod(xInput);
  return { decoded, abiVersions };
}

export default decodeInput;
