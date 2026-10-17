export default function FilmDisc({ className = '' }: { className?: string }) {
  return (
    <div className={`relative ${className}`} style={{ perspective: '900px' }} aria-hidden="true">
      <div className="film-disc relative mx-auto h-56 w-56 rounded-full border-[14px] border-violet-950 bg-gradient-to-br from-violet-700 via-fuchsia-500 to-violet-300 shadow-[0_0_80px_rgba(168,85,247,0.35)]">
        <div className="absolute inset-8 rounded-full border border-white/20 bg-ink" />
        <div className="absolute inset-[72px] rounded-full bg-violet-300/90 shadow-[0_0_20px_rgba(192,132,252,0.8)]" />
        {Array.from({ length: 8 }).map((_, index) => (
          <span
            key={index}
            className="absolute top-1/2 left-1/2 h-3 w-8 -translate-x-1/2 rounded-full bg-black/40"
            style={{ transform: `rotate(${index * 45}deg) translateY(-78px)` }}
          />
        ))}
      </div>
    </div>
  )
}
