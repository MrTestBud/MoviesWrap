package com.lakshya.moviewrap.model;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;

    @NotBlank
    private String movieId;

    @NotBlank
    private String reviewerName;

    @Min(1)
    @Max(5)
    private Integer rating;

    @NotBlank
    private String comment;
}