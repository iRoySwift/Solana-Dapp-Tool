// assets
import { Login, Assignment } from "@mui/icons-material";

// icons
const icons = {
    Login,
    Assignment,
};

// ==============================|| MENU ITEMS - EXTRA PAGES ||============================== //

const authentication = {
    id: "authentication",
    title: "Authentication",
    type: "group",
    children: [
        {
            id: "login",
            title: "Login",
            type: "item",
            url: "/login",
            icon: icons.Login,
            target: true,
        },
        {
            id: "register",
            title: "Register",
            type: "item",
            url: "/register",
            icon: icons.Assignment,
            target: true,
        },
    ],
};

export default authentication;
