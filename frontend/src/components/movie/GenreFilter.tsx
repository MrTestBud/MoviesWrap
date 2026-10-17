export default function GenreFilter({
  genres,
  value,
  onChange,
}: {
  genres: string[]
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="block w-full">
      <span className="mb-1.5 block text-xs uppercase tracking-[0.18em] text-violet-300/80">Genre</span>
      <select
        value={value}
        onChange={(event) => onChange(event.target.value)}
        className="w-full rounded-2xl border border-violet-500/30 bg-black/40 px-4 py-3 text-sm text-white"
      >
        <option value="">All genres</option>
        {genres.map((genre) => (
          <option key={genre} value={genre}>
            {genre}
          </option>
        ))}
      </select>
    </label>
  )
}
