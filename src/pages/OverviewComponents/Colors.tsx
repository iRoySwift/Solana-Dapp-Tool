import { Box, Card, Grid, Stack, Typography, useTheme } from "@mui/material";
import { type Theme } from "@mui/material/styles";
// import { ThemeOptions } from "@/themes/index";
import MainCard from "./components/MainCard";
import { useMemo } from "react";

interface iColorBox {
    bgcolor: string;
    data: {
        label: string;
        color: string;
    };
    title: string;
    dark?: boolean;
    main?: boolean;
}

function ColorBox({ bgcolor, data, title, dark, main }: iColorBox) {
    return (
        <>
            <Card variant="outlined">
                <Box
                    sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        bgcolor,
                        py: 2.5,
                        color: dark ? "grey.800" : "#ffffff",
                        border: main ? "1px dashed" : "1px solid transparent",
                    }}>
                    <Grid
                        container
                        justifyContent="space-around"
                        alignItems="center">
                        <Grid item>
                            <Stack spacing={0.75} alignItems="center">
                                <Typography variant="subtitle2">
                                    {data.label}
                                </Typography>
                                <Typography variant="subtitle1">
                                    {data.color}
                                </Typography>
                            </Stack>
                        </Grid>
                        <Grid item>{title}</Grid>
                    </Grid>
                </Box>
            </Card>
        </>
    );
}

interface Props {}

