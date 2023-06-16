import { useEffect, useState, useContext } from 'react'
import MovieContext from '../hooks/context'
import Row from '../components/Row'
// import { apiKey } from '../assets/import.meta.env.VITE_apiKey'
import urls from '../assets/url'
import Percent_svg from '../components/Percent_svg'
import { useNavigate } from 'react-router-dom'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import genre from '../functions/genre'
import _ from 'lodash'
import { similar } from '../functions/similar'
import PageHeader from '../components/PageHeader'

function SeasonPage ({ season, series, seriesGenres }) {
  const navigate = useNavigate()
  const { setSeriesCombined_list, seriesCombined_list, setGlobalTrailer } =
    useContext(MovieContext)
  const [seasonInfo, setSeasonInfo] = useState({})
  const [cast, setCast] = useState([])
  const [localTrailer, setLocalTrailer] = useState(null)
  const [relatedVideos, setRelatedVideos] = useState([])
  const [similarSeries, setSimilarSeries] = useState([])
  const [genreType, setGenreType] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const scroller = { scrollReset, setScrollReset }
  async function callEpisode_Info () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${
        season.season_number
      }?api_key=${import.meta.env.VITE_apiKey}&language=en-US`
    )
    response = await response.json()
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
      `https://api.themoviedb.org/3/tv/${series.id}/season/${
        season.season_number
      }/credits?api_key=${import.meta.env.VITE_apiKey}&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast, ...response.crew])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${
        season.season_number
      }/videos?api_key=${import.meta.env.VITE_apiKey}&language=en-US`
    )
    response = await response.json()
    setRelatedVideos(response.results)
    response = response.results.find(item => item.type === 'Trailer')
    setLocalTrailer(response)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/recommendations?api_key=${
        import.meta.env.VITE_apiKey
      }&language=en-US&page=1`
    )
    response = await response.json()
    setSimilarSeries(response.results)
  }

  useEffect(() => {
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

  return (
    <>
      <PageHeader
        backdrop_img={series.backdrop_path}
        main_img={season.poster_path}
        genres={series.genres}
        localTrailer={localTrailer}
        name={series.name}
        overview={seasonInfo.overview}
        percentage={Math.floor(series.vote_average * 10)}
        release_date={season.air_date}
        runtime={series.episode_run_time}
        setGlobalTrailer={setGlobalTrailer}
        tagline={series.tagline}
        episode_count={season.episode_count}
        season_name={season.name}
      />
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
          title='Seasons'
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
          title='Recommendations'
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
