
// import { useSignUp, useSignIn } from "@clerk/clerk-react";
// import { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { Card, CardContent } from "@/components/ui/card";
// import { Alert, AlertDescription } from "@/components/ui/alert";

// interface LoadingStateProps {
//   message: string;
// }

// interface ErrorStateProps {
//   error: string;
//   onRetry: () => void;
// }

// export function OAuthCallbackHandler() {
//   const { isLoaded: isSignUpLoaded, signUp, setActive: setSignUpActive } = useSignUp();
//   const { isLoaded: isSignInLoaded, signIn, setActive: setSignInActive } = useSignIn();
//   const [error, setError] = useState<string>("");
//   const [processing, setProcessing] = useState<boolean>(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     // Make sure Clerk is fully loaded
//     if (!isSignUpLoaded || !isSignInLoaded) {
//       return;
//     }

//     // Get the search params from the URL
//     const searchParams = new URLSearchParams(window.location.search);

//     async function handleOAuthCallback() {
//       try {
//         setProcessing(true);

//         // Attempt to complete signup first
//         if (signUp && signUp?.status === "needs_oauth_result") {
//           const result = await signUp.attemptOAuthCallback();
//           if (result.status === "complete") {
//             await setSignUpActive({ session: result.createdSessionId });
//             navigate("/home");
//             return;
//           }
//         }

//         // If not in signup flow, try signin flow
//         if (signIn && signIn?.status === "needs_oauth_result") {
//           const result = await signIn.attemptOAuthCallback();
//           if (result.status === "complete") {
//             await setSignInActive({ session: result.createdSessionId });
//             navigate("/home");
//             return;
//           }
//         }

//         // If we got here with no errors but didn't complete either flow,
//         // something unexpected happened
//         const oauthError = searchParams.get("error");
//         if (oauthError) {
//           setError(`OAuth error: ${oauthError}`);
//         } else {
//           navigate("/login"); // Fallback redirect if we can't determine the flow
//         }
//       } catch (err) {
//         console.error("OAuth callback error:", err);
//         setError(err instanceof Error ? err.message : String(err));
//       } finally {
//         setProcessing(false);
//       }
//     }

//     handleOAuthCallback();
//   }, [isSignUpLoaded, isSignInLoaded, signUp, signIn, setSignUpActive, setSignInActive, navigate]);

//   if (!isSignUpLoaded || !isSignInLoaded) {
//     return <LoadingState message="Loading authentication..." />;
//   }

//   if (error) {
//     return <ErrorState error={error} onRetry={() => navigate("/login")} />;
//   }

//   return <LoadingState message="Completing authentication..." />;
// }

// function LoadingState({ message }: LoadingStateProps): JSX.Element {
//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <Card className="w-full max-w-md">
//         <CardContent className="flex flex-col items-center p-6">
//           <div className="w-16 h-16 mb-4 border-4 border-t-blue-500 border-r-transparent border-b-transparent border-l-transparent rounded-full animate-spin"></div>
//           <h2 className="text-xl font-semibold text-center">{message}</h2>
//           <p className="mt-2 text-center text-muted-foreground">
//             Please wait while we process your authentication...
//           </p>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }

// function ErrorState({ error, onRetry }: ErrorStateProps): JSX.Element {
//   return (
//     <div className="flex items-center justify-center min-h-screen p-4">
//       <Card className="w-full max-w-md">
//         <CardContent className="p-6">
//           <Alert className="mb-4">
//             <AlertDescription>{error}</AlertDescription>
//           </Alert>
//           <div className="flex flex-col items-center">
//             <h2 className="text-xl font-semibold">Authentication Error</h2>
//             <p className="mt-2 text-center text-muted-foreground">
//               There was a problem completing your authentication.
//             </p>
//             <button
//               onClick={onRetry}
//               className="px-4 py-2 mt-4 text-white bg-blue-500 rounded hover:bg-blue-600"
//             >
//               Try Again
//             </button>
//           </div>
//         </CardContent>
//       </Card>
//     </div>
//   );
// }