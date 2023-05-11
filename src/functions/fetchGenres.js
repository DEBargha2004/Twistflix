import urls from "../assets/url"

function genresUrl(type = 'movies'){
    if(type === 'movies'){
        return urls.genres
    }else if(type === 'series'){
        return urls.seriesGenre
    }
}

async function fetchGenres(setGenresOfType,type = 'movies') {
    let response = await fetch(genresUrl(type))
    response = await response.json()
    setGenresOfType(response.genres)
}

export default fetchGenres;