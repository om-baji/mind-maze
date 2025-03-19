import { Star } from "lucide-react"

interface TestimonialCardProps {
  quote: string
  author: string
  role: string
  rating: number
}

export default function TestimonialCard({ quote, author, role, rating }: TestimonialCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
      <div className="flex mb-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <Star key={i} className={`h-5 w-5 ${i < rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`} />
        ))}
      </div>
      <p className="text-neutral-600 dark:text-neutral-300 mb-6 italic">"{quote}"</p>
      <div className="flex items-center">
        <div className="h-10 w-10 rounded-full bg-primary/20 flex items-center justify-center text-primary font-bold">
          {author.charAt(0)}
        </div>
        <div className="ml-3">
          <p className="font-medium dark:text-white">{author}</p>
          <p className="text-sm text-neutral-500 dark:text-neutral-400">{role}</p>
        </div>
      </div>
    </div>
  )
}

