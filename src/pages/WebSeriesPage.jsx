import urls from '../assets/url'
import Row from '../components/Row'
import { useState, useEffect, useContext, useRef } from 'react'
import MovieContext from '../hooks/context'
import genre from '../functions/genre'
import removeDup from '../functions/removeDup'
import { useNavigate,useLocation } from 'react-router-dom'
import Percent_svg from '../components/Percent_svg'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import seasonContext from '../hooks/seasonContext'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'
import { ifIncludes } from '../functions/ifIncludes'
import { apiKey } from '../assets/apiKey'
import SeasonCard from '../components/SeasonCard'

function WebSeriesPage ({ movieItem, row }) {
  const navigate = useNavigate()
  const location = useLocation()
  const { genre_ids } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [movies_In_Series, setMovies_In_Series] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const [seasons, setSeasons] = useState([])
  const [selectedSeason, setSelectedSeason] = useState({ brief: {} })
  const {
    seriesGenres,
    setGlobalTrailer,
    seriesCombined_list,
    setSeriesCombined_list,
    collection,
    setCollection,
    setIndex
  } = useContext(MovieContext)
  const [localTrailer, setLocalTrailer] = useState([])
  const [percentage, setPercentage] = useState(
    Math.floor(movieItem.vote_average * 10)
  )
  const MoviePageRef = useRef(null)
  const scroller = { scrollReset, setScrollReset }

  async function callSeriesCast_Videos () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}/credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast, ...response.crew])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setSeasons(response.seasons)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${movieItem.id}/videos?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    console.log('videos are ',response);
    setRelatedVideos(response.results)
  }

  useEffect(() => {
    if (movieItem) {
      //   callCast_Videos({
      //     movieItem,
      //     setCast,
      //     relatedVideos,
      //     setRelatedVideos,
      //     setLocalTrailer,
      //     setMovies_In_Series,
      //     addIf_DoesNot_Exist,
      //     combined_list,
      //     setCombined_list,
      //     collection,
      //     setCollection
      //   })
      callSeriesCast_Videos()
      let movieContainer = []
      row.forEach(element => {
        // for adding movies in similar series
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
    genre(genre_ids, setGenreType, seriesGenres)
    location.pathname.includes('/webseries') && setIndex(1)
  }, [])
  return (
    <>
      <seasonContext.Provider value={{ selectedSeason, setSelectedSeason }}>
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
              {movieItem.original_name}
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
              <span className='font-semibold'>
                {movieItem.release_date || movieItem.first_air_date}
              </span>
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
            type='season'
            title='Seasons'
            List={seasons}
            include_margin
            {...scrollReset}
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
            List={similarMovies}
            title='Similar Web Series'
            include_margin
            {...scroller}
          />
        </div>
      </seasonContext.Provider>
    </>
  )
}

export default WebSeriesPage
