import {
    Avatar,
    Badge,
    ClickAwayListener,
    Divider,
    IconButton,
    List,
    ListItemAvatar,
    ListItemButton,
    ListItemSecondaryAction,
    ListItemText,
    Paper,
    Popper,
    Typography,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import { Box } from "@mui/system";
import React, { useRef, useState } from "react";
import {
    CardGiftcard as CardGiftcardIcon,
    Close as CloseIcon,
    NotificationsNone as NotificationsNoneIcon,
    Settings as SettingsIcon,
    Sms as SmsIcon,
} from "@mui/icons-material";
import Transitions from "@/components/@extended/Transitions";
import { Theme } from "@mui/material/styles";
import MainCard from "@/pages/OverviewComponents/components/MainCard";

interface Props {}
const Notification: React.FC<Props> = () => {
    const theme = useTheme<Theme>();
    const matchesXs = useMediaQuery(theme.breakpoints.down("md"));
    // const [anchorEl, setanchorEl] = useState<HTMLButtonElement | null>(null);
    const [open, setOpen] = useState<boolean>(false);
    const anchorEl = useRef<HTMLButtonElement>(null);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(
            "🚀 ~ file: Notification.tsx:34 ~ handleToggle ~ event:",
            event
        );
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (
            anchorEl.current &&
            anchorEl.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const iconBackColorOpen = "grey.300";
    const iconBackColor = "grey.100";

    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <IconButton
                ref={anchorEl}
                onClick={handleToggle}
                disableRipple
                color="secondary"
                sx={{
                    color: "text.primary",
                    bgcolor: open ? iconBackColorOpen : iconBackColor,
                }}
                aria-label="open profile"
                aria-controls={open ? "profile-grow" : undefined}
                aria-haspopup="true">
                <Badge badgeContent={4} color="primary">
                    <NotificationsNoneIcon fontSize="small" />
                </Badge>
            </IconButton>
            <Popper
                id="notification-popper"
                open={open}
                anchorEl={anchorEl.current}
                placement={"bottom-end"}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [matchesXs ? -5 : 0, 9],
                            },
                        },
                    ],
                }}>
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.shadows[0],
                                maxWidth: 420,
                                minWidth: 285,
                                width: "100%",
                                [theme.breakpoints.down("md")]: {
                                    maxWidth: 285,
                                },
                            }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard
                                    title="Notification"
                                    content={false}
                                    secondary={
                                        <IconButton
                                            aria-label="settings"
                                            onClick={handleToggle}>
                                            <CloseIcon fontSize="small" />
                                        </IconButton>
                                    }>
                                    <List
                                        component="nav"
                                        sx={{
                                            p: 0,
                                            "& .MuiListItemButton-root": {
                                                "& .MuiListItemSecondaryAction-root":
                                                    {
                                                        position: "relative",
                                                        right: "auto",
                                                        top: "auto",
                                                        ml: 1,
                                                        mt: "6px",
                                                        transform: "none",
                                                        alignSelf: "flex-start",
                                                    },
                                            },
                                        }}>
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        width: 36,
                                                        height: 36,
                                                        fontSize: "1rem",
                                                        color: "success.main",
                                                        bgcolor:
                                                            "success.lighter",
                                                    }}>
                                                    <CardGiftcardIcon fontSize="small" />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        It's{" "}
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1">
                                                            Cristina
                                                            danny&apos;s
                                                        </Typography>{" "}
                                                        birthday today.
                                                    </Typography>
                                                }
                                                secondary="2 min ago"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography
                                                    variant="caption"
                                                    noWrap>
                                                    3:00 am
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: "primary.main",
                                                        bgcolor:
                                                            "primary.lighter",
                                                    }}>
                                                    <SmsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1">
                                                            Aida Burg
                                                        </Typography>{" "}
                                                        commented your post.
                                                    </Typography>
                                                }
                                                secondary="5 August"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography
                                                    variant="caption"
                                                    noWrap>
                                                    6:00 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: "error.main",
                                                        bgcolor:
                                                            "error.lighter",
                                                    }}>
                                                    <SettingsIcon />
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        Your Profile is Complete
                                                        &nbsp;
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1">
                                                            60%
                                                        </Typography>{" "}
                                                    </Typography>
                                                }
                                                secondary="7 hours ago"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography
                                                    variant="caption"
                                                    noWrap>
                                                    2:45 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton>
                                            <ListItemAvatar>
                                                <Avatar
                                                    sx={{
                                                        color: "primary.main",
                                                        bgcolor:
                                                            "primary.lighter",
                                                    }}>
                                                    C
                                                </Avatar>
                                            </ListItemAvatar>
                                            <ListItemText
                                                primary={
                                                    <Typography variant="h6">
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1">
                                                            Cristina Danny
                                                        </Typography>{" "}
                                                        invited to join{" "}
                                                        <Typography
                                                            component="span"
                                                            variant="subtitle1">
                                                            Meeting.
                                                        </Typography>
                                                    </Typography>
                                                }
                                                secondary="Daily scrum meeting time"
                                            />
                                            <ListItemSecondaryAction>
                                                <Typography
                                                    variant="caption"
                                                    noWrap>
                                                    9:10 PM
                                                </Typography>
                                            </ListItemSecondaryAction>
                                        </ListItemButton>
                                        <Divider />
                                        <ListItemButton
                                            sx={{
                                                textAlign: "center",
                                                py: `${12}px !important`,
                                            }}>
                                            <ListItemText
                                                primary={
                                                    <Typography
                                                        variant="h6"
                                                        color="primary">
                                                        View All
                                                    </Typography>
                                                }
                                            />
                                        </ListItemButton>
                                    </List>
                                    <Divider />
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </Box>
    );
};
export default Notification;
