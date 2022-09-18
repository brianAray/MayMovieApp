package com.maymovies.model.tmdb;

import com.maymovies.model.tmdb.Movie;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Results {
    private int page;
    private List<Movie> results;
    private int total_pages;
    private int total_results;
}
