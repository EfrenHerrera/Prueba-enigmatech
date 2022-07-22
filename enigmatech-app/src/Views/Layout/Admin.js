import React, { Component } from "react";
import { Outlet, useNavigate, useLocation, useParams } from "react-router-dom";
import { connect } from "react-redux";
import { withCookies } from "react-cookie";

// @mui/material components
import Box from "@mui/material/Box";
import Navbar from "./Components/Navbar";
import { logout } from "redux/actions/authActions";

// core components

function withRouter(Component) {
  function ComponentWithRouterProp(props) {
    let location = useLocation();
    let navigate = useNavigate();
    let params = useParams();
    return (
      <Component
        {...props}
        router={{ location, navigate, params }}
      />
    );
  }

  return ComponentWithRouterProp;
}
class AdminLayout extends Component {
  // handles
  handleLogout = () => {
    const { logout, cookies } = this.props;
    logout();
    cookies.remove('authToken', { path: '/'})
  }
  handleGotoFavoritos = () => {
      this.props.router.navigate(this.props.router.location.pathname !== "/favorites" ? 'favorites': '/');
  }
  render(){
    
    return (
      <>
        <Navbar 
          location={this.props.router.location.pathname}
          handleLogout={this.handleLogout}  
          handleGotoFavoritos={this.handleGotoFavoritos} />
        {/* Content Views */}
        <Box sx={{ marginTop: '65px' }}>
          <Outlet />
        </Box>
      </>
    );
  }
};

const mapStateToProps = state => ({
});

const bindActions = dispatch => ({
  logout: () => dispatch(logout()),
});

export default withCookies(connect( mapStateToProps, bindActions )(withRouter(AdminLayout)));