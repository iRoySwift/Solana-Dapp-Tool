import React from "react";
import { List, ListItemButton, ListItemText } from "@mui/material";
import { changeLanguage, type iLan } from "@/utils/i18n";
import {
    handleChangeLanguage,
    useLayoutDispatch,
    useLayoutState,
} from "@/content/withLayoutContent";

interface Props {}
const listItemText = {
    display: "flex",
    alignItems: "center",
    "& .MuiTypography-root": {
        ml: 1,
    },
};
const LanguageList: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
    (_, ref) => {
        const { language } = useLayoutState();
        const dispatch = useLayoutDispatch();
        const handleListItemClick = (v: iLan) => {
            changeLanguage(v);
            dispatch(handleChangeLanguage(v));
        };
        return (
            <List
                ref={ref}
                component="nav"
                sx={{
                    p: 0,
                    width: "100%",
                    minWidth: 200,
                    maxWidth: 290,
                }}>
                <ListItemButton
                    selected={language === "enUS"}
                    onClick={() => handleListItemClick("enUS")}>
                    <ListItemText
                        primary="English"
                        secondary="(UK)"
                        sx={listItemText}
                    />
                </ListItemButton>
                <ListItemButton
                    selected={language === "zhCN"}
                    onClick={() => handleListItemClick("zhCN")}>
                    <ListItemText
                        primary="中国"
                        secondary="(Chinese)"
                        sx={{ ...listItemText }}
                    />
                </ListItemButton>
            </List>
        );
    }
);
export default LanguageList;
