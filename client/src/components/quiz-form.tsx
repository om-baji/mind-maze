import { formSchema, formValues } from '@/models/formSchema';
import { authId } from '@/store/userAtom';
import { axiosInstance } from '@/utils/axiosInstance';
import { subjects, subjectType } from '@/utils/subjects';
import { zodResolver } from "@hookform/resolvers/zod";
import { useAtomValue } from 'jotai';
import { useForm } from "react-hook-form";
import { toast } from 'sonner';
import { Button } from './ui/button';
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { Input } from './ui/input';
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "./ui/select";
import { Textarea } from './ui/textarea';

const QuizForm = () => {

  const userId = useAtomValue(authId)

  const form = useForm({
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
  });

  const onSubmit = async (values: formValues) => {

    try {
      await axiosInstance.post(`/quiz?id=${userId}`, {
        title: values.title,
        description: values.description,
        subject: values.subject,
        numQuestions: values.numQuestions,
        difficulty: values.difficulty,
        timeLimit: values.timeLimit,
        passingScore: values.passingScore,
      })

      toast.success("Quiz config added!")
    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  return (
    <div className="flex flex-col justify-center p-8 mx-auto bg-white rounded-lg shadow-lg">
      <h1 className="text-4xl text-center font-bold text-gray-800 mb-6 tracking-tight">Create a Quiz/Test</h1>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Name of the quiz</FormLabel>
                <FormControl>
                  <Input placeholder="My test 1" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="description"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Description</FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Enter a description of your quiz"
                    className="resize-none"
                    {...field}
                  />
                </FormControl>
                <FormDescription>
                  Brief overview of what the quiz is about
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FormField
              control={form.control}
              name="subject"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Subject</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a subject" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {subjects.map((subject: subjectType) => {
                        return <SelectGroup>
                          <SelectLabel>{subject.title}</SelectLabel>
                          {subject.topics.map((topic: string) => {
                            return <SelectItem
                              key={topic}
                              value={topic}>{topic}</SelectItem>
                          })}
                        </SelectGroup>
                      })}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="numQuestions"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Number of questions</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select number" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="5">5</SelectItem>
                      <SelectItem value="10">10</SelectItem>
                      <SelectItem value="15">15</SelectItem>
                      <SelectItem value="20">20</SelectItem>
                      <SelectItem value="25">25</SelectItem>
                      <SelectItem value="30">30</SelectItem>
                      <SelectItem value="custom">Custom</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="difficulty"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Difficulty</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select difficulty" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Easy">Easy</SelectItem>
                      <SelectItem value="Medium">Medium</SelectItem>
                      <SelectItem value="Hard">Hard</SelectItem>
                      <SelectItem value="Advanced">Advanced</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">

            <FormField
              control={form.control}
              name="timeLimit"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="text-base">Time Limit (minutes)</FormLabel>
                  <FormControl>
                    <div className="flex items-center gap-2">
                      <Input
                        type="number"
                        min="1"
                        max="20"
                        {...field}
                        onChange={e => field.onChange(e.target.valueAsNumber)}
                      />
                      <span className="text-sm text-gray-500">min</span>
                    </div>
                  </FormControl>
                  <FormDescription>
                    Maximum 20 minutes
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>



          <FormField
            control={form.control}
            name="passingScore"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="text-base">Passing Score (%)</FormLabel>
                <FormControl>
                  <div className="px-2">
                    <div className="h-6 flex items-center justify-between text-xs text-gray-500 px-2">
                      <span>0%</span>
                      <span>50%</span>
                      <span>100%</span>
                    </div>
                    <Input
                      type="range"
                      min="0"
                      max="100"
                      className="w-full"
                      {...field}
                      onChange={e => field.onChange(parseInt(e.target.value))}
                    />
                  </div>
                </FormControl>
                <FormDescription>
                  Minimum score required to pass: {form.watch("passingScore")}%
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />


          <div className="pt-4 flex justify-end gap-4">
            <Button type="submit" className="bg-blue-600 text-white hover:bg-blue-700">
              Create Quiz
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
};

export default QuizForm;