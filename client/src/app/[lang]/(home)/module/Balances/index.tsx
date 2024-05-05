import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Copy, QrCode } from 'lucide-react';
import React from 'react';
import Profolio from './Profolio';
import MobileProfolio from './MobileProfolio';

interface Props {}
const Balances: React.FC<Props> = () => {
  return (
    <>
      <Profolio />
      <MobileProfolio />
    </>
  );
};
export default Balances;
