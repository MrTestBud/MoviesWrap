package com.lakshya.moviewrap.model;

import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "reviews")
public class Review {

    @Id
    private String id;

    private String movieId;
    private String reviewerName;
    private Integer rating;
    private String comment;
}