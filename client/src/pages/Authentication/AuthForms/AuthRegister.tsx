import React, { useEffect, useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import AnimateButton from "@/components/AnimateButton";
import {
    Box,
    Grid,
    Stack,
    InputLabel,
    OutlinedInput,
    FormHelperText,
    InputAdornment,
    IconButton,
    Link,
    FormControl,
    Typography,
    Button,
    Divider,
} from "@mui/material";
import FirebaseSocial from "./FirebaseSocial";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import { strengthColor, strengthIndicator } from "@/utils/password-strength";

const validationSchema = Yup.object({
    firstname: Yup.string().max(255).required("First Name is required"),
    lastname: Yup.string().max(255).required("Last Name is required"),
    email: Yup.string()
        .email("Must be a valid email")
        .max(255)
        .required("Email is required"),
    password: Yup.string().max(255).required("Password is required"),
});
interface Props {}
const AuthRegister: React.FC<Props> = () => {
    const [level, setLevel] = useState<any>();
    const [showPassword, setShowPassword] = useState(false);
    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };

    const handleMouseDownPassword = event => {
        event.preventDefault();
    };

    const changePassword = value => {
        const temp = strengthIndicator(value);
        setLevel(strengthColor(temp));
    };

    useEffect(() => {
        changePassword("");
    }, []);
    const formik = useFormik({
        initialValues: {
            firstname: "",
            lastname: "",
            email: "",
            company: "",
            password: "",
            submit: null,
        },
        validationSchema,
        onSubmit: async (_values, { setErrors, setStatus, setSubmitting }) => {
            try {
                setStatus({ success: false });
                setSubmitting(false);
            } catch (err) {
                console.error(err);
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        },
    });
    return (
        <Box component="form" noValidate onSubmit={formik.handleSubmit}>
            <Grid container spacing={3}>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="firstname-signup">
                            First Name*
                        </InputLabel>
                        <OutlinedInput
                            id="firstname-login"
                            type="firstname"
                            value={formik.values.firstname}
                            name="firstname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="John"
                            fullWidth
                            error={Boolean(
                                formik.touched.firstname &&
                                    formik.errors.firstname
                            )}
                        />
                        {formik.touched.firstname &&
                            formik.errors.firstname && (
                                <FormHelperText
                                    error
                                    id="helper-text-firstname-signup">
                                    {formik.errors.firstname}
                                </FormHelperText>
                            )}
                    </Stack>
                </Grid>
                <Grid item xs={12} md={6}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="lastname-signup">
                            Last Name*
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(
                                formik.touched.lastname &&
                                    formik.errors.lastname
                            )}
                            id="lastname-signup"
                            type="lastname"
                            value={formik.values.lastname}
                            name="lastname"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Doe"
                            inputProps={{}}
                        />
                        {formik.touched.lastname && formik.errors.lastname && (
                            <FormHelperText
                                error
                                id="helper-text-lastname-signup">
                                {formik.errors.lastname}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="company-signup">
                            Company
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(
                                formik.touched.company && formik.errors.company
                            )}
                            id="company-signup"
                            value={formik.values.company}
                            name="company"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="Demo Inc."
                            inputProps={{}}
                        />
                        {formik.touched.company && formik.errors.company && (
                            <FormHelperText
                                error
                                id="helper-text-company-signup">
                                {formik.errors.company}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email-signup">
                            Email Address*
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                            id="email-login"
                            type="email"
                            value={formik.values.email}
                            name="email"
                            onBlur={formik.handleBlur}
                            onChange={formik.handleChange}
                            placeholder="demo@company.com"
                            inputProps={{}}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <FormHelperText error id="helper-text-email-signup">
                                {formik.errors.email}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password-signup">
                            Password
                        </InputLabel>
                        <OutlinedInput
                            fullWidth
                            error={Boolean(
                                formik.touched.password &&
                                    formik.errors.password
                            )}
                            id="password-signup"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            name="password"
                            onBlur={formik.handleBlur}
                            onChange={e => {
                                formik.handleChange(e);
                                changePassword(e.target.value);
                            }}
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        edge="end"
                                        size="large">
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                            placeholder="******"
                            inputProps={{}}
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText
                                error
                                id="helper-text-password-signup">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </Stack>
                    <FormControl fullWidth sx={{ mt: 2 }}>
                        <Grid container spacing={2} alignItems="center">
                            <Grid item>
                                <Box
                                    sx={{
                                        bgcolor: level?.color,
                                        width: 85,
                                        height: 8,
                                        borderRadius: "7px",
                                    }}
                                />
                            </Grid>
                            <Grid item>
                                <Typography
                                    variant="subtitle1"
                                    fontSize="0.75rem">
                                    {level?.label}
                                </Typography>
                            </Grid>
                        </Grid>
                    </FormControl>
                </Grid>
                <Grid item xs={12}>
                    <Typography variant="body2">
                        By Signing up, you agree to our &nbsp;
                        <Link variant="subtitle2" component={RouteLink} to="#">
                            Terms of Service
                        </Link>
                        &nbsp; and &nbsp;
                        <Link variant="subtitle2" component={RouteLink} to="#">
                            Privacy Policy
                        </Link>
                    </Typography>
                </Grid>
                {formik.errors.submit && (
                    <Grid item xs={12}>
                        <FormHelperText error>
                            {formik.errors.submit}
                        </FormHelperText>
                    </Grid>
                )}
                <Grid item xs={12}>
                    <AnimateButton>
                        <Button
                            disableElevation
                            disabled={formik.isSubmitting}
                            fullWidth
                            size="large"
                            type="submit"
                            variant="contained"
                            color="primary">
                            Create Account
                        </Button>
                    </AnimateButton>
                </Grid>
                <Grid item xs={12}>
                    <Divider>
                        <Typography variant="caption">Sign up with</Typography>
                    </Divider>
                </Grid>
                <Grid item xs={12}>
                    <FirebaseSocial />
                </Grid>
            </Grid>
        </Box>
    );
};
export default AuthRegister;
