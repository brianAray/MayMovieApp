package com.maymovies.model.utelly;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Group {
    private List<Location> locations;
    private String id;
    private Integer weight;
    private String picture;
    private String name;
}
