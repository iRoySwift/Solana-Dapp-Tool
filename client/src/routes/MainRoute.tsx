import { lazy } from "react";
import { type RouteObject } from "react-router-dom";
import Loadable from "@/components/Loadable";

import MainLayout from "@/layout/MainLayout";
import MintToken from "@/pages/Tutorial/MintToken";
import MintTokenTransferWallet from "@/pages/Tutorial/MintTokenTransferWallet";

const DashBoard = Loadable(lazy(() => import("@/pages/dashboard")));
const Colors = Loadable(
    lazy(() => import("@/pages/OverviewComponents/Colors"))
);
const Typography = Loadable(
    lazy(() => import("@/pages/OverviewComponents/Typography"))
);
const MuiIcon = Loadable(
    lazy(() => import("@/pages/OverviewComponents/MuiIcon"))
);
const Tutorial = Loadable(lazy(() => import("@/pages/Tutorial")));
const BaseTransfer = Loadable(
    lazy(() => import("@/pages/Tutorial/BaseTransfer"))
);
const WalletAdapter = Loadable(
    lazy(() => import("@/pages/Tutorial/WalletAdapter"))
);
const AirdropToken = Loadable(lazy(() => import("@/pages/AirdropToken")));
const ContractCall = Loadable(
    lazy(() => import("@/pages/Tutorial/ContractCall"))
);
const MintTokenTransfer = Loadable(
    lazy(() => import("@/pages/Tutorial/MintTokenTransfer"))
);

const MainRoute: RouteObject = {
    path: "/",
    element: <MainLayout />,
    children: [
        {
            path: "/",
            index: true,
            element: <DashBoard />,
        },
        {
            path: "airdropToken",
            element: <AirdropToken />,
        },
        {
            path: "tutorial",
            element: <Tutorial />,
            children: [
                {
                    path: "baseTransfer",
                    element: <BaseTransfer />,
                },
                {
                    path: "walletAdapter",
                    element: <WalletAdapter />,
                },
                {
                    path: "contractCall",
                    element: <ContractCall />,
                },
                {
                    path: "mintTokenTransfer",
                    element: <MintTokenTransfer />,
                },
                {
                    path: "mintToken",
                    element: <MintToken />,
                },
                {
                    path: "mintTokenTransferByWallet",
                    element: <MintTokenTransferWallet />,
                },
            ],
        },
        {
            path: "typography",
            element: <Typography />,
        },
        {
            path: "color",
            element: <Colors />,
        },
        {
            path: "MuiIcon",
            element: <MuiIcon />,
        },
    ],
};
export default MainRoute;
