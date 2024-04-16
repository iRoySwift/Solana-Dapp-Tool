"use client";
import React, { useCallback, useEffect, useState } from "react";
import { ChevronDownIcon, ChevronUpIcon } from "@heroicons/react/16/solid";
import Item from "./Item";
import { iItem, iMenu } from ".";

interface Props {
    item: iMenu;
    selected: string;
    drawer?: boolean;
    handleSelect: (item: iItem) => void;
    children?: React.ReactNode;
}
const Group: React.FC<Props> = props => {
    const { item, selected, drawer, handleSelect } = props;
    const [open, setOpen] = useState(false);
    const [isSelected, setIsSelected] = useState(false);
    const [isActive, setIsActive] = useState(false);

    const hasChildren = item.children && item.children.length;

    const handleCollapse = useCallback((open: boolean) => {
        setOpen(open);
    }, []);

    const handleGroupClick = useCallback(
        (item: iItem) => {
            if (hasChildren) {
                handleCollapse(!open);
            } else {
                handleSelect(item);
            }
        },
        [handleCollapse, handleSelect, hasChildren, open]
    );

    useEffect(() => {
        let el =
            hasChildren &&
            item.children?.find(el => {
                return el.id == selected;
            });
        if (selected == item.id || el) {
            setIsActive(true);
        } else {
            setIsActive(false);
        }

        return () => {
            setIsActive(false);
        };
    }, [hasChildren, item, selected]);

    // group class
    let groupSelectClass = !drawer ? "drawer " : "expanded ";
    if (drawer) {
        groupSelectClass += "p-2 pl-6 pr-4 ";
        if (!hasChildren) {
            groupSelectClass +=
                "hover:!bg-accent hover:!text-accent-foreground ";
            if (isActive) {
                groupSelectClass +=
                    "border-r-2 border-primary bg-accent text-accent-foreground";
            }
        }
    } else {
        groupSelectClass += "m-2 mx-3 rounded-md hover:bg-accent ";
        if (isActive) {
            groupSelectClass +=
                "text-accent-foreground bg-accent hover:!bg-accent ";
        }
    }

    return (
        <div>
            <ul className="group">
                {drawer && (
                    <div className="my-3 pl-6 text-xs">{item.group}</div>
                )}
                {/*  */}
                <div
                    className={` ${groupSelectClass} group-has-[.selected]:text-primary group-has-[.invisible]:hover:bg-accent`}>
                    <a
                        className="my-1 block"
                        onClick={() => handleGroupClick(item)}>
                        <div
                            className={`flex  cursor-pointer items-center justify-between text-sm leading-relaxed `}>
                            <div
                                className={`${drawer ? "mr-1 h-4 w-4 " : "flex h-9 w-9 items-center justify-center px-2"}`}>
                                {item.icon}
                            </div>
                            {drawer && (
                                <div className="my-1 flex-1">{item.title}</div>
                            )}
                            {drawer && hasChildren && (
                                <div className="w-3">
                                    {open ? (
                                        <ChevronUpIcon className="h-4 w-4" />
                                    ) : (
                                        <ChevronDownIcon className="h-4 w-4" />
                                    )}
                                </div>
                            )}
                        </div>
                    </a>
                </div>
                {drawer &&
                    item.children?.map((el, i) => (
                        <Item
                            key={i}
                            item={el}
                            open={open}
                            selected={selected}
                            handleSelect={handleSelect}
                            handleCollapse={handleCollapse}
                        />
                    ))}
            </ul>
        </div>
    );
};
export default Group;
