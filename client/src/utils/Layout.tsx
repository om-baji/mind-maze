import { ClerkProvider } from "@clerk/clerk-react"
import { Toaster } from "sonner"

export function Layout({ children }: {
    children: React.ReactNode
}) {
    const PUBLISHABLE_KEY = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY
    return <>
        <ClerkProvider publishableKey={PUBLISHABLE_KEY}>
            <Toaster />
                {children}
        </ClerkProvider>
    </>
}