import React from "react";
import { TabsDemo } from "./TabsDemo";
import { SkeletonDemo } from "./SkeletonDemo";
import { SwitchDemo } from "./SwitchDemo";
import { CardWithForm } from "./CardWithForm";
import { DropdownMenuDemo } from "./DropdownMenuDemo";
import { HoverCardDemo } from "./HoverCardDemo";
import { PopoverDemo } from "./PopoverDemo";
import { InputDemo } from "./InputDemo";
import { SelectDemo } from "./SelectDemo";
import { TextareaDemo } from "./TextareaDemo";
import { ButtonDemo } from "./ButtonDemo";
import { ButtonSecondary } from "./ButtonSecondary";
import { Button } from "@/components/ui/button";

interface Props {}
const Ui: React.FC<Props> = () => {
    return (
        <div className="flex w-full flex-col justify-center gap-5 p-24">
            <h1>
                <p>Default background color of body ...etc</p>
                <p>--background: 0 0% 100%;</p>
                <p> --foreground: 222.2 47.4% 11.2%;</p>
            </h1>
            <h1>
                <p>Muted backgrounds such as TabsList, Skeleton and Switch</p>
                <p>--muted: 210 40% 96.1%;</p>
                <p>--muted-foreground: 215.4 16.3% 46.9%;</p>
            </h1>
            <TabsDemo />
            <SkeletonDemo />
            <SwitchDemo />
            <h1>
                <p>Background color for Card</p>
                <p>--card: 0 0% 100%;</p>
                <p>--card-foreground: 222.2 47.4% 11.2%;</p>
            </h1>
            <CardWithForm />
            <h1>
                <p>
                    Background color for popovers such as DropdownMenu,HoverCard
                    , Popover
                </p>
                <p>--popover: 0 0% 100%;</p>
                <p>--popover-foreground: 222.2 47.4% 11.2%;</p>
            </h1>
            <DropdownMenuDemo />
            <HoverCardDemo />
            <PopoverDemo />
            <h1>
                <p>Default border color</p>
                <p>--border: 214.3 31.8% 91.4%;</p>
            </h1>
            <h1>
                <p>Border color for inputs such as Input Select Textarea</p>
                <p>--input: 214.3 31.8% 91.4%;</p>
            </h1>
            <InputDemo />
            <SelectDemo />
            <TextareaDemo />
            <h1>
                <p>Primary colors for Button</p>
                <p>--primary: 222.2 47.4% 11.2%;</p>
                <p> --primary-foreground: 210 40% 98%;</p>
            </h1>
            <ButtonDemo />
            <h1>
                <p>Secondary colors for Button</p>
                <p>--secondary: 210 40% 96.1%; </p>
                <p>--secondary-foreground: 222.2 47.4% 11.2%;</p>
            </h1>
            <ButtonSecondary />
            <h1>
                <p>
                    Used for accents such as hover effects on DropdownMenuItem,
                    SelectItem...etc
                </p>
                <p>--accent: 210 40% 96.1%; </p>
                <p>--accent-foreground: 222.2 47.4% 11.2%;</p>
            </h1>
            <DropdownMenuDemo />
            <SelectDemo />
            <h1>
                <p>
                    Used for destructive actions such as Button
                    variant="destructive"
                </p>
                <p>--destructive: 0 100% 50%; </p>
                <p>--destructive-foreground: 210 40% 98%;</p>
            </h1>
            <Button variant="destructive">删除</Button>
            <h1>
                <p>Used for focus ring</p>
                <p>--ring: 215 20.2% 65.1%;</p>
                <p>Border radius for card, input and buttons</p>
                <p>--radius: 0.5rem;</p>
            </h1>
        </div>
    );
};
export default Ui;
