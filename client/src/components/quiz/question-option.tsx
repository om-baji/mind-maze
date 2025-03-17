import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

type QuestionBoxProps = {
  numQuestions: number;
  currentQuestion?: number;
  answeredQuestions?: Record<number, string>;
  onQuestionSelect?: (questionIndex: number) => void;
};

const QuestionBox = ({
  numQuestions,
  currentQuestion = 0,
  answeredQuestions = {},
  onQuestionSelect = () => {},
}: QuestionBoxProps) => {
  const [numbers, setNumbers] = useState<number[]>([]);

  useEffect(() => {
    setNumbers(Array.from({ length: numQuestions }, (_, i) => i));
  }, [numQuestions]);

  const handleQuestionSelect = (index: number) => {
    onQuestionSelect(index);
  };

  // Determine if a question has been answered
  const isAnswered = (index: number) => {
    return answeredQuestions.hasOwnProperty(index);
  };

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="text-xs text-zinc-500 mb-1">Question Navigator</div>
      <div className="flex gap-2 overflow-x-auto pb-2 max-w-[300px] scrollbar-hide">
        {numbers.map((index) => (
          <Button
            key={index}
            onClick={() => handleQuestionSelect(index)}
            className={`
              w-8 h-8 p-0 rounded-md font-medium text-sm shrink-0 border 
              ${
                currentQuestion === index
                  ? 'bg-zinc-900 text-white border-zinc-900'
                  : isAnswered(index)
                  ? 'bg-zinc-100 text-zinc-900 border-zinc-300'
                  : 'bg-white text-zinc-700 border-zinc-200'
              }
              hover:bg-zinc-200 hover:border-zinc-400 transition-colors
            `}
          >
            {index + 1}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuestionBox;