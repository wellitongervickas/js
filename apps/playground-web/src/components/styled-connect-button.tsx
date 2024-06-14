"use client";

import { THIRDWEB_CLIENT } from "@/lib/client";
import { useTheme } from "next-themes";
import { ConnectButton } from "thirdweb/react";
import type { ConnectButtonProps } from "thirdweb/react";
import { ecosystemWallet } from "thirdweb/wallets";

const wallet = ecosystemWallet("ecosystem.hooli", {
  partnerId: "80ea22d8-7471-43e9-9f20-961f6fa88771",
});
export function StyledConnectButton(
  props?: Omit<ConnectButtonProps, "client" | "theme">,
) {
  const { theme } = useTheme();

  return (
    <ConnectButton
      wallets={[wallet]}
      client={THIRDWEB_CLIENT}
      theme={theme === "light" ? "light" : "dark"}
      {...props}
    />
  );
}
