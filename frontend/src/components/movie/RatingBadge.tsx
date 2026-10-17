import { Star } from 'lucide-react'

export default function RatingBadge({
  rating,
  reviews,
}: {
  rating: number
  reviews?: number
}) {
  const display = Number.isFinite(rating) ? rating.toFixed(1) : '0.0'

  return (
    <div className="inline-flex items-center gap-1 rounded-full border border-violet-400/30 bg-violet-950/70 px-2.5 py-1 text-xs text-violet-100">
      <Star size={12} className="fill-violet-300 text-violet-300" />
      <span className="font-semibold">{display}</span>
      {typeof reviews === 'number' ? (
        <span className="text-violet-200/70">· {reviews}</span>
      ) : null}
    </div>
  )
}
