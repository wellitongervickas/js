import type { Chain } from "../src/types";
export default {
  "chain": "DIONE",
  "chainId": 131313,
  "explorers": [],
  "faucets": [
    "https://faucet.dioneprotocol.com/"
  ],
  "features": [
    {
      "name": "EIP155"
    }
  ],
  "infoURL": "https://www.dioneprotocol.com/",
  "name": "Odyssey Chain (Testnet)",
  "nativeCurrency": {
    "name": "DIONE",
    "symbol": "DIONE",
    "decimals": 18
  },
  "networkId": 131313,
  "rpc": [
    "https://131313.rpc.thirdweb.com/${THIRDWEB_API_KEY}",
    "https://testnode.dioneprotocol.com/ext/bc/D/rpc"
  ],
  "shortName": "DIONE",
  "slug": "odyssey-chain-testnet",
  "testnet": true
} as const satisfies Chain;