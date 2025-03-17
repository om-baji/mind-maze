import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useState } from "react"
import { Loader2 } from "lucide-react"

const formSchema = z.object({
  title: z.string().min(3, {
    message: "Title must be at least 3 characters.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }),
  subject: z.string().min(1, {
    message: "Please select a subject.",
  }),
  numQuestions: z.string().refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
    message: "Number of questions must be a positive number.",
  }),
  difficulty: z.string().min(1, {
    message: "Please select a difficulty level.",
  }),
  timeLimit: z.coerce.number().min(1, {
    message: "Time limit must be at least 1 minute.",
  }),
  passingScore: z.coerce.number().min(0).max(100, {
    message: "Passing score must be between 0 and 100.",
  }),
})

const subjects = [
  "Mathematics",
  "Science",
  "History",
  "Geography",
  "Literature",
  "Computer Science",
  "Physics",
  "Chemistry",
  "Biology",
  "Economics",
  "Business Studies",
  "Psychology",
]

const difficultyLevels = ["Easy", "Medium", "Hard", "Expert"]

export function QuizConfigForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: "",
      description: "",
      subject: "",
      numQuestions: "10",
      difficulty: "Medium",
      timeLimit: 20,
      passingScore: 70,
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)

    try {
      // Here you would typically send the data to your API
      console.log(values)

      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500))

      alert("Quiz configuration saved successfully!")
      // You could redirect or clear the form here
    } catch (error) {
      console.error("Error saving quiz configuration:", error)
      alert("Failed to save quiz configuration. Please try again.")
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Card className="w-full max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle>Quiz Configuration</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Quiz Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter quiz title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a subject" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {subjects.map((subject) => (
                          <SelectItem key={subject} value={subject}>
                            {subject}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea placeholder="Enter quiz description" className="resize-none" rows={3} {...field} />
                  </FormControl>
                  <FormDescription>Briefly describe what this quiz is about.</FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="numQuestions"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Number of Questions</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="difficulty"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Difficulty Level</FormLabel>
                    <Select onValueChange={field.onChange} defaultValue={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select difficulty" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {difficultyLevels.map((level) => (
                          <SelectItem key={level} value={level}>
                            {level}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="timeLimit"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Limit (minutes)</FormLabel>
                    <FormControl>
                      <Input type="number" min="1" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="passingScore"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Passing Score (%)</FormLabel>
                    <FormControl>
                      <Input type="number" min="0" max="100" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit" className="w-full" disabled={isSubmitting}>
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Quiz Configuration"
              )}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  )
}

