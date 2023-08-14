import { Grid } from "@mui/material";
import React from "react";

interface Props {}
const CardSkeleton: React.FC<Props> = () => {
    return (
        <Grid container spacing={2}>
            <Grid xs={8}>{/* <Item>xs=8</Item> */}</Grid>
            <Grid xs={4}>{/* <Item>xs=4</Item> */}</Grid>
            <Grid xs={4}>{/* <Item>xs=4</Item> */}</Grid>
            <Grid xs={8}>{/* <Item>xs=8</Item> */}</Grid>
        </Grid>
    );
};
export default CardSkeleton;
