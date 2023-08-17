import React, { useCallback, useEffect, useState } from "react";
import { useFormik } from "formik";
import { Link as RouteLink } from "react-router-dom";
import {
    Button,
    FormControl,
    FormHelperText,
    Grid,
    InputLabel,
    IconButton,
    InputAdornment,
    InputBase,
    alpha,
    styled,
    Stack,
    FormControlLabel,
    Checkbox,
    Link,
    Typography,
    Divider,
    useFormControl,
    Box,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "@/components/AnimateButton";

const BootstrapInput = styled(InputBase, {
    shouldForwardProp: props => props !== "error",
})(({ theme }) => ({
    "label + &": {
        marginTop: theme.spacing(3),
    },
    "& .MuiInputBase-input": {
        padding: "10px 12px",
        border: "1px solid",
        fontSize: 16,
        borderRadius: 4,
        transition: theme.transitions.create([
            "border-color",
            "background-color",
            "box-shadow",
        ]),
        borderColor: theme.palette.mode === "light" ? "#E0E3E7" : "#2D3843",
        "&:hover": {
            borderColor: theme.palette.primary.main,
        },
        "&:focus": {
            borderColor: theme.palette.primary.main,
            boxShadow: `${alpha(
                theme.palette.primary.main,
                0.25
            )} 0 0 0 0.2rem`,
        },
    },
    "&.Mui-error .MuiInputBase-input": {
        borderColor: theme.palette.error.main,
        "&:hover": {
            borderColor: theme.palette.error.light,
        },
        "&:focus": {
            borderColor: theme.palette.error.main,
            boxShadow: `${alpha(theme.palette.error.main, 0.25)} 0 0 0 0.2rem`,
        },
    },
    "&.MuiInputBase-adornedEnd": {
        "& .MuiInputBase-input": {
            paddingRight: "50px",
        },
    },
}));

interface IHelpProps {
    value: any;
    name: string;
    valid?: boolean;
    type?: "email";
    handleSetError: (name, flag) => void;
}

// 也可以使用formik yup 进行表达校验
function FormValidHelper(props: IHelpProps) {
    const validType = {
        email: "^\\w+([-+.]\\w+)*@\\w+([-.]w+)*.\\w+([-.]\\w+)*$",
        phone: "^(13[0-9]|14[01456879]|15[0-35-9]|16[2567]|17[0-8]|18[0-9]|19[0-35-9])d{8}$",
    };
    const { name, value, valid, handleSetError } = props;
    const { focused, required, error, filled, ...args } =
        useFormControl() || {};
    console.log(
        "🚀 ~ file: AuthLogin.tsx:89 ~ FormValidHelper ~:",
        focused,
        required,
        error,
        filled,
        args
    );
    const isValid =
        valid && filled && !new RegExp(validType[name], "i").test(value);

    const helperText = React.useMemo(() => {
        if ((focused && required && !filled) || (error && !filled)) {
            return `${name} is required`;
        }
        if (!focused && isValid && valid) {
            return `Invalid ${name}`;
        }
        return "";
    }, [focused, required, filled, error, isValid, valid, name]);

    // valid
    useEffect(() => {
        if (focused && required && !filled) {
            return handleSetError(name, true);
        }
        if (!focused && isValid) {
            return handleSetError(name, true);
        }
        return () => {};
    }, [focused, required, filled, name, handleSetError, isValid]);

    return <FormHelperText>{helperText}</FormHelperText>;
}

interface Props {}
const AuthLogin: React.FC<Props> = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState({
        email: false,
        password: false,
    });
    const [showPassword, setShowPassword] = React.useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);

    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: { email: "", password: "" },
        validate: values => {
            const errors: any = {};
            if (!values.email) {
                errors.email = "Required";
            } else if (
                !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
            ) {
                errors.email = "Invalid email address";
            }
            return errors;
        },
        onSubmit: (values, { setSubmitting }) => {
            setTimeout(() => {
                alert(JSON.stringify(values, null, 2));
                setSubmitting(false);
            }, 400);
        },
    });

    const handleEmailChange = v => {
        handleSetError("email", false);
        setEmail(v.target.value);
    };
    const handlePasswordChange = v => {
        handleSetError("password", false);
        setPassword(v.target.value);
    };
    const handleSetError = useCallback((name, flag) => {
        setError(error => ({
            ...error,
            [name]: flag,
        }));
    }, []);
    const handleSubmit = event => {
        console.log(
            "🚀 ~ file: AuthLogin.tsx:169 ~ handleSubmit ~ event:",
            event
        );
        event.preventDefault();
    };

    return (
        <Box component="form" onSubmit={handleSubmit} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <FormControl
                        variant="standard"
                        required
                        fullWidth
                        error={error.email}>
                        <InputLabel
                            htmlFor="email-login"
                            shrink
                            sx={{ transform: "translate(0px, -1.5px)" }}>
                            Email Address
                        </InputLabel>
                        <BootstrapInput
                            id="email-login"
                            value={email}
                            onChange={handleEmailChange}
                            type="email"
                            name="email"
                            placeholder="Enter email address"
                        />
                        <FormValidHelper
                            value={email}
                            name="email"
                            type="email"
                            valid
                            handleSetError={handleSetError}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl
                        variant="standard"
                        required
                        fullWidth
                        error={error.password}>
                        <InputLabel
                            htmlFor="error-login"
                            shrink
                            sx={{ transform: "translate(0px, -1.5px)" }}>
                            Password
                        </InputLabel>
                        <BootstrapInput
                            id="error-login"
                            name="password"
                            value={password}
                            onChange={handlePasswordChange}
                            placeholder="Enter password"
                            type={showPassword ? "text" : "password"}
                            fullWidth
                            endAdornment={
                                <InputAdornment
                                    position="start"
                                    sx={{ position: "absolute", right: "0" }}>
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="start">
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        <FormValidHelper
                            value={password}
                            name="password"
                            handleSetError={handleSetError}
                        />
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <FormControl fullWidth>
                        <Stack
                            direction="row"
                            justifyContent={"space-between"}
                            alignItems={"center"}>
                            <FormControlLabel
                                control={<Checkbox name="gilad" />}
                                label={
                                    <Typography variant="h6">
                                        Keep me sign in
                                    </Typography>
                                }
                            />
                            <Link
                                variant="h6"
                                component={RouteLink}
                                to=""
                                color="text.primary">
                                Forget Password?
                            </Link>
                        </Stack>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            type="submit"
                            color="primary"
                            size="large"
                            variant="contained"
                            fullWidth
                            disabled={formik.isSubmitting}>
                            Login
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider>
                        <Typography variant="caption">Login with</Typography>
                    </Divider>
                </Grid>
                <Grid item xs={12}>
                    <FirebaseSocial />
                </Grid>
            </Grid>
        </Box>
    );
};
export default AuthLogin;
