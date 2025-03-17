import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Bell, Layers, Search } from "lucide-react";
import { useEffect, useState } from "react";
import { Input } from "./ui/input";

const Navbar = ({ children }: {
  children: React.ReactNode
}) => {

  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

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
              Dashboard
            </a>
            <a href="#" className="text-sm font-medium hover:text-foreground transition-colors">
              Projects
            </a>
            <a href="#" className="text-sm font-medium hover:text-foreground transition-colors">
              Team
            </a>
            <a href="#" className="text-sm font-medium hover:text-foreground transition-colors">
              Reports
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

            {/* <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-8 w-8 rounded-full">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src="/placeholder.svg?height=32&width=32" alt="@user" />
                      <AvatarFallback>U</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">Alex Johnson</p>
                      <p className="text-xs leading-none text-muted-foreground">alex@example.com</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <User className="mr-2 h-4 w-4" />
                    <span>Profile</span>
                  </DropdownMenuItem>
                  <DropdownMenuItem>
                    <Settings className="mr-2 h-4 w-4" />
                    <span>Settings</span>
                  </DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem>
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu> */}
          </div>
        </div>
      </header>
      <main>
        {children}
      </main>
    </div>

  );
};

export default Navbar;
