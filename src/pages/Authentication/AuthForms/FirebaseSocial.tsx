import { Button, Stack, useMediaQuery, useTheme } from "@mui/material";
import React from "react";
import Google from "@/assets/images/icons/google.svg";
import Twitter from "@/assets/images/icons/twitter.svg";
import Facebook from "@/assets/images/icons/facebook.svg";

interface Props {}
const FirebaseSocial: React.FC<Props> = () => {
    const theme = useTheme();
    console.log("🚀 ~ file: FirebaseSocial.tsx:10 ~ theme:", theme);
    const matchDownSM = useMediaQuery(theme.breakpoints.down("sm"));
    return (
        <Stack
            direction="row"
            justifyContent="space-between"
            sx={{
                "& .MuiButton-startIcon": {
                    mr: matchDownSM ? 0 : 1,
                    ml: matchDownSM ? 0 : -0.5,
                },
            }}
            spacing={matchDownSM ? 1 : 2}>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Google} alt="Google" />}>
                {!matchDownSM && "Google"}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Twitter} alt="Twitter" />}>
                {!matchDownSM && "Twitter"}
            </Button>
            <Button
                variant="outlined"
                color="secondary"
                fullWidth={!matchDownSM}
                startIcon={<img src={Facebook} alt="Facebook" />}>
                {!matchDownSM && "Facebook"}
            </Button>
        </Stack>
    );
};
export default FirebaseSocial;
