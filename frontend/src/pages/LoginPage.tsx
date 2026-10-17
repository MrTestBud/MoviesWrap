import { useState } from 'react'
import type { FormEvent } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../context/AuthContext'
import { useToast } from '../context/ToastContext'
import ErrorMessage from '../components/ui/ErrorMessage'
import FloatingOrbs from '../components/visual/FloatingOrbs'
import { getApiErrorMessage } from '../utils/errors'

export default function LoginPage() {
  const { login } = useAuth()
  const { notify } = useToast()
  const navigate = useNavigate()
  const location = useLocation()
  const from = (location.state as { from?: string } | null)?.from ?? '/'
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  async function handleSubmit(event: FormEvent) {
    event.preventDefault()
    setLoading(true)
    setError('')
    try {
      await login(username.trim(), password)
      notify('Welcome back to MovieWrap.', 'success')
      navigate(from, { replace: true })
    } catch (err: unknown) {
      setError(getApiErrorMessage(err, 'Invalid username or password'))
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="relative mx-auto flex min-h-[70vh] max-w-6xl items-center justify-center px-4 py-16">
      <FloatingOrbs />
      <form onSubmit={handleSubmit} className="glass-panel relative w-full max-w-md rounded-3xl p-8">
        <h1 className="text-3xl font-semibold text-white">Login</h1>
        <p className="mt-2 text-sm text-violet-200/70">Enter your MovieWrap credentials.</p>
        <label className="mt-6 block">
          <span className="mb-2 block text-sm text-violet-200">Username</span>
          <input
            required
            value={username}
            onChange={(event) => setUsername(event.target.value)}
            autoComplete="username"
            className="w-full rounded-2xl border border-violet-500/30 bg-black/30 px-4 py-3 text-sm text-white"
          />
        </label>
        <label className="mt-4 block">
          <span className="mb-2 block text-sm text-violet-200">Password</span>
          <input
            required
            type="password"
            value={password}
            onChange={(event) => setPassword(event.target.value)}
            autoComplete="current-password"
            className="w-full rounded-2xl border border-violet-500/30 bg-black/30 px-4 py-3 text-sm text-white"
          />
        </label>
        <div className="mt-4">
          <ErrorMessage message={error} />
        </div>
        <button
          type="submit"
          disabled={loading}
          className="mt-6 w-full rounded-full bg-violet-600 py-3 text-sm font-medium text-white hover:bg-violet-500 disabled:opacity-60"
        >
          {loading ? 'Signing in...' : 'Login'}
        </button>
        <p className="mt-5 text-center text-sm text-violet-200/70">
          Don't have an account?{' '}
          <Link to="/register" className="text-violet-300 hover:text-white">
            Create one
          </Link>
        </p>
      </form>
    </div>
  )
}
