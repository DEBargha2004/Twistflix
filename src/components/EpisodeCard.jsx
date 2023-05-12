import { useContext, useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'
import urls from '../assets/url'

function EpisodeCard ({ Item: Episode, series_info, season_info }) {
  const navigate = useNavigate()
  const location = useLocation()
  const [IsHovering, setIsHovering] = useState(false)
  const [IsSelected, setIsSelected] = useState(false)
  function handleNavigate () {
    navigate(
      `/tv/${series_info.id}/${season_info.id}/${Episode.id}`
    )
  }
  useEffect(() => {
    const episodeIdInUrl = location.pathname.split('/')[4]
    if (Episode.id == episodeIdInUrl) {
      setIsSelected(true)
    } else {
      setIsSelected(false)
    }
    document.querySelector('html').scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  }, [location.pathname])
  return (
    <div
      className={`w-[250px] mx-3 py-2 rounded-2xl flex flex-col items-center cursor-pointer relative shadow-lg shadow-[#ffffff1c] overflow-hidden shrink-0 ${
        IsSelected && 'border-2 border-red-700'
      }`}
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      onClick={() => handleNavigate()}
    >
      <div
        className={`w-[230px] ${
          Episode.still_path ? 'h-auto' : 'h-[129.375px]'
        } border-[1px] border-[#ffffff56] bg-cover rounded-lg overflow-hidden transition-all duration-300 ease-out`}
      >
        <img
          src={`${urls.baseUrl}${Episode.still_path}`}
          className={`transition-all duration-500 ease-out ${
            IsHovering && 'opacity-50'
          }`}
          alt=''
        />
      </div>
      <div
        className={`absolute transition-all duration-300 ease-in-out h-full w-full top-0 left-0 flex flex-col items-center justify-center ${
          IsHovering ? 'opacity-100 scale-100' : 'opacity-0 scale-[10]'
        }`}
      >
        <p className='text-white text-lg font-bold mt-2 text-center w-[80%] truncate'>
          {Episode.name}
        </p>
        <p className='text-slate-300 text-center line-clamp-1 font-semibold'>
          E{Episode.episode_number}
        </p>
      </div>
    </div>
  )
}

export default EpisodeCard
