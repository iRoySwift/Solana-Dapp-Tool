import {
    Avatar,
    Box,
    ButtonBase,
    CardContent,
    ClickAwayListener,
    Grid,
    IconButton,
    Paper,
    Popper,
    Stack,
    Tab,
    Tabs,
    Typography,
    useTheme,
} from "@mui/material";
import React, { useRef, useState } from "react";
import avatar1 from "@/assets/images/users/avatar-1.png";
import Transitions from "@/components/@extended/Transitions";
import MainCard from "@/pages/OverviewComponents/components/MainCard";
import { Theme } from "@mui/material/styles";
import {
    Logout as LogoutIcon,
    Person as PersonIcon,
    Settings as SettingsIcon,
} from "@mui/icons-material";
import ProfileTab from "./ProfileTab";
import SettingTab from "./SettingTab";

interface TabPanelProps {
    children?: React.ReactNode;
    index: number;
    value: number;
}

function a11yProps(index: number) {
    return {
        id: `simple-tab-${index}`,
        "aria-controls": `profile-${index}`,
    };
}

function TabPanel(props: TabPanelProps) {
    const { children, value, index, ...other } = props;
    return (
        <div
            role="tabpanel"
            hidden={value !== index}
            id={`profile-${index}`}
            aria-labelledby={`profile-tab-${index}`}
            {...other}>
            {value === index && children}
        </div>
    );
}

interface Props {}
const Profile: React.FC<Props> = () => {
    const theme = useTheme<Theme>();
    const [open, setOpen] = useState<boolean>(false);
    const archorEl = useRef<HTMLButtonElement>(null);
    const [value, setValue] = useState<number>(0);

    const handleToggle = (event: React.MouseEvent<HTMLButtonElement>) => {
        console.log(
            "🚀 ~ file: Notification.tsx:34 ~ handleToggle ~ event:",
            event
        );
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = (event: MouseEvent | TouchEvent) => {
        if (
            archorEl.current &&
            archorEl.current.contains(event.target as HTMLElement)
        ) {
            return;
        }
        setOpen(false);
    };

    const handleLogout = () => {};
    const handleChange = (event: React.MouseEvent, newValue: number) => {
        console.log("🚀 ~ file: index.tsx:56 ~ handleChange ~ event:", event);
        setValue(newValue);
    };
    const iconBackColorOpen = "grey.300";
    // const iconBackColor = "grey.100";
    return (
        <Box sx={{ flexShrink: 0, ml: 0.75 }}>
            <ButtonBase
                ref={archorEl}
                onClick={handleToggle}
                aria-label="open profile"
                aria-haspopup="true"
                sx={{
                    p: 0.25,
                    bgcolor: open ? iconBackColorOpen : "transparent",
                    "&:hover": { bgcolor: "secondary.lighter" },
                }}>
                <Stack
                    direction={"row"}
                    spacing={2}
                    alignItems="center"
                    sx={{ p: 0.5 }}>
                    <Avatar
                        src={avatar1}
                        sx={{ width: 32, height: 32 }}
                        alt="profile user"
                    />
                    <Typography variant="subtitle1">John Doe</Typography>
                </Stack>
            </ButtonBase>
            <Popper
                placement="bottom-end"
                open={open}
                anchorEl={archorEl.current}
                role={undefined}
                transition
                disablePortal
                popperOptions={{
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [0, 9],
                            },
                        },
                    ],
                }}>
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper
                            sx={{
                                boxShadow: theme.shadows[0],
                                width: 290,
                                minWidth: 240,
                                maxWidth: 290,
                                [theme.breakpoints.down("md")]: {
                                    maxWidth: 250,
                                },
                            }}>
                            <ClickAwayListener onClickAway={handleClose}>
                                <MainCard content={false}>
                                    <CardContent>
                                        <Grid
                                            container
                                            justifyContent="space-between"
                                            alignItems={"center"}>
                                            <Grid item>
                                                <Stack
                                                    direction={"row"}
                                                    spacing={1.25}
                                                    alignItems="center">
                                                    <Avatar
                                                        src={avatar1}
                                                        sx={{
                                                            width: 32,
                                                            height: 32,
                                                        }}
                                                        alt="profile user"
                                                    />
                                                    <Typography variant="subtitle1">
                                                        John Doe
                                                    </Typography>
                                                </Stack>
                                            </Grid>
                                            <Grid item>
                                                <IconButton
                                                    size="large"
                                                    color="secondary"
                                                    onClick={handleLogout}>
                                                    <LogoutIcon />
                                                </IconButton>
                                            </Grid>
                                        </Grid>
                                    </CardContent>
                                    <Box sx={{ width: "100%" }}>
                                        <Box
                                            sx={{
                                                borderBottom: 1,
                                                borderColor: "divider",
                                            }}>
                                            <Tabs
                                                variant="fullWidth"
                                                value={value}
                                                onChange={handleChange}
                                                aria-label="basic tabs example">
                                                <Tab
                                                    icon={<PersonIcon />}
                                                    label="Profile"
                                                    iconPosition="start"
                                                    {...a11yProps(0)}
                                                />
                                                <Tab
                                                    icon={<SettingsIcon />}
                                                    label="Setting"
                                                    iconPosition="start"
                                                    {...a11yProps(1)}
                                                />
                                            </Tabs>
                                        </Box>
                                        <TabPanel value={value} index={0}>
                                            <ProfileTab />
                                        </TabPanel>
                                        <TabPanel value={value} index={1}>
                                            <SettingTab />
                                        </TabPanel>
                                    </Box>
                                </MainCard>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
                {/* <Box sx={{ border: 1, p: 1, bgcolor: "background.paper" }}>The content of the Popper.</Box> */}
            </Popper>
        </Box>
    );
};
export default Profile;
