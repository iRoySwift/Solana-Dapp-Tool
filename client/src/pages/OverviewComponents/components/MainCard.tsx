import {
    Card,
    CardContent,
    CardHeader,
    Divider,
    useTheme,
} from "@mui/material";
import React from "react";

interface Props {
    title?: string;
    content?: boolean;
    border?: boolean;
    divider?: boolean;
    secondary?: React.ReactNode;
    children: React.ReactNode;
    codeHighlight?: boolean;
    sx?: object;
}
const MainCard: React.FC<Props> = React.forwardRef<HTMLDivElement, Props>(
    (
        {
            title,
            secondary,
            content = true,
            border = true,
            divider = true,
            sx = {},
            children,
        },
        ref
    ) => {
        const theme = useTheme();
        return (
            <Card
                ref={ref}
                sx={{
                    ...sx,
                    borderRadius: 2,
                    border: border ? "1px solid" : "none",
                    borderColor:
                        theme.palette.mode === "dark"
                            ? theme.palette.divider
                            : theme.palette.grey[50],
                    boxShadow: theme.shadows[6],
                }}>
                {title && (
                    <CardHeader
                        title={title}
                        titleTypographyProps={{ variant: "subtitle1" }}
                        action={secondary}
                    />
                )}
                {title && divider && <Divider />}
                {content && <CardContent>{children}</CardContent>}
                {!content && children}
            </Card>
        );
    }
);
export default MainCard;
