package com.lakshya.moviewrap.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import lombok.Data;

@Data
@Document(collection = "movies")
public class Movie {

    @Id
    private String id;

    private String title;
    private String genre;
    private String description;

    private Double averageRating = 0.0;
    private Integer totalReviews = 0;
}