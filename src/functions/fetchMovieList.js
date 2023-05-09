import urls from '../assets/url'

async function fetcher (id, page = 1,type) {
  console.log(page)
  let response = await fetch(urls.listOfType(type,id,page))
  response = await response.json()
  return response.results
}

async function fetchMovieList (genres, setGenres,type) {
  const page = 1
  genres.forEach(async (item, index) => {
    let response = await fetcher(item.id,page,type)
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
