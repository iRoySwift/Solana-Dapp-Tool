import resolveConfig from "tailwindcss/resolveConfig";
import { useMemo } from "react";
import tailwindConfig from "./../../tailwind.config";
import { Config } from "tailwindcss";

const useTailwind = () => {
    const tailwind = useMemo(() => resolveConfig(tailwindConfig as any), []);
    return tailwind;
};

export default useTailwind;
