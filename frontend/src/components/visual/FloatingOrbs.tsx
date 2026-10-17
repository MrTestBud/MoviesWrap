export default function FloatingOrbs() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
      <div className="float-slow absolute -top-10 right-10 h-40 w-40 rounded-full bg-violet-600/20 blur-2xl" />
      <div className="float-slow absolute bottom-10 left-8 h-28 w-28 rounded-full bg-fuchsia-500/10 blur-xl [animation-delay:1.4s]" />
      <div className="absolute top-1/3 left-1/2 h-24 w-24 -translate-x-1/2 rounded-3xl border border-violet-400/20 bg-violet-500/10 blur-[1px]" />
    </div>
  )
}
