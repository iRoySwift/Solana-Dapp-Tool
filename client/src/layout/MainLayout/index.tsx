import React from "react";
import { Outlet } from "react-router-dom";
import { Box, Toolbar } from "@mui/material";
import Drawer from "./Drawer";
import Header from "./Header";
import withLayoutContent, {
    closeDrawer,
    openDrawer,
    useLayoutDispatch,
    useLayoutState,
} from "@/content/withLayoutContent";
import BreadCrumbs from "@/components/@extended/BreadCrumbs";
import { SnackbarProvider } from "notistack";
import withWalletContent from "@/content/withWalletContent";

// import { useAppDispatch, useAppSelector } from "@/hooks/store";
// import { openDrawer } from "@/store/reducer/menu";

interface Props {}
const MainLayout: React.FC<Props> = withLayoutContent(
    withWalletContent(() => {
        const { drawer } = useLayoutState();
        const dispatch = useLayoutDispatch();
        // store
        // const dispatch = useAppDispatch();
        // const { drawerOpen } = useAppSelector(state => state.menu);
        // const [open, setOpen] = useState(drawerOpen);
        const handleDrawerToggle = () => {
            // setOpen(!open);
            dispatch(drawer ? closeDrawer() : openDrawer());
        };
        console.log(process.env);

        return (
            <SnackbarProvider maxSnack={10}>
                <Box sx={{ display: "flex", width: "100%" }}>
                    <Header
                        open={drawer}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                    <Drawer
                        open={drawer}
                        handleDrawerToggle={handleDrawerToggle}
                    />
                    <Box
                        component="main"
                        overflow={"hidden"}
                        sx={{
                            width: "100%",
                            flexGrow: 1,
                            p: { xs: 2, sm: 3 },
                        }}>
                        <Toolbar />
                        <BreadCrumbs title />
                        <Outlet />
                    </Box>
                </Box>
            </SnackbarProvider>
        );
    })
);
export default MainLayout;
