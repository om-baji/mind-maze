import QuizComp from '@/components/quiz/quiz-comp'

const QuizPage = () => {
  return (
    <div className='flex justify-center h-screen'>
        <QuizComp timeLimit={10} numQuestions='20' subject='CS' />
    </div>
  )
}

export default QuizPage
