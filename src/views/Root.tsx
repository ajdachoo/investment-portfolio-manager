import React, { useState } from "react";
import { useAuth } from "hooks/useAuth";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";
import { LoadingOverlay } from "@mantine/core";

const Root = () => {
    const auth = useAuth();

    return (
        <>
            {auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </>
    );
}

export default Root;

//<LoadingOverlay visible={true} zIndex={1000} overlayProps={{ radius: "sm", blur: 2 }} />