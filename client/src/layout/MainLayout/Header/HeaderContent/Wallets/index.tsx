import React, { useRef, useState } from "react";
import { AccountBalanceWallet as AccountBalanceWalletIcon } from "@mui/icons-material";
import {
    Box,
    IconButton,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Popover,
    Typography,
} from "@mui/material";
import InboxIcon from "@mui/icons-material/Inbox";
import DraftsIcon from "@mui/icons-material/Drafts";
import Phantom from "@/assets/images/icons/phantom.svg";

const iconBackColorOpen = "grey.300";
const iconBackColor = "grey.100";

interface Props {}
const Wallet: React.FC<Props> = () => {
    const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
        null
    );

    const handleToggle = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        console.log("ss");

        setAnchorEl(null);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popover" : undefined;
    return (
        <>
            <Box sx={{ ml: 0.75 }}>
                <IconButton
                    aria-describedby={id}
                    disableRipple
                    color="secondary"
                    onClick={handleToggle}
                    sx={{
                        color: "text.primary",
                        bgcolor: open ? iconBackColorOpen : iconBackColor,
                    }}
                    aria-label="open wallet"
                    aria-controls={open ? "wallet" : undefined}
                    aria-haspopup="true">
                    <AccountBalanceWalletIcon />
                </IconButton>
            </Box>
            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: "bottom",
                    horizontal: "left",
                }}
                transformOrigin={{
                    vertical: "top",
                    horizontal: "left",
                }}
                slotProps={{
                    paper: {
                        sx: {
                            marginTop: 1,
                            marginRight: 3,
                        },
                    },
                }}>
                <Box sx={{ width: 200 }}>
                    <List sx={{ padding: 0 }}>
                        <ListItem disablePadding onClick={handleClose}>
                            <ListItemButton>
                                <ListItemIcon>
                                    <img
                                        src={Phantom}
                                        width={28}
                                        height={28}
                                        alt="phantom"
                                    />
                                </ListItemIcon>
                                <ListItemText primary="Phantom" sx={{ m: 1 }} />
                                <ListItemText
                                    primary="Detected"
                                    sx={{ textAlign: "end" }}
                                />
                            </ListItemButton>
                        </ListItem>
                    </List>
                </Box>
            </Popover>
        </>
    );
};
export default Wallet;
