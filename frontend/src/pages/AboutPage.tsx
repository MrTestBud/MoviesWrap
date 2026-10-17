import { motion } from 'framer-motion'
import { Database, FileJson, KeyRound, Layout, Server, Waypoints } from 'lucide-react'

const stack = [
  { icon: Layout, title: 'Frontend', detail: 'React' },
  { icon: Server, title: 'Backend', detail: 'Spring Boot' },
  { icon: Database, title: 'Database', detail: 'MongoDB' },
  { icon: KeyRound, title: 'Authentication', detail: 'JWT' },
  { icon: Waypoints, title: 'API', detail: 'REST' },
  { icon: FileJson, title: 'Documentation', detail: 'Swagger/OpenAPI' },
]

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-6xl px-4 py-16">
      <p className="text-xs uppercase tracking-[0.24em] text-violet-300">About</p>
      <h1 className="mt-3 text-4xl font-semibold text-white">What is MovieWrap?</h1>
      <p className="mt-4 max-w-2xl text-violet-100/75">
        MovieWrap is a movie discovery and review platform. Browse a catalog, filter by genre, sort by
        rating, and leave one review per title. Average scores recalculate whenever a review is added,
        edited, or removed.
      </p>

      <section className="mt-12 grid gap-5 md:grid-cols-2">
        <article className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">Features</h2>
          <ul className="mt-4 space-y-2 text-sm text-violet-100/75">
            <li>Movie search, genre filters, rating sort, and pagination</li>
            <li>JWT login with BCrypt-hashed passwords</li>
            <li>One review per user per movie</li>
            <li>Owner-only edit and delete for reviews</li>
          </ul>
        </article>
        <article className="glass-panel rounded-3xl p-6">
          <h2 className="text-xl font-semibold text-white">How it works</h2>
          <p className="mt-4 text-sm leading-relaxed text-violet-100/75">
            Register an account, receive a JWT at login, then call protected movie APIs with a Bearer
            token. Review payloads never include a username — Spring Security reads it from the token.
          </p>
        </article>
      </section>

      <section className="mt-12">
        <h2 className="mb-6 text-2xl font-semibold text-white">Technology stack</h2>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {stack.map((item, index) => (
            <motion.article
              key={item.title}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.05 }}
              className="glass-panel rounded-3xl p-5"
            >
              <item.icon className="text-violet-300" />
              <h3 className="mt-4 text-sm uppercase tracking-[0.18em] text-violet-300">{item.title}</h3>
              <p className="mt-1 text-lg font-semibold text-white">{item.detail}</p>
            </motion.article>
          ))}
        </div>
      </section>
    </div>
  )
}
