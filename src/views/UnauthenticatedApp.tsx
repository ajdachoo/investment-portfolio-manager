import React from "react";
import { BrowserRouter, Routes, Route, RedirectFunction, Navigate } from "react-router-dom";
import Login from "./Login/Login";
import Register from "./Register/Register";

const UnauthenticatedApp = () => {
    return (
        <>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<Navigate to={'/login'} />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/register" element={<Register />} />
                </Routes>
            </BrowserRouter>
        </>
    )
}

export default UnauthenticatedApp;