import { useContext, useState } from 'react'
import seasonContext from '../hooks/seasonContext'
import MovieContext from '../hooks/context'
import urls from '../assets/url'
import { useNavigate } from 'react-router-dom'

function SeasonCard ({ Item: Season,series_info }) {
  const navigate = useNavigate()
  const { selectedSeason, setSelectedSeason } = useContext(seasonContext)
  const { setSeriesCombined_list } = useContext(MovieContext)

  function handleSeasonSelection_Navigate(){
    setSelectedSeason((prev) => {
        return (
            {...prev,brief:{...Season}}
        )
    })
    console.log('season is',Season);
    navigate(`${Season.id}/${Season.name}`)
  }
  return (
    <div
      className={`w-[180px] ${
        Season.id === selectedSeason.brief.id
          ? 'border-2 border-red-800'
          : 'border-[1px] border-[#5c5c5c60]'
      } mx-3 p-[15px] rounded-2xl flex flex-col items-center cursor-pointer`}
      onClick={()=>handleSeasonSelection_Navigate()}
    >
      <div
        className={`w-[150px] h-[216px] bg-cover rounded-lg overflow-hidden transition-all duration-300 ease-out ${
          Season.id === selectedSeason.brief.id && 'p-3'
        }`}
      >
        <img
          src={`${urls.baseUrl}${Season.poster_path}`}
          className='transition-all duration-500 ease-out rounded-lg'
          alt=''
        />
      </div>
      <p className='text-white text-lg font-bold mt-2 text-center line-clamp-1'>{Season.name}</p>
      <p className='text-slate-400 text-center line-clamp-1'>{Season.episode_count} episodes</p>
    </div>
  )
}

export default SeasonCard
