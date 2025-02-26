import { isAuthAtom } from "@/store/authAtom";
import { useAuth } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect } from "react";

const AuthContext = createContext<boolean | undefined>(undefined);

export function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    const { isLoaded, isSignedIn } = useAuth();
    const [isAuth, setAuth] = useAtom(isAuthAtom);

    useEffect(() => {
        if (isLoaded) {
            setAuth(!!isSignedIn);
        }
    }, [isLoaded, isSignedIn, setAuth]);

    return <AuthContext.Provider value={isAuth}>
        {children}
    </AuthContext.Provider>
}

export const useAuthCtx = () => {
    const context = useContext(AuthContext);
    
    if (context === undefined) {
        throw new Error("useAuthCtx must be used within an AuthProvider");
    }
    
    return context;
};

