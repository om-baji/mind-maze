import { ChevronUp, LayoutDashboardIcon, NotebookIcon, PencilIcon, User2 } from "lucide-react"
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
    const { user,isLoaded } = useUser()

    const onSignOut = async () => {
        try {
            await signOut({ redirectUrl: "/sign-in" })
        } catch (error) {
            toast("Sign out failed!")
        }
    }
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel className="text-sm">Notes Native</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title} className="mt-3">
                                    <SidebarMenuButton asChild>
                                        <a href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </a>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}
                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <DropdownMenu>
                            <DropdownMenuTrigger asChild>
                                <SidebarMenuButton className="p-6">
                                    <User2 /> {isLoaded ? user?.emailAddresses[0].emailAddress : "Loading..."}
                                    <ChevronUp className="ml-auto" />
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