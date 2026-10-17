export default function LoadingSpinner({ label = 'Loading' }: { label?: string }) {
  return (
    <div className="flex flex-col items-center justify-center gap-3 py-16" role="status" aria-live="polite">
      <div
        className="h-10 w-10 animate-spin rounded-full border-2 border-violet-500/20 border-t-violet-400"
        aria-hidden="true"
      />
      <p className="text-sm text-violet-200/70">{label}</p>
    </div>
  )
}
