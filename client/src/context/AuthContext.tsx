import React, { createContext, useContext, ReactNode, useEffect } from 'react';
import { useAuthStore } from '@/store/auth.store'; // Adjust the import path as needed
import { metadata } from "@/utils/types";
import { axiosIntercept } from '@/utils/axios.interceptor';

interface AuthContextType {
    isSignedIn: boolean | null;
    authId: string | null;
    user: metadata | null;
    setAuthState: (state: Partial<{
        isSignedIn: boolean | null;
        authId: string | null;
        user: metadata | null;
    }>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
    children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {

    const { isSignedIn, authId, user, setAuthState } = useAuthStore();

    useEffect(() => {
        const checkAuthStatus = async () => {
            try {

                const response = await axiosIntercept.get("/me")
                const user = response.data.payload;
                const success = response.data.success;

                setAuthState({
                    isSignedIn: success,
                    user,
                    authId: user.id
                })

            } catch (error) {
                console.error('Error checking auth status:', error);
            }
        };

        if (isSignedIn === null) {
            checkAuthStatus();
        }
    }, [isSignedIn, setAuthState]);

    const contextValue: AuthContextType = {
        isSignedIn,
        authId,
        user,
        setAuthState
    };

    return (
        <AuthContext.Provider value={contextValue}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = (): AuthContextType => {
    const context = useContext(AuthContext);

    if (context === undefined) {
        throw new Error('useAuth must be used within an AuthProvider');
    }

    return context;
};