import { useEffect, useState } from 'react'
import MovieContext from '../src/hooks/context'
import { Routes, Route, useLocation } from 'react-router-dom'
import Movies from './pages/Movies'
import fetchGenres from './functions/fetchGenres'
import { fetchMovieList } from './functions/fetchMovieList'
import MoviePage from './pages/MoviePage'
import combine from './functions/combine'
import CastPage from './pages/CastPage'
import Player from './components/Player'
import Footer from './components/Footer'
import { uniqueRandomNum } from './functions/uniqueRandomNum'
import Navbar from './components/Navbar'
import Webseries from './pages/Webseries'
import urls from './assets/url'
import WebSeriesPage from './pages/WebSeriesPage'

function App () {
  const location = useLocation()
  let [genres, setGenres] = useState([])
  const [seriesGenres, setSeriesGenres] = useState([])
  const [seriesCombined_list, setSeriesCombined_list] = useState([])
  const [seriesRandomArray, setSeriesRandomArray] = useState([])
  const [seriesHero, setSeriesHero] = useState([])
  const [seriesRoutes, setSeriesRoutes] = useState([])
  const [seriesTrailer, setSeriesTrailer] = useState([])
  const [combined_list, setCombined_list] = useState([])
  const [routes, setRoutes] = useState([])
  const [globalTrailer, setGlobalTrailer] = useState([])
  const [randomArray, setRandomArray] = useState([])
  const [hero, setHero] = useState([])
  const [trailer, setTrailer] = useState([])
  const [collection, setCollection] = useState({})
  const [Index, setIndex] = useState(0)
  const [seriesIndex, setSeriesIndex] = useState(0)
  const [inView, setInView] = useState(null)

  function movieListChecker (arr) {
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

  function callVideos_Set () {
    setHero([])
    setTrailer([])
    randomArray.map(async (number, index) => {
      let selectedItem = combined_list[number]
      setHero(prev => [...prev, selectedItem])
      let response = await fetch(urls.videosUrl('movie', selectedItem.id))
      response = await response.json()
      const Trailer = response.results.find(item => item.type === 'Trailer')
      setTrailer(prev => [...prev, Trailer])
    })
  }

  function callSeriesVideos_Set () {
    setSeriesHero([])
    setSeriesTrailer([])
    seriesRandomArray.map(async (number, index) => {
      let selectedItem = seriesCombined_list[number]
      setSeriesHero(prev => [...prev, selectedItem])
      let response = await fetch(urls.videosUrl('series', selectedItem.id))
      response = await response.json()
      const Trailer = response.results.find(item => item.type === 'Trailer')
      setSeriesTrailer(prev => [...prev, Trailer])
    })
  }
  // movies related start

  useEffect(() => {
    if (!genres.length) {
      fetchGenres(setGenres, 'movies')
    }
    if (genres.length) {
      fetchMovieList(genres, setGenres, 'movies')
    }
  }, [genres.length])

  useEffect(() => {
    if (genres.length) {
      if (movieListChecker(genres)) {
        if (location.pathname === '/') {
          setCombined_list([...combine(genres)]) // when in homepage and refreshed not
          console.log('movies added') // interrupted by the below one because genre
        } // id changing multiple times
      }
    }
  }, [genres])

  useEffect(() => {
    setRandomArray(uniqueRandomNum(7, 380))
    const movies = JSON.parse(localStorage.getItem('saved_movies')) // this is helpful when in page like
    if (movies) {
      // inside a cast profile or a moviepage
      setCombined_list(movies) // which is not provided initially
    }
    console.log(location.pathname);
    location.pathname.includes('/webseries') ? setInView(1) : setInView(0)
  }, [])

  useEffect(() => {
    if (combined_list.length) {
      // caching and setting routes
      setRoutes([...combined_list])
      localStorage.setItem('saved_movies', JSON.stringify(combined_list))
    }
  }, [combined_list])

  useEffect(() => {
    if (randomArray.length && combined_list.length >= 380) {
      callVideos_Set()
    }
  }, [randomArray, combined_list])

  // movies related end

  //series related start

  useEffect(() => {
    if (!seriesGenres.length) {
      fetchGenres(setSeriesGenres, 'series')
    }
    if (seriesGenres.length) {
      fetchMovieList(seriesGenres, setSeriesGenres, 'series')
    }
  }, [seriesGenres.length])

  useEffect(() => {
    if (seriesGenres.length) {
      if (movieListChecker(seriesGenres)) {
        if (location.pathname === '/webseries') {
          setSeriesCombined_list([...combine(seriesGenres)])
        }
      }
    }
  }, [seriesGenres])

  useEffect(() => {
    setSeriesRandomArray(uniqueRandomNum(7, 320))
    const series = JSON.parse(localStorage.getItem('saved_series'))
    if (series) {
      setSeriesCombined_list(series)
    }
  }, [])

  useEffect(() => {
    if (seriesCombined_list.length) {
      // caching and setting routes
      setSeriesRoutes([...seriesCombined_list])
      localStorage.setItem('saved_series', JSON.stringify(seriesCombined_list))
    }
  }, [seriesCombined_list])

  useEffect(() => {
    if (seriesRandomArray.length && seriesCombined_list.length >= 320) {
      callSeriesVideos_Set()
    }
  }, [seriesRandomArray, seriesCombined_list])

  // series related end

  return (
    <MovieContext.Provider
      value={{
        genres,
        setGenres,
        combined_list,
        setRoutes,
        setCombined_list,
        setGlobalTrailer,
        hero,
        trailer,
        collection,
        setCollection,
        Index,
        setIndex,
        inView,
        setInView,
        seriesGenres,
        seriesCombined_list,
        setSeriesCombined_list,
        seriesRandomArray,
        seriesIndex,
        setSeriesIndex,
        seriesHero,
        seriesTrailer
      }}
    >
      {location.pathname !== '/player' && <Navbar />}
      <Routes>
        <Route path='/' element={<Movies />} />
        <Route path='/webseries' element={<Webseries />} />
        <Route path='/player' element={<Player Item={globalTrailer} />} />
        {routes.map((item, index) => {
          return (
            <Route
              key={index}
              path={
                item.card_type
                  ? `/${item.id}/${item.original_name}`
                  : `/${item.id}/${item.original_title}`
              }
              element={
                item.card_type ? (
                  <CastPage key={index} Cast={item} />
                ) : (
                  <MoviePage key={index} movieItem={item} row={combined_list} />
                )
              }
            />
          )
        })}
        {seriesRoutes.map((item, index) => {
          return (
            <Route
              key={index}
              path={`/webseries/${item.id}/${item.original_name}`}
              element={
                item.card_type ? (
                  <CastPage key={index} Cast={item} />
                ) : (
                  <WebSeriesPage key={index} movieItem={item} row={seriesCombined_list} />
                )
              }
            />
          )
        })}
      </Routes>
      {location.pathname !== '/player' && <Footer />}
    </MovieContext.Provider>
  )
}

export default App
