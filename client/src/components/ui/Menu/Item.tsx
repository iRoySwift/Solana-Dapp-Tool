import React, { useEffect, useRef } from "react";
import Link from "next/link";
import { iItem } from ".";

interface Props {
    open: boolean;
    selected: string;
    item: iItem;
    handleSelect: (item: iItem) => void;
    handleCollapse: (value: boolean) => void;
}
const Item: React.FC<Props> = props => {
    const { open, selected, item, handleSelect, handleCollapse } = props;

    let isSelected = useRef(false);
    isSelected.current = selected == item.id;

    useEffect(() => {
        if (selected == item.id) {
            isSelected.current = true;
            handleCollapse(true);
        } else {
            isSelected.current = false;
        }
        return () => {
            isSelected.current = false;
        };
    }, [handleCollapse, item, selected]);
    return (
        <div
            className={`${open ? "visible" : "invisible hidden"} text-tw-fgd-2`}>
            <ul>
                <Link
                    href={item.url}
                    className={`${isSelected.current && "selected"} my-1 block hover:bg-tw-bkg-hover [&.selected]:border-r-2 [&.selected]:border-tw-link-active [&.selected]:bg-tw-bkg-hover  [&.selected]:text-tw-link-active`}
                    onClick={() => handleSelect(item)}>
                    <div className="flex cursor-pointer items-center justify-between p-2 pl-6 pr-4 text-sm leading-relaxed">
                        <div className="w-7"></div>
                        <div className="my-1 flex-1">{item.title}</div>
                    </div>
                </Link>
            </ul>
        </div>
    );
};
export default Item;
