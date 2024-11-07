const apiKey = '599fc20e9cec3e0900ad833ae5ea5ec4';
const url = `https://api.themoviedb.org/3/movie/popular?api_key=${apiKey}`;

// Fetch popular movies from The Movie DB API
fetch(url)
    .then(response => response.json())
    .then(data => {
        // Iterate through the results to format and send the data
        data.results.forEach(async (movie) => {
            // Prepare the payload for the POST request
            let payload = {
                title: movie.title,
                overview: movie.overview,
                releaseDate: movie.release_date,
                language: movie.original_language,
                genres: movie.genre_ids, // List of genre IDs, which need to be mapped to genre names
                poster: movie.poster_path ? movie.poster_path.replace(/^\/+/, '') : '', // Remove leading slash
            };

            // Fetch genre names using the genre IDs
            const genreNames = await getGenreNames(payload.genres);
            payload.genres = genreNames;

            // Ensure the payload is displayed with double quotes in the console
            
            
            payload = [{
                title: "Joker: Folie à Deux",
                overview: "While struggling with his dual identity, Arthur Fleck not only stumbles upon true love, but also finds the music that's always been inside him.",
                releaseDate: "2024-10-01",
                language: "en",
                genres: [
                    "Drama",
                    "Crime",
                    "Thriller"
                ],
                poster: "if8QiqCI7WAGImKcJCfzp6VTyKA.jpg"
            }]
            console.log(JSON.stringify(payload[0], null, 2)); // Pretty print with 2 spaces indentation


            // Send the data as a POST request to the createMovie endpoint
            const postUrl = 'https://ambamovie.pramadani.com/movies'; // Replace with your API endpoint URL
            fetch(postUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(payload[0]),
            })
                .then(postResponse => postResponse.json())
                .then(postData => {
                    console.log('Movie created:', postData);
                })
                .catch(postError => {
                    console.error('Error sending movie data:', postError);
                });
        });
    })
    .catch(error => {
        console.error('Error fetching movies:', error);
    });

// Helper function to get genre names from genre IDs
async function getGenreNames(genreIds) {
    const genreUrl = `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}`;
    const genreResponse = await fetch(genreUrl);
    const genreData = await genreResponse.json();

    const genreMap = genreData.genres.reduce((acc, genre) => {
        acc[genre.id] = genre.name;
        return acc;
    }, {});

    return genreIds.map(id => genreMap[id]);
}
