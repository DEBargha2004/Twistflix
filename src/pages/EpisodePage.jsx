import { useContext, useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import MovieContext from '../hooks/context'
import urls from '../assets/url'
import Percent_svg from '../components/Percent_svg'
import Row from '../components/Row'
import { similar } from '../functions/similar'
// import { apiKey } from '../assets/apiKey'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import PageHeader from '../components/PageHeader'

function EpisodePage ({ season, series, episode, seriesGenres }) {
  const navigate = useNavigate()
  const { setSeriesCombined_list, seriesCombined_list, setGlobalTrailer } =
    useContext(MovieContext)
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [recommendations, setRecommendations] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const [localTrailer, setLocalTrailer] = useState(null)
  const scroller = { scrollReset, setScrollReset }

  async function callCast_Videos () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${
        season.season_number
      }/episode/${episode.episode_number}/credits?api_key=${
        process.env.NODE_ENV.apiKey || apiKey
      }&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast, ...response.crew, ...response.guest_stars])
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/season/${
        season.season_number
      }/episode/${episode.episode_number}/videos?api_key=${
        process.env.NODE_ENV.apiKey || apiKey
      }&language=en-US`
    )
    response = await response.json()
    setRelatedVideos(response.results)
    response = response.results.find(item => item.type === 'Trailer')
    setLocalTrailer(response)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${series.id}/recommendations?api_key=${
        process.env.NODE_ENV.apiKey || apiKey
      }&language=en-US`
    )
    response = await response.json()
    setRecommendations(response.results)
  }

  useEffect(() => {
    callCast_Videos()
    document.querySelector('html').scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [season, episode])

  useEffect(() => {
    setScrollReset(true)
    setCast([...episode.crew, ...episode.guest_stars])
  }, [episode])

  return (
    <>
      <PageHeader
        backdrop_img={series.backdrop_path}
        main_img={episode.still_path}
        episode_count={season.episode_count}
        genres={series.genres}
        localTrailer={localTrailer}
        name={series.name}
        overview={episode.overview}
        percentage={Math.floor(episode.vote_average * 10)}
        release_date={episode.air_date}
        runtime={episode.runtime}
        season_name={season.name}
        setGlobalTrailer={setGlobalTrailer}
        tagline={series.tagline}
        episode_number={episode.episode_number}
        episode_name={episode.name}
        episode
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
          List={recommendations}
          include_margin
          {...scroller}
        />
      </div>
    </>
  )
}
export default EpisodePage
