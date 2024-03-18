import React from "react";
import { WalletModalButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";

interface Props {}
const Wallet: React.FC<Props> = () => {
    return <WalletModalButton style={{ background: "#512da8" }} />;
};
export default Wallet;