const Colors: React.FC<Props> = () => {
    const {
        palette: { primary, secondary, success, warning, info, error, grey },
    } = useTheme<Theme>();
    const primaryList = useMemo(
        () => [
            {
                title: "primary.lighter",
                data: { label: "Blue-1", color: primary?.lighter },
                bgcolor: "primary.lighter",
                dark: true,
            },
            {
                bgcolor: "primary.100",
                data: { label: "Blue-2", color: primary[100] },
                title: "primary[100]",
                dark: true,
            },
            {
                bgcolor: "primary.200",
                data: { label: "Blue-3", color: primary[200] },
                title: "primary[200]",
                dark: true,
            },
            {
                bgcolor: "primary.light",
                data: { label: "Blue-4", color: primary.light },
                title: "primary.light",
                dark: true,
            },
            {
                bgcolor: "primary.400",
                data: { label: "Blue-5", color: primary[400] },
                title: "primary[400]",
            },
            {
                bgcolor: "primary.main",
                data: { label: "Blue-6", color: primary.main },
                title: "primary.main",
                main: true,
            },
            {
                bgcolor: "primary.dark",
                data: { label: "Blue-7", color: primary.dark },
                title: "primary.dark",
            },
            {
                bgcolor: "primary.700",
                data: { label: "Blue-8", color: primary[700] },
                title: "primary[700]",
            },
            {
                bgcolor: "primary.darker",
                data: { label: "Blue-9", color: primary.darker },
                title: "primary.darker",
            },
            {
                bgcolor: "primary.900",
                data: { label: "Blue-10", color: primary[900] },
                title: "primary.900",
            },
        ],
        [primary]
    );
    const secondaryList = useMemo(
        () => [
            {
                bgcolor: "secondary.lighter",
                data: { label: "Grey-1", color: secondary.lighter },
                title: "secondary.lighter",
                dark: true,
            },
            {
                bgcolor: "secondary.100",
                data: { label: "Grey-2", color: secondary[100] },
                title: "secondary[100]",
                dark: true,
            },
            {
                bgcolor: "secondary.200",
                data: { label: "Grey-3", color: secondary[200] },
                title: "secondary[200]",
                dark: true,
            },
            {
                bgcolor: "secondary.light",
                data: { label: "Grey-4", color: secondary.light },
                title: "secondary.light",
                dark: true,
            },
            {
                bgcolor: "secondary.400",
                data: { label: "Grey-5", color: secondary[400] },
                title: "secondary[400]",
                dark: true,
            },
            {
                bgcolor: "secondary.main",
                data: { label: "Grey-6", color: secondary.main },
                title: "secondary.main",
                main: true,
            },
            {
                bgcolor: "secondary.600",
                data: { label: "Grey-7", color: secondary[600] },
                title: "secondary[600]",
            },
            {
                bgcolor: "secondary.dark",
                data: { label: "Grey-8", color: secondary.darker },
                title: "secondary.dark",
            },
            {
                bgcolor: "secondary.800",
                data: { label: "Grey-9", color: secondary[800] },
                title: "secondary[800]",
            },
            {
                bgcolor: "secondary.darker",
                data: { label: "Grey-10", color: secondary.darker },
                title: "secondary.darker",
            },
        ],
        [secondary]
    );
    const successList = useMemo(
        () => [
            {
                bgcolor: "success.lighter",
                data: { label: "Green-1", color: success.lighter },
                title: "success.lighter",
                dark: true,
            },
            {
                bgcolor: "success.light",
                data: { label: "Green-4", color: success.light },
                title: "success.light",
                dark: true,
            },
            {
                bgcolor: "success.main",
                data: { label: "Green-6", color: success.main },
                title: "success.main",
                main: true,
            },
            {
                bgcolor: "success.dark",
                data: { label: "Green-8", color: success.dark },
                title: "success.dark",
            },
            {
                bgcolor: "success.darker",
                data: { label: "Green-10", color: success.darker },
                title: "success.darker",
            },
        ],
        [success]
    );
    const errorList = useMemo(
        () => [
            {
                bgcolor: "error.lighter",
                data: { label: "Red-1", color: error.lighter },
                title: "error.lighter",
                dark: true,
            },
            {
                bgcolor: "error.light",
                data: { label: "Red-4", color: error.light },
                title: "error.light",
                dark: true,
            },
            {
                bgcolor: "error.main",
                data: { label: "Red-6", color: error.main },
                title: "error.main",
                main: true,
            },
            {
                bgcolor: "error.dark",
                data: { label: "Red-8", color: error.dark },
                title: "error.dark",
            },
            {
                bgcolor: "error.darker",
                data: { label: "Red-10", color: error.darker },
                title: "error.darker",
            },
        ],
        [error]
    );
    const warningList = useMemo(
        () => [
            {
                bgcolor: "warning.lighter",
                data: { label: "Gold-1", color: warning.lighter },
                title: "warning.lighter",
                dark: true,
            },
            {
                bgcolor: "warning.light",
                data: { label: "Gold-4", color: warning.light },
                title: "warning.light",
                dark: true,
            },
            {
                bgcolor: "warning.main",
                data: { label: "Gold-6", color: warning.main },
                title: "warning.main",
                main: true,
            },
            {
                bgcolor: "warning.dark",
                data: { label: "Gold-8", color: warning.dark },
                title: "warning.dark",
            },
            {
                bgcolor: "warning.darker",
                data: { label: "Gold-10", color: warning.darker },
                title: "warning.darker",
            },
        ],
        [warning]
    );
    const infoList = useMemo(
        () => [
            {
                bgcolor: "info.lighter",
                data: { label: "Cyan-1", color: info.lighter },
                title: "info.lighter",
                dark: true,
            },
            {
                bgcolor: "info.light",
                data: { label: "Cyan-4", color: info.light },
                title: "info.light",
                dark: true,
            },
            {
                bgcolor: "info.main",
                data: { label: "Cyan-6", color: info.main },
                title: "info.main",
                main: true,
            },
            {
                bgcolor: "info.dark",
                data: { label: "Cyan-8", color: info.dark },
                title: "info.dark",
            },
            {
                bgcolor: "info.darker",
                data: { label: "Cyan-10", color: info.darker },
                title: "info.darker",
            },
        ],
        [info]
    );
    const greyList = useMemo(
        () => [
            {
                title: "grey.lighter",
                data: { label: "Grey-1", color: grey[50] },
                bgcolor: "grey.50",
                dark: true,
            },
            {
                bgcolor: "grey.100",
                data: { label: "Grey-2", color: grey[100] },
                title: "grey[100]",
                dark: true,
            },
            {
                bgcolor: "grey.200",
                data: { label: "Grey-3", color: grey[200] },
                title: "grey[200]",
                dark: true,
            },
            {
                bgcolor: "grey.300",
                data: { label: "Grey-4", color: grey[300] },
                title: "grey.light",
                dark: true,
            },
            {
                bgcolor: "grey.400",
                data: { label: "Grey-5", color: grey[400] },
                title: "grey[400]",
            },
            {
                bgcolor: "grey.500",
                data: { label: "Grey-6", color: grey[500] },
                title: "grey.main",
                main: true,
            },
            {
                bgcolor: "grey.600",
                data: { label: "Grey-7", color: grey[600] },
                title: "grey.dark",
            },
            {
                bgcolor: "grey.700",
                data: { label: "Grey-8", color: grey[700] },
                title: "grey[700]",
            },
            {
                bgcolor: "grey.800",
                data: { label: "Grey-9", color: grey[800] },
                title: "grey.darker",
            },
            {
                bgcolor: "grey.900",
                data: { label: "Grey-10", color: grey[900] },
                title: "grey.900",
            },
            {
                bgcolor: "grey.A100",
                data: { label: "Grey-11", color: grey.A100 },
                title: "grey.A100",
                dark: true,
            },
            {
                bgcolor: "grey.A200",
                data: { label: "Grey-12", color: grey.A200 },
                title: "grey.A200",
                dark: true,
            },
            {
                bgcolor: "grey.A400",
                data: { label: "Grey-13", color: grey.A400 },
                title: "grey.A400",
            },
            {
                bgcolor: "grey.A700",
                data: { label: "Grey-14", color: grey.A700 },
                title: "grey.A700",
            },
        ],
        [grey]
    );
    return (
        <Grid container spacing={3}>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Primary Color">
                    <Stack>
                        {primaryList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Secondary Color">
                    <Stack>
                        {secondaryList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Success Color">
                    <Stack>
                        {successList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Error Color">
                    <Stack>
                        {errorList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Warning Color">
                    <Stack>
                        {warningList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="Info Color">
                    <Stack>
                        {infoList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
            <Grid item xs={12} sm={6} md={4}>
                <MainCard title="grey Color">
                    <Stack>
                        {greyList.map((item, i) => (
                            <ColorBox key={i} {...item} />
                        ))}
                    </Stack>
                </MainCard>
            </Grid>
        </Grid>
    );
};

export default Colors;
