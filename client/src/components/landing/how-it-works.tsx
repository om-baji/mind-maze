import { Check } from "lucide-react"

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="max-w-6xl mx-auto px-4 py-16">
      <h2 className="text-3xl font-bold text-center mb-12 dark:text-white">How MindMaze Works</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        <div className="order-2 md:order-1">
          <div className="space-y-6">
            <div className="flex">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">1</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium dark:text-white">Create Your Account</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Sign up in seconds and customize your learning preferences and areas of interest.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">2</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium dark:text-white">Select Your Topics</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Choose from hundreds of topics or let our AI suggest topics based on your goals.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">3</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium dark:text-white">Take AI-Powered Quizzes</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Experience adaptive questions that adjust to your knowledge level in real-time.
                </p>
              </div>
            </div>

            <div className="flex">
              <div className="flex-shrink-0 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10 text-primary">
                <span className="text-xl font-bold">4</span>
              </div>
              <div className="ml-4">
                <h3 className="text-xl font-medium dark:text-white">Track Your Progress</h3>
                <p className="mt-2 text-neutral-600 dark:text-neutral-300">
                  Review detailed analytics and insights to see your improvement over time.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="order-1 md:order-2 bg-white dark:bg-zinc-800 p-6 rounded-xl shadow-lg">
          <div className="relative aspect-[4/3] overflow-hidden rounded-lg">
            <img
              src="/placeholder.svg?height=400&width=600"
              alt="MindMaze in action"
              className="w-full h-full object-cover"
            />
          </div>

          <div className="mt-6 space-y-3">
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <p className="text-neutral-600 dark:text-neutral-300">
                Personalized learning path based on your performance
              </p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <p className="text-neutral-600 dark:text-neutral-300">AI-generated explanations for incorrect answers</p>
            </div>
            <div className="flex items-start">
              <Check className="h-5 w-5 text-green-500 mr-2 mt-0.5" />
              <p className="text-neutral-600 dark:text-neutral-300">Spaced repetition system for optimal retention</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

