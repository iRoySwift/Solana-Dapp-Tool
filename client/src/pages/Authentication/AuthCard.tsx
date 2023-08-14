import React from "react";
import MainCard from "../OverviewComponents/components/MainCard";
import { Box } from "@mui/material";

interface Props {
    children: React.ReactNode;
}
const AuthCard: React.FC<Props> = props => {
    const { children, ...other } = props;
    return (
        <MainCard
            content={false}
            border={false}
            {...other}
            sx={{
                maxWidth: { xs: 400, lg: 475 },
                margin: { xs: 2.5, md: 3 },
                "& > *": {
                    flexGrow: 1,
                    flexBasis: "50%",
                },
            }}>
            <Box sx={{ p: { xs: 2, sm: 3, md: 4, xl: 5 } }}>{children}</Box>
        </MainCard>
    );
};
export default AuthCard;
