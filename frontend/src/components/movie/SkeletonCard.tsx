export default function SkeletonCard() {
  return (
    <div className="glass-panel overflow-hidden rounded-3xl">
      <div className="h-64 animate-pulse bg-violet-950/80" />
      <div className="space-y-3 p-4">
        <div className="h-4 w-3/4 animate-pulse rounded bg-violet-900/70" />
        <div className="h-3 w-1/3 animate-pulse rounded bg-violet-900/50" />
        <div className="h-3 w-full animate-pulse rounded bg-violet-900/40" />
      </div>
    </div>
  )
}
