package com.lakshya.moviewrap.controller;

import java.util.List;

import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
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

    @PostMapping
    public ResponseEntity<Review> addReview(
            @Valid @RequestBody Review review,
            Authentication authentication) {

        review.setReviewerName(authentication.getName());

        Review savedReview = reviewService.addReview(review);

        if (savedReview == null) {
            return ResponseEntity.badRequest().build();
        }

        return ResponseEntity.ok(savedReview);
    }

    @GetMapping("/{movieId}")
    public List<Review> getReviews(@PathVariable String movieId) {
        return reviewService.getReviewsByMovieId(movieId);
    }

    @PutMapping("/{id}")
    public ResponseEntity<Review> updateReview(
            @PathVariable String id,
            @Valid @RequestBody Review updatedReview,
            Authentication authentication) {

        Review review = reviewService.updateReview(
                id, updatedReview, authentication.getName());

        return ResponseEntity.ok(review);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Review> deleteReview(
            @PathVariable String id,
            Authentication authentication) {

        Review deletedReview = reviewService.deleteReview(
                id, authentication.getName());

        return ResponseEntity.ok(deletedReview);
    }
}
