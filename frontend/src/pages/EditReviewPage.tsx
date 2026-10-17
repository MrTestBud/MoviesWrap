import { useEffect, useState } from 'react'
import { Link, useLocation, useNavigate, useParams } from 'react-router-dom'
import { getAllMovies } from '../api/movieApi'
import { getReviewsByMovieId, updateReview } from '../api/reviewApi'
import ReviewForm from '../components/review/ReviewForm'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import type { Review } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'

export default function EditReviewPage() {
  const { id } = useParams()
  const location = useLocation()
  const navigate = useNavigate()
  const { user } = useAuth()
  const { notify } = useToast()
  const passed = (location.state as { review?: Review } | null)?.review
  const [review, setReview] = useState<Review | null>(passed ?? null)
  const [loading, setLoading] = useState(!passed)
  const [saving, setSaving] = useState(false)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')

  useEffect(() => {
    if (passed || !id || !user) {
      return
    }

    let active = true
    setLoading(true)
    getAllMovies()
      .then(async (movies) => {
        for (const movie of movies) {
          const reviews = await getReviewsByMovieId(movie.id)
          const match = reviews.find((item) => item.id === id)
          if (match) {
            if (active) {
              setReview(match)
            }
            return
          }
        }
        if (active) {
          setError('Review not found.')
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Unable to load this review.'))
        }
      })
      .finally(() => {
        if (active) {
          setLoading(false)
        }
      })

    return () => {
      active = false
    }
  }, [id, passed, user])

  async function handleSubmit(payload: { rating: number; comment: string }) {
    if (!id) {
      return
    }
    setSaving(true)
    setFormError('')
    try {
      await updateReview(id, payload)
      notify('Review updated.', 'success')
      navigate('/dashboard')
    } catch (err: unknown) {
      setFormError(getApiErrorMessage(err, 'Could not update this review.'))
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading review..." />
  }

  if (error || !review) {
    return (
      <div className="mx-auto max-w-xl px-4 py-16">
        <ErrorMessage message={error || 'Review not found.'} />
        <Link to="/dashboard" className="mt-6 inline-block text-sm text-violet-300">
          Back to dashboard
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-16">
      <h1 className="mb-2 text-3xl font-semibold text-white">Edit Review</h1>
      <p className="mb-6 text-sm text-violet-200/70">
        Reviewer identity stays on the server. You can only change the rating and comment.
      </p>
      <ReviewForm
        submitLabel="Save changes"
        initialRating={review.rating}
        initialComment={review.comment}
        loading={saving}
        error={formError}
        onSubmit={handleSubmit}
      />
    </div>
  )
}
