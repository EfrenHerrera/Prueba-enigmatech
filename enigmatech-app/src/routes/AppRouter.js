import React from 'react';
import { useCookies, withCookies } from 'react-cookie';
import { 
    Navigate, Outlet, Routes, 
    useLocation, Route, BrowserRouter 
} from "react-router-dom";
import Login from 'Views/Auth/Login.js';
import RegisterUser from 'Views/Auth/RegisterUser.js';

import AdminLayout from "Views/Layout/Admin";
import AuthLayout from "Views/Layout/Auth";


import routes from "./routes.js";

function RequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation(); 

    if (!auth.authToken) {
        return <Navigate to="/auth/login" state={{ from: location }} />;
    }

    return children;
}

function NotRequireAuth({ children }) {
    let auth = useAuth();
    let location = useLocation();

    if (auth.authToken) {
        return <Navigate to="/" state={{ from: location }} />;
    }

    return children;
}
const AuthContext = React.createContext(null);

function useAuth() {
    return React.useContext(AuthContext);
}

const AppRouter = () => {
    const [cookies] = useCookies(['authToken'])
    
    const getRoutes = (routes) => {
        return routes.map((prop, key) => {
            if (prop.layout === "/") {
                if (prop.List) {
                    return prop.List.map((prop2, key2) => {
                        return (
                            <Route
                                path={prop2.path}
                                element={prop2.component}
                                key={key2}
                            />
                        );
                    });
                } else {
                    return (
                        <Route
                            path={prop.path}
                            element={prop.component}
                            key={key}
                        />
                    );
                }
            } else {
                return (
                    <Route
                        path={prop.path}
                        element={prop.component}
                        key={key}
                    />
                );
            }
        });
    };
    
    let value = { authToken: cookies.authToken === undefined ? null : cookies.authToken };

    return (
        <BrowserRouter>
            <AuthContext.Provider value={value}>
                <Routes> 
                    
                    <Route path="/" element={
                        <RequireAuth>
                            <AdminLayout />
                        </RequireAuth>
                    } >
                        {getRoutes(routes)}
                        <Route path="*"  element={ <Navigate to="/" />} />
                    </Route>

                    <Route path="/auth/*" element={ 
                        <NotRequireAuth>
                            <AuthLayout />
                        </NotRequireAuth>
                    } >
                        <Route path="login" element={<Login />} />
                        <Route path="register" element={<RegisterUser />} />
                        <Route path="*"  element={ <Navigate to="login" />} />
                    </Route>
                </Routes>
                <Outlet />
            </AuthContext.Provider>
        </BrowserRouter>
    )
}

export default withCookies(AppRouter);
