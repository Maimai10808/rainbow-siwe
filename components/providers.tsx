"use client";

import "@rainbow-me/rainbowkit/styles.css";

import { ReactNode, useState } from "react";
import { SessionProvider } from "next-auth/react";
import { WagmiProvider } from "wagmi";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import {
  RainbowKitSiweNextAuthProvider,
  GetSiweMessageOptions,
} from "@rainbow-me/rainbowkit-siwe-next-auth";

import { wagmiConfig } from "@/lib/wagmi";

const getSiweMessageOptions: GetSiweMessageOptions = () => ({
  statement: "Sign in to my SIWE demo",
});

export function Providers({ children }: { children: ReactNode }) {
  const [queryClient] = useState(() => new QueryClient());

  return (
    <SessionProvider refetchInterval={0}>
      <WagmiProvider config={wagmiConfig}>
        <QueryClientProvider client={queryClient}>
          <RainbowKitSiweNextAuthProvider
            getSiweMessageOptions={getSiweMessageOptions}
          >
            <RainbowKitProvider>{children}</RainbowKitProvider>
          </RainbowKitSiweNextAuthProvider>
        </QueryClientProvider>
      </WagmiProvider>
    </SessionProvider>
  );
}
