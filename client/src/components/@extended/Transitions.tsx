import { Box, Fade, Grow } from "@mui/material";
import { forwardRef, type ReactNode } from "react";

interface Props {
    children: ReactNode;
    type: "grow" | "fade" | "collapse" | "slide" | "zoom";
    position?:
        | "top-left"
        | "top-right"
        | "top"
        | "bottom-left"
        | "bottom-right"
        | "bottom";
}
const Transitions: React.FC<Props> = forwardRef<HTMLDivElement, Props>(
    (props, ref) => {
        const { children, position, type, ...others } = props;
        let positionSX = {
            transformOrigin: "0 0 0",
        };

        switch (position) {
            case "top-right":
            case "top":
            case "bottom-left":
            case "bottom-right":
            case "bottom":
            case "top-left":
            default:
                positionSX = {
                    transformOrigin: "0 0 0",
                };
                break;
        }

        return (
            <Box ref={ref}>
                {type === "grow" && (
                    <Grow {...others}>
                        <Box sx={positionSX}>{children}</Box>
                    </Grow>
                )}
                {type === "fade" && (
                    <Fade
                        {...others}
                        timeout={{
                            appear: 0,
                            enter: 300,
                            exit: 150,
                        }}>
                        <Box sx={positionSX}>{children}</Box>
                    </Fade>
                )}
            </Box>
        );
    }
);
export default Transitions;
