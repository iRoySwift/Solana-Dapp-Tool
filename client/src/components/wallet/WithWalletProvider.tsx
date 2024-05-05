'use client';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';
import {
  ConnectionProvider,
  WalletProvider,
} from '@solana/wallet-adapter-react';
import { clusterApiUrl } from '@solana/web3.js';
import React, { useMemo } from 'react';
import {
  PhantomWalletAdapter,
  SolflareWalletAdapter,
} from '@solana/wallet-adapter-wallets';
import { WalletModalProvider } from '@solana/wallet-adapter-react-ui';
import { useSolanaStore } from '@/store';

interface Props {
  children: React.ReactNode;
}
const WithWalletProvider: React.FC<Props> = ({ children }) => {
  const { clusterUrl } = useSolanaStore();

  const wallets = useMemo(
    () => [
      // new PhantomWalletAdapter(),
      // new SolflareWalletAdapter({ network }),
    ],
    [],
  );
  return (
    <ConnectionProvider endpoint={clusterUrl}>
      <WalletProvider wallets={wallets} autoConnect>
        <WalletModalProvider>{children}</WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
};
export default WithWalletProvider;
