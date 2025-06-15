async function searchMovie() {
    const movieName = document.getElementById('searchInput').value.trim();
    const apiKey = 'bf937318'; // Example: '12345678'
    const url = `https://www.omdbapi.com/?t=${encodeURIComponent(movieName)}&apikey=${apiKey}`;

    if (movieName === "") {
        alert("Please enter a movie name.");
        return;
    }

    try {
        const response = await fetch(url);
        const data = await response.json();

        const movieDetails = document.getElementById('movieDetails');

        if (data.Response === 'True') {
            const imdbLink = `https://www.imdb.com/title/${data.imdbID}/`;

            movieDetails.innerHTML = `
                <h2>${data.Title} (${data.Year})</h2>
                <img src="${data.Poster}" alt="Movie Poster">
                <p><strong>Genre:</strong> ${data.Genre}</p>
                <p><strong>Plot:</strong> ${data.Plot}</p>
                <p><strong>IMDB Rating:</strong> ${data.imdbRating}</p>
                <p><a href="${imdbLink}" target="_blank">🔗 View on IMDB</a></p>
            `;
        } else {
            movieDetails.innerHTML = `<h3>Movie not found. Please try again!</h3>`;
        }
    } catch (error) {
        console.error("Error fetching movie data:", error);
        alert("Something went wrong. Check your internet or API key.");
    }
}
