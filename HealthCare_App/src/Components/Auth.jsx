import React, { useState, useCallback, useEffect } from 'react';
import { useUser } from '../Store/zustand.js';
import { GetCurrentUser } from '../Server/Server.js';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from '../Pages/Loading.jsx';

function Auth({ children }) {
    const navigate = useNavigate();
    const location = useLocation();
    const [loader, setLoader] = useState(true);
    const user = useUser(useCallback(state => state.user, []));
    const setUser = useUser(useCallback(state => state.setUser, []));

    const checkUser = async () => {
        try {
            const CurrentUser = await GetCurrentUser();

            if (!CurrentUser || CurrentUser?._id !== user?._id) {
                setUser(null);
                console.log("User not found in database in Auth.jsx");
                navigate("/login-user");
            }

            return CurrentUser || null;
        } catch (error) {
            console.log("Failed to get current user in Auth.jsx: ", error);
            setUser(null);
            navigate("/login-user");
            return null;
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            setLoader(true);
            const CurrentUser = await checkUser();
            if (!CurrentUser) {
                setUser(null);
                console.log("User not found in Auth.jsx");
                navigate("/login-user");
            }
            // console.log(CurrentUser?.name);
            setLoader(false);
        };

        fetchData();
    }, [location.pathname, setUser]);

    return loader ? <Loading/>: <>{children}</>;
}

export default Auth;
