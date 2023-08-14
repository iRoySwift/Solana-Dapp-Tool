import {
    activeItem,
    useLayoutDispatch,
    useLayoutState,
} from "@/content/withLayoutContent";
// import { useAppSelector, useAppDispatch } from "@/hooks/store";
// import { activeItem } from "@/store/reducer/menu";
import {
    ListItemButton,
    ListItemIcon,
    ListItemText,
    useTheme,
} from "@mui/material";
import React, { forwardRef } from "react";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface Props {
    item: any;
    level: number;
}
const NavItem: React.FC<Props> = ({ item, level }) => {
    const theme = useTheme();
    const { t } = useTranslation();
    // store
    // const dispatch = useAppDispatch();
    // const menu = useAppSelector(state => state.menu);
    // const { openItem } = menu;
    // const handlerItem = id => {
    //     dispatch(activeItem({ openItem: [id] }));
    // };

    const { openItem, drawer } = useLayoutState();
    const dispatch = useLayoutDispatch();
    const handlerItem = id => {
        dispatch(activeItem(id));
    };
    const Icon = item.icon;
    const itemIcon = Icon ? (
        <Icon style={{ fontSize: drawer ? "1rem" : "1.25rem" }} />
    ) : (
        false
    );

    let itemTarget = "_self";
    if (item.target) {
        itemTarget = "_blank";
    }
    let listItemProps = {
        component: forwardRef<any>((props, ref) => (
            <Link ref={ref} {...props} to={item.url} target={itemTarget} />
        )),
    };

    const isSelected = openItem.findIndex(id => item.id === id) > -1;
    const textColor = "text.primary";
    const iconSelectedColor = "primary.main";
    const bgColor = "primary.lighter";
    return (
        <ListItemButton
            {...listItemProps}
            selected={isSelected}
            onClick={() => handlerItem(item.id)}
            sx={{
                pl: drawer ? `${level * 28}px` : 1.5,
                py: !drawer && level === 1 ? 1.25 : 1,
                ...(drawer && {
                    "&:hover": {
                        bgcolor: bgColor,
                    },
                    "&.Mui-selected": {
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        bgcolor: bgColor,
                        color: iconSelectedColor,
                    },
                }),
                ...(!drawer && {
                    "&:hover": {
                        bgcolor: "transparent",
                    },
                    "&.Mui-selected": {
                        borderRight: `2px solid ${theme.palette.primary.main}`,
                        bgcolor: "transparent",
                        color: iconSelectedColor,
                        "&:hover": {
                            bgcolor: "transparent",
                        },
                    },
                }),
            }}>
            {itemIcon && (
                <ListItemIcon
                    sx={{
                        minWidth: 28,
                        color: isSelected ? iconSelectedColor : textColor,
                        ...(!drawer && {
                            borderRadius: 1.5,
                            width: 36,
                            height: 36,
                            alignItems: "center",
                            justifyContent: "center",
                            "&:hover": {
                                bgcolor: "secondary.100",
                            },
                        }),
                        ...(!drawer &&
                            isSelected && {
                                bgcolor: "primary.lighter",
                                "&:hover": {
                                    bgcolor: "primary.lighter",
                                },
                            }),
                    }}>
                    {itemIcon}
                </ListItemIcon>
            )}
            {drawer && <ListItemText primary={t(`menu.${item.id}`)} />}
        </ListItemButton>
    );
};
export default NavItem;
