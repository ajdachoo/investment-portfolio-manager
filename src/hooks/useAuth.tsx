import React, { FC, useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, UserProps } from "types/types";

interface AuthProviderProps {
    children: React.ReactNode;
}

type AuthContextType = {
    user: UserProps | null;
    signIn: (signInData: SignInProps) => Promise<boolean>;
    signOut: () => void;
}

type SignInProps = {
    email: string;
    password: string;
}

const AuthContext = React.createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<UserProps | null>(null);

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
            (async () => {
                try {
                    const response = await axios.get(`${API_URL}/account`, {
                        headers: {
                            authorization: `Bearer ${token}`,
                        },
                    });
                    setUser(response.data);
                } catch (e) {
                    console.log(e);
                }
            })();
        }
    }, []);

    const signIn = async (signInData: SignInProps) => {
        try {
            const responseToken = await axios.post(`${API_URL}/account/login`, signInData);
            localStorage.setItem('token', responseToken.data);
            const responseUser = await axios.get(`${API_URL}/account`, {
                headers: {
                    authorization: `Bearer ${responseToken.data}`,
                },
            });
            setUser(responseUser.data);
        } catch (e) {
            console.log(e);
            return false;
        }
        return true;
    };

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    return (<AuthContext.Provider value={{ user, signIn, signOut }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw Error('useAuth needs to be inside AuthContext');
    }

    return auth;
};