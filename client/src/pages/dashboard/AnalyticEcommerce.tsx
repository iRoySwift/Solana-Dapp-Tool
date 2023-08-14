import React from "react";
import MainCard from "../OverviewComponents/components/MainCard";
import { Box, Chip, Grid, Stack, Typography } from "@mui/material";
import {
    Moving as MovingIcon,
    TrendingDown as TrendingDownIcon,
} from "@mui/icons-material";

interface Props {
    count: string;
    title: string;
    percentage: number;
    extra: string;
    isLoss?: boolean;
    color?:
        | "default"
        | "primary"
        | "secondary"
        | "error"
        | "info"
        | "success"
        | "warning";
}
const AnalyticEcommerce: React.FC<Props> = ({
    count,
    isLoss,
    color,
    percentage,
    extra,
}) => {
    return (
        <MainCard>
            <Stack>
                <Typography
                    title="AnalyticEcommerce"
                    variant="h6"
                    color="secondary">
                    AnalyticEcommerce
                </Typography>
                <Grid container>
                    <Grid item>
                        <Typography variant="h4" color="inherit">
                            {count}
                        </Typography>
                    </Grid>
                    <Grid item>
                        <Chip
                            variant="filled"
                            color={color}
                            icon={
                                <>
                                    {isLoss && (
                                        <MovingIcon
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "inherit",
                                            }}
                                        />
                                    )}
                                    {!isLoss && (
                                        <TrendingDownIcon
                                            style={{
                                                fontSize: "0.75rem",
                                                color: "inherit",
                                            }}
                                        />
                                    )}
                                </>
                            }
                            label={`${percentage}%`}
                            sx={{ ml: 1.25, pl: 1 }}
                            size="small"
                        />
                    </Grid>
                </Grid>
            </Stack>
            <Box sx={{ pt: 2.25 }}>
                <Typography variant="caption" color="textSecondary">
                    You made an extra{" "}
                    <Typography
                        component="span"
                        variant="caption"
                        sx={{ color: `${color || "primary"}.main` }}>
                        {extra}
                    </Typography>{" "}
                    this year
                </Typography>
            </Box>
        </MainCard>
    );
};
export default AnalyticEcommerce;
