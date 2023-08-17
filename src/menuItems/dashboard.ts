// assets
// import { DashboardOutlined } from '@ant-design/icons';
import { Window } from "@mui/icons-material";

// icons
const icons = {
    Window,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const dashboard = {
    id: "navigation",
    title: "Navigation",
    type: "group",
    children: [
        {
            id: "dashboard",
            title: "Dashboard",
            type: "item",
            url: "/",
            icon: icons.Window,
            breadcrumbs: false,
        },
    ],
};

export default dashboard;
