import React from "react";

interface Props {
    disableRipple?: boolean;
    children: React.ReactNode;
    className?: string;
}
const IconButton: React.FC<Props> = props => {
    const { disableRipple, className, children } = props;
    return (
        <button
            className={`hover:bg-100% bg-accent bg-center transition-all duration-0 hover:bg-neutral-200 hover:bg-center  hover:duration-1000 active:bg-neutral-300  ${
                !disableRipple && "active:bg-15000% active:bg-gradient-radial"
            } cursor-pointer rounded-md p-2 ${className}`}>
            {children}
        </button>
    );
};
export default IconButton;
