import React, { useEffect } from "react";
import {
    AppBar,
    IconButton,
    Toolbar,
    useMediaQuery,
    useTheme,
} from "@mui/material";
import {
    FormatIndentDecreaseOutlined,
    FormatIndentIncreaseOutlined,
} from "@mui/icons-material";
import AppBarStyled from "./AppBarStyled";
import HeaderContent from "./HeaderContent";
import { type Theme } from "@mui/material/styles";

interface Props {
    open?: boolean;
    handleDrawerToggle?: () => void;
}
const Header: React.FC<Props> = ({ open, handleDrawerToggle }) => {
    const theme = useTheme<Theme>();
    const matchDownMD = useMediaQuery(theme.breakpoints.down("lg"));
    const iconBackColor = "grey.100";
    const iconBackColorOpen = "grey.200";
    useEffect(() => {
        console.log(theme);
    }, [theme]);

    const MainHeader = () => {
        return (
            <Toolbar>
                <IconButton
                    disableRipple
                    aria-label="open drawer"
                    edge="start"
                    color="secondary"
                    onClick={handleDrawerToggle}
                    sx={{
                        color: "text.primary",
                        bgcolor: open ? iconBackColorOpen : iconBackColor,
                        ml: { xs: 0, lg: -2 },
                    }}>
                    {open ? (
                        <FormatIndentDecreaseOutlined
                            sx={{ fontSize: 20, color: "#333" }}
                        />
                    ) : (
                        <FormatIndentIncreaseOutlined
                            sx={{ fontSize: 20, color: "#333" }}
                        />
                    )}
                </IconButton>
                <HeaderContent />
            </Toolbar>
        );
    };

    // app-bar params
    const appBar: any = {
        position: "fixed",
        color: "inherit",
        elevation: 0,
        sx: {
            borderBottom: `1px solid ${theme.palette.divider}`,
            // boxShadow: theme.customShadows.z1
        },
    };

    return (
        <>
            {matchDownMD ? (
                <AppBar {...appBar}>
                    <MainHeader />
                </AppBar>
            ) : (
                <AppBarStyled open={open} {...appBar}>
                    <MainHeader />
                </AppBarStyled>
            )}
        </>
    );
};
export default Header;
