// import { apiKey } from './apiKey'

const urls = {
  genres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US`,
  seriesGenre: `https://api.themoviedb.org/3/genre/tv/list?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US`,
  listOfType: (type, id, page) => {
    if (type === 'movies') {
      return `https://api.themoviedb.org/3/discover/movie?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US&with_genres=${id}&page=${page}`
    } else if (type === 'series') {
      return `https://api.themoviedb.org/3/discover/tv?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US&with_genres=${id}&page=${page}`
    }
  },
  baseUrl: 'https://image.tmdb.org/t/p/original',
  youtubeBaseUrl: `https://www.youtube.com/watch?v=`,
  appLogo:
    'https://www.edigitalagency.com.au/wp-content/uploads/netflix-logo-png-large.png',
  searchIcon: 'https://cdn-icons-png.flaticon.com/512/954/954591.png',
  videosUrl: (type = 'movie', id) => {
    if (type === 'movie') {
      return `https://api.themoviedb.org/3/movie/${id}/videos?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US`
    } else if (type === 'series') {
      return `https://api.themoviedb.org/3/tv/${id}/videos?api_key=${process.env.NODE_ENV.apiKey || apiKey}&language=en-US`
    }
  },
  queryUrl: (type, query) => {
    return `https://api.themoviedb.org/3/search/${type}?api_key=${process.env.NODE_ENV.apiKey || apiKey}&query=${query}*&page=1`
  }
}

export default urls
