import React, { useState } from "react";
import { Box, Button, Grid, Stack, Typography } from "@mui/material";
import AnalyticEcommerce from "./AnalyticEcommerce";
import MainCard from "../OverviewComponents/components/MainCard";
import UniqueVisitor from "./UniqueVisitor";
import IncomeOverview from "./IncomeOverview";
import RecentOrders from "./RecentOrders";
import AnalyticsReport from "./TransactionHistory";

interface Props {}
const DashBoard: React.FC<Props> = () => {
    const [slot, setSlot] = useState("week");

    return (
        <Grid container rowSpacing={4.5} columnSpacing={2.75}>
            <Grid item xs={12} sx={{ marginBottom: -2.75 }}>
                <Typography variant="h5">Dashboard</Typography>
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total Page Views"
                    count="4,42,236"
                    percentage={59.3}
                    color="primary"
                    extra="35,000"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total Users"
                    count="78,250"
                    percentage={70.5}
                    color="primary"
                    extra="8,900"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total Order"
                    count="18,800"
                    percentage={27.4}
                    isLoss
                    color="warning"
                    extra="1,943"
                />
            </Grid>
            <Grid item xs={12} sm={6} md={4} lg={3}>
                <AnalyticEcommerce
                    title="Total Sales"
                    count="$35,078"
                    percentage={27.4}
                    isLoss
                    color="warning"
                    extra="$20,395"
                />
            </Grid>
            <Grid
                item
                md={8}
                sx={{ display: { sm: "none", md: "block", lg: "none" } }}
            />
            {/* row 2 */}
            <Grid item xs={12} md={7} lg={8}>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Grid item>
                        <Typography variant="h5">Unique Visitor</Typography>
                    </Grid>
                    <Grid item>
                        <Stack direction={"row"} alignItems={"center"}>
                            <Button
                                size="small"
                                onClick={() => {
                                    setSlot("month");
                                }}
                                color={
                                    slot === "month" ? "primary" : "secondary"
                                }
                                variant={
                                    slot === "month" ? "outlined" : "text"
                                }>
                                Month
                            </Button>
                            <Button
                                size="small"
                                onClick={() => {
                                    setSlot("week");
                                }}
                                color={
                                    slot === "week" ? "primary" : "secondary"
                                }
                                variant={slot === "week" ? "outlined" : "text"}>
                                Week
                            </Button>
                        </Stack>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 1.5 }}>
                    <UniqueVisitor slot={slot} />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Grid item>
                        <Typography variant="h5">Income Overview</Typography>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 2 }}>
                    <Box sx={{ p: 3, pb: 0 }}>
                        <Stack spacing={2}>
                            <Typography variant="h6" color="textSecondary">
                                This Week Statistics
                            </Typography>
                            <Typography variant="h3">$7,650</Typography>
                        </Stack>
                    </Box>
                    <IncomeOverview />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={7} lg={8}>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Grid item>
                        <Typography variant="h5">Recent Orders</Typography>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 2 }}>
                    <RecentOrders />
                </MainCard>
            </Grid>
            <Grid item xs={12} md={5} lg={4}>
                <Grid
                    container
                    alignItems={"center"}
                    justifyContent={"space-between"}>
                    <Grid item>
                        <Typography variant="h5">
                            Transaction History
                        </Typography>
                    </Grid>
                </Grid>
                <MainCard content={false} sx={{ mt: 2 }}>
                    <AnalyticsReport />
                </MainCard>
            </Grid>
        </Grid>
    );
};
export default DashBoard;
