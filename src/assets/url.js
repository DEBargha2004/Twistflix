import { apiKey } from './apiKey'

const urls = {
    genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${apiKey}&language=en-US`,
    movieList: `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&language=en-US`,
    baseUrl: 'https://image.tmdb.org/t/p/original',
    youtubeBaseUrl: `https://www.youtube.com/watch?v=`,
    appLogo : 'https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png',
    searchIcon : 'https://cdn-icons-png.flaticon.com/512/954/954591.png'
}

export default urls;