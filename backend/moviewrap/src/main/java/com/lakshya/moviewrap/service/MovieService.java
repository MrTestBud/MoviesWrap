package com.lakshya.moviewrap.service;

import java.util.List;

import org.springframework.stereotype.Service;

import com.lakshya.moviewrap.model.Movie;
import com.lakshya.moviewrap.repository.MovieRepository;

@Service
public class MovieService {

    private final MovieRepository movieRepository;

    public MovieService(MovieRepository movieRepository) {
        this.movieRepository = movieRepository;
    }

    public Movie saveMovie(Movie movie) {
        return movieRepository.save(movie);
    }

    public List<Movie> getAllMovies() {
        return movieRepository.findAll();
    }
    
    public Movie getMovieById(String id) {
    return movieRepository.findById(id).orElse(null);
}
}