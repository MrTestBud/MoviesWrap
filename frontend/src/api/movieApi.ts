import type { Movie, SpringPage } from '../types/models'
import apiClient from './apiClient'

export async function getAllMovies(): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movies')
  return response.data
}

export async function getMoviesSortedByRating(): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movies/sorted')
  return response.data
}

export async function getMoviesByGenre(genre: string): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>(`/movies/genre/${encodeURIComponent(genre)}`)
  return response.data
}

export async function getMovieById(id: string): Promise<Movie> {
  const response = await apiClient.get<Movie>(`/movies/${id}`)
  return response.data
}

export async function searchMovies(title: string): Promise<Movie[]> {
  const response = await apiClient.get<Movie[]>('/movies/search', {
    params: { title },
  })
  return response.data
}

export async function getMoviesPage(params: {
  page: number
  size: number
  sort?: string
}): Promise<SpringPage<Movie>> {
  const response = await apiClient.get<SpringPage<Movie>>('/movies/page', {
    params: {
      page: params.page,
      size: params.size,
      sort: params.sort,
    },
  })
  return response.data
}
