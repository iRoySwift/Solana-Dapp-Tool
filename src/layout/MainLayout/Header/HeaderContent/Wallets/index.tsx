import React from "react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Box } from "@mui/material";

interface Props {}
const Wallets: React.FC<Props> = () => {
    return (
        <Box sx={{ flexGrow: 0, ml: 0.75 }}>
            <WalletMultiButton
                style={{ width: 180, justifyContent: "center" }}
            />
        </Box>
    );
};
export default Wallets;
