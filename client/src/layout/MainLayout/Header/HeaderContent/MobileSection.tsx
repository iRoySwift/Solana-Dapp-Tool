import React, { useRef, useState } from "react";
import {
    AppBar,
    Box,
    ClickAwayListener,
    IconButton,
    Paper,
    Popper,
    Toolbar,
} from "@mui/material";
import { MoreVert as MoreVertIcon } from "@mui/icons-material";
import Transitions from "@/components/@extended/Transitions";
import Search from "../Search";
import Profile from "./Profile";

interface Props {}
const MobileSection: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const anchorEl = useRef<HTMLButtonElement>(null);

    const handleToggle = (event: React.MouseEvent<HTMLSpanElement>) => {
        console.log(
            "🚀 ~ file: MobileSection.tsx:10 ~ handleToggle ~ event:",
            event
        );
        setOpen(prevOpen => !prevOpen);
    };
    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <Box sx={{ flexShrink: 0, ml: 0.75 }}>
                <IconButton
                    ref={anchorEl}
                    component="span"
                    disableRipple
                    color="secondary"
                    sx={{ color: "text.primary", bgcolor: "grey.100" }}
                    aria-haspopup="true"
                    onClick={handleToggle}>
                    <MoreVertIcon fontSize="small" />
                </IconButton>
            </Box>
            <Popper
                open={open}
                anchorEl={anchorEl.current}
                placement="bottom-end"
                transition
                disablePortal
                sx={{
                    width: "100%",
                }}
                popperOptions={{
                    modifiers: [
                        {
                            name: "offset",
                            options: {
                                offset: [0, 10],
                            },
                        },
                    ],
                }}>
                {({ TransitionProps }) => (
                    <Transitions in={open} type="fade" {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <AppBar color="inherit">
                                    <Toolbar>
                                        <Search />
                                        <Profile />
                                    </Toolbar>
                                </AppBar>
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};
export default MobileSection;
