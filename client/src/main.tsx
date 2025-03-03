import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import App from './App.tsx'
import './index.css'
import Auth from './pages/(auth)/Auth.tsx'
import Home from './pages/Home.tsx'
import AuthSignup from './pages/(auth)/SignUp.tsx'
import { Layout } from './utils/Layout.tsx'
import SidebarHOC from './utils/SidebarHOC.tsx'
import Quiz from './pages/Quiz.tsx'
import QuizPage from './pages/QuizPage.tsx'
import Docs from './pages/Docs.tsx'
import QuizConfig from './components/quiz/quizConfig.tsx'

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
  },
  {
    path : "/quiz",
    element : <SidebarHOC children={<Quiz />} />
  },
  {
    path : "/test",
    element : <SidebarHOC children={<QuizPage />} />
  },
  {
    path : "/docs",
    element : <Docs />
  },
  {
    path : "/config",
    element : <SidebarHOC children={<QuizConfig />} />
  }
])

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <Layout>
      
        <RouterProvider router={router} />
      
    </Layout>
  </StrictMode>,
)
