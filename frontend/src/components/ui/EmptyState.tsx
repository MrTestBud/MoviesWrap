import type { ReactNode } from 'react'

export default function EmptyState({
  title,
  description,
  action,
}: {
  title: string
  description: string
  action?: ReactNode
}) {
  return (
    <div className="glass-panel rounded-3xl px-6 py-14 text-center">
      <h2 className="text-xl font-semibold text-white">{title}</h2>
      <p className="mx-auto mt-2 max-w-md text-sm text-violet-200/70">{description}</p>
      {action ? <div className="mt-6">{action}</div> : null}
    </div>
  )
}
