package com.example.movieapi.services;

import com.example.movieapi.models.Movie;
import com.example.movieapi.reposetories.MovieRepository;
import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class MovieService {

    @Autowired
    private MovieRepository movieRepository;
    public List<Movie> getMovies(){
        return movieRepository.findAll();
    }

    public Optional<Movie> getMovie(String id){
        return movieRepository.findMovieByImdbId(id);
    }
}
