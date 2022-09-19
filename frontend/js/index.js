let body = document.querySelector("body");



let searchContainer = document.querySelector("#search");
let movieContainer = document.querySelector("#movies");
let platformContainer = document.querySelector("#platforms");

let searchBox = searchContainer.children[0];
let searchButton = searchContainer.children[2];
let resetSearchButton = searchContainer.children[3];

searchButton.addEventListener("click", searchMovie);
resetSearchButton.addEventListener("click", function(){
    searchBox.value="";
    movieContainer.innerHTML = "";
    platformContainer.innerHTML = "";
})

function searchMovie(){
    movieContainer.innerHTML = "";
    platformContainer.innerHTML = "";
    let movie = asyncGetMovie(searchBox.value);
    let results = movie.then(item => {return parseSearch(item[0]);});
    results.then(item => {
        //console.log(item);
        displayMovies(item.results);
    });
}

function parseSearch(searchResults){

    let results = [];

    for(let item of searchResults.results){
        results.push(new Movie(
            item.adult,
            item.backdrop_path,
            item.genre_ids,
            item.id,
            item.original_language,
            item.original_title,
            item.overview,
            item.popularity,
            item.poster_path,
            item.release_date,
            item.title,
            item.video,
            item.vote_average,
            item.vote_count
        ))
    }

    let response = new SearchResult(
        searchResults.page,
        searchResults.total_pages,
        searchResults.total_results,
        searchResults.results
    );

    return response;
}

function parsePlatformData(searchResults){

    let locations = [];

    for (let item of searchResults.collection.locations){

        locations.push(
            new StreamingPlatform(
                item.display_name,
                item.icon,
                item.id,
                item.name,
                item.url
            )
        );
    }

    let collection = new Collection(
            searchResults.collection.id,
            locations,
            searchResults.collection.name,
            searchResults.collection.picture,
            searchResults.collection.weight
        );

    let result = new Result(
        collection,
        searchResults.id,
        searchResults.status_code,
        searchResults.type,
        searchResults.variant
    )

    console.log(result);
    displayPlatforms(result);

}

function displayMovies(movieResults){
    let movieCollectionContainer = document.createElement("div");
    for(let movie of movieResults){
        let movieBox = document.createElement("div");
        movieBox.class = "movie";
        
        let imgUrl = `https://image.tmdb.org/t/p/w500${movie.poster_path}`;
        let movieImage = document.createElement("img");

        movieImage.src= imgUrl;

        let title = document.createElement("h1")
        title.innerText = movie.original_title;
        movieBox.appendChild(title);
        movieBox.appendChild(document.createElement("br"));
        movieBox.appendChild(movieImage);

        //movieBox.appendChild(document.createElement("br"));

        let movieId = document.createElement("input");
        movieId.value = movie.id;
        movieId.type = "hidden";
        movieBox.appendChild(movieId);

        let button = document.createElement("input");
        button.value = "select";
        button.type = "button";

        button.addEventListener("click", asyncGetImdbId);

        movieBox.appendChild(button);

        movieCollectionContainer.appendChild(movieBox);


    }
    movieContainer.appendChild(movieCollectionContainer);
}

function displayPlatforms(platformResults){
    movieContainer.innerHTML = "";

    let collection = platformResults.collection;

    //let platformContainer = document.createElement("div");
    //platformContainer.id = "platformContainer";


    let movieTitle = document.createElement("h1");
    movieTitle.innerText = collection.name;
    platformContainer.appendChild(movieTitle);

    let movieImage = document.createElement("img");
    movieImage.src = collection.picture;
    platformContainer.appendChild(movieImage);

    let streamContainer = document.createElement("div");
    streamContainer.id = "streamContainer";

    for(let stream of collection.locations){
        let streamBox = document.createElement("div");
        streamBox.class = "stream";

        let streamTitle = document.createElement("h2");
        streamTitle.innerText = stream.display_name;
        streamBox.appendChild(streamTitle);

        let streamIcon = document.createElement("img");
        streamIcon.src = stream.icon;
        streamBox.appendChild(streamIcon);

        streamBox.appendChild(document.createElement("br"));
        let streamLink = document.createElement("a");
        streamLink.href = stream.url;
        streamLink.innerText = "Go To Stream";
        streamBox.appendChild(streamLink);

        streamContainer.appendChild(streamBox);
    }
    platformContainer.appendChild(streamContainer);
}

async function asyncGetMovie(query){
    let url = `http://localhost:8080/movie/search?query=${query}&page=1`
    try{
        let response_body = await fetch(
            url, 
            {method: "GET"}
        )
        let data = await response_body.json()
        return data;
    }catch(e){
        alert("Failed to get the movie")
    }
}

async function asyncGetImdbId(movieButton){
    let movie = movieButton.target.parentElement;
    let url = `http://localhost:8080/movie/imdb?id=${movie.children[3].value}`;
    try{
        let response_body = await fetch(
            url,
            {
                method: "GET"
            }
        );
        let data = await response_body.json();
        asyngGetStreamingPlatforms(data.imdb_id);
    }catch(e){
        console.log(e);
    }
}

async function asyngGetStreamingPlatforms(imdbId){
    let url = `http://localhost:8080/movie/streams?imdb_id=${imdbId}`;

    try{
        let response_body = await fetch(
            url,
            {
                method: "GET"
            }
        );
        let data = await response_body.json();

        parsePlatformData(data[0]);
    }catch(e){
        console.log(e);
    }
}

class Movie {
    constructor(
        adult, 
        backdrop_path, 
        genre_ids, 
        id, 
        original_language, 
        original_title, 
        overview, 
        popularity, 
        poster_path, 
        release_date, 
        title, 
        video, 
        vote_average, 
        vote_count){

        this.adult = adult; 
        this.backdrop_path = backdrop_path;
        this.genre_ids = genre_ids;
        this.id = id;
        this.original_language  = original_language;
        this.original_title = original_title;
        this.overview = overview;
        this.popularity = popularity;
        this.poster_path = poster_path;
        this.release_date = release_date;
        this.title = title;
        this.video = video;
        this.vote_average = vote_average;
        this.vote_count = vote_count
    }
}

class SearchResult{
    constructor(
        page,
        total_pages,
        total_results,
        results
    ){
        this.page = page;
        this.total_pages = total_pages;
        this.total_results = total_results;
        this.results = results;
    }
}

class StreamingPlatform{
    constructor(
        display_name,
        icon,
        id,
        name,
        url
    ){
        this.display_name = display_name;
        this.icon = icon;
        this.id = id;
        this.name = name;
        this.url = url;
    }
}

class Collection{
    constructor(
        id,
        locations,
        name,
        picture,
        weight
    ){
        this.id = id;
        this.locations = locations;
        this.name = name;
        this.picture = picture;
        this.weight = weight;
    }
}

class Result{
    constructor(
        collection,
        id,
        status_code,
        type,
        variant
    ){
        this.collection = collection;
        this.id = id;
        this.status_code = status_code;
        this.type = type;
        this.variant = variant;
    }
}

