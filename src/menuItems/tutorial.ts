// assets
// import { DashboardOutlined } from '@ant-design/icons';
import { Window } from "@mui/icons-material";

// icons
const icons = {
    Window,
};

// ==============================|| MENU ITEMS - DASHBOARD ||============================== //

const tutorial = {
    id: "tutorial",
    title: "Tutorial",
    type: "group",
    children: [
        {
            id: "baseTransfer",
            title: "Base Transfer",
            type: "item",
            url: "/tutorial/baseTransfer",
            icon: icons.Window,
            breadcrumbs: false,
        },
        {
            id: "walletAdapter",
            title: "Wallet adapter",
            type: "item",
            url: "/tutorial/walletAdapter",
            icon: icons.Window,
            breadcrumbs: false,
        },
        {
            id: "contractCall",
            title: "Contract Call",
            type: "item",
            url: "/tutorial/contractCall",
            icon: icons.Window,
            breadcrumbs: false,
        },
        {
            id: "mintTokenTransfer",
            title: "Mint Token Transfer",
            type: "item",
            url: "/tutorial/mintTokenTransfer",
            icon: icons.Window,
            breadcrumbs: false,
        },
    ],
};

export default tutorial;
