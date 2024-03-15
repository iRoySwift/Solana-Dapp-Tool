"use client";
import { useState } from "react";
import Switch from "@/components/ui/Switch";
import Dropdown from "@/components/ui/Dropdown";
import Button from "@/components/ui/Button/Button";
import React from "react";

export default function Home() {
    const [enabled, setEnabled] = useState(false);

    const handleChange = () => {
        setEnabled(prev => !prev);
    };

    return (
        <div className="flex  flex-col items-center  p-24 ">
            <Switch
                checked={enabled}
                onChange={handleChange}
                label="Toggle"
                disabled
            />
            {/* <MyMenu /> */}
            <Dropdown />
            <Button />
        </div>
    );
}
