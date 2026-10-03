package com.lakshya.moviewrap.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lakshya.moviewrap.model.Review;
import com.lakshya.moviewrap.service.ReviewService;

import jakarta.validation.Valid;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    // ADD REVIEW
    @PostMapping
    public Review addReview(@Valid @RequestBody Review review) {

        return reviewService.addReview(review);
    }

    // GET REVIEWS FOR A MOVIE
    @GetMapping("/{movieId}")
    public List<Review> getReviews(@PathVariable String movieId) {

        return reviewService.getReviewsByMovieId(movieId);
    }

    // UPDATE REVIEW
    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable String id,
            @Valid @RequestBody Review updatedReview) {

        Review review = reviewService.updateReview(id, updatedReview);

        if (review == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(review);
    }

    // DELETE REVIEW
    @DeleteMapping("/{id}")
    public ResponseEntity<Review> deleteReview(@PathVariable String id) {

        Review deletedReview = reviewService.deleteReview(id);

        if (deletedReview == null) {
            return ResponseEntity.notFound().build();
        }

        return ResponseEntity.ok(deletedReview);
    }
}