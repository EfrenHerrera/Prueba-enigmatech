import React from "react";
// @mui/Components
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FilledInput,
    FormControl,
    FormHelperText,
    Grid,
    InputAdornment,
} from "@mui/material";
import { Email, Lock, Person } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";

import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";
import { RegisterNewUser } from "redux/actions/authActions";
import * as yup from 'yup';

const useStyles = makeStyles( theme => ({
}));

const RegisterUser = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();

    const [cookies, setCookie] = useCookies(["authToken"]);

    const defaultValues = {
        firstName: "",
        lastName: "",
        email: "",
        password: "",
    };

    const schema = yup.object().shape({
        firstName: yup.string().required("Campo requerido"),
        lastName: yup.string().required("Campo requerido"),
        email: yup.string().required("Email requerido"),
        password: yup.string().required("Password requerido"),
    });

    const {
        handleSubmit,
        formState: { errors },
        control,
        reset,
    } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = async (data) => {
        dispatch(RegisterNewUser(data, setCookie));
        // reset(defaultValues);
    };

    return (
        <>
            <Grid item xs={12} sm={7} md={5}>
                <Card>
                    <CardHeader
                        title={
                            <Box
                                color={theme.palette.gray[600]}
                                textAlign="center"
                                marginBottom="0rem"
                                marginTop="0rem"
                                fontSize="1.3rem" >
                                <Box fontSize="80%" fontWeight="400" component="small">
                                    Registrate
                                </Box>
                            </Box>
                        }
                        titleTypographyProps={{
                            component: Box,
                            textAlign: "center",
                            marginBottom: "0rem!important",
                            marginTop: "0rem!important",
                            fontSize: "1.3rem!important",
                        }}
                    ></CardHeader>
                    <CardContent sx={{ padding:' 10px 50px' }}>
                        <form onSubmit={handleSubmit(onSubmit)}>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Controller
                                    name="firstName"
                                    control={control}
                                    render={({ field }) => (
                                        <FilledInput
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange((field.value = e.target.value))
                                            }
                                            placeholder="First name"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Person />
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                <FormHelperText>
                                    <ErrorMessage errors={errors} name="firstName" as="span" />
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Controller
                                    name="lastName"
                                    control={control}
                                    render={({ field }) => (
                                        <FilledInput
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange((field.value = e.target.value))
                                            }
                                            placeholder="Last name"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Person />
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                <FormHelperText>
                                    <ErrorMessage errors={errors} name="lastName" as="span" />
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Controller
                                    name="email"
                                    control={control}
                                    render={({ field }) => (
                                        <FilledInput
                                            autoComplete="off"
                                            value={field.value}
                                            onChange={(e) =>
                                                field.onChange((field.value = e.target.value))
                                            }
                                            placeholder="Email"
                                            startAdornment={
                                                <InputAdornment position="start">
                                                    <Email />
                                                </InputAdornment>
                                            }
                                        />
                                    )}
                                />
                                <FormHelperText>
                                    <ErrorMessage errors={errors} name="email" as="span" />
                                </FormHelperText>
                            </FormControl>
                            <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                                <Controller
                                name="password"
                                control={control}
                                render={({ field }) => (
                                    <FilledInput
                                    autoComplete="off"
                                    onChange={(e) =>
                                        field.onChange((field.value = e.target.value))
                                    }
                                    type="password"
                                    placeholder="Password"
                                    startAdornment={
                                        <InputAdornment position="start">
                                        <Lock />
                                        </InputAdornment>
                                    }
                                    />
                                )}
                                />
                                <FormHelperText>
                                <ErrorMessage errors={errors} name="password" as="span" />
                                </FormHelperText>
                            </FormControl>
                            <Box textAlign="center" marginTop="1.2rem" marginBottom="1.2rem">
                                <Button color="primary" variant="contained" type="submit">
                                    Registrarse
                                </Button>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default RegisterUser;
