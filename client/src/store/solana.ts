import { create } from 'zustand';
import queryString from 'query-string';
import { isBrowser } from '@/utils';
import { Cluster, clusterApiUrl } from '@solana/web3.js';
import { WalletAdapterNetwork } from '@solana/wallet-adapter-base';

export const clusterList = [
  WalletAdapterNetwork.Mainnet,
  WalletAdapterNetwork.Devnet,
  WalletAdapterNetwork.Testnet,
];

export type iCluster = Cluster | any;

type iSolanaStore = {
  cluster: iCluster;
  clusterUrl: string;
  changeCluster: (cluster: iCluster) => void;
  changeClusterUrl: (clusterUrl: string) => void;
};

let cluster: iCluster = WalletAdapterNetwork.Mainnet;
let clusterUrl: string = clusterApiUrl(cluster);

if (isBrowser) {
  let query = queryString.parse(window.location.search);
  let clusterStr = query.cluster as iCluster;
  if (clusterStr && clusterList.includes(clusterStr)) {
    cluster = clusterStr;
    clusterUrl = clusterApiUrl(clusterStr);
  }
}

const useSolanaStore = create<iSolanaStore>((set) => ({
  cluster,
  clusterUrl,
  changeCluster: (cluster: iCluster) => {
    clusterUrl = clusterApiUrl(cluster);
    set({ cluster, clusterUrl });
  },
  changeClusterUrl: (clusterUrl: string) =>
    set({ cluster: undefined, clusterUrl }),
}));

export default useSolanaStore;
