"use client";

import { type ElementRef, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { createPortal } from "react-dom";
import React from "react";

export function Modal({ children }: { children: React.ReactNode }) {
    const router = useRouter();
    const dialogRef = useRef<ElementRef<"dialog">>(null);

    useEffect(() => {
        if (!dialogRef.current?.open) {
            dialogRef.current?.showModal();
        }
    }, []);

    function onDismiss() {
        router.back();
    }

    return createPortal(
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-gray-950/50">
            <dialog
                ref={dialogRef}
                className="relative flex h-auto max-h-[500px] w-4/5 max-w-lg justify-center border-r-8 border-none bg-white p-5 text-5xl font-medium"
                onClose={onDismiss}>
                {children}
                <button
                    onClick={onDismiss}
                    className=" absolute right-2 top-2 flex h-12 w-12 cursor-pointer items-center justify-center border-r-[15px] border-none bg-transparent text-2xl font-medium text-black after:content-['x'] hover:bg-gray-200"
                />
            </dialog>
        </div>,
        document.getElementById("modal-root")!
    );
}
