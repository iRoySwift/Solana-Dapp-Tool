// import MiniDrawerStyled from "@/layout/MainLayout/Drawer/MiniDrawerStyled";
import { Settings as SettingsIcon } from "@mui/icons-material";
import { Box, Drawer, IconButton, Paper, useTheme } from "@mui/material";
import { Theme } from "@mui/material/styles";
import React, { useState } from "react";

interface Props {}
const LayoutSetting: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const theme = useTheme<Theme>();
    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const iconBackColorOpen = "grey.300";
    const iconBackColor = "grey.100";
    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    aria-label="setting layout"
                    disableRipple
                    color="secondary"
                    sx={{
                        color: "text.primary",
                        bgcolor: open ? iconBackColorOpen : iconBackColor,
                        "& .MuiSvgIcon-root": {
                            animation: "animate 2s ease-in-out infinite",
                            "@keyframes animate": {
                                "0%": {
                                    transform: "rotate(0deg)",
                                },
                                "50%,100%": {
                                    transform: "rotate(360deg)",
                                },
                            },
                        },
                    }}
                    onClick={handleOpen}>
                    <SettingsIcon fontSize="small" />
                </IconButton>
            </Box>
            <Drawer
                anchor="right"
                variant="temporary"
                open={open}
                onClose={handleClose}>
                <Paper
                    sx={{
                        boxShadow: theme.shadows[0],
                        height: "100%",
                        maxWidth: 420,
                        minWidth: 285,
                        width: "100%",
                    }}>
                    ss
                </Paper>
            </Drawer>
        </>
    );
};
export default LayoutSetting;
