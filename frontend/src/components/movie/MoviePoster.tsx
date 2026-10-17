import { getPosterInitials, getPosterPalette } from '../../utils/poster'

export default function MoviePoster({
  title,
  genre,
  className = '',
}: {
  title: string
  genre: string
  className?: string
}) {
  const [from, mid, to] = getPosterPalette(title)

  return (
    <div
      className={`relative overflow-hidden ${className}`}
      style={{
        background: `linear-gradient(145deg, ${from} 0%, ${mid} 55%, ${to} 130%)`,
      }}
      aria-hidden="true"
    >
      <div className="absolute inset-0 opacity-40" style={{
        backgroundImage:
          'radial-gradient(circle at 20% 20%, rgba(255,255,255,0.18), transparent 28%), repeating-linear-gradient(90deg, transparent 0 18px, rgba(0,0,0,0.18) 18px 20px)',
      }} />
      <div className="relative flex h-full flex-col items-center justify-center px-4 text-center">
        <span className="text-3xl font-bold tracking-widest text-white/90">{getPosterInitials(title)}</span>
        <p className="mt-3 line-clamp-3 text-sm font-semibold text-white">{title}</p>
        <p className="mt-1 text-xs uppercase tracking-[0.2em] text-violet-100/80">{genre}</p>
      </div>
    </div>
  )
}
