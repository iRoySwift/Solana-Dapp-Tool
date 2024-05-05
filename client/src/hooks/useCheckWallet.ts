import { useToast } from '@/components/ui/use-toast';
import { PublicKey } from '@solana/web3.js';

const useCheckWallet = (pubkey: PublicKey | null) => {
  const { toast } = useToast();
  function checkWalletDecorator(func: Function) {
    return function (this: any, ...args: any) {
      if (!pubkey)
        return toast({
          title: 'Please connect your wallet!',
          variant: 'warning',
        });
      const result = func.apply(this, arguments);
      return result;
    };
  }
  return checkWalletDecorator;
};

export default useCheckWallet;
