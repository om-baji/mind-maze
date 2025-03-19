import type { ReactNode } from "react"

interface FeatureCardProps {
  icon: ReactNode
  title: string
  description: string
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
  return (
    <div className="p-6 rounded-xl bg-white dark:bg-zinc-800 shadow-sm hover:shadow-md transition-all hover:translate-y-[-4px] duration-300">
      <div className="mb-4">{icon}</div>
      <h3 className="text-xl font-semibold mb-2 dark:text-white">{title}</h3>
      <p className="text-neutral-600 dark:text-neutral-300">{description}</p>
    </div>
  )
}

