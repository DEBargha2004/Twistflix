import { useEffect, useState } from "react"
import MovieContext from '../src/hooks/context'
import { Routes, Route } from 'react-router-dom'
import Home from "./pages/Home"
import fetchGenres from "./functions/fetchGenres"
import fetchMovieList from "./functions/fetchMovieList"
import MoviePage from '../src/components/MoviePage'
import combine from "./functions/combine"
import CastPage from "./components/CastPage"
import Player from "./components/Player"

function App() {
  let [genres, setGenres] = useState([])
  const [combined_list, setCombined_list] = useState([])
  const [routes, setRoutes] = useState([])
  const [globalTrailer,setGlobalTrailer] = useState([])

  useEffect(() => {
    fetchGenres(setGenres)
    if (genres.length) {
      fetchMovieList(genres, setGenres, setCombined_list)
    }
  }, [genres.length])

  function movieListChecker(arr) {
    let bool = false
    for (let i = 0; i < arr.length; i++) {
      if (!arr[i].movieList) {
        return false
      } else {
        bool = true
      }
    }
    return bool
  }

  useEffect(() => {
    if (genres.length) {
      if (movieListChecker(genres)) {
        setCombined_list([...combine(genres)])
      }
    }
  }, [genres])

  useEffect(() => {
    setRoutes([...combined_list])
  }, [combined_list])
  return (
    <MovieContext.Provider value={{ genres, combined_list,setRoutes,setCombined_list,setGlobalTrailer }}>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/player" element={<Player Item={globalTrailer} />} />
        {
          routes.map((item, index) => {
            return (
              <Route key={index} path={item.card_type ? `/${item.id}/${item.original_name}` : `/${item.id}/${item.original_title}`} element={item.card_type ? <CastPage key={index} Cast={item} /> : <MoviePage key={index} movieItem={item} row={combined_list} />} />
            )
          }
          )
        }
      </Routes>
    </MovieContext.Provider>
  )
}

export default App
