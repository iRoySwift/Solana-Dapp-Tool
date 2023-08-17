import React from "react";
import { LinearProgress, styled } from "@mui/material";

interface Props {}

const LoaderWrapper = styled("div")(({ theme }) => ({
    position: "fixed",
    top: 0,
    left: 0,
    zIndex: 2001,
    width: "100%",
    "& > * + *": {
        marginTop: theme.spacing(2),
    },
}));

const Loader: React.FC<Props> = () => {
    return (
        <LoaderWrapper>
            <LinearProgress color="primary" />
        </LoaderWrapper>
    );
};
export default Loader;
