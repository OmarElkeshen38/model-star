import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";

export default function RoleBasedRoute({ allowedRoles, children }) {
    const { user } = useSelector((state) => state.auth);

    if (!user) {
        return <Navigate to="/auth/login" replace />;
    }

    if (!allowedRoles.includes(user.role)) {
        return <Navigate to="/" replace />;
    }

    return children;
}
