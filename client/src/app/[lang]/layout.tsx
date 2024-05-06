'use client';
import Navbar from '@/components/Navbar';
import SideBar from '@/components/Sidebar';
import { useWallet } from '@solana/wallet-adapter-react';
import React, { useEffect } from 'react';

interface Props {
  children: React.ReactNode;
}
const HomeLayout: React.FC<Props> = (props) => {
  const { children } = props;
  const { publicKey: pubkey } = useWallet();
  useEffect(() => {
    console.log('🚀 ~ pubkey:', pubkey);
    if (!pubkey) return;
    fetch('http://localhost:3000')
      .then((res) => res.json())
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [pubkey]);
  return (
    <main className="relative flex h-screen flex-col">
      <Navbar />
      <div className="flex flex-1">
        <SideBar />
        <section className="h-[calc(100vh-100px)] w-full overflow-auto p-6  max-md:pb-14 sm:px-14">
          {children}
        </section>
      </div>
    </main>
  );
};
export default HomeLayout;
