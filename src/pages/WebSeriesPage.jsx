import urls from '../assets/url'
import Time from '../components/Time'
import { useState, useEffect, useContext } from 'react'
import MovieContext from '../hooks/context'
import genre from '../functions/genre'
import { useNavigate, useLocation } from 'react-router-dom'
import seasonContext from '../hooks/seasonContext'
// import { apiKey } from '../assets/import.meta.env.VITE_apiKey'
import Row from '../components/Row'
import _ from 'lodash'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import NewCircular_svg from '../components/NewCircular_svg'
import play from '../assets/play.png'
import PageHeader from '../components/PageHeader'

function WebSeriesPage ({ movieItem, row }) {
  const navigate = useNavigate()
  const location = useLocation()
  const {
    seriesGenres,
    setGlobalTrailer,
    seriesCombined_list,
    setSeriesCombined_list,
    setInView
  } = useContext(MovieContext)
  const { genre_ids, genres } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const [seriesInfo, setSeriesInfo] = useState({})
  const [selectedSeason, setSelectedSeason] = useState({ brief: {} })
  const [localTrailer, setLocalTrailer] = useState(null)
  const [percentage] = useState(Math.floor(movieItem.vote_average * 10))
  const scroller = { scrollReset, setScrollReset }
  async function callSeriesCast_Videos () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}/credits?api_key=${
        import.meta.env.VITE_apiKey
      }&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast, ...response.crew])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}?api_key=${
        import.meta.env.VITE_apiKey
      }&language=en-US`
    )
    response = await response.json()
    setSeriesInfo(response)
    setSeriesCombined_list(prev => {
      let seriesIndex = _.findIndex(prev, { id: response.id })
      prev[seriesIndex] = { ...response }
      return [...prev]
    })
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}/videos?api_key=${
        import.meta.env.VITE_apiKey
      }&language=en-US`
    )
    response = await response.json()
    setRelatedVideos(response.results)
    response = response.results.find(item => item.type === 'Trailer')
    setLocalTrailer(response)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${
        movieItem.id
      }/recommendations?api_key=${
        import.meta.env.VITE_apiKey
      }&language=en-US&page=1`
    )
    response = await response.json()
    setSeriesCombined_list(prev => {
      return _.uniqBy([...prev, ...response.results], 'id')
    })
    setSimilarMovies(response.results)
  }

  useEffect(() => {
    if (movieItem && !seriesInfo.seasons) {
      callSeriesCast_Videos()
      setScrollReset(true)
      setTimeout(() => {
        document.querySelector('html').scrollTo({
          behavior: 'smooth',
          top: 0
        })
      }, 500)
    }
  }, [])
  useEffect(() => {
    setGenreType([])
    genre(genre_ids || genres, setGenreType, seriesGenres)
    location.pathname.includes('/tv') && setInView(1)
  }, [])

  return (
    <>
      <seasonContext.Provider value={{ selectedSeason, setSelectedSeason }}>
        <PageHeader
          backdrop_img={movieItem.backdrop_path}
          main_img={movieItem.poster_path}
          genres={seriesInfo.genres}
          name={movieItem.name}
          overview={seriesInfo.overview}
          percentage={percentage}
          release_date={seriesInfo.first_air_date}
          runtime={seriesInfo.episode_run_time}
          tagline={seriesInfo.tagline}
          localTrailer={localTrailer}
          setGlobalTrailer={setGlobalTrailer}
        />
        <div>
          <Row
            type='season'
            title='Seasons'
            List={seriesInfo.seasons}
            series_info={seriesInfo}
            include_margin
            {...scroller}
          />
          <Row
            type='long_vertical'
            List={cast}
            title='Cast'
            include_margin
            {...scroller}
          />
          <Row
            type='scaled_both'
            List={relatedVideos}
            title='Related Videos'
            include_margin
            {...scroller}
          />
          <Row
            type='long_horizontal'
            content_type='series'
            List={similarMovies}
            title='Recommendations'
            include_margin
            {...scroller}
          />
        </div>
      </seasonContext.Provider>
    </>
  )
}

export default WebSeriesPage
