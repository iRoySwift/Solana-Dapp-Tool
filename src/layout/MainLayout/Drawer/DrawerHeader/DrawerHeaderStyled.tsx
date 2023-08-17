import { Box, styled } from "@mui/material";
import { type BoxProps as MuiBoxProps } from "@mui/material";

interface BoxProps extends MuiBoxProps {
    open?: boolean;
}
const DrawerHeaderStyled = styled(Box)<BoxProps>(({ theme, open }) => ({
    ...theme.mixins.toolbar,
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-start",
    ...(open && { paddingLeft: theme.spacing(3) }),
    ...(!open && { justifyContent: "center" }),
}));
export default DrawerHeaderStyled;
