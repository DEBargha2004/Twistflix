import { useEffect, useState } from "react"
import MovieContext from '../src/hooks/context'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import fetchGenres from "./functions/fetchGenres"
import fetchMovieList from "./functions/fetchMovieList"
import MoviePage from '../src/components/MoviePage'
import combine from "./functions/combine"

function App() {
  let [genres, setGenres] = useState([])
  const [combined_list, setCombined_list] = useState([])

  useEffect(() => {
    fetchGenres(setGenres)
    if (genres.length) {
      console.log('fetching started');
      console.log(genres);
      fetchMovieList(genres, setGenres, setCombined_list)
    }
  }, [genres.length])

  function movieListChecker(arr) {
    console.log('called movieList');
    let bool = false
    for (let i = 0; i < arr.length; i++) {
      console.log(i);
      if (!arr[i].movieList) {
        return false
      } else {
        bool = true
      }
    }
    console.log('bool', bool);
    return bool
  }

  useEffect(() => {
    if (genres.length) {
      if (movieListChecker(genres)) {
        console.log('checked all set');
        setCombined_list([...combine(genres)])
      }
    }
  }, [genres])

  if (combined_list.length) {
    console.log('item added');
  }

  return (
    <MovieContext.Provider value={{ genres, combined_list }}>
      <Routes>
        <Route path="/" element={<Home />} />
        {
          combined_list.map((item, index) => {
            console.log('item routed')
            return (
              <Route key={index} path={`/${item.id}/${item.original_title}`} element={<MoviePage movieItem={item} row={combined_list} />} />
            )
          }
          )
        }
      </Routes>
    </MovieContext.Provider>
  )
}

export default App
