import React from "react";
import menuItems from "@/menuItems";
import NavGroup from "./NavGroup";
import { Box, Typography } from "@mui/material";
interface Props {}
const Navigation: React.FC<Props> = () => {
    const navGroups = menuItems.items.map(item => {
        switch (item.type) {
            case "group":
                return <NavGroup key={item.id} item={item} />;
            default:
                return (
                    <Typography
                        key={item.id}
                        variant="h6"
                        color="error"
                        align="center">
                        Fix - Navigation Group
                    </Typography>
                );
        }
    });
    return <Box sx={{ pt: 2 }}>{navGroups}</Box>;
};
export default Navigation;
