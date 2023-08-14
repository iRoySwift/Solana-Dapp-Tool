import { useRoutes } from "react-router-dom";
import LoginRoutes from "./LoginRoute";
import MainRoute from "./MainRoute";

export default function Routes() {
    return useRoutes([MainRoute, LoginRoutes]);
}
