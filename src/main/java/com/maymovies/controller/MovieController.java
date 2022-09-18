package com.maymovies.controller;

import com.maymovies.model.utelly.ImdbId;
import com.maymovies.model.tmdb.Movie;
import com.maymovies.model.tmdb.Results;
import com.maymovies.model.utelly.StreamingPlatform;
import com.maymovies.service.MovieService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/movie")
@CrossOrigin("*")
public class MovieController {

    private MovieService movieService;

    @Autowired
    public MovieController(MovieService movieService){
        this.movieService = movieService;
    }

    @GetMapping("/searched")
    public Map<Movie, List<StreamingPlatform>> getPreviousSearches(){
        return movieService.getAllSearched();
    }

    @GetMapping("/search")
    public List<Results> searchMovie(
            @RequestParam("query") String query,
            @RequestParam(value = "page", required = false, defaultValue = "1") int page
    ){
        return movieService.searchMovie(query, page);
    }

    @GetMapping("/imdb")
    public ImdbId getImdbId(@RequestParam("id") int id){
        return movieService.getImdbId(id);
    }

    @GetMapping("/streams")
    public List<StreamingPlatform> getStreamingServices(@RequestParam("imdb_id") String id){
        return movieService.searchStreams(id);
    }

}
