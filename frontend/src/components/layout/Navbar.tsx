import { useState } from 'react'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Menu, X } from 'lucide-react'
import { useAuth } from '../../context/AuthContext'

const links = [
  { to: '/', label: 'Home' },
  { to: '/movies', label: 'Movies' },
  { to: '/reviews', label: 'Reviews' },
  { to: '/about', label: 'About' },
]

export default function Navbar() {
  const { isAuthenticated, logout, user } = useAuth()
  const [open, setOpen] = useState(false)
  const navigate = useNavigate()

  function handleLogout() {
    logout()
    setOpen(false)
    navigate('/')
  }

  return (
    <header className="sticky top-0 z-50 border-b border-violet-500/20 bg-[#07040f]/75 backdrop-blur-xl">
      <nav className="mx-auto flex max-w-6xl items-center justify-between px-4 py-3" aria-label="Main">
        <Link to="/" className="flex items-center gap-2 font-semibold tracking-wide text-white">
          <span className="grid h-9 w-9 place-items-center rounded-xl border border-violet-400/40 bg-violet-600/30 text-sm">
            MW
          </span>
          MovieWrap
        </Link>

        <div className="hidden items-center gap-6 md:flex">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              className={({ isActive }) =>
                `text-sm transition ${isActive ? 'text-white' : 'text-violet-200/70 hover:text-white'}`
              }
            >
              {link.label}
            </NavLink>
          ))}
        </div>

        <div className="hidden items-center gap-3 md:flex">
          {isAuthenticated ? (
            <>
              <Link
                to="/dashboard"
                className="rounded-full border border-violet-400/30 px-4 py-2 text-sm text-violet-100 hover:bg-white/5"
              >
                {user?.username}
              </Link>
              <button
                type="button"
                onClick={handleLogout}
                className="rounded-full bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-500"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm text-violet-100 hover:text-white">
                Login
              </Link>
              <Link
                to="/register"
                className="rounded-full bg-violet-600 px-4 py-2 text-sm text-white hover:bg-violet-500"
              >
                Register
              </Link>
            </>
          )}
        </div>

        <button
          type="button"
          className="rounded-xl p-2 text-white md:hidden"
          onClick={() => setOpen((value) => !value)}
          aria-expanded={open}
          aria-label="Toggle navigation"
        >
          {open ? <X /> : <Menu />}
        </button>
      </nav>

      {open ? (
        <div className="space-y-3 border-t border-violet-500/20 px-4 py-4 md:hidden">
          {links.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              onClick={() => setOpen(false)}
              className="block rounded-xl px-2 py-2 text-violet-100"
            >
              {link.label}
            </NavLink>
          ))}
          {isAuthenticated ? (
            <>
              <Link to="/dashboard" onClick={() => setOpen(false)} className="block px-2 py-2">
                Dashboard
              </Link>
              <button type="button" onClick={handleLogout} className="px-2 py-2 text-left text-violet-200">
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" onClick={() => setOpen(false)} className="block px-2 py-2">
                Login
              </Link>
              <Link to="/register" onClick={() => setOpen(false)} className="block px-2 py-2">
                Register
              </Link>
            </>
          )}
        </div>
      ) : null}
    </header>
  )
}
