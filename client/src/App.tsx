import Navbar from "@/components/Navbar"
import FeatureCard from "@/components/landing/feature-card"
import Footer from "@/components/landing/footer"
import HowItWorks from "@/components/landing/how-it-works"
import TestimonialCard from "@/components/landing/tesitimonial"
import { Button } from "@/components/ui/button"
import { ArrowRight, BarChart3, Brain, ChevronRight, NotebookTabs } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { useAuth } from "./context/AuthContext"

export default function App() {

  const navigate = useNavigate();
  const { isSignedIn } = useAuth();

  useEffect(() => {
    console.log("It ran out", isSignedIn)

    if (!isSignedIn) {
      console.log("It ran")
      navigate("/auth");
    }
  }, [isSignedIn, navigate]);


  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-gray-200 dark:from-zinc-900 dark:to-zinc-800">
      <Navbar>

        <section className="max-w-6xl mx-auto px-4 pt-20 pb-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="flex-1 text-center lg:text-left">
              <h1 className="bg-clip-text text-transparent bg-gradient-to-r from-neutral-900 via-neutral-800 to-neutral-700 dark:from-white dark:via-gray-300 dark:to-gray-400 text-4xl md:text-6xl lg:text-7xl font-bold tracking-tight mb-6">
                MindMaze
              </h1>
              <p className="text-lg md:text-xl text-neutral-600 dark:text-neutral-300 mb-8 max-w-xl mx-auto lg:mx-0">
                Challenge your mind with AI-powered quizzes and detailed performance reports that adapt to your learning
                style.
              </p>
              <div className="flex gap-4 justify-center lg:justify-start">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </Button>
                <Button variant="outline" size="lg">
                  Learn More
                </Button>
              </div>
            </div>
            <div className="flex-1 relative">
              <div className="relative z-10 rounded-xl overflow-hidden shadow-2xl transform transition-transform hover:scale-[1.02]">
                <img
                  src="/placeholder.svg?height=600&width=800"
                  alt="MindMaze Dashboard Preview"
                  className="w-full h-auto"
                />
              </div>
              <div className="absolute -z-10 bg-gradient-to-r from-primary/20 to-primary/10 rounded-full blur-3xl w-full h-full top-0 right-0"></div>
            </div>
          </div>
        </section>

        <section className="bg-white/50 dark:bg-zinc-800/50 py-10 backdrop-blur-sm">
          <div className="max-w-6xl mx-auto px-4">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">10k+</p>
                <p className="text-neutral-600 dark:text-neutral-300">Active Users</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">500+</p>
                <p className="text-neutral-600 dark:text-neutral-300">Quiz Topics</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">98%</p>
                <p className="text-neutral-600 dark:text-neutral-300">Satisfaction</p>
              </div>
              <div>
                <p className="text-3xl md:text-4xl font-bold text-primary">24/7</p>
                <p className="text-neutral-600 dark:text-neutral-300">Support</p>
              </div>
            </div>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">Powerful Features</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Brain className="h-12 w-12 text-primary" />}
              title="AI-Powered Questions"
              description="Experience quizzes enhanced by generative AI for dynamic and adaptive challenges tailored to your skill level."
            />
            <FeatureCard
              icon={<BarChart3 className="h-12 w-12 text-primary" />}
              title="Detailed Reports"
              description="Get insightful performance analytics to track your progress over time and identify areas for improvement."
            />
            <FeatureCard
              icon={<NotebookTabs className="h-12 w-12 text-primary" />}
              title="Challenge Yourself"
              description="Push your limits with increasingly difficult questions that adapt to your growing knowledge and skills."
            />
          </div>
        </section>

        <HowItWorks />

        <section className="max-w-6xl mx-auto px-4 py-16">
          <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">What Our Users Say</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="MindMaze has completely transformed how I prepare for exams. The AI-powered questions are challenging and relevant."
              author="Sarah Johnson"
              role="Medical Student"
              rating={5}
            />
            <TestimonialCard
              quote="The detailed analytics helped me identify my weak areas and focus my study time more effectively."
              author="Michael Chen"
              role="Software Engineer"
              rating={5}
            />
            <TestimonialCard
              quote="I've tried many quiz apps, but MindMaze's adaptive difficulty keeps me engaged and constantly learning."
              author="Emma Rodriguez"
              role="High School Teacher"
              rating={4}
            />
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-16">
          <div className="rounded-2xl bg-gradient-to-r from-primary/10 to-primary/5 dark:from-primary/20 dark:to-zinc-800/50 p-12 text-center">
            <h2 className="text-3xl font-bold mb-4 dark:text-white">Ready to Challenge Your Mind?</h2>
            <p className="text-lg text-neutral-600 dark:text-neutral-300 mb-8 max-w-2xl mx-auto">
              Join thousands of users who are already improving their knowledge and cognitive abilities with MindMaze.
            </p>
            <Button size="lg" className="group">
              Start Your Journey
              <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
            </Button>
          </div>
        </section>

        <section className="max-w-6xl mx-auto px-4 py-12">
          <h3 className="text-center text-sm uppercase tracking-wider text-neutral-500 dark:text-neutral-400 mb-6">
            Powered by Modern Technology
          </h3>
          <div className="flex flex-wrap justify-center gap-6 items-center">
            {["Hono.js", "React", "TypeScript", "Prisma", "PostgreSQL", "Redis"].map((tech) => (
              <div
                key={tech}
                className="px-4 py-2 bg-white dark:bg-zinc-800 rounded-full text-neutral-600 dark:text-neutral-300 shadow-sm hover:shadow-md transition-shadow"
              >
                {tech}
              </div>
            ))}
          </div>
        </section>

        <Footer />
      </Navbar>
    </div>
  )
}

