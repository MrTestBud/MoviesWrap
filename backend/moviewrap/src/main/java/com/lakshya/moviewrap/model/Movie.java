package com.lakshya.moviewrap.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;

    @NotBlank
    private String title;

    @NotBlank
    private String genre;

    @NotBlank
    private String description;

    private Double averageRating = 0.0;
    private Integer totalReviews = 0;


    
}