import {
    Chat as ChatIcon,
    FormatListBulleted as FormatListBulletedIcon,
    HelpOutline as HelpOutlineIcon,
    Lock as LockIcon,
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
                    <HelpOutlineIcon />
                </ListItemIcon>
                <ListItemText primary="Support" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 1}
                onClick={() => handleListItemClick(1)}>
                <ListItemIcon>
                    <PersonIcon />
                </ListItemIcon>
                <ListItemText primary="Account Settings" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 2}
                onClick={() => handleListItemClick(2)}>
                <ListItemIcon>
                    <LockIcon />
                </ListItemIcon>
                <ListItemText primary="Privacy Center" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 3}
                onClick={() => handleListItemClick(3)}>
                <ListItemIcon>
                    <ChatIcon />
                </ListItemIcon>
                <ListItemText primary="Feedback" />
            </ListItemButton>
            <ListItemButton
                selected={selectedIndex === 4}
                onClick={() => handleListItemClick(4)}>
                <ListItemIcon>
                    <FormatListBulletedIcon />
                </ListItemIcon>
                <ListItemText primary="History" />
            </ListItemButton>
        </List>
    );
};
export default ProfileTab;
