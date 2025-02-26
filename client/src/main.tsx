import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import { Layout } from './utils/Layout.tsx'
import Auth from './pages/Auth.tsx'
import { AuthProvider } from './context/AuthContext.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Auth />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      <AuthProvider>
        <RouterProvider router={router} />
      </AuthProvider>
    </Layout>
  </StrictMode>,
)
