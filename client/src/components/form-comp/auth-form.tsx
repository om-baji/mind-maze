import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useLogin } from "@/hooks/useLogin"
import { useRegister } from "@/hooks/useRegister"
import { ArrowRight, Eye, EyeOff, Lock, Mail, User } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

export default function AuthForm() {
  const [showPassword, setShowPassword] = useState(false)
  const [activeTab, setActiveTab] = useState("login")

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorState, setErrorState] = useState<string | null>(null)

  const navigate = useNavigate()

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const { login, data, error: loginError, isLogging, isSuccess: isLoginSuccess } = useLogin();
  const { register, data: registerData, error: registerError, isSigning, isSuccess: isRegisterSuccess } = useRegister();

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (activeTab === "login") login({ email, password });
      else register({ name: `${firstName} ${lastName}`, email, password });
    } catch (error) {
      console.error(loginError)
      setErrorState(error instanceof Error ? error.message : String(error) ?? null)
      setErrorState(registerError instanceof Error ? registerError.message : String(error) ?? null)
    }
  };

  const handleOauth = () => {
    const clientId = import.meta.env.VITE_GOOGLE_CLIENT_ID;
    const redirectUri = encodeURIComponent(import.meta.env.VITE_GOOGLE_REDIRECT_URI);
    const scope = encodeURIComponent('openid email profile');
    const responseType = 'code';

    const googleAuthUrl = `https://accounts.google.com/o/oauth2/v2/auth?client_id=${clientId}&redirect_uri=${redirectUri}&response_type=${responseType}&scope=${scope}`;

    window.location.href = googleAuthUrl;
  }

  const clear = () => {
    setEmail("");
    setPassword("");
    setFirstName("");
    setLastName("");
  }

  useEffect(() => {
    if (isLoginSuccess && data) {
      navigate("/home");
    }
  }, [isLoginSuccess, data, navigate]);

  useEffect(() => {
    if (isRegisterSuccess && registerData) {
      navigate("/home");
    }
  }, [isRegisterSuccess, registerData, navigate]);

  return (
    <div className="mx-auto w-full max-w-md space-y-6 rounded-lg border bg-card p-10 shadow-sm">
      <div className="space-y-2 text-center">
        <h1 className="text-3xl font-bold">Welcome</h1>
        <p className="text-muted-foreground">Sign in to your account or create a new one</p>
      </div>

      <Tabs defaultValue="login" value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid w-full grid-cols-2">
          <TabsTrigger value="login" onClick={clear}>Login</TabsTrigger>
          <TabsTrigger value="signup" onClick={clear}>Sign Up</TabsTrigger>
        </TabsList>

        <TabsContent value="login" className="space-y-4 pt-4">
          <form
            onSubmit={handleAuth}
            className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="email-login">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  onChange={e => setEmail(e.target.value)}
                  id="email-login" type="email" placeholder="m@example.com" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center justify-between">
                <Label htmlFor="password-login">Password</Label>
                <a href="#" className="text-xs text-primary hover:underline">
                  Forgot password?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  onChange={e => setPassword(e.target.value)}
                  id="password-login" type={showPassword ? "text" : "password"} className="pl-10 pr-10" required />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <Button
              disabled={isLogging}
              type="submit" className="w-full">
              {isLogging ? "Loading..." : "Login"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleOauth}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
        </TabsContent>

        <TabsContent value="signup" className="space-y-4 pt-4">
          <form
            onSubmit={handleAuth}
            className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="first-name">First name</Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                  <Input
                    onChange={e => setFirstName(e.target.value)}
                    id="first-name" placeholder="John" className="pl-10" required />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="last-name">Last name</Label>
                <Input
                  onChange={e => setLastName(e.target.value)}
                  id="last-name" placeholder="Doe" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="email-signup">Email</Label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  onChange={e => setEmail(e.target.value)}
                  id="email-signup" type="email" placeholder="m@example.com" className="pl-10" required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="password-signup">Password</Label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 h-5 w-5 text-muted-foreground" />
                <Input
                  onChange={e => setPassword(e.target.value)}
                  id="password-signup"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-10"
                  required
                />
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="absolute right-0 top-0 h-10 w-10 text-muted-foreground"
                  onClick={togglePasswordVisibility}
                >
                  {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                </Button>
              </div>
              <p className="text-xs text-muted-foreground">Password must be at least 8 characters long</p>
            </div>

            <Button
              disabled={isSigning}
              type="submit" className="w-full">
              {isSigning ? "Loading..." : "Create Account"}
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <Separator className="w-full" />
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
            </div>
          </div>

          <Button
            variant="outline"
            className="w-full"
            type="button"
            onClick={handleOauth}
          >
            <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
              <path
                d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                fill="#4285F4"
              />
              <path
                d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                fill="#34A853"
              />
              <path
                d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                fill="#FBBC05"
              />
              <path
                d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                fill="#EA4335"
              />
              <path d="M1 1h22v22H1z" fill="none" />
            </svg>
            Continue with Google
          </Button>
        </TabsContent>
      </Tabs>

      {errorState && (
        <div className="text-center text-sm text-muted-foreground">
          {errorState}
        </div>
      )}

      <div className="text-center text-sm text-muted-foreground">
        By continuing, you agree to our{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Terms of Service
        </a>{" "}
        and{" "}
        <a href="#" className="underline underline-offset-4 hover:text-primary">
          Privacy Policy
        </a>
        .
      </div>
    </div>
  )
}