import { quizType } from '@/utils/types'
import Timer from './Timer'
import { Button } from '../ui/button'
import QuestionBox from './question-option'

const QuizComp = ({timeLimit,numQuestions,subject} : quizType) => {
  return (
    <div className='flex flex-col justify-center gap-4 p-10 shadow-2xl rounded-md bg-white'>
      
      <div className='flex justify-between min-w-full'>
        <Timer time={timeLimit * 60} />
        <Button className='p-4 rounded-md bg-zinc-900 text-white font-semibold'>Submit</Button>
      </div>


        <QuestionBox numQuestions={parseInt(numQuestions)}/>
    </div>
  )
}

export default QuizComp
