import type { Chain } from "../src/types";
export default {
  "chain": "milkAda",
  "chainId": 2001,
  "explorers": [
    {
      "name": "Blockscout",
      "url": "https://explorer-mainnet-cardano-evm.c1.milkomeda.com",
      "standard": "none"
    }
  ],
  "faucets": [],
  "infoURL": "https://milkomeda.com",
  "name": "Milkomeda C1 Mainnet",
  "nativeCurrency": {
    "name": "milkAda",
    "symbol": "mADA",
    "decimals": 18
  },
  "networkId": 2001,
  "rpc": [
    "https://2001.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://rpc-mainnet-cardano-evm.c1.milkomeda.com",
    "wss://rpc-mainnet-cardano-evm.c1.milkomeda.com"
  ],
  "shortName": "milkAda",
  "slug": "milkomeda-c1",
  "testnet": false
} as const satisfies Chain;