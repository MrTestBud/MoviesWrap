import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import type { Movie } from '../../types/models'
import MoviePoster from './MoviePoster'
import RatingBadge from './RatingBadge'

export default function MovieCard({ movie }: { movie: Movie }) {
  return (
    <motion.article
      whileHover={{ y: -8, rotateX: 4, rotateY: -3 }}
      transition={{ type: 'spring', stiffness: 260, damping: 20 }}
      className="group h-full [perspective:1000px]"
    >
      <div className="glass-panel flex h-full flex-col overflow-hidden rounded-3xl transition duration-300 group-hover:border-violet-400/50 group-hover:shadow-[0_20px_50px_rgba(124,58,237,0.25)]">
        <MoviePoster title={movie.title} genre={movie.genre} className="h-64 w-full" />
        <div className="flex flex-1 flex-col p-4">
          <div className="mb-2 flex items-start justify-between gap-2">
            <h3 className="text-base font-semibold text-white">{movie.title}</h3>
            <RatingBadge rating={movie.averageRating} reviews={movie.totalReviews} />
          </div>
          <p className="text-xs uppercase tracking-[0.18em] text-violet-300/80">{movie.genre}</p>
          <p className="mt-2 line-clamp-3 flex-1 text-sm text-violet-100/70">{movie.description}</p>
          <Link
            to={`/movies/${movie.id}`}
            className="mt-4 inline-flex items-center justify-center rounded-full bg-violet-600 px-4 py-2 text-sm font-medium text-white transition hover:bg-violet-500"
          >
            View Details
          </Link>
        </div>
      </div>
    </motion.article>
  )
}
