import React from "react";
import MainCard from "./components/MainCard";
import { styled } from "@mui/material";

// styles
const IFrameWrapper = styled("iframe")(() => ({
    height: "calc(100vh - 210px)",
    border: "none",
}));

interface Props {}
const MuiIcon: React.FC<Props> = () => {
    return (
        <MainCard title="Mui Icons">
            <IFrameWrapper
                title="Ant Icon"
                width="100%"
                src="https://mui.com/material-ui/material-icons/"
            />
        </MainCard>
    );
};
export default MuiIcon;
