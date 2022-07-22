import { Drawer } from '@mui/material'
import { makeStyles } from '@mui/styles';
import React from 'react'

const useStyles = makeStyles((theme) => ({
    MuiDrawer: {
        width: "auto !important",
    },
}));

const DrawerCustom = ({ handleDrawerClose, isOpen, component: Component, ...rest }) => {
    const classes = useStyles();
    return (
        <Drawer
            anchor="right"
            open={isOpen}
            onClose={handleDrawerClose}
            classes={{ paper:classes.MuiDrawer, }}
        >
            <Component handleDrawerClose={handleDrawerClose} {...rest} />
        </Drawer>
    )
}

export default DrawerCustom
