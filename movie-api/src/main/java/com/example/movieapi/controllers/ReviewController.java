package com.example.movieapi.controllers;


import com.example.movieapi.models.Review;
import com.example.movieapi.services.ReviewService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.Map;

@RestController
@RequestMapping("/api/reviews")
public class ReviewController {

    @Autowired
    private ReviewService reviewService;

    @PostMapping
    public ResponseEntity<Review>addNewReview(@RequestBody Map<String, String> payload){
        return new ResponseEntity<Review>(reviewService.addReview(payload.get("body"), payload.get("ImdbId")), HttpStatus.CREATED);
    }
}
