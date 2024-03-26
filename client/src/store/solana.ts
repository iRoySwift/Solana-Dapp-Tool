import { create } from "zustand";
import queryString from "query-string";
import { isBrowser } from "@/utils/utils";

export type iCluster = "devnet" | "testnet" | "mainnet-beta" | "custom";

type iSolanaStore = {
    cluster: iCluster;
    customUrl: string;
    changeCluster: (cluster: iCluster) => void;
    changeCustomUrl: (customUrl: string) => void;
};

let cluster: iCluster = "mainnet-beta";

if (isBrowser) {
    cluster = queryString.parse(window.location.search).cluster as iCluster;
}

const useSolanaStore = create<iSolanaStore>(set => ({
    cluster: (cluster as iCluster) || "mainnet-beta",
    customUrl: "http://localhost:8899",
    changeCluster: (cluster: iCluster) => set({ cluster }),
    changeCustomUrl: (customUrl: string) => set({ customUrl }),
}));

export default useSolanaStore;
