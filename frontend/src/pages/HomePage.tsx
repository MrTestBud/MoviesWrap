import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import { Clapperboard, Lock, Sparkles, Star } from 'lucide-react'
import { getMoviesSortedByRating } from '../api/movieApi'
import MovieGrid from '../components/movie/MovieGrid'
import FilmDisc from '../components/visual/FilmDisc'
import { useAuth } from '../context/AuthContext'
import type { Movie } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'
import ErrorMessage from '../components/ui/ErrorMessage'

const features = [
  {
    icon: Clapperboard,
    title: 'Discover Movies',
    text: 'Browse the catalog, search by title, and filter by genre.',
  },
  {
    icon: Star,
    title: 'Rate & Review',
    text: 'Leave one thoughtful review per movie. Average ratings update automatically.',
  },
  {
    icon: Sparkles,
    title: 'Personalized Experience',
    text: 'Your JWT identity owns every review you write, edit, or delete.',
  },
  {
    icon: Lock,
    title: 'Secure Accounts',
    text: 'Passwords are hashed with BCrypt and sessions use short-lived JWTs.',
  },
]

export default function HomePage() {
  const { isAuthenticated } = useAuth()
  const [movies, setMovies] = useState<Movie[]>([])
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    if (!isAuthenticated) {
      return
    }

    let active = true
    setLoading(true)
    getMoviesSortedByRating()
      .then((data) => {
        if (active) {
          setMovies(data.slice(0, 8))
        }
      })
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Unable to load featured movies.'))
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
  }, [isAuthenticated])

  return (
    <div>
      <section className="mx-auto grid max-w-6xl items-center gap-10 px-4 py-16 md:grid-cols-2 md:py-24">
        <div>
          <p className="text-xs uppercase tracking-[0.28em] text-violet-300">Movie discovery platform</p>
          <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white md:text-6xl">
            Your Movies. Your Ratings. Your Wrap.
          </h1>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-violet-100/75">
            MovieWrap is a dark, cinematic space to explore films, drop honest ratings, and keep your reviews
            tied to a secure account. Built on Spring Boot, MongoDB, and a React frontend.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              to="/movies"
              className="rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white transition hover:bg-violet-500"
            >
              Explore Movies
            </Link>
            <Link
              to={isAuthenticated ? '/dashboard' : '/register'}
              className="rounded-full border border-violet-400/40 px-6 py-3 text-sm text-violet-100 hover:bg-white/5"
            >
              Get Started
            </Link>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          className="relative"
        >
          <FilmDisc />
        </motion.div>
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <div className="mb-8 flex items-end justify-between gap-4">
          <div>
            <h2 className="text-2xl font-semibold text-white">Featured movies</h2>
            <p className="mt-1 text-sm text-violet-200/70">Highest rated titles from the MovieWrap catalog.</p>
          </div>
          <Link to="/movies" className="text-sm text-violet-300 hover:text-white">
            View all
          </Link>
        </div>
        {isAuthenticated ? (
          <>
            {error ? <div className="mb-4"><ErrorMessage message={error} /></div> : null}
            <MovieGrid movies={movies} loading={loading} />
          </>
        ) : (
          <div className="glass-panel rounded-3xl px-6 py-12 text-center">
            <p className="text-lg font-medium text-white">Sign in to explore the catalog</p>
            <p className="mt-2 text-sm text-violet-200/70">
              The Spring Boot API requires a JWT for movie endpoints, so featured titles appear after login.
            </p>
            <Link
              to="/login"
              className="mt-6 inline-flex rounded-full bg-violet-600 px-5 py-2.5 text-sm text-white hover:bg-violet-500"
            >
              Login to continue
            </Link>
          </div>
        )}
      </section>

      <section className="mx-auto max-w-6xl px-4 pb-16">
        <h2 className="mb-8 text-2xl font-semibold text-white">Features</h2>
        <div className="grid gap-5 md:grid-cols-2 lg:grid-cols-4">
          {features.map((feature, index) => (
            <motion.article
              key={feature.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.08 }}
              className="glass-panel rounded-3xl p-5"
            >
              <feature.icon className="text-violet-300" />
              <h3 className="mt-4 font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm text-violet-200/70">{feature.text}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
