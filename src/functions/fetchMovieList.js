import urls from '../assets/url'

async function fetcher (id, page = 1) {
  console.log(page)
  let response = await fetch(urls.movieList + `&with_genres=${id}&page=${page}`)
  response = await response.json()
  return response.results
}

async function fetchMovieList (genres, setGenres, setCombined_list) {
  genres.forEach(async (item, index) => {
    let response = await fetcher(item.id)
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
