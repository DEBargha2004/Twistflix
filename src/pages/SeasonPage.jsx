import { useEffect, useState } from 'react'
import Row from '../components/Row'
import { apiKey } from '../assets/apiKey'
import urls from '../assets/url'
import Percent_svg from '../components/Percent_svg'
import { useNavigate } from 'react-router-dom'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'

function SeasonPage ({ season: { id, season_number,poster_path,overview,name }, genreType, percentage }) {
  const navigate = useNavigate()
  const [seasonInfo, setSeasonInfo] = useState({})
  const [cast,setCast] = useState([])
  async function callEpisode_Info () {
    let response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setSeasonInfo(response)
    response = await fetch(
      `https://api.themoviedb.org/3/tv/${id}/season/${season_number}/credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setCast([...response.cast,...response.crew])
  }

  useEffect(() => {
    console.log('season page rendered');
  }, [])

  useEffect(() => {
    const page = document.querySelector('html')
    page.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [])
  return (
    <>
      <div className='flex justify-around m-10 mt-[100px] text-white'>
      hello
        {/* <div className='flex-1 flex justify-center'>
          <div className='w-[400px] overflow-hidden rounded-lg'>
            <img
              src={`${urls.baseUrl}${poster_path}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-10'>
            {name}
          </p>
          <p className='text-white w-[80%]'>{overview}</p>
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
        </div> */}
      </div>
      <div>
        {/* <Row
          type='long_vertical'
          List={cast}
          title='Cast'
          include_margin
          {...scroller}
        />
        <Row
          type='season'
          title='Seasons'
          List={seriesInfo.seasons}
          series_info={{
            id: seriesInfo.id,
            name: seriesInfo.original_name
          }}
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
          title='Similar Web Series'
          include_margin
          {...scroller}
        /> */}
      </div>
    </>
  )
}
export default SeasonPage
