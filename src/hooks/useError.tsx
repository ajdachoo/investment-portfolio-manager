import React, { useCallback, useContext, useState } from 'react';

interface ErrorProviderProps {
    children: React.ReactNode;
}

type ErrorContextType = {
    error: string;
    dispatchError: (message: string) => void;
}

const ErrorContext = React.createContext<ErrorContextType | null>(null);

export const ErrorProvider: React.FC<ErrorProviderProps> = ({ children }) => {
    const [error, setError] = useState<string>('');

    const dispatchError = useCallback((message: string) => {
        setError(message);
        setTimeout(() => {
            setError('');
        }, 7000);
    }, []);

    return <ErrorContext.Provider value={{ error, dispatchError }}>{children}</ErrorContext.Provider>;
};

export const useError = () => {
    const errorContext = useContext(ErrorContext);

    if (!errorContext) {
        throw Error('useAuth needs to be used inside AuthContext');
    }

    return errorContext;
};