import App from "@/App";
import Auth from "@/pages/Auth";
import Docs from "@/pages/Docs";
import Home from "@/pages/Home";
import QuizConfigPage from "@/pages/QuizForm";
import QuizPage from "@/pages/QuizPage";
import { createBrowserRouter } from "react-router-dom";

export const router = createBrowserRouter([
    {
      path: "/",
      element: <App />
    },
    {
      path: "/auth",
      element: <Auth />
    },
    {
      path: "/home",
      element: <Home />
    },
    {
      path : "/quiz/solve/:configId",
      element : <QuizPage />
    },
    {
      path : "/config",
      element : <QuizConfigPage />
    },
    {
      path : "/docs",
      element : <Docs />
    }
  ])