import { useContext, useEffect, useState } from 'react'
import urls from '../assets/url'
import { useNavigate, useLocation } from 'react-router-dom'

function SeasonCard ({ Item: Season, series_info }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [IsHovering, setIsHovering] = useState(false)
  const [selectedSeries, setSelectedSeries] = useState(false)

  function handleSeasonSelection_Navigate () {
    const seriesInView = location.pathname
    navigate(
      `/tv/${series_info.id}/${Season.id}`
    )
  }
  useEffect(() => {
    const seriesInView = location.pathname.split('/')[3]
    if (Season.id == seriesInView) {
      setSelectedSeries(true)
    } else {
      setSelectedSeries(false)
    }
  }, [Season, location.pathname])
  return (
    <div
      className={`w-[180px] mx-3 p-[15px] rounded-2xl flex flex-col items-center cursor-pointer overflow-hidden shrink-0 relative ${
        selectedSeries
          ? 'border-2 border-red-700'
          : 'border-2 border-[#ffffff1f]'
      }`}
      onClick={() => handleSeasonSelection_Navigate()}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
    >
      <div
        className={`w-[150px] ${
          !Season.poster_path && 'h-[216px]'
        } bg-cover rounded-lg transition-all duration-300 ease-out ${
          IsHovering && 'opacity-50'
        }`}
      >
        <img
          src={`${urls.baseUrl}${Season.poster_path}`}
          className='transition-all duration-500 ease-out rounded-lg'
          alt=''
        />
      </div>
      <div
        className={`absolute transition-all duration-300 h-full w-full flex flex-col items-center justify-center top-0 left-0 ${
          IsHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-[10]'
        }`}
      >
        <p className='text-white text-lg font-bold mt-2 text-center line-clamp-1 tracking-widest'>
          S{Season.season_number}
        </p>
        <p className='text-slate-300 text-center line-clamp-1 font-semibold'>
          {Season.episode_count} episodes
        </p>
      </div>
    </div>
  )
}

export default SeasonCard
