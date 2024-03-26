import React, { useEffect, useState } from "react";
import Group from "./Group";

export type iItem = {
    id: string;
    title: string;
    group?: string;
    icon?: any;
    [key: string]: any;
};

export type iMenu = iItem & {
    children?: iItem[];
};

interface Props {
    drawer?: boolean;
    defaultSelectKey?: string;
    dataSource: iMenu[];
}

const Menu: React.FC<Props> = props => {
    const { dataSource, defaultSelectKey, drawer } = props;
    const [selected, setSelected] = useState(defaultSelectKey || "");

    const handleSelect = (item: iItem) => {
        if (!item.children || !item.children.length) {
            setSelected(item.id);
        }
    };
    useEffect(() => {
        setSelected(defaultSelectKey || "");
    }, [defaultSelectKey]);
    return (
        <>
            {dataSource.map((item, i) => (
                <Group
                    selected={selected}
                    drawer={!!drawer}
                    item={item}
                    key={i}
                    handleSelect={handleSelect}
                />
            ))}
        </>
    );
};
export default Menu;
