import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import Layout from './components/layout/Layout'
import ProtectedRoute from './components/ui/ProtectedRoute'
import { AuthProvider } from './context/AuthContext'
import { ToastProvider } from './context/ToastContext'
import AboutPage from './pages/AboutPage'
import DashboardPage from './pages/DashboardPage'
import EditReviewPage from './pages/EditReviewPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import MovieDetailsPage from './pages/MovieDetailsPage'
import MoviesPage from './pages/MoviesPage'
import NotFoundPage from './pages/NotFoundPage'
import RegisterPage from './pages/RegisterPage'
import ReviewsPage from './pages/ReviewsPage'

export default function App() {
  return (
    <AuthProvider>
      <ToastProvider>
        <BrowserRouter>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<LoginPage />} />
              <Route path="/register" element={<RegisterPage />} />
              <Route
                path="/movies"
                element={
                  <ProtectedRoute>
                    <MoviesPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/movies/:id"
                element={
                  <ProtectedRoute>
                    <MovieDetailsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews"
                element={
                  <ProtectedRoute>
                    <ReviewsPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/dashboard"
                element={
                  <ProtectedRoute>
                    <DashboardPage />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/reviews/:id/edit"
                element={
                  <ProtectedRoute>
                    <EditReviewPage />
                  </ProtectedRoute>
                }
              />
              <Route path="/home" element={<Navigate to="/" replace />} />
              <Route path="*" element={<NotFoundPage />} />
            </Route>
          </Routes>
        </BrowserRouter>
      </ToastProvider>
    </AuthProvider>
  )
}
