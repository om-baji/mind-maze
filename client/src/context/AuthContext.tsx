// import { useAuth } from "@/hooks/useAuth";
// import { isAuthAtom } from "@/store/authAtom";
// import { userAtom } from "@/store/metadata.atom";
// import { useAtomValue, useSetAtom } from "jotai";
// import { useEffect, useRef } from "react";

// export function AuthProvider({ children }: { children: React.ReactNode }) {
//     const setMeta = useSetAtom(userAtom);
//     const setIsAuth = useSetAtom(isAuthAtom);
//     const initialized = useRef(false);

//     const { isLoading, error, status refetch } = useAuth();

//     useEffect(() => {
//         if (!initialized.current) {
//             refetch();
//             initialized.current = true;
//         }
//     }, [refetch]);

//     useEffect(() => {
//         if (!isLoading && !error && meta && status) {
//             console.log(meta)
//             setIsAuth(status);
//             setMeta(meta);
//         }
//     }, [isLoading, error, status, meta, setIsAuth, setMeta]);

//     return <>{children}</>;
// }

// export const useAuthCtx = () => {
//     const isAuth = useAtomValue(isAuthAtom);
//     const meta = useAtomValue(userAtom);

//     return {
//         isAuth: isAuth ?? false,
//         userId: meta ?? null,
//     };
// };