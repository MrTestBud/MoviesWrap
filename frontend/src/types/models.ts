export interface Movie {
  id: string
  title: string
  genre: string
  description: string
  averageRating: number
  totalReviews: number
}

export interface Review {
  id: string
  movieId: string
  reviewerName: string
  rating: number
  comment: string
}

export interface ReviewWithMovie extends Review {
  movieTitle: string
}

export interface RegisterResponse {
  id: string
  username: string
}

export interface SpringPage<T> {
  content: T[]
  totalElements: number
  totalPages: number
  size: number
  number: number
  first: boolean
  last: boolean
  empty: boolean
}

export interface UserProfile {
  username: string
}
