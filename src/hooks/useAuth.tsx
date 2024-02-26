import React, { useContext } from "react";
import axios from "axios";
import { useEffect, useState } from "react";
import { API_URL, RegisterUserProps, SignInProps, UserProps } from "types/types";

interface AuthProviderProps {
    children: React.ReactNode;
}

type AuthContextType = {
    user: UserProps | null;
    signIn: (signInData: SignInProps) => Promise<void>;
    signOut: () => void;
    registerUser: (registerData: RegisterUserProps) => Promise<void>;
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
        const JwtToken = await axios.post(`${API_URL}/account/login`, signInData);
        localStorage.setItem('token', JwtToken.data);

        const responseUser = await axios.get<UserProps>(`${API_URL}/account`, {
            headers: {
                authorization: `Bearer ${JwtToken.data}`,
            },
        });

        setUser(responseUser.data);
    }

    const signOut = () => {
        localStorage.removeItem('token');
        setUser(null);
    };

    const registerUser = async (registerData: RegisterUserProps) => {
        await axios.post(`${API_URL}/account/register`, registerData);
    };

    return (<AuthContext.Provider value={{ user, signIn, signOut, registerUser }}>{children}</AuthContext.Provider>);
};

export const useAuth = () => {
    const auth = useContext(AuthContext);

    if (!auth) {
        throw Error('useAuth needs to be inside AuthContext');
    }

    return auth;
};