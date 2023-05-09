import { useContext, useState } from 'react'
import seasonContext from '../hooks/seasonContext'
import urls from '../assets/url'

function SeasonCard ({ Item: Season }) {
  const { selectedSeason, setSelectedSeason } = useContext(seasonContext)

  function handleSeasonSelection(){
    setSelectedSeason((prev) => {
        return (
            {...prev,brief:{...Season}}
        )
    })
  }
  return (
    <div
      className={`w-[180px] ${
        Season.id === selectedSeason.brief.id
          ? 'border-2 border-red-800'
          : 'border-[1px] border-[#5c5c5c60]'
      } mx-3 p-[15px] rounded-2xl flex flex-col items-center`}
      onClick={()=>handleSeasonSelection()}
    >
      <div
        className={`w-[150px] h-auto rounded-lg overflow-hidden transition-all duration-300 ease-out ${
          Season.id === selectedSeason.brief.id && 'p-3'
        }`}
      >
        <img
          src={`${urls.baseUrl}${Season.poster_path}`}
          className='transition-all duration-500 ease-out hover:scale-105 active:scale-95 rounded-lg'
          alt=''
        />
      </div>
      <p className='text-white text-lg font-bold mt-2'>{Season.name}</p>
    </div>
  )
}

export default SeasonCard
