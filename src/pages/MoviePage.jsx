import { useRef } from 'react'
import urls from '../assets/url'
import Row from '../components/Row'
import { useState, useEffect, useContext } from 'react'
import MovieContext from '../hooks/context'
import genre from '../functions/genre'
import NewCircular_svg from '../components/NewCircular_svg'
import { useNavigate, useLocation } from 'react-router-dom'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'
import { callCast_Videos } from '../functions/callCast_Videos'
import _ from 'lodash'
import PageHeader from '../components/PageHeader'

function MoviePage ({ movieItem }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { genre_ids } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [movies_In_Series, setMovies_In_Series] = useState([])
  const [moreInfo, setMoreInfo] = useState({})
  const [scrollReset, setScrollReset] = useState(false)
  const {
    genres,
    setGlobalTrailer,
    combined_list,
    setCombined_list,
    collection,
    setCollection,
    setInView
  } = useContext(MovieContext)
  const [localTrailer, setLocalTrailer] = useState([])
  const [percentage, setPercentage] = useState(
    Math.floor(movieItem.vote_average * 10)
  )
  const MoviePageRef = useRef(null)
  const scroller = { scrollReset, setScrollReset }

  useEffect(() => {
    if (movieItem) {
      console.log('this is movieItem', movieItem)
      callCast_Videos({
        movieItem,
        setCast,
        relatedVideos,
        setRelatedVideos,
        setLocalTrailer,
        setMovies_In_Series,
        addIf_DoesNot_Exist,
        combined_list,
        setCombined_list,
        collection,
        setCollection,
        setSimilarMovies,
        setMoreInfo
      })
      setScrollReset(true)
      setTimeout(() => {
        document.querySelector('html').scrollTo({
          behavior: 'smooth',
          top: 0
        })
      }, 500)
    }
  }, [movieItem])
  useEffect(() => {
    setGenreType([])
    genre(genre_ids, setGenreType, genres)
  }, [])
  useEffect(() => {
    if (location.pathname.includes('/tv')) {
      setInView(1)
    } else {
      setInView(0)
    }
  }, [location.pathname])

  return (
    <>
      <PageHeader 
        main_img={movieItem.poster_path}
        backdrop_img={movieItem.backdrop_path}
        genres={moreInfo.genres}
        localTrailer={localTrailer}
        name={movieItem.title}
        overview={movieItem.overview}
        percentage={percentage}
        release_date={moreInfo.release_date}
        runtime={moreInfo.runtime}
        setGlobalTrailer={setGlobalTrailer}
        tagline={moreInfo.tagline}
      />
      <div>
        <Row
          type='long_vertical'
          List={cast}
          title='Cast'
          include_margin
          {...scrollReset}
        />
        <Row
          type='long_horizontal'
          List={_.uniqBy(movies_In_Series, 'id')}
          title='Movies in series'
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
          content_type='movie'
          List={similarMovies}
          title='Recommendations'
          include_margin
          {...scroller}
        />
      </div>
    </>
  )
}

export default MoviePage
