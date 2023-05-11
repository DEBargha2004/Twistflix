import urls from '../assets/url'

async function fetcher (id, page = 1, type) {
  let response = await fetch(urls.listOfType(type, id, page))
  response = await response.json()
  response = response.results.map(
    (
      {
        id,
        genre_ids,
        original_name,
        name,
        vote_average,
        first_air_date,
        overview,
        backdrop_path,
        poster_path
      },
      index
    ) => {
      return {
        id,
        genre_ids,
        original_name,
        name,
        vote_average,
        first_air_date,
        overview,
        backdrop_path,
        poster_path
      }
    }
  )
  return response
}

async function fetchMovieList (genres, setGenres, type) {
  const page = 1
  genres.forEach(async (item, index) => {
    let response = await fetcher(item.id, page, type)
    let genreItem = {
      ...genres[index],
      movieList: [...response],
      currentPage: 1
    }
    setGenres(prev => {
      prev.splice(index, 1, genreItem)
      return [...prev]
    })
  })
}

export { fetchMovieList, fetcher }
