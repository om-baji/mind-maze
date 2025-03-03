import QuizComp from '@/components/quiz/quiz-comp';
import { useQuiz } from '@/hooks/useQuiz';
import { configAtom } from '@/store/quizconfig.atom';
import { useAtomValue } from 'jotai';
import { Loader2 } from 'lucide-react';

const QuizPage = () => {

  const quizConfig = useAtomValue(configAtom)

  if(!quizConfig) return null;

  const { isPending, questions, error } = useQuiz(quizConfig);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-screen text-center">
        <div className="bg-white p-8 rounded-lg shadow-2xl max-w-md">
          <h2 className="text-xl font-bold text-zinc-900 mb-4">Error Loading Quiz</h2>
          <p className="text-zinc-600 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="bg-zinc-900 text-white px-4 py-2 rounded-md hover:bg-zinc-800 transition-colors"
          >
            Try Again
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
          <p className="text-zinc-600 mt-2">Creating {quizConfig.numQuestions} questions on {quizConfig.subject}...</p>
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
          timeLimit={quizConfig.timeLimit || 10}
          numQuestions={quizConfig.numQuestions}
          subject={quizConfig.subject}
          questions={questions}
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