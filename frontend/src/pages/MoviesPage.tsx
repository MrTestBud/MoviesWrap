import { useEffect, useMemo, useState } from 'react'
import { getAllMovies, getMoviesByGenre, getMoviesPage, searchMovies } from '../api/movieApi'
import GenreFilter from '../components/movie/GenreFilter'
import MovieGrid from '../components/movie/MovieGrid'
import SearchBar from '../components/movie/SearchBar'
import EmptyState from '../components/ui/EmptyState'
import ErrorMessage from '../components/ui/ErrorMessage'
import type { Movie } from '../types/models'
import { getApiErrorMessage } from '../utils/errors'

type SortKey = 'ratingDesc' | 'ratingAsc' | 'titleAsc'

const PAGE_SIZE = 8

function sortMovies(movies: Movie[], sort: SortKey): Movie[] {
  const copy = [...movies]
  if (sort === 'ratingDesc') {
    return copy.sort((a, b) => b.averageRating - a.averageRating)
  }
  if (sort === 'ratingAsc') {
    return copy.sort((a, b) => a.averageRating - b.averageRating)
  }
  return copy.sort((a, b) => a.title.localeCompare(b.title))
}

export default function MoviesPage() {
  const [search, setSearch] = useState('')
  const [debouncedSearch, setDebouncedSearch] = useState('')
  const [genre, setGenre] = useState('')
  const [sort, setSort] = useState<SortKey>('ratingDesc')
  const [page, setPage] = useState(0)
  const [movies, setMovies] = useState<Movie[]>([])
  const [totalPages, setTotalPages] = useState(1)
  const [genres, setGenres] = useState<string[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const timer = window.setTimeout(() => setDebouncedSearch(search.trim()), 350)
    return () => window.clearTimeout(timer)
  }, [search])

  useEffect(() => {
    getAllMovies()
      .then((all) => {
        const unique = Array.from(new Set(all.map((movie) => movie.genre))).sort()
        setGenres(unique)
      })
      .catch(() => {
        // Genre chips are optional if the catalog request fails.
      })
  }, [])

  useEffect(() => {
    setPage(0)
  }, [debouncedSearch, genre, sort])

  useEffect(() => {
    let active = true
    setLoading(true)
    setError('')

    async function load() {
      if (debouncedSearch) {
        const results = sortMovies(await searchMovies(debouncedSearch), sort)
        const filtered = genre
          ? results.filter((movie) => movie.genre.toLowerCase() === genre.toLowerCase())
          : results
        const start = page * PAGE_SIZE
        if (active) {
          setTotalPages(Math.max(1, Math.ceil(filtered.length / PAGE_SIZE)))
          setMovies(filtered.slice(start, start + PAGE_SIZE))
        }
        return
      }

      if (genre) {
        const results = sortMovies(await getMoviesByGenre(genre), sort)
        const start = page * PAGE_SIZE
        if (active) {
          setTotalPages(Math.max(1, Math.ceil(results.length / PAGE_SIZE)))
          setMovies(results.slice(start, start + PAGE_SIZE))
        }
        return
      }

      const springSort =
        sort === 'ratingDesc'
          ? 'averageRating,desc'
          : sort === 'ratingAsc'
            ? 'averageRating,asc'
            : 'title,asc'
      const data = await getMoviesPage({ page, size: PAGE_SIZE, sort: springSort })
      if (active) {
        setMovies(data.content ?? [])
        setTotalPages(Math.max(1, data.totalPages || 1))
      }
    }

    load()
      .catch((err: unknown) => {
        if (active) {
          setError(getApiErrorMessage(err, 'Unable to load movies.'))
          setMovies([])
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
  }, [debouncedSearch, genre, sort, page])

  const canPrev = page > 0
  const canNext = page + 1 < totalPages
  const heading = useMemo(() => (debouncedSearch ? 'Search results' : 'Explore Movies'), [debouncedSearch])

  return (
    <div className="mx-auto max-w-6xl px-4 py-12">
      <h1 className="text-3xl font-semibold text-white md:text-4xl">{heading}</h1>
      <p className="mt-2 text-sm text-violet-200/70">
        Search, filter by genre, and sort with the MovieWrap REST API.
      </p>

      <div className="mt-8 grid gap-4 md:grid-cols-[1.4fr_0.8fr_0.8fr]">
        <SearchBar value={search} onChange={setSearch} />
        <GenreFilter genres={genres} value={genre} onChange={setGenre} />
        <label className="block">
          <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-violet-300/80">Sort</span>
          <select
            value={sort}
            onChange={(event) => setSort(event.target.value as SortKey)}
            className="w-full rounded-2xl border border-violet-500/30 bg-black/40 px-4 py-3 text-sm text-white"
          >
            <option value="ratingDesc">Highest Rated</option>
            <option value="ratingAsc">Lowest Rated</option>
            <option value="titleAsc">Alphabetical</option>
          </select>
        </label>
      </div>

      {error ? <div className="mt-6"><ErrorMessage message={error} /></div> : null}

      <div className="mt-8">
        {!loading && movies.length === 0 && !error ? (
          <EmptyState
            title="No movies found"
            description="Try another title or clear the genre filter."
          />
        ) : (
          <MovieGrid movies={movies} loading={loading} />
        )}
      </div>

      <div className="mt-10 flex items-center justify-center gap-3">
        <button
          type="button"
          disabled={!canPrev || loading}
          onClick={() => setPage((value) => Math.max(0, value - 1))}
          className="rounded-full border border-violet-400/30 px-4 py-2 text-sm disabled:opacity-40"
        >
          Previous
        </button>
        <span className="text-sm text-violet-200/70">
          Page {page + 1} of {totalPages}
        </span>
        <button
          type="button"
          disabled={!canNext || loading}
          onClick={() => setPage((value) => value + 1)}
          className="rounded-full border border-violet-400/30 px-4 py-2 text-sm disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  )
}
