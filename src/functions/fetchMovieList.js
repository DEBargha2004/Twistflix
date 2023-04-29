import urls from "../assets/url";

async function fetchMovieList(genres,setGenres,setCombined_list) {
    genres.forEach(async (item, index) => {
        let response = await fetch(urls.movieList + `&with_genres=${item.id}`)
        response = await response.json()
        let genreItem = { ...genres[index], movieList: [...response.results] }
        setGenres(prev => {
            prev.splice(index, 1, genreItem);
            return (
                [...prev]
            )
        })
    })
}

export default fetchMovieList;