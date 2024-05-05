import '@mantine/charts/styles.css';
import { useAuth } from "hooks/useAuth";
import AuthenticatedApp from "./AuthenticatedApp";
import UnauthenticatedApp from "./UnauthenticatedApp";

const Root = () => {
    const auth = useAuth();

    return (
        <>
            {auth.user ? <AuthenticatedApp /> : <UnauthenticatedApp />}
        </>
    );
}

export default Root;