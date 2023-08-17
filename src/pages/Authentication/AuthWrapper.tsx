import AuthBackground from "@/assets/images/auth/AuthBackground";
import Logo from "@/components/Logo/Logo";
import { Box, Grid } from "@mui/material";
import React from "react";
import AuthCard from "./AuthCard";
import AuthFooter from "./AuthFooter";

interface Props {
    children: React.ReactNode;
}
const AuthWrapper: React.FC<Props> = props => {
    const { children } = props;
    return (
        <Box sx={{ minHeight: "100vh" }}>
            <AuthBackground />
            <Grid
                container
                direction="column"
                justifyContent="flex-end"
                sx={{
                    minHeight: "100vh",
                }}>
                <Grid item xs={12} sx={{ mt: 3, ml: 3 }}>
                    <Logo />
                </Grid>
                <Grid item xs={12}>
                    <Grid
                        container
                        item
                        xs={12}
                        justifyContent="center"
                        alignItems="center"
                        sx={{
                            minHeight: {
                                xs: "calc(100vh - 134px)",
                                md: "calc(100vh - 112px)",
                            },
                        }}>
                        <Grid item>
                            <AuthCard>{children}</AuthCard>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} sx={{ m: 3, mt: 1 }}>
                    <AuthFooter />
                </Grid>
            </Grid>
        </Box>
    );
};
export default AuthWrapper;
