import { WalletAdapterNetwork } from "@solana/wallet-adapter-base";
import { PhantomWalletAdapter } from "@solana/wallet-adapter-phantom";
import {
    ConnectionProvider,
    WalletProvider,
} from "@solana/wallet-adapter-react";
import { WalletDialogProvider } from "@solana/wallet-adapter-material-ui";
import { WalletModalProvider } from "@solana/wallet-adapter-react-ui";
import { clusterApiUrl } from "@solana/web3.js";
import React from "react";
import { styled } from "@mui/material";
import zIndex from "@mui/material/styles/zIndex";

const WalletModalProviderStyled = styled(WalletModalProvider)(() => ({
    zIndex: 2000,
}));

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
                    <WalletModalProviderStyled>
                        <Component {...props} />
                    </WalletModalProviderStyled>
                </WalletProvider>
            </ConnectionProvider>
        );
    };
export default withWalletContent;
