import type { AbiParameterToPrimitiveType } from "abitype";
import type {
  BaseTransactionOptions,
  WithOverrides,
} from "../../../../../transaction/types.js";
import { prepareContractCall } from "../../../../../transaction/prepare-contract-call.js";
import { encodeAbiParameters } from "../../../../../utils/abi/encodeAbiParameters.js";
import { once } from "../../../../../utils/promise/once.js";
import type { ThirdwebContract } from "../../../../../contract/contract.js";
import { detectMethod } from "../../../../../utils/bytecode/detectExtension.js";

/**
 * Represents the parameters for the "withdraw" function.
 */
export type WithdrawParams = WithOverrides<{
  tokenIds: AbiParameterToPrimitiveType<{
    type: "uint256[]";
    name: "tokenIds";
  }>;
}>;

export const FN_SELECTOR = "0x983d95ce" as const;
const FN_INPUTS = [
  {
    type: "uint256[]",
    name: "tokenIds",
  },
] as const;
const FN_OUTPUTS = [] as const;

/**
 * Checks if the `withdraw` method is supported by the given contract.
 * @param contract The ThirdwebContract.
 * @returns A promise that resolves to a boolean indicating if the `withdraw` method is supported.
 * @extension ERC721
 * @example
 * ```ts
 * import { isWithdrawSupported } from "thirdweb/extensions/erc721";
 *
 * const supported = await isWithdrawSupported(contract);
 * ```
 */
export async function isWithdrawSupported(contract: ThirdwebContract<any>) {
  return detectMethod({
    contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
  });
}

/**
 * Encodes the parameters for the "withdraw" function.
 * @param options - The options for the withdraw function.
 * @returns The encoded ABI parameters.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeWithdrawParams } "thirdweb/extensions/erc721";
 * const result = encodeWithdrawParams({
 *  tokenIds: ...,
 * });
 * ```
 */
export function encodeWithdrawParams(options: WithdrawParams) {
  return encodeAbiParameters(FN_INPUTS, [options.tokenIds]);
}

/**
 * Encodes the "withdraw" function into a Hex string with its parameters.
 * @param options - The options for the withdraw function.
 * @returns The encoded hexadecimal string.
 * @extension ERC721
 * @example
 * ```ts
 * import { encodeWithdraw } "thirdweb/extensions/erc721";
 * const result = encodeWithdraw({
 *  tokenIds: ...,
 * });
 * ```
 */
export function encodeWithdraw(options: WithdrawParams) {
  // we do a "manual" concat here to avoid the overhead of the "concatHex" function
  // we can do this because we know the specific formats of the values
  return (FN_SELECTOR +
    encodeWithdrawParams(options).slice(2)) as `${typeof FN_SELECTOR}${string}`;
}

/**
 * Prepares a transaction to call the "withdraw" function on the contract.
 * @param options - The options for the "withdraw" function.
 * @returns A prepared transaction object.
 * @extension ERC721
 * @example
 * ```ts
 * import { withdraw } from "thirdweb/extensions/erc721";
 *
 * const transaction = withdraw({
 *  contract,
 *  tokenIds: ...,
 *  overrides: {
 *    ...
 *  }
 * });
 *
 * // Send the transaction
 * ...
 *
 * ```
 */
export function withdraw(
  options: BaseTransactionOptions<
    | WithdrawParams
    | {
        asyncParams: () => Promise<WithdrawParams>;
      }
  >,
) {
  const asyncOptions = once(async () => {
    return "asyncParams" in options ? await options.asyncParams() : options;
  });

  return prepareContractCall({
    contract: options.contract,
    method: [FN_SELECTOR, FN_INPUTS, FN_OUTPUTS] as const,
    params: async () => {
      const resolvedOptions = await asyncOptions();
      return [resolvedOptions.tokenIds] as const;
    },
    value: async () => (await asyncOptions()).overrides?.value,
    accessList: async () => (await asyncOptions()).overrides?.accessList,
    gas: async () => (await asyncOptions()).overrides?.gas,
    gasPrice: async () => (await asyncOptions()).overrides?.gasPrice,
    maxFeePerGas: async () => (await asyncOptions()).overrides?.maxFeePerGas,
    maxPriorityFeePerGas: async () =>
      (await asyncOptions()).overrides?.maxPriorityFeePerGas,
    nonce: async () => (await asyncOptions()).overrides?.nonce,
    extraGas: async () => (await asyncOptions()).overrides?.extraGas,
  });
}
