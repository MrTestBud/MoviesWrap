package com.lakshya.moviewrap.repository;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.lakshya.moviewrap.model.Movie;

public interface MovieRepository extends MongoRepository<Movie, String> {
}