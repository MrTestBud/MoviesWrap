package com.lakshya.moviewrap.service;

import java.util.List;

import org.springframework.stereotype.Service;

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

    // ADD REVIEW
    public Review addReview(Review review) {

        boolean alreadyReviewed =
            reviewRepository.existsByMovieIdAndReviewerNameIgnoreCase(
                    review.getMovieId(),
                    review.getReviewerName()
            );

        if (alreadyReviewed) {
            return null;
        }

        Review savedReview = reviewRepository.save(review);

        updateMovieRating(review.getMovieId());

        return savedReview;
    }

    // GET ALL REVIEWS FOR A MOVIE
    public List<Review> getReviewsByMovieId(String movieId) {

        return reviewRepository.findByMovieId(movieId);
    }

    // UPDATE REVIEW
    public Review updateReview(String id, Review updatedReview) {

        Review existingReview = reviewRepository.findById(id)
                .orElse(null);

        if (existingReview == null) {
            return null;
        }

        existingReview.setReviewerName(updatedReview.getReviewerName());
        existingReview.setRating(updatedReview.getRating());
        existingReview.setComment(updatedReview.getComment());

        Review savedReview = reviewRepository.save(existingReview);

        updateMovieRating(existingReview.getMovieId());

        return savedReview;
    }

    // DELETE REVIEW
    public Review deleteReview(String id) {

        Review review = reviewRepository.findById(id)
                .orElse(null);

        if (review == null) {
            return null;
        }

        reviewRepository.deleteById(id);

        updateMovieRating(review.getMovieId());

        return review;
    }

    // UPDATE MOVIE'S AVERAGE RATING
    private void updateMovieRating(String movieId) {

        List<Review> reviews =
                reviewRepository.findByMovieId(movieId);

        Movie movie = movieRepository.findById(movieId)
                .orElse(null);

        if (movie == null) {
            return;
        }

        // No reviews left
        if (reviews.isEmpty()) {

            movie.setAverageRating(0.0);
            movie.setTotalReviews(0);

        } else {

            double total = 0;

            for (Review review : reviews) {
                total += review.getRating();
            }

            double average = total / reviews.size();

            movie.setAverageRating(average);
            movie.setTotalReviews(reviews.size());
        }

        movieRepository.save(movie);
    }
}