import React from "react";
import { Route, Navigat, Outlet } from "react-router-dom"

export default function ProtectedRoute(props) {
    const { token, redirectTo, children } = props
    return token ? children : <Navigate to={redirectTo} />
}