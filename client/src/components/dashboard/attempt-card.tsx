const AttemptCard = ({ attempted }: {
    attempted: string
}) => {
    return (
        <div className="flex flex-col justify-center items-center p-6 rounded-lg shadow-lg bg-zinc-900 text-zinc-100 border border-zinc-700 transition-all duration-300 hover:shadow-xl min-w-xl">
            <span className="text-3xl font-bold mb-1 text-white">{attempted}</span>
            <span className="text-lg font-medium mb-2 text-zinc-400">attempted</span>
            <div className="mt-2 bg-zinc-800 px-4 py-1 rounded-full border border-zinc-700">
                <span className="text-sm font-medium text-zinc-300">Beats 66%</span>
            </div>
            
        </div>
    )
}

export default AttemptCard;