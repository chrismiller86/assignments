import React, { useContext } from "react"
import { Routes, Route, Navigate } from "react-router-dom"
import Navbar from "./components/Navbar.js"
import Auth from "./components/Auth.js"
import Profile from "./components/Profile.js"
import Public from "./components/Public.js"
import ProtectedRoute from "./components/ProtecetedRoute.js"
import { UserContext } from "./context/UserProvider.js"

export default function App() {
    const { token, logout, user } = useContext(UserContext)
    return (
        <div className="app">
            {token && <Navbar logout={logout} />}
            <Routes>
                <Route
                    path="/"
                    element={token ? <Navigate to="/profile" /> : <Auth />}
                />
                <Route
                    path="/profile"
                    element={
                        <ProtectedRoute token={token} redirectedTo="/">
                            <Profile />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/public"
                    element={
                        <ProtectedRoute token={token} redirectedTo="/">
                            <Public />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    )
}