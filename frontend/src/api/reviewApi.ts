import type { Review } from '../types/models'
import apiClient from './apiClient'

export async function getReviewsByMovieId(movieId: string): Promise<Review[]> {
  const response = await apiClient.get<Review[]>(`/reviews/${movieId}`)
  return response.data
}

export async function createReview(payload: {
  movieId: string
  rating: number
  comment: string
}): Promise<Review> {
  const response = await apiClient.post<Review>('/reviews', payload)
  return response.data
}

export async function updateReview(
  id: string,
  payload: { rating: number; comment: string },
): Promise<Review> {
  const response = await apiClient.put<Review>(`/reviews/${id}`, payload)
  return response.data
}

export async function deleteReview(id: string): Promise<Review> {
  const response = await apiClient.delete<Review>(`/reviews/${id}`)
  return response.data
}
