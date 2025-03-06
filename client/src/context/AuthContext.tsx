import { isAuthAtom } from "@/store/authAtom";
import { authId } from "@/store/userAtom";
import { useAuth } from "@clerk/clerk-react";
import { useAtomValue, useSetAtom } from "jotai";
import { useEffect } from "react";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    const { isLoaded, isSignedIn, userId } = useAuth();
    const setAuth = useSetAtom(isAuthAtom);
    const setUserId = useSetAtom(authId);

    useEffect(() => {
        if (isLoaded) {
            setAuth(isSignedIn);
            setUserId(userId ?? null);
        }
    }, [isLoaded, isSignedIn, userId, setAuth, setUserId]);

    return <>{children}</>;
}

export const useAuthCtx = () => {
    const isAuth = useAtomValue(isAuthAtom);
    const userId = useAtomValue(authId);

    return {
        isAuth: isAuth ?? false,
        userId: userId ?? null,
    };
};
