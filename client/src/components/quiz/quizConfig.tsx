import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { useQuizConfig } from "@/hooks/useConfig";
import { formValues } from "@/models/formSchema";
import { configAtom } from "@/store/quizconfig.atom";
import { authId } from "@/store/userAtom";
import { axiosInstance } from "@/utils/axiosInstance";
import { useAtomValue, useSetAtom } from "jotai";
import { BarChart, BookOpen, Clock, List } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";

const QuizConfig = () => {
  const userId = useAtomValue(authId);
  const setConfig = useSetAtom(configAtom)

  const navigate = useNavigate()
  const { quizConfig, isPending, error } = useQuizConfig(userId);

  const onDelete = async (quizId: string) => {
    try {
      await axiosInstance.delete(`/api/quiz?id=${quizId}`)

      toast.success("Config deleted!")
    } catch (error) {

      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  const onSolve = async (quizBody: formValues) => {
    try {

      setConfig(quizBody)

      toast.success("Done!")

      navigate("/test")

    } catch (error) {
      toast.error(error instanceof Error ? error.message : String(error))
    }
  }

  if (isPending) {
    return (
      <div className="flex flex-col gap-4">
        {[...Array(3)].map((_, i) => (
          <Skeleton key={i} className="h-[120px] w-full rounded-lg" />
        ))}
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-40">
        <span className="text-red-600 font-medium">{error}</span>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      {quizConfig && quizConfig.length > 0 ? (
        quizConfig.map((quiz) => (
          <Card key={quiz.id} className="p-4 bg-zinc-900 text-white shadow-lg">
            <CardHeader className="p-4">
              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-400" />
                {quiz.title}
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-2 gap-4 text-sm">
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Subject:</span> {quiz.subject}
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Difficulty:</span> {quiz.difficulty}
              </div>
              <div className="flex items-center gap-2">
                <List className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Questions:</span> {quiz.numQuestions}
              </div>
              <div className="flex items-center gap-2">
                <BarChart className="w-4 h-4 text-gray-400" />
                <span className="text-gray-400">Passing Score:</span> {quiz.passingScore}%
              </div>
              {quiz.timeLimit && (
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4 text-gray-400" />
                  <span className="text-gray-400">Time Limit:</span> {quiz.timeLimit} mins
                </div>
              )}
              <div className="col-span-2 flex justify-end gap-4">
                <Button 
                onClick={() => onSolve(quiz)}
                className="bg-blue-500 hover:bg-blue-600 text-white">
                  Solve Quiz
                </Button>

                <Button
                  onClick={() => onDelete(quiz.id as string)}
                  className="bg-red-500 hover:bg-red-600 text-white">
                  Delete Config
                </Button>
              </div>
            </CardContent>
          </Card>
        ))
      ) : (
        <div className="text-center text-gray-400">No quiz configurations found.</div>
      )}
    </div>
  );
};

export default QuizConfig;
