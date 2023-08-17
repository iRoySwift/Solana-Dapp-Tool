import { Box, CircularProgress } from "@mui/material";
import React from "react";

interface Props {}
const Loading: React.FC<Props> = () => {
    return (
        <Box
            sx={{
                position: "fixed",
                top: 0,
                left: 0,
                right: 0,
                bottom: 0,
                backgroundColor: "rgba(0, 0, 0, 0.5)",
                zIndex: 2000,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
            }}>
            <CircularProgress
                sx={{
                    background: "transparent",
                }}
            />
        </Box>
    );
};
export default Loading;
