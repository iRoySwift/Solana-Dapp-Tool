import { alpha, styled } from "@mui/material";
import React, { type ReactNode } from "react";
import { BrowserView, MobileView } from "react-device-detect";
import SimpleBar from "simplebar-react";
import "simplebar-react/dist/simplebar.min.css";

interface Props {
    children: ReactNode;
}

const RootStyle = styled(BrowserView)(() => ({
    height: "100%",
    overflow: "hidden",
    flexGrow: 1,
}));
const SimpleBarStyle = styled(SimpleBar)(({ theme }) => ({
    maxHeight: "100%",
    "& .simplebar-scrollbar": {
        ":before": {
            backgroundColor: alpha(theme.palette.grey[500], 0.48),
        },
        "&.simplebar-visible:before": {
            opacity: 1,
        },
    },
    ".simplebar-track.simplebar-vertical": {
        width: 10,
    },
    ".simplebar-track.simplebar-horizontal .simplebar-scrollbar": {
        height: 6,
    },
    "& .simplebar-mask": {
        zIndex: "inherit",
    },
}));
const SimpleBarScroll: React.FC<Props> = ({ children }) => {
    return (
        <>
            <RootStyle>
                <SimpleBarStyle>{children}</SimpleBarStyle>
            </RootStyle>
            <MobileView>
                <SimpleBarStyle>{children}</SimpleBarStyle>
            </MobileView>
        </>
    );
};
export default SimpleBarScroll;
