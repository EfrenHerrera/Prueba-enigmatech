import React, { useState } from "react";
// @mui/Components
import {
    Box,
    Button,
    Card,
    CardContent,
    CardHeader,
    FilledInput,
    FormControl,
    FormControlLabel,
    FormGroup,
    FormHelperText,
    Grid,
    InputAdornment,
    Switch,
} from "@mui/material";
import { Email, Lock } from "@mui/icons-material";
import { useTheme } from "@emotion/react";
import { makeStyles } from "@mui/styles";

import { useDispatch } from "react-redux";
import { useCookies } from "react-cookie";
import { Controller, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { ErrorMessage } from "@hookform/error-message";
import * as yup from 'yup';
import { startLoginEmailPassword, LoginGraphql } from "redux/actions/authActions";
import { Link } from "react-router-dom";

const useStyles = makeStyles( theme => ({
}));

const Login = () => {
    const classes = useStyles();
    const theme = useTheme();
    const dispatch = useDispatch();
    const [cookies, setCookie] = useCookies(["authToken"]);
    const [withGraphql, setWithGraphql] = useState(false)

    const defaultValues = {
        email: "",
        password: "",
    };

    const schema = yup.object().shape({
        email: yup.string().required("Correo electronico es requerido"),
        password: yup.string().required("Contraseña es requerida"),
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
        withGraphql ? dispatch(LoginGraphql(data, setCookie))
            : dispatch(startLoginEmailPassword(data, setCookie));
        reset(defaultValues);
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
                                    Iniciar Sesion
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
                                name="email"
                                control={control}
                                render={({ field }) => (
                                    <FilledInput
                                        autoComplete="off"
                                        value={field.value}
                                        onChange={(e) =>
                                            field.onChange((field.value = e.target.value))
                                        }
                                        placeholder="Correo electronico"
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
                                    placeholder="Contraseña"
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
                            <FormGroup>
                                <FormControlLabel control={
                                <Switch checked={withGraphql} onChange={()=> setWithGraphql(!withGraphql)} size="small" />} 
                                    label="Login with Graphql" />
                            </FormGroup>
                            <Box textAlign="center" marginTop="1.2rem" marginBottom="1.2rem">
                                <Button color="primary" variant="contained" type="submit">
                                    Iniciar Sesion
                                </Button>
                                <Link to={'/auth/register'}>¿aun no estas registrado?</Link>
                            </Box>
                        </form>
                    </CardContent>
                </Card>
            </Grid>
        </>
    );
};

export default Login;
