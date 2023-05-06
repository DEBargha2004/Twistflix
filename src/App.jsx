import { useEffect, useState } from "react"
import MovieContext from '../src/hooks/context'
import { Routes, Route, useLocation } from 'react-router-dom'
import Home from "./pages/Home"
import fetchGenres from "./functions/fetchGenres"
import fetchMovieList from "./functions/fetchMovieList"
import MoviePage from './pages/MoviePage'
import combine from "./functions/combine"
import CastPage from "./pages/CastPage"
import Player from "./components/Player"
import Footer from "./components/Footer"
import { uniqueRandomNum } from './functions/uniqueRandomNum'
import { apiKey } from "./assets/apiKey"
import Navbar from "./components/Navbar"

function App() {
  const location = useLocation()
  let [genres, setGenres] = useState([])
  const [combined_list, setCombined_list] = useState([])
  const [routes, setRoutes] = useState([])
  const [globalTrailer, setGlobalTrailer] = useState([])
  const [randomArray, setRandomArray] = useState([])
  const [hero, setHero] = useState([])
  const [trailer, setTrailer] = useState([])
  const [collection, setCollection] = useState({})

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


  function callVideos_Set() {
    setHero([])
    setTrailer([])
    randomArray.map(async (number, index) => {
      console.log(number);
      let selectedItem = combined_list[number]
      setHero(prev => [...prev, selectedItem])
      console.log('this is the selected item ', selectedItem);
      let response = await fetch(`https://api.themoviedb.org/3/movie/${selectedItem.id}/videos?api_key=${apiKey}&language=en-US}`)
      response = await response.json()
      const Trailer = response.results.find(item => item.type === 'Trailer')
      setTrailer(prev => [...prev, Trailer])
    })
  }

  useEffect(() => {
    if (genres.length) {
      if (movieListChecker(genres)) {
        if (location.pathname === '/') {
          setCombined_list([...combine(genres)])
        }
      }
    }
  }, [genres])

  useEffect(() => {
    setRandomArray(uniqueRandomNum(7, 380))
    const movies = JSON.parse(localStorage.getItem('saved_movies'))
    if (movies) {
      setCombined_list(movies)
    }
  }, [])

  useEffect(() => {
    if (combined_list.length) {
      console.log('routing started, this is the combined list', combined_list);
      setRoutes([...combined_list])
      localStorage.setItem('saved_movies', JSON.stringify(combined_list))
    }
  }, [combined_list])

  useEffect(() => {
    if (randomArray.length && combined_list.length >= 380) {
      callVideos_Set()
    }
  }, [randomArray, combined_list])


  return (
    <MovieContext.Provider value={{ genres, combined_list, setRoutes, setCombined_list, setGlobalTrailer, hero, trailer, collection, setCollection }}>
      <Navbar />
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
      <Footer />
    </MovieContext.Provider>
  )
}

export default App
