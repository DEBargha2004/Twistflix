import { useEffect, useState, useContext } from 'react'
import MovieContext from '../hooks/context'
import Row from '../components/Row'
import { apiKey } from '../assets/apiKey'
import urls from '../assets/url'
import Percent_svg from '../components/Percent_svg'
import { useNavigate } from 'react-router-dom'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import genre from '../functions/genre'
import _ from 'lodash'
import { similar } from '../functions/similar'

function SeasonPage ({ season, series, seriesGenres }) {
  const navigate = useNavigate()
  const { setSeriesCombined_list, seriesCombined_list, setGlobalTrailer } =
    useContext(MovieContext)
  const [seasonInfo, setSeasonInfo] = useState(null)
  const [cast, setCast] = useState([])
  const [localTrailer, setLocalTrailer] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [similarSeries, setSimilarSeries] = useState([])
  const [genreType, setGenreType] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const scroller = { scrollReset, setScrollReset }
  async function callEpisode_Info () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${season.season_number}?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    console.log(response)
    setSeriesCombined_list(prev => {
      let seriesIndex = _.findIndex(seriesCombined_list, { id: series.id })
      let seasonIndex = _.findIndex(seriesCombined_list[seriesIndex].seasons, {
        id: season.id
      })
      prev[seriesIndex].seasons[seasonIndex].episodes = response.episodes
      return [...prev]
    })
    setSeasonInfo(response)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${season.season_number}/credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast, ...response.crew])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${season.season_number}/videos?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setRelatedVideos(response.results)
    response = response.results.find(item => item.type === 'Trailer')
    setLocalTrailer(response)
  }

  useEffect(() => {
    console.log('season page rendered')
    callEpisode_Info()
    setSimilarSeries(similar(series, seriesCombined_list))
    document.querySelector('html').scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [season])

  useEffect(() => {
    setScrollReset(true)
  }, [season])
  useEffect(() => {
    if (!genreType.length) {
      genre(series.genre_ids, setGenreType, seriesGenres)
    }
  }, [seriesGenres, series])

  return (
    <>
      <div className='flex justify-around m-10 mt-[100px]'>
        <div className='flex-1 flex justify-center'>
          <div className='w-[400px] h-fit overflow-hidden rounded-lg'>
            <img
              src={`${urls.baseUrl}${seasonInfo?.poster_path}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-2'>{series.name}</p>
          <p className='text-xl font-bold text-slate-400 mb-2'>
            {seasonInfo?.name}
          </p>
          <p className='text-slate-400 font-semibold mb-10'>
            {season.episode_count} episodes
          </p>
          <p className='text-white w-[80%]'>{seasonInfo?.overview}</p>
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
            <span className='font-semibold'>{seasonInfo?.air_date}</span>
          </p>
          <Percent_svg percentage={Math.round(series.vote_average * 10)} />
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
          type='episode'
          title='Episodes'
          List={season.episodes}
          series_info={series}
          season_info={season}
          include_margin
          {...scroller}
        />
        <Row
          type='season'
          title='Season'
          List={series.seasons}
          series_info={series}
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
          title='related videos'
          List={relatedVideos}
          include_margin
          {...scroller}
        />
        <Row
          type='long_horizontal'
          title='Similar web series'
          content_type='series'
          List={similarSeries}
          include_margin
          {...scroller}
        />
      </div>
    </>
  )
}
export default SeasonPage
