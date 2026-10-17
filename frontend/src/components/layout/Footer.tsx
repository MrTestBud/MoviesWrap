import { Link } from 'react-router-dom'

export default function Footer() {
  return (
    <footer className="mt-16 border-t border-violet-500/20 bg-black/30">
      <div className="mx-auto grid max-w-6xl gap-8 px-4 py-12 md:grid-cols-3">
        <div>
          <p className="text-lg font-semibold text-white">MovieWrap</p>
          <p className="mt-2 max-w-sm text-sm text-violet-200/70">
            A cinematic place to discover movies, rate what you watch, and wrap your taste in reviews.
          </p>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Explore</p>
          <div className="mt-3 flex flex-col gap-2 text-sm text-violet-100/80">
            <Link to="/">Home</Link>
            <Link to="/movies">Movies</Link>
            <Link to="/reviews">Reviews</Link>
            <Link to="/about">About</Link>
          </div>
        </div>
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.18em] text-violet-300">Project</p>
          <a
            href="https://github.com"
            className="mt-3 inline-block text-sm text-violet-100/80 hover:text-white"
          >
            GitHub
          </a>
          <p className="mt-6 text-xs text-violet-300/50">© {new Date().getFullYear()} MovieWrap</p>
        </div>
      </div>
    </footer>
  )
}
