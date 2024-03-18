import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { clusterApiUrl } from "@solana/web3.js";
import React, { useMemo } from "react";
import {
    PhantomWalletAdapter,
    SolflareWalletAdapter,
} from "@solana/wallet-adapter-wallets";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";

interface Props {
    children: React.ReactNode;
}
const WithWalletProvider: React.FC<Props> = ({ children }) => {
    const network = WalletAdapterNetwork.Devnet;
    const endpoint = clusterApiUrl(network);
    const wallets = useMemo(
        () => [
            new PhantomWalletAdapter(),
            new SolflareWalletAdapter({ network }),
        ],
        [network]
    );
    return (
        <ConnectionProvider endpoint={endpoint}>
            <WalletProvider wallets={wallets} autoConnect>
                <WalletModalProvider>{children}</WalletModalProvider>
            </WalletProvider>
        </ConnectionProvider>
    );
};
export default WithWalletProvider;
