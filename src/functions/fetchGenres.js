import urls from "../assets/url"

async function fetchGenres(setGenres) {
    let response = await fetch(urls.genres)
    response = await response.json()
    setGenres(response.genres)
}

export default fetchGenres;