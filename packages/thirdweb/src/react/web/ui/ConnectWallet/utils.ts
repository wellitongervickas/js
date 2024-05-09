import { useEffect, useRef } from "react";
import type { ThirdwebClient } from "../../../../client/client.js";
import { getInAppWalletSDK } from "../../../../wallets/in-app/core/authentication/index.js";
import type { Wallet } from "../../../../wallets/interfaces/wallet.js";

export function usePreFetchIframe(props: {
  client: ThirdwebClient;
  wallets: Wallet[];
}) {
  const hasInitializedIframe = useRef(false);
  useEffect(() => {
    // pre-load the iframe
    if (props.wallets.find((w) => w.id === "inApp")) {
      getInAppWalletSDK(props.client);
      hasInitializedIframe.current = true;
    }
  }, [props.wallets, props.client]);
}
