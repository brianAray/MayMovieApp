package com.maymovies.service;

//import org.springframework.http.HttpRequest;
import com.maymovies.model.tmdb.Movie;
import com.maymovies.model.tmdb.Results;
import com.maymovies.model.utelly.ImdbId;
import com.maymovies.model.utelly.StreamingPlatform;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Arrays;
import java.util.List;
import java.util.Map;

@Service
public class MovieService {

    private final RestTemplate restTemplate;

    private final String TMDB_API_KEY = "abf6bc72e03c311d0c772f910ab99444";

    @Autowired
    public MovieService(RestTemplate restTemplate){
        this.restTemplate = restTemplate;
    }

    public Map<Movie, List<StreamingPlatform>> getAllSearched() {
        return null;
    }

    public List<Results> searchMovie(String query, int page) {

        final String url = "https://api.themoviedb.org/3/search/movie?api_key=" + TMDB_API_KEY + "&language=en-US&query="+query+"&page="+page;

        ResponseEntity<Results> response = this.restTemplate.getForEntity(url, Results.class);

        System.out.println(response.getBody());
        return Arrays.asList(response.getBody());
    }

    public List<StreamingPlatform> searchStreams(String imdbId){

        final String url ="https://utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com/idlookup?source_id=" + imdbId + "&source=imdb&country=us";

        HttpHeaders headers = new HttpHeaders();
        headers.set("X-RapidAPI-Key", "0e4f68dba2mshb504cadb72f102ep103673jsn9221e26ddd66");
        headers.set("X-RapidAPI-Host", "utelly-tv-shows-and-movies-availability-v1.p.rapidapi.com");


        HttpEntity request = new HttpEntity(headers);

        ResponseEntity<StreamingPlatform> response = this.restTemplate.exchange(url, HttpMethod.GET, request, StreamingPlatform.class);

        System.out.println(response.getBody());
        return Arrays.asList(response.getBody());
    }

    public ImdbId getImdbId(int id) {

        final String url = "https://api.themoviedb.org/3/movie/"+id+"?api_key="+TMDB_API_KEY+"&language=en-US";

        HttpHeaders headers = new HttpHeaders();

        ResponseEntity<ImdbId> response = this.restTemplate.getForEntity(url, ImdbId.class);

        System.out.println(response.getBody());
        return response.getBody();
    }
}
