import React, { useEffect, useState } from 'react'
// @mui/material components
import {
    Divider,
    Grid,
    Button,
    Typography,
    TextField,
    FormControlLabel,
    FilledInput,
    FormControl,
    FormHelperText,
    Box,
    FormLabel,
} from '@mui/material';

import { makeStyles } from '@mui/styles';
import { Controller, useForm } from 'react-hook-form';
import { ErrorMessage } from '@hookform/error-message';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';

import { useDispatch, useSelector } from 'react-redux';
import { EditFavorite } from 'redux/actions/favoriteTracksActions';

const useStyles = makeStyles((theme) => ({
    root: {
        width: "500px",
        display: 'flex',
        justifyContent: "center",
        alignItems: "center",
        padding: theme.spacing(3),
        paddingTop: "10px !important",
        [theme.breakpoints.down("sm")]: {
            width: "80vw"
        },
    },
    buttons: {
        padding: "2px !important",
    },
    removeicon: {
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.error.main,
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
        },
    },
    addicon: {
        
        width: theme.spacing(3),
        height: theme.spacing(3),
        color: theme.palette.success.main,        
        [theme.breakpoints.down("sm")]: {
            width: theme.spacing(2.5),
            height: theme.spacing(2.5),
        },
    },
    centerBtns:{
        display: 'flex',
        marginTop: "0.35rem !important", 
        [theme.breakpoints.down("sm")]: {    
            marginTop: "0.7rem", 
        },
        justifyContent: 'center !important',
        alignItems: "start !important"
    },
    center: {
        textAlign: 'center',
        display: 'flex',
        justifyContent: 'center'
    },
    center2: {
        textAlign: 'right',
        marginBlockStart:"0.5rem !important",
        marginBlockEnd:"auto !important"
    },
    inputs: {
        width: '100%',
        '& span': {
            color: '#bf1650',
            '&::before': {
                display: 'inline',
                content: '"⚠ "',
            },
        },
    },
    errorsView:{
        color: '#bf1650',
        '&::before': {
            display: 'inline',
            content: '"⚠ "',
        },
    },
    inputs2: {
        width: '100%',
    },
    select: {
        width: '100%',
    },
    input: {
        display: 'none',
    },
    buttonSave: {
        color: 'white',
        margin: theme.spacing(3)
    },
    conceptosTrabajo:{
        height: "200px",
        width:"100%",
        overflow:"auto",
        [theme.breakpoints.down("sm")]:{
            height: "120px",
        },
    }
}));

const DrawerFavoriteEdit = ({ handleDrawerClose }) => {
    const classes = useStyles();
    const favorite = useSelector(state => state.favorites.favorite)
    const dispatch = useDispatch()

    const defaultValues = {
        id: favorite.id,
        note: favorite.note
    };
    
    const schema = yup.object().shape({
        note: yup.string().required('Nombre del cliente es requerido').trim(),
    });

    const { handleSubmit, formState: { errors }, control, reset } = useForm({
        resolver: yupResolver(schema),
        defaultValues: defaultValues,
    });

    const onSubmit = data => {
        if(favorite.note === data.note) {
            return;
        } 

        dispatch(EditFavorite(data, data.id))
        reset(defaultValues);
        handleDrawerClose();
    }

    return (
        <>
            <form onSubmit={handleSubmit(onSubmit)} className={classes.root} autoComplete="off">
                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <Typography variant="h4" gutterBottom className={classes.center}>
                            Actualizar cliente cliente
                        </Typography>
                        <Divider />
                    </Grid>
                    <Grid item xs={12}>
                        <FormControl
                                variant="filled"
                                component={Box}
                                width="100%"
                                marginBottom="1rem!important"
                            >
                            <FormLabel>Note</FormLabel>
                            <Controller
                                name="note"
                                control={control}
                                render={({ field }) =>
                                    <FilledInput
                                        {...field}
                                        name="note"
                                        size="small"
                                        className={classes.inputs}
                                        variant="outlined"
                                        helperText={<ErrorMessage errors={errors} name="note" as="span" />}
                                        label="note"
                                    />
                                } />
                            <FormHelperText>
                                <ErrorMessage errors={errors} name="note" as="span" />
                            </FormHelperText>
                        </FormControl>
                    </Grid>
                    <Grid item xs={12} className={classes.center}>
                        <Button
                            className={classes.buttonSave}
                            variant="contained"
                            color="primary"
                            type="submit" >
                            Registrar
                        </Button>
                    </Grid>
                </Grid>
            </form>
        </>
    );
}

export default DrawerFavoriteEdit;