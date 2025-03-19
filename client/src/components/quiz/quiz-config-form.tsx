import { useState } from "react"
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Save, Trash } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

const formSchema = z.object({
  id: z.string().optional(),
  title: z.string().min(3, { message: "Title must be at least 3 characters" }),
  numQuestions: z.string().min(1, { message: "Number of questions is required" }),
  description: z.string().optional(),
  passingScore: z.number().min(0).max(100),
  timeLimit: z.number().min(1, { message: "Time limit must be at least 1 minute" }),
  difficulty: z.string(),
  subject: z.string().min(1, { message: "Subject is required" }),
})

interface QuizConfigFormProps {
  initialData?: any
  onSave?: (data: any) => void
  onDelete?: () => void
}

export function QuizConfigForm({ initialData, onSave, onDelete }: QuizConfigFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      id: `config-${Date.now()}`,
      title: "",
      numQuestions: "10",
      description: "",
      passingScore: 70,
      timeLimit: 30,
      difficulty: "medium",
      subject: "",
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await new Promise((resolve) => setTimeout(resolve, 1000))

      if (onSave) {
        onSave(values)
      }

      console.log("Form submitted successfully:", values)
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
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
                <FormDescription>A descriptive title for your quiz</FormDescription>
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
                <FormControl>
                  <Input placeholder="e.g., Mathematics, History, Science" {...field} />
                </FormControl>
                <FormDescription>The main subject or topic of your quiz</FormDescription>
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
                <Textarea placeholder="Enter a description of your quiz" className="min-h-[100px]" {...field} />
              </FormControl>
              <FormDescription>Provide details about what the quiz covers</FormDescription>
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
                <FormDescription>How many questions to include in the quiz</FormDescription>
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
                    <SelectItem value="easy">Easy</SelectItem>
                    <SelectItem value="medium">Medium</SelectItem>
                    <SelectItem value="hard">Hard</SelectItem>
                    <SelectItem value="expert">Expert</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>The overall difficulty of the questions</FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="timeLimit"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Time Limit (minutes): {value}</FormLabel>
              <FormControl>
                <Slider min={1} max={120} step={1} defaultValue={[value]} onValueChange={(vals) => onChange(vals[0])} />
              </FormControl>
              <FormDescription>Set the time limit for completing the quiz</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="passingScore"
          render={({ field: { value, onChange } }) => (
            <FormItem>
              <FormLabel>Passing Score (%): {value}</FormLabel>
              <FormControl>
                <Slider min={0} max={100} step={5} defaultValue={[value]} onValueChange={(vals) => onChange(vals[0])} />
              </FormControl>
              <FormDescription>The minimum percentage required to pass the quiz</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? (
              <>Saving...</>
            ) : (
              <>
                <Save className="mr-2 h-4 w-4" />
                Save Configuration
              </>
            )}
          </Button>

          {initialData && onDelete && (
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive" type="button">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your quiz configuration.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={onDelete}>Delete</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
          )}
        </div>
      </form>
    </Form>
  )
}

