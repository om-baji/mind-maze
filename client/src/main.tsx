import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import SidebarWrapper from './components/sidebar/SidebarWrapper.tsx'
import { AuthProvider } from './context/AuthContext.tsx'
import './index.css'
import Auth from './pages/Auth.tsx'
import Home from './pages/Home.tsx'
import AuthSignup from './pages/SignUp.tsx'
import { Layout } from './utils/Layout.tsx'
import { SidebarProvider } from './components/ui/sidebar.tsx'
import SidebarHOC from './utils/SidebarHOC.tsx'

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />
  },
  {
    path: "/login",
    element: <Auth />
  },
  {
    path: "/signup",
    element: <AuthSignup />
  },
  {
    path: "/home",
    element: <SidebarHOC children={<Home />} />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      
        <RouterProvider router={router} />
      
    </Layout>
  </StrictMode>,
)
