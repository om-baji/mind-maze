import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useAuth } from "@/context/AuthContext";
import { useIsMobile } from "@/hooks/use-mobile";
import { cn } from "@/lib/utils";
import { Bell, Layers, LogOut, Menu, Search, User, X } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAuthStore } from "@/store/auth.store";

const Navbar = ({ children }: {
  children: React.ReactNode
}) => {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const isMobile = useIsMobile();

  const { user } = useAuth()

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (!isMobile && mobileMenuOpen) {
      setMobileMenuOpen(false);
    }
  }, [isMobile, mobileMenuOpen]);

  const { resetAuthState } = useAuthStore()

  const handleLogout = async () => {
    try {
      await axiosInstance.post("/logout")
      resetAuthState();
      localStorage.removeItem("auth-store")

    } catch (error) {
      console.log("Something went wrong! ", error)
    }
  }

  return (
    <div>
      <header
        className={cn(
          "sticky top-0 z-40 w-full transition-all duration-200",
          scrolled ? "bg-background/70 backdrop-blur-lg shadow-sm" : "bg-background/40 backdrop-blur-md",
        )}
      >
        <div className="flex h-16 items-center justify-between px-4 md:px-6">
          <div className="flex items-center gap-2">
            <a href="/" className="flex items-center gap-2">
              <div className="size-8 rounded-full bg-gradient-to-br from-primary to-primary-foreground/50 flex items-center justify-center">
                <Layers className="size-5 text-white" />
              </div>
              <span className="font-semibold text-lg hidden sm:inline-block">Mind Maze</span>
            </a>
          </div>

          <div className="hidden md:flex items-center gap-6 text-muted-foreground">
            <a href="/" className="text-sm font-medium hover:text-foreground transition-colors">
              Home
            </a>
            <a href="/home" className="text-sm font-medium hover:text-foreground transition-colors">
              Dashboard
            </a>
            <a href="/config" className="text-sm font-medium hover:text-foreground transition-colors">
              Saved Configs
            </a>

            <a href="/attempts" className="text-sm font-medium hover:text-foreground transition-colors">
              Attempts
            </a>

            <a href="#" className="text-sm font-medium hover:text-foreground transition-colors">
              Contact Us
            </a>
          </div>

          <div className="flex items-center gap-4">
            <div className="relative hidden md:flex items-center">
              <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search..."
                className="w-[200px] lg:w-[280px] pl-8 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/50"
              />
            </div>

            <Button size="icon" variant="ghost" className="relative">
              <Bell className="h-5 w-5" />
              <span className="absolute top-1 right-1 h-2 w-2 rounded-full bg-primary"></span>
            </Button>

            {user ? (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="flex items-center gap-2 h-8 px-2">
                    <div className="size-8 rounded-full bg-primary/10 flex items-center justify-center">
                      <User className="size-4 text-primary" />
                    </div>
                    <span className="text-sm hidden md:block max-w-28 truncate">{user.email}</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-48">
                  <DropdownMenuItem className="flex items-center gap-2 cursor-pointer">
                    <LogOut className="size-4" />
                    <span onClick={handleLogout}>Logout</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            ) : (
              <Button size="sm" variant="default">
                Login
              </Button>
            )}

            {isMobile && (
              <Button
                size="icon"
                variant="ghost"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
              >
                {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </Button>
            )}
          </div>
        </div>

        {isMobile && (
          <div
            className={cn(
              "overflow-hidden transition-all duration-300",
              mobileMenuOpen ? "max-h-64" : "max-h-0"
            )}
          >
            <div className="flex flex-col space-y-4 px-4 pb-6 pt-2">
              <div className="relative flex items-center mb-2">
                <Search className="absolute left-2.5 h-4 w-4 text-muted-foreground" />
                <Input
                  type="search"
                  placeholder="Search..."
                  className="w-full pl-8 bg-background/50 border-muted-foreground/20 focus-visible:ring-primary/50"
                />
              </div>
              <a href="/" className="text-sm font-medium hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted">
                Dashboard
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted">
                Projects
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted">
                Team
              </a>
              <a href="#" className="text-sm font-medium hover:text-foreground transition-colors px-2 py-2 rounded-md hover:bg-muted">
                Reports
              </a>
            </div>
          </div>
        )}
      </header>
      <main>
        {children}
      </main>
    </div>
  );
};

export default Navbar;