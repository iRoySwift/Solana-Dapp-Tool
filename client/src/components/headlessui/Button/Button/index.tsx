import React from "react";

interface Props {}
const Button: React.FC<Props> = () => {
    return (
        <button
            className={`group relative z-10 cursor-pointer overflow-hidden rounded-md bg-sky-600 bg-center p-2 text-white transition-colors duration-0  hover:bg-sky-700 hover:bg-100% hover:bg-center hover:duration-1000`}>
            <span>Button</span>
            <span className="absolute z-20 block h-5 w-5 rounded-full bg-neutral-100 opacity-0 group-active:animate-ripple"></span>
        </button>
    );
};
export default Button;
