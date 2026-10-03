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

    public Movie deleteMovie(String id) {
        Movie movie = movieRepository.findById(id).orElse(null);
        if (movie != null) {
            movieRepository.deleteById(id);
        }
        return movie;
    }

    public Movie updateMovie(String id , Movie updatedMovie){
        Movie existingMovie = movieRepository.findById(id).orElse(null);
        if (existingMovie == null) {
            return null;
        }

        existingMovie.setTitle(updatedMovie.getTitle());
        existingMovie.setGenre(updatedMovie.getGenre());
        existingMovie.setDescription(updatedMovie.getDescription());
        existingMovie.setAverageRating(updatedMovie.getAverageRating());

        return movieRepository.save(existingMovie);
    }

    public List<Movie> searchMovies(String title) {
        return movieRepository.findByTitleContainingIgnoreCase(title);
    }
    
}