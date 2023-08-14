import { useLayoutState } from "@/content/withLayoutContent";
import { Box, List, Typography } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import NavItem from "./NavItem";

interface Props {
    item: any;
}
const NavGroup: React.FC<Props> = ({ item }) => {
    const { drawer } = useLayoutState();
    const { t } = useTranslation();
    const navCollapse = item.children.map((menuItem, i) => {
        switch (item.type) {
            case "collapse":
                return (
                    <Typography
                        key={menuItem.id}
                        variant="caption"
                        color="error"
                        sx={{ p: 2.5 }}>
                        collapse - only available in paid version
                    </Typography>
                );
            case "group":
                return (
                    <NavItem
                        key={`${menuItem.id}${i}`}
                        level={1}
                        item={menuItem}
                    />
                );

            default:
                return (
                    <Typography
                        key={menuItem.id}
                        align="center"
                        variant="caption"
                        color="error"
                        sx={{ p: 2.5 }}>
                        Fix - Group Collapse or Items
                    </Typography>
                );
        }
    });
    return (
        <List
            subheader={
                item.title &&
                drawer && (
                    <Box sx={{ pl: 3, mb: 1.5 }}>
                        <Typography variant="subtitle2" color="textSecondary">
                            {t(`menu.${item.id}`)}
                        </Typography>
                    </Box>
                )
            }
            sx={{ mb: drawer ? 1.5 : 0, py: 0 }}>
            {navCollapse}
        </List>
    );
};
export default NavGroup;
