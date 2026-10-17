import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { getMoviesSortedByRating } from '../api/movieApi'
import MovieGrid from '../components/movie/MovieGrid'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import type { Movie } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'

export default function ReviewsPage() {
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    let active = true
    getMoviesSortedByRating()
      .then((data) => {
        if (active) {
          setMovies(data.filter((movie) => (movie.totalReviews ?? 0) > 0))
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Unable to load reviews.'))
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
  }, [])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white">Reviews</h1>
      <p className="mt-2 max-w-2xl text-sm text-violet-200/70">
        Titles that already have audience ratings. Open a movie to read comments or add your own wrap.
      </p>
      {error ? <div className="mt-6"><ErrorMessage message={error} /></div> : null}
      <div className="mt-8">
        {!loading && movies.length === 0 && !error ? (
          <EmptyState
            title="No reviews in the catalog yet"
            description="Be the first to rate a movie."
            action={
              <Link to="/movies" className="rounded-full bg-violet-600 px-5 py-2.5 text-sm text-white">
                Explore movies
              </Link>
            }
          />
        ) : (
          <MovieGrid movies={movies} loading={loading} />
        )}
      </div>
    </div>
  )
}
