import { isAuthAtom } from "@/store/authAtom";
import { authId } from "@/store/userAtom";
import { useAuth } from "@clerk/clerk-react";
import { useAtom } from "jotai";
import { createContext, useContext, useEffect } from "react";

type AuthCtx = {
    isAuth: boolean,
    user_id: string | null
}

const AuthContext = createContext<AuthCtx | undefined>(undefined);

export function AuthProvider({ children }: {
    children: React.ReactNode
}) {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const [isAuth, setAuth] = useAtom(isAuthAtom);
    const [user_id, setUserId] = useAtom(authId);

    useEffect(() => {
        if (isLoaded) {
            setAuth(isSignedIn);
            setUserId(userId)
        }
    }, [isLoaded, isSignedIn, setAuth]);

    return <AuthContext.Provider value={{ isAuth, user_id }}>
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

