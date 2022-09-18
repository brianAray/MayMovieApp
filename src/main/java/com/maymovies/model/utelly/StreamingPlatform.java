package com.maymovies.model.utelly;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class StreamingPlatform {

    private String variant;
    private String id;
    private Group collection;
    private Integer status_code;
    private String type;
}
