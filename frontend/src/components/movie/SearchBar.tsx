import { Search } from 'lucide-react'

export default function SearchBar({
  value,
  onChange,
}: {
  value: string
  onChange: (value: string) => void
}) {
  return (
    <label className="relative block w-full">
      <span className="sr-only">Search movies</span>
      <Search className="pointer-events-none absolute top-1/2 left-4 -translate-y-1/2 text-violet-300" size={18} />
      <input
        value={value}
        onChange={(event) => onChange(event.target.value)}
        placeholder="Search movies..."
        className="w-full rounded-full border border-violet-500/30 bg-black/40 py-3 pr-4 pl-11 text-sm text-white placeholder:text-violet-200/40 focus:border-violet-400"
      />
    </label>
  )
}
