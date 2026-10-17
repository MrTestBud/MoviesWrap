import type { ReactNode } from 'react'
import { Star } from 'lucide-react'
import type { Review } from '../../types/models'

export default function ReviewCard({
  review,
  actions,
}: {
  review: Review
  actions?: ReactNode
}) {
  return (
    <article className="glass-panel rounded-3xl p-5">
      <div className="flex items-start justify-between gap-3">
        <div>
          <p className="font-semibold text-white">{review.reviewerName}</p>
          <div className="mt-1 flex items-center gap-1 text-violet-300" aria-label={`Rated ${review.rating} out of 5`}>
            {Array.from({ length: 5 }).map((_, index) => (
              <Star
                key={index}
                size={14}
                className={index < review.rating ? 'fill-violet-300 text-violet-300' : 'text-violet-800'}
              />
            ))}
          </div>
        </div>
        {actions}
      </div>
      <p className="mt-3 text-sm leading-relaxed text-violet-100/80">{review.comment}</p>
    </article>
  )
}
