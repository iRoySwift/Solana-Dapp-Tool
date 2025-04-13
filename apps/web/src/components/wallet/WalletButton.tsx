"use client";

import React, { useCallback, useEffect, useState } from "react";
import Image from "next/image";
import {
  useWalletModal,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import "@solana/wallet-adapter-react-ui/styles.css";
import { Wallet as WalletIcon } from "@iroy/ui/icons";
import { Button } from "@iroy/ui/components/button";
import { useWallet, Wallet } from "@solana/wallet-adapter-react";
import { PublicKey } from "@solana/web3.js";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@iroy/ui/components/popover";
import { Label } from "@iroy/ui/components/label";
import { cn } from "@iroy/ui/lib/utils";
// import dynamic from "next/dynamic";

// const WalletMultiButton = dynamic(
//   async () =>
//     (await import("@solana/wallet-adapter-react-ui")).WalletMultiButton,
//   { ssr: false }
// );

const LABELS = {
  "change-wallet": "Change wallet",
  connecting: "Connecting ...",
  "copy-address": "Copy address",
  copied: "Copied",
  disconnect: "Disconnect",
  "has-wallet": "Connect",
  "no-wallet": "Select Wallet",
} as const;

type ButtonState = {
  buttonState:
    | "connecting"
    | "connected"
    | "disconnecting"
    | "has-wallet"
    | "no-wallet";
  onConnect?: () => void;
  onDisconnect?: () => void;
  onSelectWallet?: () => void;
  publicKey?: PublicKey;
  walletIcon?: Wallet["adapter"]["icon"];
  walletName?: Wallet["adapter"]["name"];
};

interface Props {
  children?: React.ReactNode;
  className?: string;
}
const WalletButton: React.FC<Props> = ({ children, className }) => {
  const { setVisible: setModalVisible } = useWalletModal();
  const [copied, setCopied] = useState(false);
  const [buttonState, setButtonState] =
    useState<ButtonState["buttonState"]>("no-wallet");
  const {
    connect,
    connected,
    connecting,
    disconnect,
    disconnecting,
    publicKey,
    select,
    wallet,
    wallets,
  } = useWallet();

  const onConnect = useCallback(() => {
    connect().catch(() => {});
  }, [connect]);

  const handleDisconnect = useCallback(() => {
    disconnect().catch(() => {});
  }, [disconnect]);

  const handleSelectWallet = useCallback(() => {
    setModalVisible(true);
  }, []);

  const handleClick = useCallback(() => {
    switch (buttonState) {
      case "no-wallet":
        handleSelectWallet();
        break;
      case "has-wallet":
        handleDisconnect();
        break;
      case "connected":
        break;
    }
  }, [buttonState]);

  useEffect(() => {
    if (connecting) {
      setButtonState("connecting");
    } else if (connected) {
      setButtonState("connected");
    } else if (disconnecting) {
      setButtonState("disconnecting");
    } else if (wallet) {
      setButtonState("has-wallet");
    } else {
      setButtonState("no-wallet");
    }
  }, [connected, connecting, disconnecting, wallet]);

  useEffect(() => {
    if (onConnect && buttonState === "has-wallet") {
      onConnect();
    }
  }, [buttonState]);

  return (
    <>
      {wallet && publicKey ? (
        <Popover>
          <PopoverTrigger asChild>
            <Button
              type="button"
              className={cn("px-2", className)}
              variant="ghost">
              <Image
                width={20}
                height={20}
                src={wallet.adapter.icon}
                alt={wallet.adapter.name}
              />
              <Label>{`${publicKey?.toBase58().slice(0, 4)}..${publicKey?.toBase58().slice(-4)}`}</Label>
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-40" align="end">
            <ul>
              <li
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-hidden flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-medium"
                onClick={async () => {
                  await navigator.clipboard.writeText(publicKey.toBase58());
                  setCopied(true);
                  setTimeout(() => setCopied(false), 400);
                }}>
                {copied ? LABELS["copied"] : LABELS["copy-address"]}
              </li>
              <li
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-hidden flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-medium"
                onClick={() => {
                  handleSelectWallet();
                }}>
                {LABELS["change-wallet"]}
              </li>
              <li
                className="text-sidebar-foreground hover:bg-sidebar-accent hover:text-sidebar-accent-foreground outline-hidden flex h-7 cursor-pointer items-center gap-2 rounded-md px-2 text-sm font-medium"
                onClick={() => {
                  handleDisconnect();
                }}>
                {LABELS["disconnect"]}
              </li>
            </ul>
          </PopoverContent>
        </Popover>
      ) : children ? (
        <div className={cn(className)} onClick={() => handleClick()}>
          {children}
        </div>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className={cn("h-8 w-8 px-0", className)}
          onClick={() => handleClick()}>
          <WalletIcon />
        </Button>
      )}
      {/* <WalletMultiButton /> */}
    </>
  );
};
export default WalletButton;
