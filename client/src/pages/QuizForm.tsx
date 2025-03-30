import Navbar from "@/components/Navbar"
import { QuizConfigForm } from "@/components/quiz/quiz-config-form"
import QuizPreview from "@/components/quiz/quiz-preview"
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import ConfigSkeleton from "@/components/quiz/config-skeleton"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/context/AuthContext"
import { useConfig } from "@/hooks/useConfig"
import { AlertCircle, ArrowLeft, BarChart, BookOpen, Clock, Loader2, Play, Save, Settings } from "lucide-react"
import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"

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

export default function QuizConfigPage() {
  const { authId: authIdValue } = useAuth()
  const navigate = useNavigate()

  const [activeTab, setActiveTab] = useState("configure")
  const [savedConfigs, setSavedConfigs] = useState<QuizConfig[]>([])
  const [selectedConfig, setSelectedConfig] = useState<QuizConfig | null>(null)

  const { config, isPending, error } = useConfig(authIdValue || "")

  useEffect(() => {
    if (config && !isPending) {
      const configsArray = Array.isArray(config) ? config : [config]
      setSavedConfigs(configsArray)

      if (configsArray.length > 0 && !selectedConfig) {
        setSelectedConfig(configsArray[0])
      }
    }
  }, [config, isPending])

  const handleSolveQuiz = (configId: string | undefined) => {
    if (configId) {
      navigate(`/quiz/solve/${configId}`)
    } else {
      console.error("Cannot solve quiz: config ID is missing")
    }
  }

  if (!authIdValue) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 dark:bg-zinc-900">
        <Loader2 className="h-8 w-8 animate-spin text-primary mb-4" />
        <p className="text-muted-foreground">Loading user data...</p>
      </div>
    )
  }

  if (error) {
    return (
      <Navbar>
        <div className="container max-w-4xl mx-auto px-4 py-12">
          <Alert variant="destructive" className="mb-6">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>
              {error.message || "Failed to load quiz configurations. Please try again later."}
            </AlertDescription>
          </Alert>
          <Button variant="outline" onClick={() => window.location.reload()}>
            Try Again
          </Button>
        </div>
      </Navbar>
    )
  }

  return (
    <Navbar>
      <div className="container max-w-5xl mx-auto px-4 py-12">
        <div className="flex items-center mb-8">
          <Button variant="ghost" size="icon" className="mr-2" onClick={() => window.history.back()}>
            <ArrowLeft className="h-5 w-5" />
          </Button>
          <div>
            <h1 className="text-3xl font-bold dark:text-white">Quiz Configuration</h1>
            <p className="text-muted-foreground">Customize your quiz settings and preferences</p>
          </div>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="configure">
              <Settings className="mr-2 h-4 w-4" />
              Configure
            </TabsTrigger>
            <TabsTrigger value="preview">
              <BookOpen className="mr-2 h-4 w-4" />
              Preview
            </TabsTrigger>
          </TabsList>

          <TabsContent value="configure" className="space-y-6">
            {isPending ? (
              <ConfigSkeleton />
            ) : savedConfigs.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="md:col-span-1">
                  <Card>
                    <CardHeader>
                      <CardTitle>Saved Configurations</CardTitle>
                      <CardDescription>Select a configuration to edit or take a quiz</CardDescription>
                    </CardHeader>
                    <CardContent className="space-y-2">
                      {savedConfigs.map((cfg) => (
                        <div key={cfg.id} className="flex items-center mb-2 gap-2">
                          <Button
                            variant={selectedConfig?.id === cfg.id ? "default" : "outline"}
                            className="flex-1 justify-start text-left"
                            onClick={() => setSelectedConfig(cfg)}
                          >
                            <div className="truncate">
                              {cfg.title || "Untitled Quiz"}
                              <Badge variant="outline" className="ml-2">
                                {cfg.difficulty}
                              </Badge>
                            </div>
                          </Button>
                          <Button 
                            size="icon" 
                            variant="secondary" 
                            onClick={() => handleSolveQuiz(cfg.id)}
                            title="Solve this quiz"
                          >
                            <Play className="h-4 w-4" />
                          </Button>
                        </div>
                      ))}
                      <Button
                        variant="outline"
                        className="w-full mt-4"
                        onClick={() => {
                          const newConfig = {
                            title: "New Quiz",
                            numQuestions: "10",
                            description: "",
                            passingScore: 70,
                            timeLimit: 30,
                            difficulty: "medium",
                            subject: "",
                          }
                          setSavedConfigs([...savedConfigs, newConfig])
                          setSelectedConfig(newConfig)
                        }}
                      >
                        <Save className="mr-2 h-4 w-4" />
                        Create New
                      </Button>
                    </CardContent>
                  </Card>
                </div>

                <div className="md:col-span-2">
                  {selectedConfig ? (
                    <Card>
                      <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                          <CardTitle>Edit Configuration</CardTitle>
                          <CardDescription>Customize your quiz settings</CardDescription>
                        </div>
                        {selectedConfig.id && (
                          <Button 
                            variant="default"
                            onClick={() => handleSolveQuiz(selectedConfig.id)}
                          >
                            <Play className="mr-2 h-4 w-4" />
                            Solve Quiz
                          </Button>
                        )}
                      </CardHeader>
                      <CardContent>
                        <QuizConfigForm
                          initialData={selectedConfig}
                          onSave={(updatedConfig) => {
                            const updatedConfigs = savedConfigs.map((cfg) =>
                              cfg.id === updatedConfig.id ? updatedConfig : cfg,
                            )
                            setSavedConfigs(updatedConfigs)
                            setSelectedConfig(updatedConfig)
                          }}
                        />
                      </CardContent>
                    </Card>
                  ) : (
                    <Card>
                      <CardContent className="flex flex-col items-center justify-center py-12">
                        <Settings className="h-12 w-12 text-muted-foreground mb-4" />
                        <p className="text-muted-foreground text-center">
                          Select a configuration to edit or create a new one
                        </p>
                      </CardContent>
                    </Card>
                  )}
                </div>
              </div>
            ) : (
              <Card>
                <CardHeader>
                  <CardTitle>Create Your First Quiz Configuration</CardTitle>
                  <CardDescription>
                    You don't have any saved configurations yet. Create your first one below.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <QuizConfigForm
                    onSave={(newConfig) => {
                      setSavedConfigs([newConfig])
                      setSelectedConfig(newConfig)
                    }}
                  />
                </CardContent>
              </Card>
            )}

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <Clock className="mr-2 h-5 w-5 text-primary" />
                    Time Management
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Set appropriate time limits based on question complexity. We recommend 1-3 minutes per question.
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BarChart className="mr-2 h-5 w-5 text-primary" />
                    Difficulty Levels
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    Easy: Fundamental concepts
                    <br />
                    Medium: Applied knowledge
                    <br />
                    Hard: Complex problem-solving
                  </p>
                </CardContent>
              </Card>

              <Card className="bg-primary/5">
                <CardHeader className="pb-2">
                  <CardTitle className="flex items-center text-lg">
                    <BookOpen className="mr-2 h-5 w-5 text-primary" />
                    Question Count
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-muted-foreground">
                    For best engagement, we recommend 10-20 questions for short quizzes and 20-50 for comprehensive
                    assessments.
                  </p>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="preview">
            {selectedConfig ? (
              <div className="space-y-4">
                <div className="flex justify-end">
                  {selectedConfig.id && (
                    <Button 
                      variant="default"
                      onClick={() => handleSolveQuiz(selectedConfig.id)}
                    >
                      <Play className="mr-2 h-4 w-4" />
                      Solve This Quiz
                    </Button>
                  )}
                </div>
                <QuizPreview config={selectedConfig} />
              </div>
            ) : (
              <Card>
                <CardContent className="flex flex-col items-center justify-center py-12">
                  <BookOpen className="h-12 w-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-center">
                    Select or create a configuration first to preview your quiz
                  </p>
                  <Button variant="outline" className="mt-4" onClick={() => setActiveTab("configure")}>
                    Go to Configure
                  </Button>
                </CardContent>
              </Card>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </Navbar>
  )
}

