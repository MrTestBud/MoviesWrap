package com.lakshya.moviewrap.service;

import com.lakshya.moviewrap.model.Movie;
import com.lakshya.moviewrap.model.Review;
import com.lakshya.moviewrap.repository.MovieRepository;
import com.lakshya.moviewrap.repository.ReviewRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final MovieRepository movieRepository;

    public ReviewService(ReviewRepository reviewRepository,
                         MovieRepository movieRepository) {
        this.reviewRepository = reviewRepository;
        this.movieRepository = movieRepository;
    }

    public Review addReview(Review review) {

        // Save the review
        Review savedReview = reviewRepository.save(review);

        // Get all reviews for this movie
        List<Review> reviews =
                reviewRepository.findByMovieId(review.getMovieId());

        // Calculate average rating
        double total = 0;

        for (Review r : reviews) {
            total += r.getRating();
        }

        double average = total / reviews.size();

        Movie movie = movieRepository
                .findById(review.getMovieId())
                .orElse(null);

     
        if (movie != null) {
            movie.setAverageRating(average);
            movie.setTotalReviews(reviews.size());

            movieRepository.save(movie);
        }

        return savedReview;
    }

    public List<Review> getReviewsByMovieId(String movieId) {

        return reviewRepository.findByMovieId(movieId);
    }
}