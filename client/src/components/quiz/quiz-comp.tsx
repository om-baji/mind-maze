import { quizType } from '@/utils/types';
import { CheckCircle, ChevronLeft, ChevronRight } from 'lucide-react';
import { useState } from 'react';
import { Button } from '../ui/button';
import QuestionBox from './question-option';
import Timer from './Timer';
import { useResult } from '@/hooks/useResult';
import Performance from '../results/performance';

const QuizComp = ({ timeLimit, numQuestions, subject, questions, attemptId }: quizType) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, string>>({});
  const [quizCompleted, setQuizCompleted] = useState(false);
  const [timeExpired, setTimeExpired] = useState(false);
  const [checkResult, setCheckResult] = useState<boolean>(false)

  const { data, isLoading, refetch, } = useResult(userAnswers, attemptId)

  const handleAnswerSelect = (questionIndex: number, selectedOption: string) => {
    setUserAnswers((prev) => ({
      ...prev,
      [questionIndex]: selectedOption,
    }));
  };

  const navigateToQuestion = (index: number) => {
    if (index >= 0 && index < questions.length) {
      setCurrentQuestionIndex(index);
    }
  };


  const handleSubmit = () => {
    setCheckResult(true)
    setQuizCompleted(true);

    try {
      console.log(userAnswers)

      refetch();

      console.log(data)

    } catch (error) {
      console.log(error)
      return null;
    }
  };

  const handleTimeExpired = () => {
    setTimeExpired(true);
    setQuizCompleted(true);
  };

  const answeredCount = Object.keys(userAnswers).length;
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div className="flex flex-col gap-6 p-8 shadow-2xl rounded-lg bg-white mx-auto">

      <div className="flex flex-col gap-4 border-b border-zinc-200 pb-4">
        <div className="flex justify-between items-center">
          <div className="flex items-center gap-2">
            <h2 className="text-xl font-bold text-zinc-900">{subject}</h2>
            <span className="text-sm bg-zinc-100 px-2 py-1 rounded-full text-zinc-600">
              {numQuestions} questions
            </span>
          </div>
          <Timer
            time={timeLimit * 60}
            onTimeExpired={handleTimeExpired}
          />
        </div>

        <div className="flex items-center justify-between">
          <div className="text-sm text-zinc-600">
            {answeredCount}/{questions.length} questions answered
          </div>
          <div className="h-2 w-32 bg-zinc-100 rounded-full overflow-hidden">
            <div
              className="h-full bg-zinc-800 rounded-full"
              style={{ width: `${(answeredCount / questions.length) * 100}%` }}
            />
          </div>
        </div>
      </div>

      {!quizCompleted ? (
        <div className="flex flex-col gap-6">

          <div className="flex flex-col gap-4">
            <h3 className="text-lg font-medium text-zinc-800">
              Question {currentQuestionIndex + 1}:
              <span className="ml-2 font-normal">{currentQuestion.question}</span>
            </h3>

            <div className="flex flex-col gap-3">
              {currentQuestion.options && currentQuestion.options.map((option, index) => (
                <div
                  key={index}
                  onClick={() => handleAnswerSelect(currentQuestionIndex, option)}
                  className={`p-4 border rounded-md cursor-pointer transition-all ${userAnswers[currentQuestionIndex] === option
                    ? "border-zinc-800 bg-zinc-50"
                    : "border-zinc-200 hover:border-zinc-400"
                    }`}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-6 h-6 rounded-full flex items-center justify-center border ${userAnswers[currentQuestionIndex] === option
                      ? "border-zinc-800 bg-zinc-800 text-white"
                      : "border-zinc-300"
                      }`}>
                      {userAnswers[currentQuestionIndex] === option && <CheckCircle size={16} />}
                    </div>
                    <span className="text-zinc-700">{option}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="flex justify-between items-center mt-4">
            <Button
              variant="outline"
              onClick={() => navigateToQuestion(currentQuestionIndex - 1)}
              disabled={currentQuestionIndex === 0}
              className="border-zinc-300 text-zinc-700"
            >
              <ChevronLeft size={16} className="mr-1" /> Previous
            </Button>

            <QuestionBox
              numQuestions={parseInt(numQuestions)}
              currentQuestion={currentQuestionIndex}
              answeredQuestions={userAnswers}
              onQuestionSelect={navigateToQuestion}
            />

            {currentQuestionIndex < questions.length - 1 ? (
              <Button
                variant="outline"
                onClick={() => navigateToQuestion(currentQuestionIndex + 1)}
                className="border-zinc-300 text-zinc-700"
              >
                Next <ChevronRight size={16} className="ml-1" />
              </Button>
            ) : (
              <Button
                onClick={handleSubmit}
                className="bg-zinc-900 text-white font-medium hover:bg-zinc-800"
              >
                Submit Quiz
              </Button>
            )}
          </div>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-6 py-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-zinc-900 mb-2">
              {timeExpired ? "Time's Up!" : "Quiz Completed!"}
            </h2>
            <p className="text-zinc-600">
              You answered {answeredCount} out of {questions.length} questions.
            </p>
          </div>

          <div className="flex gap-4">
            <Button
              className="bg-zinc-200 text-zinc-800 hover:bg-zinc-300"
              onClick={() => window.location.reload()}
            >
              Try Again
            </Button>
            <Button
              className="bg-zinc-900 text-white hover:bg-zinc-800"
              onClick={() => setCheckResult(result => !result)}
            >
              View Results
            </Button>
          </div>
        </div>
      )}

      {checkResult && (
        isLoading ? <span>Loading...</span> :
          data && <Performance {...data} />)}
    </div>
  );
};

export default QuizComp;