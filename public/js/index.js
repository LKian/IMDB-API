console.log("IMDB");

const searchField = document.querySelector(".search-field");
let movieTitle = document.querySelector(".listing__title");
let movieImage = document.querySelector(".listing__image");
const moviePlot = document.querySelector(".listing__summary")

searchField.onkeyup = function () {
    let searchQuery = searchField.value.replace(/ /g, "%20");

    fetch(`/movie?search=${searchQuery}`)
        .then(response => {
            return response.json();
        })
        .then(data => {
            console.log(data)
            const title = data.Title;
            const image = data.Poster;
            const plot = data.Plot;
            console.log("title ", title);
            if (title && image) {
                movieTitle.innerHTML = title;
                movieImage.src = image;
                movieImage.alt = title;
                moviePlot.innerHTML = plot;
            }
            else {
                movieTitle.innerHTML = "Haven't heard of this!";
                movieImage.src = "https://s3.amazonaws.com/tinycards/image/db34e90d64234eedf1530f4187547d80";
                moviePlot.innerHTML = "";
            }
        })
}