import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import React, { useCallback, useEffect } from 'react';
import queryString from 'query-string';
import { useSolanaStore } from '@/store';
import { clusterList, iCluster } from '@/store/solana';
import LinkButton from './LinkButton';
import { Separator } from '@/components/ui/separator';
import CustomCluster from './CustomCluster';
import { useConnection, useWallet } from '@solana/wallet-adapter-react';

interface Props {}
const ToggleCluster: React.FC<Props> = () => {
  const { cluster, clusterUrl, changeCluster, changeClusterUrl } =
    useSolanaStore();
  const pathname = usePathname();
  const router = useRouter();

  const handleClick = useCallback(
    (v: iCluster) => {
      if (v === cluster) return;

      let query: any = { cluster: v };
      if (v === 'mainnet-beta') {
        query = null;
      }
      if (!clusterList.includes(v)) {
        delete query.cluster;
        delete query.customUrl;
        changeClusterUrl(v);
      } else {
        changeCluster(v);
      }
      router.replace(
        `${pathname}${query ? '?' + queryString.stringify(query) : ''}`,
      );
    },
    [changeCluster, changeClusterUrl, cluster, pathname, router],
  );

  return (
    <div className="flex flex-col gap-2">
      <LinkButton
        currentCluster={cluster}
        cluster={'mainnet-beta'}
        handleClick={handleClick}
      >
        Mainnet Beta
      </LinkButton>
      <LinkButton
        currentCluster={cluster}
        cluster={'testnet'}
        handleClick={handleClick}
      >
        Testnet
      </LinkButton>
      <LinkButton
        currentCluster={cluster}
        cluster={'devnet'}
        handleClick={handleClick}
      >
        Devnet
      </LinkButton>
      {/* <RadioGroup>
                <ClusterRadio
                    currentCluster={cluster}
                    cluster={"mainnet-beta"}
                    handleClick={handleClick}>
                    Mainnet Beta
                </ClusterRadio>
            </RadioGroup> */}
      <Separator />

      <CustomCluster clusterUrl={clusterUrl} handleClick={handleClick} />
    </div>
  );
};
export default ToggleCluster;
