const axios = require('axios');

const genreMap = {
    28: 'Action',
    12: 'Adventure',
    16: 'Animation',
    35: 'Comedy',
    80: 'Crime',
    99: 'Documentary',
    18: 'Drama',
    10751: 'Family',
    14: 'Fantasy',
    36: 'History',
    27: 'Horror',
    10402: 'Music',
    9648: 'Mystery',
    10749: 'Romance',
    878: 'Science Fiction',
    10770: 'TV Movie',
    53: 'Thriller',
    10752: 'War',
    37: 'Western'
};

async function fetchAndPostMovies() {
    try {
        const response = await axios.get('https://api.themoviedb.org/3/movie/popular', {
            params: {
                api_key: '599fc20e9cec3e0900ad833ae5ea5ec4'
            }
        });
        
        if (response.data && response.data.results) {
            const movies = response.data.results;

            for (const movie of movies) {
                const movieData = {
                    title: movie.title,
                    overview: movie.overview,
                    releaseDate: movie.release_date,
                    language: movie.original_language,
                    genres: movie.genre_ids.map(id => genreMap[id] || 'Unknown'),
                    poster: movie.poster_path
                };

                const postResponse = await axios.post('http://localhost:3000/movies', movieData);
                console.log('Movie created:', postResponse.data.message);
            }
        }
    } catch (error) {
        console.error('Error:', error.response?.data || error.message);
    }
}

fetchAndPostMovies();
