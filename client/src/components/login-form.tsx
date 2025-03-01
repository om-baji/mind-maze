import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { useSignIn } from "@clerk/clerk-react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export function LoginForm({ className, ...props }: React.ComponentProps<"div">) {
  const { isLoaded, setActive, signIn } = useSignIn();
  const [email, setEmail] = useState("");
  const [isPending, setPending] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;
    try {
      setPending(true);
      const response = await signIn.create({ identifier: email });

      if (response.status !== "complete") {
        setError("Something went wrong");
        return;
      }

      if (response.status === "complete") {
        await setActive({ session: response.createdSessionId });
        console.log("Login success");
        navigate("/home");
      }
    } catch (error) {
      if (error instanceof Error) {
        console.log(JSON.stringify(error));
        setError(error.message);
      }
      setError(error as string);
      console.log("Unknown error occurred", error);
    } finally {
      setPending(false);
    }
  };

  const handleOauth = async () => {
    if (!isLoaded) return;
    await signIn.authenticateWithRedirect({
      strategy: "oauth_google",
      redirectUrl: window.location.origin,
      redirectUrlComplete: `${window.location.origin}/home`,
    });
  };

  return (
    <div className={cn("flex justify-center items-center py-8", className)} {...props}>
      <div className="flex w-full max-w-4xl shadow-lg rounded-xl overflow-hidden bg-white dark:bg-zinc-800">
        <div className="w-full max-w-md p-10">
          <div className="grid gap-6">
            <h1 className="text-3xl font-bold text-center text-neutral-900 dark:text-white">Welcome Back</h1>
            <p className="text-center text-neutral-600 dark:text-neutral-300">Login to your Mind Maze account</p>
            {error && (
              <Alert>
                <AlertDescription className="text-red-600 dark:text-red-400">{error}</AlertDescription>
              </Alert>
            )}
            <form className="grid gap-4" onSubmit={handleLogin}>
              <div>
                <Label htmlFor="email" className="text-neutral-700 dark:text-neutral-300">Email</Label>
                <Input id="email" type="email" placeholder="m@example.com" onChange={(e) => setEmail(e.target.value)} required className="dark:bg-zinc-700 dark:text-white"/>
              </div>
              <Button disabled={isPending} type="submit" className="w-full">
                {isPending ? "Loading..." : "Login"}
              </Button>
            </form>
            <div className="relative text-center text-sm text-neutral-600 dark:text-neutral-300">
              <span className="bg-white dark:bg-zinc-800 px-2">Or continue with</span>
            </div>
            <Button onClick={handleOauth} variant="outline" className="w-full flex items-center justify-center gap-2 dark:bg-zinc-700 dark:text-white">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" className="h-5 w-5">
                <path
                  d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 16.133 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"
                  fill="currentColor"
                />
              </svg>
              Login with Google
            </Button>
            <div className="text-center text-sm text-neutral-600 dark:text-neutral-300">
              Don't have an account? <a href="/signup" className="underline">Sign up</a>
            </div>
          </div>
          <div className="mt-6 text-center text-xs text-neutral-600 dark:text-neutral-300">
            By clicking continue, you agree to our <a href="#" className="underline">Terms of Service</a> and <a href="#" className="underline">Privacy Policy</a>.
          </div>
        </div>

        <div className="hidden md:flex flex-col items-center justify-center w-full bg-blue-100 dark:bg-zinc-700">
          <svg className="w-64 h-64 text-blue-600 dark:text-blue-400" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M12 16C14.2091 16 16 14.2091 16 12C16 9.79086 14.2091 8 12 8C9.79086 8 8 9.79086 8 12C8 14.2091 9.79086 16 12 16Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M3 12H4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M20 12H21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 3V4" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 20V21" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.63599 5.63599L6.3428 6.3428" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.6572 17.6572L18.364 18.364" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M5.63599 18.364L6.3428 17.6572" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M17.6572 6.3428L18.364 5.63599" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h2 className="mt-4 text-xl font-semibold text-blue-800 dark:text-blue-300">Unlock Your Mind</h2>
          <p className="mt-2 text-center text-blue-600 dark:text-blue-400 max-w-xs px-6">
            Enhance your cognitive abilities through challenging puzzles and brain games
          </p>
        </div>
      </div>
    </div>
  );
}