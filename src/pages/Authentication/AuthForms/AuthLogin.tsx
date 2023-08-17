import React, { useState } from "react";
import { Link as RouteLink } from "react-router-dom";
import { useFormik } from "formik";
import * as Yup from "yup";
import {
    Button,
    FormHelperText,
    Grid,
    InputLabel,
    IconButton,
    InputAdornment,
    Stack,
    FormControlLabel,
    Checkbox,
    Link,
    Typography,
    Divider,
    Box,
    OutlinedInput,
} from "@mui/material";
import { VisibilityOff, Visibility } from "@mui/icons-material";
import FirebaseSocial from "./FirebaseSocial";
import AnimateButton from "@/components/AnimateButton";

const validationSchema = Yup.object({
    email: Yup.string()
        .email("Enter a valid email")
        .required("Email is required"),
    password: Yup.string()
        .min(8, "Password should be of minimum 8 characters length")
        .max(255)
        .required("Password is required"),
});

interface Props {}
const AuthLogin: React.FC<Props> = () => {
    const [checked, setChecked] = React.useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleClickShowPassword = () => setShowPassword(show => !show);
    const handleMouseDownPassword = (
        event: React.MouseEvent<HTMLButtonElement>
    ) => {
        event.preventDefault();
    };
    const formik = useFormik({
        initialValues: {
            email: "foobar@example.com",
            password: "foobar",
            submit: "",
        },
        validationSchema: validationSchema,
        onSubmit: (values, { setErrors, setStatus, setSubmitting }) => {
            alert(JSON.stringify(values, null, 2));
            try {
                setStatus({ success: false });
                setSubmitting(false);
            } catch (err) {
                setStatus({ success: false });
                setErrors({ submit: err.message });
                setSubmitting(false);
            }
        },
    });

    return (
        <Box component="form" onSubmit={formik.handleSubmit} noValidate>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="email">Email Address</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="email"
                            name="email"
                            // label="Email"
                            value={formik.values.email}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            placeholder="Enter email address"
                            error={Boolean(
                                formik.touched.email && formik.errors.email
                            )}
                        />
                        {formik.touched.email && formik.errors.email && (
                            <FormHelperText
                                error
                                id="standard-weight-helper-text-email-login">
                                {formik.errors.email}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack spacing={1}>
                        <InputLabel htmlFor="password">Password</InputLabel>
                        <OutlinedInput
                            fullWidth
                            id="password"
                            name="password"
                            // label="Password"
                            type={showPassword ? "text" : "password"}
                            value={formik.values.password}
                            onChange={formik.handleChange}
                            onBlur={formik.handleBlur}
                            error={
                                formik.touched.password &&
                                Boolean(formik.errors.password)
                            }
                            placeholder="Enter password"
                            endAdornment={
                                <InputAdornment position="end">
                                    <IconButton
                                        aria-label="toggle password visibility"
                                        onClick={handleClickShowPassword}
                                        onMouseDown={handleMouseDownPassword}
                                        size="large"
                                        edge="end">
                                        {showPassword ? (
                                            <VisibilityOff />
                                        ) : (
                                            <Visibility />
                                        )}
                                    </IconButton>
                                </InputAdornment>
                            }
                        />
                        {formik.touched.password && formik.errors.password && (
                            <FormHelperText
                                error
                                id="standard-weight-helper-text-password-login">
                                {formik.errors.password}
                            </FormHelperText>
                        )}
                    </Stack>
                </Grid>
                <Grid item xs={12}>
                    <Stack
                        direction="row"
                        justifyContent="space-between"
                        alignItems="center"
                        spacing={2}>
                        <FormControlLabel
                            control={
                                <Checkbox
                                    checked={checked}
                                    onChange={event =>
                                        setChecked(event.target.checked)
                                    }
                                    name="checked"
                                    color="primary"
                                    size="small"
                                />
                            }
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
                            Forgot Password?
                        </Link>
                    </Stack>
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
