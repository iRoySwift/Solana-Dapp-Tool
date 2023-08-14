import { Chip, Stack } from "@mui/material";
import DrawerHeaderStyled from "./DrawerHeaderStyled";
import Logo from "@/components/Logo/index";

interface Props {
    open?: boolean;
}
const DrawerHeader: React.FC<Props> = ({ open }) => {
    console.log("🚀 ~ file: index.tsx:9 ~ open:", open);
    return (
        <DrawerHeaderStyled open={open}>
            <Stack direction="row" spacing={1} alignItems="center">
                <Logo
                    open={open}
                    sx={{
                        ...(!open
                            ? { width: 35, height: 35 }
                            : { width: 160, height: 35 }),
                    }}
                />
                {open && (
                    <Chip
                        label={process.env.REACT_APP_VERSION}
                        size="small"
                        component="a"
                        href="https://github.com/iRoySwift"
                        target="_blank"
                        clickable
                        sx={{
                            height: 16,
                            "& .MuiChip-label": {
                                fontSize: "0.625rem",
                                py: 0.25,
                            },
                        }}
                    />
                )}
            </Stack>
        </DrawerHeaderStyled>
    );
};

export default DrawerHeader;
