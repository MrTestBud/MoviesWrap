package com.lakshya.moviewrap.exception;

import com.lakshya.moviewrap.model.ErrorResponse;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.bind.annotation.RestControllerAdvice;

@RestControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler(MovieNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleMovieNotFound(
            MovieNotFoundException exception) {

        ErrorResponse error = new ErrorResponse(
                exception.getMessage(),
                404
        );

        return ResponseEntity.status(404).body(error);
    }

    @ExceptionHandler(ReviewNotFoundException.class)
    public ResponseEntity<ErrorResponse> handleReviewNotFound(
            ReviewNotFoundException exception) {

        ErrorResponse error = new ErrorResponse(
                exception.getMessage(),
                404
        );

        return ResponseEntity.status(404).body(error);
    }
}