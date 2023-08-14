import React, { useEffect, useState } from "react";
import {
    Box,
    Breadcrumbs as MuiBreadcrumbs,
    Grid,
    Typography,
} from "@mui/material";
import navigation from "@/menuItems";
import { useLocation, Link } from "react-router-dom";

interface Props {
    title?: boolean;
}
interface iItem {
    id: string;
    title: string;
    type: string;
    url: string;
    icon: any;
    breadcrumbs?: boolean;
}
interface iMain {
    id: string;
    title: string;
    type: string;
    children: iItem[];
}
const BreadCrumbs: React.FC<Props> = ({ title }) => {
    const location = useLocation();
    const [main, setMain] = useState<iMain>();
    const [item, setItem] = useState<iItem>();
    // set active item state
    const getCollapse = menu => {
        if (menu.children) {
            menu.children.forEach(collapse => {
                if (collapse.type && collapse.type === "collapse") {
                    getCollapse(collapse);
                } else if (collapse.type && collapse.type === "item") {
                    if (location.pathname === collapse.url) {
                        setMain(menu);
                        setItem(collapse);
                    }
                }
                return false;
            });
        }
    };

    useEffect(() => {
        navigation.items.forEach(menu => {
            if (menu.type && menu.type === "group") {
                getCollapse(menu);
            }
        });
    });

    let mainContent;
    let itemContent;
    let breadcrumbContent = <Typography />;
    if (main && main.type === "collapse") {
        mainContent = (
            <Typography
                component={Link}
                to={document.location.pathname}
                variant="h6"
                sx={{ textDecoration: "none" }}
                color="textSecondary">
                {main.title}
            </Typography>
        );
    }
    function handleClick(event: React.MouseEvent<HTMLDivElement, MouseEvent>) {
        event.preventDefault();
        console.info("You clicked a breadcrumb.");
    }
    if (item && item.type === "item") {
        itemContent = (
            <Typography variant="subtitle1" color="text.secondary">
                {item.title}
            </Typography>
        );
        if (item.breadcrumbs !== false) {
            breadcrumbContent = (
                <Box sx={{ mb: 3 }} role="presentation" onClick={handleClick}>
                    <Grid
                        container
                        direction="column"
                        justifyContent="flex-start"
                        alignItems="flex-start"
                        spacing={1}>
                        <Grid item>
                            <MuiBreadcrumbs aria-label="breadcrumb">
                                <Typography
                                    component={Link}
                                    to="/"
                                    color="text.primary"
                                    variant="h6"
                                    sx={{ textDecoration: "none" }}>
                                    Home
                                </Typography>
                                {mainContent}
                                {itemContent}
                            </MuiBreadcrumbs>
                        </Grid>
                        {title && (
                            <Grid item sx={{ mt: 2 }}>
                                <Typography variant="h5">
                                    {item.title}
                                </Typography>
                            </Grid>
                        )}
                    </Grid>
                </Box>
            );
        }
    }
    return breadcrumbContent;
};
export default BreadCrumbs;
