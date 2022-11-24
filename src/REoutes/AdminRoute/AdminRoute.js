import React, { useContext } from 'react';
import { AuthContext } from '../../AuthProvider';
import { Navigate, useLocation } from 'react-router-dom';
import useAdmin from '../../Hooks/useAdmin';
import Loading from '../../Loading/Loading';

const AdminRoute = ({ children }) => {
    const { user,loading } = useContext(AuthContext);
    const location = useLocation();
    const [isAdmin,isAdminLoading]=useAdmin(user?.email)
    if(loading || isAdminLoading){
        return <Loading></Loading>
    }
    if (user && isAdmin) {
        return children;
    }

    return <Navigate to="/login" state={{from: location}} replace></Navigate>
};

export default AdminRoute;