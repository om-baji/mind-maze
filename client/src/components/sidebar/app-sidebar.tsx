import { ChevronDown, LayoutDashboardIcon, NotebookIcon, PencilIcon, User2 } from "lucide-react"
import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarTrigger,
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useAuth, useUser } from "@clerk/clerk-react"
import { toast } from "sonner"

const items = [
    {
        title: "Home",
        url: "/home",
        icon: LayoutDashboardIcon,
    },
    {
        title: "Results",
        url: "/results",
        icon: PencilIcon
    },
    {
        title: "Quiz",
        url: "/quiz",
        icon: NotebookIcon
    }
]

export function AppSidebar() {
    const { signOut } = useAuth()
    const { user, isLoaded } = useUser()

    const onSignOut = async () => {
        try {
            await signOut({ redirectUrl: "/login" })
        } catch (error) {
            toast.error("Sign out failed!", { description: error instanceof Error ? error.message : "Something went wrong!" })
        }
    }
    return (
        <Sidebar className="h-full bg-white">
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="p-4 text-lg font-medium border-b">
                        Mind Maze
                        <SidebarTrigger />
                    </SidebarGroupLabel>
                    <SidebarGroupContent className="py-2">
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild className="px-4 py-3 hover:bg-gray-100">
                                        <a href={item.url} className="flex items-center">
                                            <item.icon className="h-5 w-5 mr-3 text-gray-500" />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter className="mt-auto border-t">
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="w-full px-4 py-3 hover:bg-gray-100">
                                    <div className="flex items-center w-full">
                                        <User2 className="h-5 w-5 mr-3 text-gray-500" />
                                        <span className="text-sm">
                                            {isLoaded ? user?.emailAddresses[0].emailAddress : "Loading..."}
                                        </span>
                                        <ChevronDown className="ml-auto h-4 w-4 text-gray-500" />
                                    </div>
                                </SidebarMenuButton>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent
                                side="top"
                                className="w-[--radix-popper-anchor-width]"
                            >
                                <DropdownMenuItem
                                    onClick={onSignOut}>
                                    <span>Sign Out</span>
                                </DropdownMenuItem>
                                <DropdownMenuItem>
                                    <span>Profile</span>
                                </DropdownMenuItem>
                            </DropdownMenuContent>
                        </DropdownMenu>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarFooter>
        </Sidebar>
    )
}