import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import { router } from './router/router.tsx'
import { AuthProvider } from "./context/AuthContext.tsx"

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <AuthProvider>
            <Toaster />
            <RouterProvider router={router} />
        </AuthProvider>
    </QueryClientProvider>
)
