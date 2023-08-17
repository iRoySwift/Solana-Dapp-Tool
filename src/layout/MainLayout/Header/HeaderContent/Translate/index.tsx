import Transitions from "@/components/@extended/Transitions";
import { GTranslate as GTranslateIcon } from "@mui/icons-material";
import {
    Box,
    ClickAwayListener,
    IconButton,
    Paper,
    Popper,
} from "@mui/material";
import React, { useRef, useState } from "react";
import LanguageList from "./LanguageList";

interface Props {}
const Translate: React.FC<Props> = () => {
    const [open, setOpen] = useState(false);
    const anchorEl = useRef(null);
    const handleToggle = () => {
        setOpen(prevOpen => !prevOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const iconBackColorOpen = "grey.300";
    const iconBackColor = "grey.100";
    return (
        <>
            <Box sx={{ flexGrow: 0, ml: 0.75 }}>
                <IconButton
                    ref={anchorEl}
                    onClick={handleToggle}
                    disableRipple
                    color="secondary"
                    sx={{
                        color: "text.primary",
                        bgcolor: open ? iconBackColorOpen : iconBackColor,
                    }}
                    aria-label="open language"
                    aria-controls={open ? "language-grow" : undefined}
                    aria-haspopup="true">
                    <GTranslateIcon fontSize="small" />
                </IconButton>
            </Box>
            <Popper
                id="translate-popper"
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
                                offset: [0, 9],
                            },
                        },
                    ],
                }}>
                {({ TransitionProps }) => (
                    <Transitions type="fade" in={open} {...TransitionProps}>
                        <Paper>
                            <ClickAwayListener onClickAway={handleClose}>
                                <LanguageList />
                            </ClickAwayListener>
                        </Paper>
                    </Transitions>
                )}
            </Popper>
        </>
    );
};
export default Translate;
