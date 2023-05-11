import { useRef } from 'react'
import urls from '../assets/url'
import Row from '../components/Row'
import { useState, useEffect, useContext } from 'react'
import MovieContext from '../hooks/context'
import genre from '../functions/genre'
import removeDup from '../functions/removeDup'
import { useNavigate,useLocation } from 'react-router-dom'
import Percent_svg from '../components/Percent_svg'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'
import { callCast_Videos } from '../functions/callCast_Videos'
import { ifIncludes } from '../functions/ifIncludes'
import _ from 'lodash'

function MoviePage ({ movieItem, row }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { genre_ids } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [movies_In_Series, setMovies_In_Series] = useState([])
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
        setCollection
      })
      let movieContainer = []
      row.forEach(element => {
        if (!element.card_type) {
          if (ifIncludes(genre_ids, element)) {
            movieContainer.push(element)
          }
        }
      })
      setSimilarMovies(removeDup(movieContainer, movieItem))
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
  useEffect(()=>{
    if(location.pathname.includes('/tv')){
      setInView(1)
    }else{
      setInView(0)
    }
  },[location.pathname])

  return (
    <>
      <div className='flex justify-around m-10 mt-[100px]' ref={MoviePageRef}>
        <div className='flex-1 flex justify-center'>
          <div className='w-[400px] overflow-hidden rounded-lg'>
            <img
              src={`${urls.baseUrl}${movieItem.poster_path}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-10'>
            {movieItem.original_title}
          </p>
          <p className='text-white w-[80%]'>{movieItem.overview}</p>
          <p className='mt-10'>
            {genreType.map((item, index) => (
              <span
                key={index}
                className='text-white mr-2 text-lg font-semibold'
              >
                {item}
              </span>
            ))}
          </p>
          <p className='mt-5 text-white text-lg'>
            {`Release Date - `}
            <span className='font-semibold'>{movieItem.release_date}</span>
          </p>
          <Percent_svg percentage={percentage} />
          <button
            className='bg-white mr-2 mt-12 text-lg uppercase px-5 py-2 font-semibold rounded-md transition-all hover:bg-[#ffffffaf]'
            onClick={() =>
              handleGlobalPlayer({ setGlobalTrailer, navigate, localTrailer })
            }
          >
            Play
          </button>
        </div>
      </div>
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
          List={_.uniqBy(movies_In_Series,'id')}
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
          title='Similar Movies'
          include_margin
          {...scroller}
        />
      </div>
    </>
  )
}

export default MoviePage
