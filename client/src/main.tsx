import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { createRoot } from 'react-dom/client'
import { RouterProvider } from 'react-router-dom'
import { Toaster } from 'sonner'
import './index.css'
import { router } from './router/router.tsx'
import { Provider } from "jotai"

const client = new QueryClient()

createRoot(document.getElementById('root')!).render(
    <QueryClientProvider client={client}>
        <Provider>

            <Toaster />
            <RouterProvider router={router} />

        </Provider>

    </QueryClientProvider>
)
