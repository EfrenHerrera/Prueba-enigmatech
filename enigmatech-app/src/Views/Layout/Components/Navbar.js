import { Box, Button } from '@mui/material'
import { makeStyles } from '@mui/styles'
import React from 'react'

const useStyles = makeStyles(theme => ({
    container: {
        display: 'flex',
        position: 'absolute',
        top: 0,
        width: '100vw',
        alignItems: 'center',
        justifyContent: 'end',
        backgroundColor: theme.palette.primary.main,
        padding:'5px 25px'
    },
    buttonLogout:{
        backgroundColor: "#fff",
        color: "#000",
        padding:0,
        margin:0
    }
}));

const Navbar = ({handleLogout, handleGotoFavoritos, location}) => {
    const classes = useStyles();

    return (
        <Box className={classes.container}> 
            
            <Button onClick={handleGotoFavoritos} sx={{ marginRight: '20px' }} >
                {location !== "/favorites" ? "Favorites" : "Home"}
            </Button>
            <Button onClick={handleLogout} className={classes.buttonLogout} classes={{ root: classes.buttonLogout}}>Logout</Button>
        </Box>
    )
}

export default Navbar