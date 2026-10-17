import { useState } from 'react'
import type { FormEvent } from 'react'
import { motion } from 'framer-motion'
import ErrorMessage from '../ui/ErrorMessage'

export default function ReviewForm({
  submitLabel = 'Submit Review',
  initialRating = 5,
  initialComment = '',
  loading,
  error,
  onSubmit,
}: {
  submitLabel?: string
  initialRating?: number
  initialComment?: string
  loading: boolean
  error: string
  onSubmit: (payload: { rating: number; comment: string }) => Promise<void>
}) {
  const [rating, setRating] = useState(initialRating)
  const [comment, setComment] = useState(initialComment)

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    await onSubmit({ rating, comment: comment.trim() })
  }

  return (
    <motion.form
      onSubmit={handleSubmit}
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      className="glass-panel space-y-4 rounded-3xl p-6"
    >
      <h3 className="text-lg font-semibold text-white">Write a Review</h3>
      <fieldset>
        <legend className="mb-2 text-sm text-violet-200">Rating</legend>
        <div className="flex gap-2">
          {[1, 2, 3, 4, 5].map((value) => (
            <button
              key={value}
              type="button"
              onClick={() => setRating(value)}
              className={`h-10 w-10 rounded-full border text-sm font-semibold transition ${
                rating >= value
                  ? 'border-violet-400 bg-violet-600 text-white'
                  : 'border-violet-500/30 bg-black/30 text-violet-200'
              }`}
              aria-label={`${value} star${value === 1 ? '' : 's'}`}
              aria-pressed={rating === value}
            >
              {value}
            </button>
          ))}
        </div>
      </fieldset>
      <label className="block">
        <span className="mb-2 block text-sm text-violet-200">Comment</span>
        <textarea
          required
          minLength={2}
          rows={4}
          value={comment}
          onChange={(event) => setComment(event.target.value)}
          className="w-full rounded-2xl border border-violet-500/30 bg-black/30 px-4 py-3 text-sm text-white"
          placeholder="What did you think?"
        />
      </label>
      <ErrorMessage message={error} />
      <button
        type="submit"
        disabled={loading || comment.trim().length === 0}
        className="rounded-full bg-violet-600 px-5 py-2.5 text-sm font-medium text-white transition hover:bg-violet-500 disabled:cursor-not-allowed disabled:opacity-60"
      >
        {loading ? 'Saving...' : submitLabel}
      </button>
    </motion.form>
  )
}
