import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Pencil, Trash2 } from 'lucide-react'
import { getAllMovies } from '../api/movieApi'
import { deleteReview, getReviewsByMovieId } from '../api/reviewApi'
import ReviewCard from '../components/review/ReviewCard'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import Modal from '../components/ui/Modal'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import type { ReviewWithMovie } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'

/*
 * TODO (backend): There is no GET /reviews/me (or similar) endpoint.
 * The dashboard currently loads GET /movies, then GET /reviews/{movieId} for each
 * movie, and keeps reviews whose reviewerName matches the JWT username.
 * A dedicated owner-reviews endpoint would be cleaner and scale better.
 */
async function loadOwnedReviews(username: string): Promise<ReviewWithMovie[]> {
  const movies = await getAllMovies()
  const nested = await Promise.all(
    movies.map(async (movie) => {
      const reviews = await getReviewsByMovieId(movie.id)
      return reviews
        .filter((review) => review.reviewerName.toLowerCase() === username.toLowerCase())
        .map((review) => ({ ...review, movieTitle: movie.title }))
    }),
  )
  return nested.flat()
}

export default function DashboardPage() {
  const { user, logout } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const [reviews, setReviews] = useState<ReviewWithMovie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [pendingDelete, setPendingDelete] = useState<ReviewWithMovie | null>(null)
  const [deleting, setDeleting] = useState(false)

  useEffect(() => {
    if (!user) {
      return
    }
    let active = true
    setLoading(true)
    loadOwnedReviews(user.username)
      .then((data) => {
        if (active) {
          setReviews(data)
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Unable to load your reviews.'))
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
  }, [user])

  async function confirmDelete() {
    if (!pendingDelete) {
      return
    }
    setDeleting(true)
    try {
      await deleteReview(pendingDelete.id)
      setReviews((current) => current.filter((review) => review.id !== pendingDelete.id))
      notify('Review deleted.', 'success')
      setPendingDelete(null)
    } catch (err: unknown) {
      notify(getApiErrorMessage(err, 'Could not delete this review.'), 'error')
    } finally {
      setDeleting(false)
    }
  }

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <div className="glass-panel rounded-3xl p-6 md:p-8">
        <p className="text-xs uppercase tracking-[0.22em] text-violet-300">Dashboard</p>
        <h1 className="mt-2 text-3xl font-semibold text-white">{user?.username}</h1>
        <p className="mt-2 max-w-2xl text-sm text-violet-200/70">
          Your MovieWrap account is authenticated with a JWT. Review ownership is enforced by the backend
          using the username inside that token.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link to="/movies" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm text-white hover:bg-violet-500">
            Browse movies
          </Link>
          <button
            type="button"
            onClick={() => {
              logout()
              navigate('/')
            }}
            className="rounded-full border border-violet-400/30 px-5 py-2.5 text-sm text-violet-100"
          >
            Logout
          </button>
        </div>
      </div>

      <section className="mt-10">
        <h2 className="mb-5 text-2xl font-semibold text-white">My Reviews</h2>
        {error ? <ErrorMessage message={error} /> : null}
        {loading ? (
          <LoadingSpinner label="Loading your reviews..." />
        ) : reviews.length === 0 ? (
          <EmptyState
            title="No reviews yet"
            description="When you rate a movie, it will show up here so you can edit or delete it."
            action={
              <Link to="/movies" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm text-white">
                Find a movie
              </Link>
            }
          />
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <div key={review.id} className="space-y-2">
                <p className="text-sm text-violet-300">{review.movieTitle}</p>
                <ReviewCard
                  review={review}
                  actions={
                    <div className="flex gap-2">
                      <Link
                        to={`/reviews/${review.id}/edit`}
                        state={{ review }}
                        className="rounded-full border border-violet-400/30 p-2 text-violet-200 hover:bg-white/5"
                        aria-label={`Edit review for ${review.movieTitle}`}
                      >
                        <Pencil size={16} />
                      </Link>
                      <button
                        type="button"
                        onClick={() => setPendingDelete(review)}
                        className="rounded-full border border-red-400/30 p-2 text-red-200 hover:bg-red-950/40"
                        aria-label={`Delete review for ${review.movieTitle}`}
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                  }
                />
              </div>
            ))}
          </div>
        )}
      </section>

      <Modal
        open={Boolean(pendingDelete)}
        title="Delete review"
        onClose={() => setPendingDelete(null)}
      >
        <p className="text-sm text-violet-100/80">Are you sure you want to delete this review?</p>
        <div className="mt-6 flex justify-end gap-3">
          <button
            type="button"
            onClick={() => setPendingDelete(null)}
            className="rounded-full px-4 py-2 text-sm text-violet-200"
          >
            Cancel
          </button>
          <button
            type="button"
            disabled={deleting}
            onClick={() => void confirmDelete()}
            className="rounded-full bg-red-600 px-4 py-2 text-sm text-white disabled:opacity-60"
          >
            {deleting ? 'Deleting...' : 'Delete'}
          </button>
        </div>
      </Modal>
    </div>
  )
}
