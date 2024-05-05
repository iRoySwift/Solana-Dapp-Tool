import React from 'react';
import Assets from './module/Assets';
import Balances from './module/Balances';

interface Props {}
const Home: React.FC<Props> = () => {
  return (
    <div className="flex size-full flex-col gap-5">
      <Balances />
      <Assets />
    </div>
  );
};
export default Home;
