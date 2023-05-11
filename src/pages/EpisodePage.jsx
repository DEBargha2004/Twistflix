import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieContext from '../hooks/context'
import urls from '../assets/url'
import Percent_svg from '../components/Percent_svg'
import Row from '../components/Row'
import { similar } from '../functions/similar'
import genre from '../functions/genre'
import { apiKey } from '../assets/apiKey'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'

function EpisodePage ({ season, series, episode, seriesGenres }) {
  const navigate = useNavigate()
  const { setSeriesCombined_list, seriesCombined_list, setGlobalTrailer } =
    useContext(MovieContext)
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [similarSeries, setSimilarSeries] = useState([])
  const [genreType, setGenreType] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const [localTrailer, setLocalTrailer] = useState(null)
  const scroller = { scrollReset, setScrollReset }

  async function callCast_Videos () {
    console.log(series, season, episode)
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${season.season_number}/episode/${episode.episode_number}/credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    console.log(response)
    setCast([...response.cast, ...response.crew, ...response.guest_stars])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${season.season_number}/episode/${episode.episode_count}/videos?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setRelatedVideos(response.results)
    response = response.results.find(item => item.type === 'Trailer')
    setLocalTrailer(response)
  }

  useEffect(() => {
    callCast_Videos()
    setSimilarSeries(similar(series, seriesCombined_list))
    document.querySelector('html').scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [season, episode])

  useEffect(() => {
    setScrollReset(true)
    setCast([...episode.crew, ...episode.guest_stars])
  }, [episode])
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
              src={`${urls.baseUrl}${episode?.still_path}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-2'>{series.name}</p>
          <p className='text-3xl font-bold text-slate-400 mb-2'>
            {season?.name}
          </p>
          <p className='text-slate-400 font-semibold text-xl'>{episode.name}</p>
          <p className='text-slate-400 font-semibold text-lg'>
            {episode.episode_number} / {season.episode_count}
          </p>
          <p className='text-white w-[80%]'>{season?.overview}</p>
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
            <span className='font-semibold'>{season?.air_date}</span>
          </p>
          <Percent_svg percentage={Math.round(episode.vote_average * 10)} />
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
export default EpisodePage
