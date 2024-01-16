package com.example.movieapi.services;

import com.example.movieapi.models.Movie;
import com.example.movieapi.models.Review;
import com.example.movieapi.reposetories.MovieRepository;
import com.example.movieapi.reposetories.ReviewRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.mongodb.core.MongoTemplate;
import org.springframework.data.mongodb.core.query.Criteria;
import org.springframework.data.mongodb.core.query.Update;
import org.springframework.stereotype.Service;

@Service
public class ReviewService {

    @Autowired
    private ReviewRepository reviewRepository;
    @Autowired
    private MongoTemplate mongoTemplate;
    public Review addReview(String body, String imdbId){
        Review review = reviewRepository.insert(new Review(body));

        mongoTemplate.update(Movie.class)
                .matching(Criteria.where("imdbId").is(imdbId))
                .apply(new Update().push("reviewIds").value(review))
                .first();

        return review;
    }
}
