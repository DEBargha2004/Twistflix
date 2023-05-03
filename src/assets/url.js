export const apikey =  'cbcd1ac0703914747341f9a905931ef9'

const urls = {
    genres : `https://api.themoviedb.org/3/genre/movie/list?api_key=${apikey}&language=en-US`,
    movieList : `https://api.themoviedb.org/3/discover/movie?api_key=${apikey}&language=en-US&page=1`,
    baseUrl : 'https://image.tmdb.org/t/p/original',
    youtubeBaseUrl : `https://www.youtube.com/watch?v=`
}

export default urls;