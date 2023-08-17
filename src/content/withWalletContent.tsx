import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";

// const WalletModalProviderStyled = styled(WalletModalProvider)(() => ({
//     zIndex: 2000,
// }));

interface Props {}
const withWalletContent =
    (Component): React.FC<Props> =>
    props => {
        const network = WalletAdapterNetwork.Devnet;
        const endpoint = clusterApiUrl(network);
        const wallets = [new PhantomWalletAdapter()];
        return (
            <ConnectionProvider endpoint={endpoint}>
                <WalletProvider wallets={wallets} autoConnect>
                    <WalletModalProvider>
                        <Component {...props} />
                    </WalletModalProvider>
                </WalletProvider>
            </ConnectionProvider>
        );
    };
export default withWalletContent;
