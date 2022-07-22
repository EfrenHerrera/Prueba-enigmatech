import React from 'react';
import { CookiesProvider } from 'react-cookie';
import { Provider } from 'react-redux'; 
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";

import AppRouter from 'routes/AppRouter';
import theme from "assets/theme/theme.js";

import {
  store, 
} from 'redux/store';

const App = () => {
  return (
    <CookiesProvider>
        <Provider store={store}>
            <ThemeProvider theme={theme}>
              <CssBaseline />
              <AppRouter />
            </ThemeProvider>
        </Provider>
    </CookiesProvider>
  );
}

export default App;
