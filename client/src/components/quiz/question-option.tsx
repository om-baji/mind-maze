import { useEffect, useState } from 'react'
import { Button } from '../ui/button'

const QuestionBox = ({ numQuestions }: { numQuestions: number }) => {
    const [number, setNumber] = useState<number[]>([])
    const [current, setCurrent] = useState(1)

    useEffect(() => {
        setNumber(Array.from({ length: numQuestions }, (_, i) => i + 1))
    }, [numQuestions])

    const onPrev = () => {
        if (current > 1) setCurrent(prev => prev - 1)
    }

    const onNext = () => {
        if (current < numQuestions) setCurrent(prev => prev + 1)
    }

    return (
        <div className="flex items-center gap-2">
            <Button onClick={onPrev} className="p-4 rounded-md bg-zinc-900 text-white font-semibold shrink-0">
                Prev
            </Button>

            <div className="flex gap-2 overflow-x-auto pb-2 max-w-[300px] scrollbar-hide">
                {number.map(index => (
                    <Button
                        key={index}
                        className={`p-4 rounded-md font-semibold shrink-0 border-2 hover:bg-zinc-100 ${current === index ? 'bg-zinc-900 text-white' : 'bg-white text-black'}`}>
                        {index}
                    </Button>
                ))}
            </div>

            <Button onClick={onNext} className="p-4 rounded-md bg-zinc-900 text-white font-semibold shrink-0">
                Next
            </Button>
        </div>
    )
}

export default QuestionBox
