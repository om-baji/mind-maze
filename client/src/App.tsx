import React from "react";
import { Button } from "@/components/ui/button";
import { ArrowRight, Brain, BarChart3,NotebookTabs } from "lucide-react";

const App: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 dark:from-zinc-900 dark:to-zinc-800">
      <div className="max-w-6xl mx-auto px-4 py-8">
        
        <div className="flex flex-col justify-center items-center h-[70vh] text-center">
          <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-gray-300 dark:to-gray-400 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
            MindMaze
          </h1>
          <p className="max-w-xl mx-auto text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8">
            Challenge your mind with AI-powered quizzes and detailed performance reports
          </p>
          <div className="flex gap-4">
            <Button 
              onClick={() => window.location.href = '/login'}
              className="group"
            >
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 py-16">
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <Brain className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">AI-Powered Questions</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Experience quizzes enhanced by generative AI for dynamic and adaptive challenges
            </p>
          </div>
          
          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <BarChart3 className="h-12 w-12 mb-4 text-green-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Detailed Reports</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Get insightful performance analytics to track your progress over time
            </p>
          </div>

          <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-shadow">
            <NotebookTabs className="h-12 w-12 mb-4 text-blue-500" />
            <h3 className="text-xl font-semibold mb-2 dark:text-white">Challenge Yourself</h3>
            <p className="text-neutral-600 dark:text-neutral-300">
              Experience quizzes enhanced by generative AI for dynamic and adaptive challenges
            </p>
          </div>
        </div>

        <div className="text-center py-8 px-4 rounded-2xl bg-gradient-to-r from-gray-50 to-gray-100 dark:from-zinc-800 dark:to-zinc-700">
          <h2 className="text-2xl font-semibold mb-4 dark:text-white">Powered by Modern Technology</h2>
          <div className="flex flex-wrap justify-center gap-4 text-sm text-neutral-600 dark:text-neutral-300">
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">Hono.js</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">React</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">TypeScript</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">Prisma</span>
            <span className="px-3 py-1 bg-white dark:bg-zinc-900 rounded-full">PostgreSQL</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
