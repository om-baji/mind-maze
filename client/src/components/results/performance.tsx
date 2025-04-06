type Result = {
    message?: string,
    results: {
        questionIndex: number,
        isCorrect: boolean
    }[],
    score: number,
    totalQuestions: number
}

const Performance = ({ results, score, totalQuestions }: Result) => {
    console.log("result" ,results)
    return (
        <div className="bg-black text-white flex flex-col items-center justify-center px-4 p-6">
            <div className="max-w-md w-full">
                <h1 className="text-2xl font-semibold mb-4 text-center">Your Score</h1>
                <div className="text-center text-4xl font-bold mb-8">{score} / {totalQuestions}</div>
                <ul className="space-y-2">
                    {results && results.map((res, index) => (
                        <li
                            key={index}
                            className={`flex justify-between px-4 py-2 rounded-md ${
                                res.isCorrect ? 'bg-white text-black' : 'bg-zinc-800 text-white'
                            }`}
                        >
                            <span>Question {res.questionIndex + 1}</span>
                            <span>{res.isCorrect ? 'Correct' : 'Incorrect'}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Performance
