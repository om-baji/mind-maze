// import { axiosIntercept } from "@/utils/axios.interceptor";
// import { useSetAtom } from "jotai";
// import { useCallback, useEffect, useMemo, useState } from "react";

// type Response = {
//   message: string;
//   payload: {
//     id: string;
//     name: string;
//     email: string;
//   };
//   success: boolean;
//   error?: string;
// };

// export const useAuth = () => {
//   const setAuthId = useSetAtom(authId);
//   const setMeta = useSetAtom(userAtom);
//   const setIsSignedIn = useSetAtom(isSignnedInAtom);

//   const [state, setState] = useState({
//     isLoading: false,
//     error: null as string | null,
//     success: undefined as boolean | undefined,
//   });

//   const fetchAuth = useCallback(async () => {
//     setState((prev) => ({ ...prev, isLoading: true }));
//     console.log("Inside fetchAuth");
//     try {
//       const response = await axiosIntercept.get<Response>("/me");

//       console.log(response.data);
//       const user = response.data.payload;
//       const success = response.data.success;

//       setAuthId(user.id);
//       console.log("Id is set", user.id);
//       setMeta(user);
//       setIsSignedIn(success);

//       setState({ isLoading: false, error: null, success: true });
//     } catch (err) {
//       console.log("UseAUth error ", err);
//       setState({
//         isLoading: false,
//         error: err instanceof Error ? err.message : String(err),
//         success: false,
//       });
//     }
//   }, [setAuthId, setMeta]);

//   useEffect(() => {
//     fetchAuth();
//   }, [fetchAuth]);

//   return useMemo(
//     () => ({
//       ...state,
//       refetch: fetchAuth,
//     }),
//     [state, fetchAuth]
//   );
// };
