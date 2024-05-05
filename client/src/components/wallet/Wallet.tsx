'use client';

import React from 'react';
import '@solana/wallet-adapter-react-ui/styles.css';
import dynamic from 'next/dynamic';

const WalletMultiButton = dynamic(
  async () =>
    (await import('@solana/wallet-adapter-react-ui')).WalletMultiButton,
  { ssr: false },
);

interface Props {}
const Wallet: React.FC<Props> = () => {
  return <WalletMultiButton style={{ background: '#512da8' }} />;
};
export default Wallet;
