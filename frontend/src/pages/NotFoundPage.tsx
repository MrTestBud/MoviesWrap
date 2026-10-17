import { Link } from 'react-router-dom'
import FilmDisc from '../components/visual/FilmDisc'

export default function NotFoundPage() {
  return (
    <div className="mx-auto flex min-h-[70vh] max-w-3xl flex-col items-center justify-center px-4 py-16 text-center">
      <FilmDisc className="mb-8 scale-90" />
      <p className="text-sm uppercase tracking-[0.3em] text-violet-300">404</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">Oops! This movie doesn't exist.</h1>
      <p className="mt-3 text-sm text-violet-200/70">The reel you asked for isn't in the MovieWrap archive.</p>
      <Link
        to="/movies"
        className="mt-8 rounded-full bg-violet-600 px-6 py-3 text-sm font-medium text-white hover:bg-violet-500"
      >
        Back to Movies
      </Link>
    </div>
  )
}
