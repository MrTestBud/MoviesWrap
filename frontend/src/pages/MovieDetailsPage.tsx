import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import axios from 'axios'
import { getMovieById } from '../api/movieApi'
import { createReview, getReviewsByMovieId } from '../api/reviewApi'
import MoviePoster from '../components/movie/MoviePoster'
import RatingBadge from '../components/movie/RatingBadge'
import ReviewCard from '../components/review/ReviewCard'
import ReviewForm from '../components/review/ReviewForm'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import LoadingSpinner from '../components/ui/LoadingSpinner'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import type { Movie, Review } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'

export default function MovieDetailsPage() {
  const { id } = useParams()
  const { isAuthenticated } = useAuth()
  const { notify } = useToast()
  const [movie, setMovie] = useState<Movie | null>(null)
  const [reviews, setReviews] = useState<Review[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [formError, setFormError] = useState('')
  const [saving, setSaving] = useState(false)

  async function loadMovie(movieId: string) {
    const [movieData, reviewData] = await Promise.all([
      getMovieById(movieId),
      getReviewsByMovieId(movieId),
    ])
    setMovie(movieData)
    setReviews(reviewData)
  }

  useEffect(() => {
    if (!id) {
      return
    }
    let active = true
    setLoading(true)
    loadMovie(id)
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Movie not found.'))
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
  }, [id])

  async function handleCreate(payload: { rating: number; comment: string }) {
    if (!id) {
      return
    }
    setSaving(true)
    setFormError('')
    try {
      await createReview({ movieId: id, rating: payload.rating, comment: payload.comment })
      await loadMovie(id)
      notify('Review published.', 'success')
    } catch (err: unknown) {
      if (axios.isAxiosError(err) && err.response?.status === 400) {
        setFormError('You have already reviewed this movie.')
      } else {
        setFormError(getApiErrorMessage(err, 'Could not save your review.'))
      }
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <LoadingSpinner label="Loading movie..." />
  }

  if (error || !movie) {
    return (
      <div className="mx-auto max-w-3xl px-4 py-16">
        <ErrorMessage message={error || 'Movie not found.'} />
        <Link to="/movies" className="mt-6 inline-block text-sm text-violet-300">
          Back to Movies
        </Link>
      </div>
    )
  }

  return (
    <div>
      <section className="relative overflow-hidden">
        <div className="mx-auto grid max-w-6xl items-center gap-8 px-4 py-12 md:grid-cols-[280px_1fr] md:py-16">
          <MoviePoster title={movie.title} genre={movie.genre} className="h-[420px] w-full rounded-3xl shadow-2xl" />
          <div>
            <p className="text-xs uppercase tracking-[0.24em] text-violet-300">{movie.genre}</p>
            <h1 className="mt-3 text-4xl font-semibold text-white md:text-5xl">{movie.title}</h1>
            <div className="mt-4">
              <RatingBadge rating={movie.averageRating} reviews={movie.totalReviews} />
            </div>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-violet-100/80">{movie.description}</p>
          </div>
        </div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-6 text-2xl font-semibold text-white">Reviews</h2>
        {reviews.length === 0 ? (
          <EmptyState title="No reviews yet" description="Be the first to wrap this title." />
        ) : (
          <div className="grid gap-4">
            {reviews.map((review) => (
              <ReviewCard key={review.id} review={review} />
            ))}
          </div>
        )}

        <div className="mt-10">
          {isAuthenticated ? (
            <ReviewForm loading={saving} error={formError} onSubmit={handleCreate} />
          ) : (
            <div className="glass-panel rounded-3xl p-6 text-sm text-violet-100/80">
              <Link to="/login" className="text-violet-300 underline">
                Log in
              </Link>{' '}
              to write a review. Your username is taken from the JWT, not from the form.
            </div>
          )}
        </div>
      </section>
    </div>
  )
}
