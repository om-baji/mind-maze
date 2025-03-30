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
import { Button } from "@/components/ui/button"
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Textarea } from "@/components/ui/textarea"
import { useAuth } from "@/context/AuthContext"
import { axiosInstance } from "@/utils/axiosInstance"
import { zodResolver } from "@hookform/resolvers/zod"
import { Save, Trash } from "lucide-react"
import { useState } from "react"
import { useForm } from "react-hook-form"
import * as z from "zod"

const formSchema = z.object({
  title: z.string().min(3),
  numQuestions: z.string(),
  description: z.string().optional(),
  passingScore: z.number().min(0).max(100),
  timeLimit: z.number().min(1),
  difficulty: z.enum(["easy", "medium", "hard", "expert"]),
  subject: z.string().min(1),
})

interface QuizConfigFormProps {
  initialData?: any;
  onSave?: (data: any) => void;
  onDelete?: () => void;
}

export function QuizConfigForm({ initialData, onSave, onDelete }: QuizConfigFormProps) {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [showDeleteDialog, setShowDeleteDialog] = useState(false)

  const { authId: userId } = useAuth()

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: initialData || {
      title: "",
      numQuestions: "10",
      description: "",
      passingScore: 70,
      timeLimit: 30,
      difficulty: "medium",
      subject: "",
      userId
    },
  })

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setIsSubmitting(true)
    try {
      await axiosInstance.post(`/quiz?id=${userId}`, values)
      onSave?.(values)
      form.reset()
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
          <FormField control={form.control} name="title" render={({ field }) => (
            <FormItem>
              <FormLabel>Quiz Title</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="subject" render={({ field }) => (
            <FormItem>
              <FormLabel>Subject</FormLabel>
              <FormControl><Input {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="description" render={({ field }) => (
          <FormItem>
            <FormLabel>Description</FormLabel>
            <FormControl><Textarea className="min-h-[100px]" {...field} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField control={form.control} name="numQuestions" render={({ field }) => (
            <FormItem>
              <FormLabel>Number of Questions</FormLabel>
              <FormControl><Input type="text" {...field} /></FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField control={form.control} name="difficulty" render={({ field }) => (
            <FormItem>
              <FormLabel>Difficulty Level</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl><SelectTrigger><SelectValue /></SelectTrigger></FormControl>
                <SelectContent>
                  <SelectItem value="easy">Easy</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="hard">Hard</SelectItem>
                  <SelectItem value="expert">Expert</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )} />
        </div>

        <FormField control={form.control} name="timeLimit" render={({ field }) => (
          <FormItem>
            <FormLabel>Time Limit: {field.value} min</FormLabel>
            <FormControl><Slider min={1} max={120} step={1} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <FormField control={form.control} name="passingScore" render={({ field }) => (
          <FormItem>
            <FormLabel>Passing Score: {field.value}%</FormLabel>
            <FormControl><Slider min={0} max={100} step={5} defaultValue={[field.value]} onValueChange={(vals) => field.onChange(vals[0])} /></FormControl>
            <FormMessage />
          </FormItem>
        )} />

        <div className="flex justify-between">
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? "Saving..." : <><Save className="mr-2 h-4 w-4" /> Save</>}
          </Button>
          {initialData && onDelete && (
            <AlertDialog open={showDeleteDialog} onOpenChange={setShowDeleteDialog}>
              <AlertDialogTrigger asChild>
                <Button variant="destructive"><Trash className="mr-2 h-4 w-4" /> Delete</Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                  <AlertDialogDescription>This action cannot be undone.</AlertDialogDescription>
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
