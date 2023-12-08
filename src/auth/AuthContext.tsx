import axios from 'axios';
import React, { createContext, useContext, useState, ReactNode } from 'react';
import { APIRoutes } from '../utils/apiRoutes';

interface AuthContextType {
    user: { username: string } | null;
    login: (creds: AuthCredentials) => Promise<void>;
    signup: (creds: AuthCredentials) => Promise<void>;
    logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => useContext(AuthContext)!;

interface AuthProviderProps {
    children: ReactNode;
}

interface AuthCredentials {
    username: string;
    password: string;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
    const [user, setUser] = useState<{ username: string, token: string } | null>(null);

    const signup = async (creds: AuthCredentials) => {
        try {
            await axios.post(APIRoutes.SIGN_UP, creds, {});
        } catch (error) {
            console.log('Signup error', error);
        }
    };

    const login = async (creds: AuthCredentials) => {
        try {
            const { data: { accessToken: token }} = await axios.post(APIRoutes.LOG_IN, creds);
            
            localStorage.setItem('authToken', token);
            axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
            setUser({ username: creds.username, token });
        } catch (error) {
            console.log('Login error', error);
        }
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, login, signup, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
