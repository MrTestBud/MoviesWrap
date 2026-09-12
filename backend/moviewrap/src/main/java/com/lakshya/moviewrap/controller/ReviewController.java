package com.lakshya.moviewrap.controller;

import java.util.List;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import com.lakshya.moviewrap.model.Review;
import com.lakshya.moviewrap.service.ReviewService;

@RestController
@RequestMapping("/reviews")
public class ReviewController {

    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public Review addReview(@RequestBody Review review) {

        return reviewService.addReview(review);
    }

    @GetMapping("/{movieId}")
    public List<Review> getReviews(@PathVariable String movieId) {

        return reviewService.getReviewsByMovieId(movieId);
    }
}