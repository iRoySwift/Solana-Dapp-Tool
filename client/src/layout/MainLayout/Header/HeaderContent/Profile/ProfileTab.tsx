import {
    AccountBalanceWallet as AccountBalanceWalletIcon,
    BorderColor as BorderColorIcon,
    ListAlt as ListAltIcon,
    Logout as LogoutIcon,
    Person as PersonIcon,
} from "@mui/icons-material";
import {
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import React, { useState } from "react";

interface Props {}
const ProfileTab: React.FC<Props> = () => {
    const theme = useTheme();
    const [selectedIndex, setSelectedIndex] = useState(0);
    const handleListItemClick = (v: number) => {
        setSelectedIndex(v);
    };
    return (
        <List
            component="nav"
            sx={{
                p: 0,
                "& .MuiListItemIcon-root": {
                    minWidth: 32,
                    color: theme.palette.grey[500],
                },
            }}>
            <ListItemButton
                selected={selectedIndex === 0}
                onClick={() => handleListItemClick(0)}>
                <ListItemIcon>
                    <BorderColorIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Edit Profile" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => handleListItemClick(1)}>
                <ListItemIcon>
                    <PersonIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="View Profile" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                onClick={() => handleListItemClick(2)}>
                <ListItemIcon>
                    <ListAltIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Social Profile" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={() => handleListItemClick(3)}>
                <ListItemIcon>
                    <AccountBalanceWalletIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Billing" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={() => handleListItemClick(4)}>
                <ListItemIcon>
                    <LogoutIcon fontSize="small" />
                </ListItemIcon>
                <ListItemText primary="Logout" />
            </ListItemButton>
        </List>
    );
};
export default ProfileTab;
