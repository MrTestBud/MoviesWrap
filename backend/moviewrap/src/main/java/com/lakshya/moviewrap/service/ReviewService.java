package com.lakshya.moviewrap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lakshya.moviewrap.exception.ReviewNotFoundException;
import com.lakshya.moviewrap.exception.ForbiddenException;
import com.lakshya.moviewrap.exception.MovieNotFoundException;
import com.lakshya.moviewrap.model.Movie;
import com.lakshya.moviewrap.model.Review;
import com.lakshya.moviewrap.repository.MovieRepository;
import com.lakshya.moviewrap.repository.ReviewRepository;

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
        if (!movieRepository.existsById(review.getMovieId())) {
            throw new MovieNotFoundException("Movie not found with id: " + review.getMovieId());
        }

        boolean alreadyReviewed =
                reviewRepository.existsByMovieIdAndReviewerNameIgnoreCase(
                        review.getMovieId(), review.getReviewerName());

        if (alreadyReviewed) {
            return null;
        }

        Review savedReview = reviewRepository.save(review);
        updateMovieRating(review.getMovieId());
        return savedReview;
    }

    public List<Review> getReviewsByMovieId(String movieId) {
        return reviewRepository.findByMovieId(movieId);
    }

    public Review updateReview(String id, Review updatedReview, String username) {
        Review existingReview = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(
                        "Review not found with id: " + id));

        checkOwnership(existingReview, username);

        existingReview.setRating(updatedReview.getRating());
        existingReview.setComment(updatedReview.getComment());

        Review savedReview = reviewRepository.save(existingReview);
        updateMovieRating(existingReview.getMovieId());
        return savedReview;
    }

    public Review deleteReview(String id, String username) {
        Review review = reviewRepository.findById(id)
                .orElseThrow(() -> new ReviewNotFoundException(
                        "Review not found with id: " + id));

        checkOwnership(review, username);

        reviewRepository.deleteById(id);
        updateMovieRating(review.getMovieId());
        return review;
    }

    private void checkOwnership(Review review, String username) {
        if (!review.getReviewerName().equalsIgnoreCase(username)) {
            throw new ForbiddenException(
                    "You are not allowed to modify this review");
        }
    }

    private void updateMovieRating(String movieId) {
        List<Review> reviews = reviewRepository.findByMovieId(movieId);
        Movie movie = movieRepository.findById(movieId).orElse(null);

        if (movie == null) {
            return;
        }

        if (reviews.isEmpty()) {
            movie.setAverageRating(0.0);
            movie.setTotalReviews(0);
        } else {
            double total = 0;
            for (Review review : reviews) {
                total += review.getRating();
            }
            movie.setAverageRating(total / reviews.size());
            movie.setTotalReviews(reviews.size());
        }

        movieRepository.save(movie);
    }
}
