import React, { Component } from "react";
import { Outlet } from "react-router-dom";

// @mui/material components
import { withStyles } from '@mui/styles';
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";

// core components
import themeColors from "assets/theme/colors";


const styles = theme =>({
  container:{
    height: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: themeColors.white.main,
  }
});

class AuthLayout extends Component {

  render(){
    const { classes } = this.props;
    return (
      <>
        <div>
          {/* Content Views */}
          <Container
            component={Box}
            maxWidth="xl">
            <Box component={Grid} container className={classes.container}>
              <Outlet />
            </Box>
          </Container>
          
        </div>
      </>
    );
  }
  
};

export default  withStyles(styles, { withTheme: true })(AuthLayout);
