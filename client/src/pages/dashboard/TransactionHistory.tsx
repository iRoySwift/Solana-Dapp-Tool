import {
    Avatar,
    List,
    ListItem,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Stack,
    Typography,
} from "@mui/material";
import React from "react";
import {
    Inbox as InboxIcon,
    CardGiftcard as CardGiftcardIcon,
    Sms as SmsIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";

interface Props {}
const AnalyticsReport: React.FC<Props> = () => {
    return (
        <List sx={{ px: 0, py: 0 }}>
            <ListItem disablePadding>
                <ListItemButton divider>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: "success.main",
                                bgcolor: "success.lighter",
                            }}>
                            <InboxIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1">
                                Order #002434
                            </Typography>
                        }
                        secondary="Today, 2:00 AM"
                    />
                    <ListItemSecondaryAction>
                        <Stack>
                            <Typography variant="subtitle1" noWrap>
                                + $1430
                            </Typography>
                            <Typography variant="h6" noWrap color="secondary">
                                78%
                            </Typography>
                        </Stack>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton divider>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: "primary.main",
                                bgcolor: "primary.lighter",
                            }}>
                            <CardGiftcardIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1">
                                Order #452464
                            </Typography>
                        }
                        secondary="Today, 2:00 AM"
                    />
                    <ListItemSecondaryAction>
                        <Stack>
                            <Typography variant="subtitle1" noWrap>
                                + $320
                            </Typography>
                            <Typography variant="h6" noWrap color="secondary">
                                8%
                            </Typography>
                        </Stack>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton divider>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: "error.main",
                                bgcolor: "error.lighter",
                            }}>
                            <SmsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1">
                                Order #102434
                            </Typography>
                        }
                        secondary="Today, 2:00 AM"
                    />
                    <ListItemSecondaryAction>
                        <Stack>
                            <Typography variant="subtitle1" noWrap>
                                + $540
                            </Typography>
                            <Typography variant="h6" noWrap color="secondary">
                                7%
                            </Typography>
                        </Stack>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
            <ListItem disablePadding>
                <ListItemButton divider>
                    <ListItemAvatar>
                        <Avatar
                            sx={{
                                color: "warning.main",
                                bgcolor: "warning.lighter",
                            }}>
                            <SettingsIcon />
                        </Avatar>
                    </ListItemAvatar>
                    <ListItemText
                        primary={
                            <Typography variant="subtitle1">
                                Order #982434
                            </Typography>
                        }
                        secondary="Today, 2:00 AM"
                    />
                    <ListItemSecondaryAction>
                        <Stack>
                            <Typography variant="subtitle1" noWrap>
                                + $123
                            </Typography>
                            <Typography variant="h6" noWrap color="secondary">
                                23%
                            </Typography>
                        </Stack>
                    </ListItemSecondaryAction>
                </ListItemButton>
            </ListItem>
        </List>
    );
};
export default AnalyticsReport;
