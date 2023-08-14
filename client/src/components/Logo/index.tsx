import PropTypes from "prop-types";
import { Link, To } from "react-router-dom";

// material-ui
import { ButtonBase, SxProps, Theme } from "@mui/material";

// project import
import Logo from "./Logo";
import config from "@/config";
import MiniLogo from "./MiniLogo";

// ==============================|| MAIN LOGO ||============================== //

interface Props {
    sx?: SxProps<Theme>;
    to?: To;
    open?: boolean;
}

const LogoSection: React.FC<Props> = ({ sx, to, open }) => (
    <ButtonBase
        disableRipple
        component={Link}
        to={!to ? config.defaultPath : to}
        sx={sx}>
        {open ? <Logo /> : <MiniLogo />}
    </ButtonBase>
);

LogoSection.propTypes = {
    sx: PropTypes.object,
    to: PropTypes.string,
};

export default LogoSection;
