import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Clock, HelpCircle, Award, BarChart3 } from "lucide-react"

interface QuizConfig {
  id?: string
  title: string
  numQuestions: string
  description: string
  passingScore: number
  timeLimit: number
  difficulty: string
  subject: string
}

interface QuizPreviewProps {
  config: QuizConfig
}

export default function QuizPreview({ config }: QuizPreviewProps) {
  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty.toLowerCase()) {
      case "easy":
        return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
      case "medium":
        return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
      case "hard":
        return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300"
      case "expert":
        return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  const sampleQuestions = [
    {
      id: 1,
      question: "Sample question 1 for " + config.subject,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 0,
    },
    {
      id: 2,
      question: "Sample question 2 for " + config.subject,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 1,
    },
    {
      id: 3,
      question: "Sample question 3 for " + config.subject,
      options: ["Option A", "Option B", "Option C", "Option D"],
      correctAnswer: 2,
    },
  ]

  return (
    <div className="space-y-6">
      <Card>
        <CardHeader className="pb-4">
          <div className="flex justify-between items-start">
            <div>
              <CardTitle className="text-2xl">{config.title || "Untitled Quiz"}</CardTitle>
              <CardDescription className="mt-1">{config.description || "No description provided"}</CardDescription>
            </div>
            <Badge className={`${getDifficultyColor(config.difficulty)} capitalize`}>{config.difficulty}</Badge>
          </div>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
            <div className="flex items-center">
              <HelpCircle className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Questions</p>
                <p className="font-medium">{config.numQuestions}</p>
              </div>
            </div>
            <div className="flex items-center">
              <Clock className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Time Limit</p>
                <p className="font-medium">{config.timeLimit} minutes</p>
              </div>
            </div>
            <div className="flex items-center">
              <Award className="h-5 w-5 mr-2 text-primary" />
              <div>
                <p className="text-sm text-muted-foreground">Passing Score</p>
                <p className="font-medium">{config.passingScore}%</p>
              </div>
            </div>
          </div>

          <div className="border-t pt-4">
            <h3 className="font-medium mb-4 flex items-center">
              <BarChart3 className="h-5 w-5 mr-2 text-primary" />
              Sample Questions Preview
            </h3>
            <div className="space-y-6">
              {sampleQuestions.map((q, index) => (
                <div key={q.id} className="bg-muted/50 p-4 rounded-lg">
                  <p className="font-medium mb-3">
                    {index + 1}. {q.question}
                  </p>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                    {q.options.map((option, i) => (
                      <div
                        key={i}
                        className={`p-3 rounded-md border ${
                          i === q.correctAnswer
                            ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                            : "border-gray-200 dark:border-gray-700"
                        }`}
                      >
                        <span className="mr-2">{String.fromCharCode(65 + i)}.</span>
                        {option}
                        {i === q.correctAnswer && (
                          <span className="text-green-600 dark:text-green-400 text-sm ml-2">(Correct)</span>
                        )}
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Quiz Instructions</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="list-disc pl-5 space-y-2">
            <li>
              This quiz contains {config.numQuestions} questions on {config.subject}.
            </li>
            <li>You have {config.timeLimit} minutes to complete the quiz.</li>
            <li>You need to score at least {config.passingScore}% to pass.</li>
            <li>Read each question carefully before selecting your answer.</li>
            <li>You cannot go back to previous questions once answered.</li>
            <li>Your results will be displayed immediately after completion.</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  )
}

