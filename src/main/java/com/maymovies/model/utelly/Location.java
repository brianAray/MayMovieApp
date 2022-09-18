package com.maymovies.model.utelly;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class Location {
    private String display_name;
    private String id;
    private String url;
    private String name;
    private String icon;
}
