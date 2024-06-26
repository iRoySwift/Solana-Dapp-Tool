"use client";
import { Menu } from "@/components/headlessui";
import { usePathname } from "next/navigation";
import React, { useCallback, useEffect, useState } from "react";
import { iRoute, routes } from "../../routes";

interface Props {
    drawer?: boolean;
}
const Content: React.FC<Props> = props => {
    const { drawer } = props;
    const pathname = usePathname();
    const [defaultSelectKey, setDefaultSelectKey] = useState();

    const calcKey = useCallback((routes: iRoute[], path: string) => {
        let obj;
        const innerKey = (arr: iRoute[]) => {
            for (let i = 0; i < arr.length; i++) {
                const route = arr[i];
                if (route.url == path) {
                    obj = route;
                    return obj;
                }
                if (route?.children) {
                    innerKey(route.children);
                }
            }
        };
        innerKey(routes);
        return obj;
    }, []);

    useEffect(() => {
        setDefaultSelectKey((calcKey(routes, pathname) as any)?.id);
    }, [calcKey, pathname]);

    return (
        <div>
            <Menu
                defaultSelectKey={defaultSelectKey}
                drawer={drawer}
                dataSource={routes}></Menu>
        </div>
    );
};
export default Content;
