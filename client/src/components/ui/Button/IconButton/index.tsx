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
            className={`bg-tw-bkg-hover-2 bg-center transition-all duration-0 hover:bg-neutral-200 hover:bg-100% hover:bg-center  hover:duration-1000 active:bg-neutral-300  ${
                !disableRipple && "active:bg-gradient-radial active:bg-15000%"
            } cursor-pointer rounded-md p-2 ${className}`}>
            {children}
        </button>
    );
};
export default IconButton;
