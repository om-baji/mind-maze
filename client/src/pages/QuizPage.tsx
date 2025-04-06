import QuizComp from '@/components/quiz/quiz-comp';
import { useAuth } from '@/context/AuthContext';
import { useQuiz } from '@/hooks/useQuiz';
import { formValues } from '@/models/formSchema';
import { axiosInstance } from '@/utils/axiosInstance';
import { questionType } from '@/utils/types';
import { createId } from '@paralleldrive/cuid2';
import { Loader2 } from 'lucide-react';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const QuizPage = () => {

  const [quizConfig, setConfig] = useState<formValues | null>(null)
  const [configLoader, setLoader] = useState<boolean>(false)
  const [errorState, setError] = useState<string | null>(null)
  const [attemptId] = useState<string>(createId())

  const { authId } = useAuth()

  const params = useParams()

  const configId: string = params.configId as string;

  useEffect(() => {
    setLoader(true)
    const getConfig = async () => {
      try {
        const res = await axiosInstance.get(`/quiz?id=${configId}`)

        console.log(res.data);
        setConfig(res.data.data)

      } catch (error) {
        setError(error instanceof Error ? error.message : String(error))
      } finally {
        setLoader(false)
      }

    }
    getConfig();
  }, [configId])



  const { isPending, questions, error } = useQuiz(quizConfig as formValues,authId as string, attemptId);

  if (configLoader) {
    return <div>
      Loading... Configs
    </div>
  }

  if (error || errorState) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">Error Loading Quiz</h2>
          <p className="text-zinc-600 mb-6">{String(error)}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Try Again
            {errorState}
            {error && error instanceof Error ? error.message : String(error)}
          </button>
        </div>
      </div>
    );
  }

  if (isPending) {
    return (
      <div className="flex flex-col items-center justify-center h-screen">
        <div className="bg-white p-8 rounded-lg shadow-2xl flex flex-col items-center">
          <Loader2 className="h-12 w-12 text-zinc-700 animate-spin mb-4" />
          <h2 className="text-xl font-bold text-zinc-900">Generating Quiz</h2>
          <p className="text-zinc-600 mt-2">Creating {quizConfig?.numQuestions} questions on {quizConfig?.subject}...</p>
        </div>
      </div>
    );
  }

  if (!questions) {
    return <div>
      Something went wrong!
    </div>
  }

  return (
    <div className='bg-zinc-100 p-4'>
      {questions && questions.length > 0 ? (
        <QuizComp
          timeLimit={quizConfig?.timeLimit || 10}
          numQuestions={quizConfig?.numQuestions as string}
          subject={quizConfig?.subject as string}
          questions={(questions as questionType[])}
          attemptId={attemptId as string}
        />
      ) : (
        <div className="bg-white p-8 rounded-lg shadow-2xl text-center">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">No Questions Available</h2>
          <p className="text-zinc-600 mb-6">Unable to generate quiz questions at this time.</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
};

export default QuizPage;