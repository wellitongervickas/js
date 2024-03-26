import { mintWithSignature as generatedMintWithSignature } from "../__generated__/ISignatureMintERC721/write/mintWithSignature.js";

/**
 * Mints a new ERC721 token with the given minter signature
 * @param options - The transaction options.
 * @example
 * ```ts
 * import { mintWithSignature } from "thirdweb/extensions/erc721";
 * const tx = await mintWithSignature({
 *   contract,
 *   payload,
 *   signature: "0x...",
 * });
 * ```
 * @extension ERC721
 * @returns A promise that resolves to the transaction result.
 */
export const mintWithSignature = generatedMintWithSignature;

/**
 *
 * @internal
 */
export async function generateMintSignature() {
  return "0x";
}
