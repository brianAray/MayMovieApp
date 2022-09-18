let body = document.querySelector("body");



let searchContainer = document.querySelector("#search");

let searchBox = searchContainer.children[0];
let searchButton = searchContainer.children[2];
let resetSearchButton = searchContainer.children[3];

searchButton.addEventListener("click", searchMovie);
resetSearchButton.addEventListener("click", function(){
    searchBox.value="";
})

let movieContainer = document.querySelector("#movies");


function searchMovie(){
    let movie = asyncGetMovie(searchBox.value);

    movie.then(item => console.log(item));
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

