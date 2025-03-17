import { isAuthAtom } from "@/store/authAtom";
import { userAtom } from "@/store/metadata.atom";
import { authId } from "@/store/userAtom";
import { useAtomValue, useSetAtom } from "jotai";

export function AuthProvider({ children }: { children: React.ReactNode }) {
    
    const setMeta = useSetAtom(userAtom)

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
