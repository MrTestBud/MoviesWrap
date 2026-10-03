package com.lakshya.moviewrap.repository;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lakshya.moviewrap.model.Review;

public interface ReviewRepository extends MongoRepository<Review, String> {

    List<Review> findByMovieId(String movieId);

    boolean existsByMovieIdAndReviewerNameIgnoreCase(String movieId, String reviewerName);
}