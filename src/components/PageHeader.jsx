import React from 'react'
import Time from './Time'
import urls from '../assets/url'
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'
import NewCircular_svg from './NewCircular_svg'
import play from '../assets/play.png'
import { useNavigate } from 'react-router-dom'

function PageHeader ({
  main_img,
  backdrop_img,
  name,
  runtime,
  release_date,
  genres,
  percentage,
  tagline,
  overview,
  localTrailer,
  setGlobalTrailer,
  episode_count,
  season_name,
  episode_number,
  episode_name,
  episode
}) {
  const navigate = useNavigate()
  return (
    <div className='relative my-20 overflow-y-hidden bg-[#00000060]'>
      <div className='flex justify-around py-10 mt-[20px]'>
        <div className='flex flex-col justify-around items-center'>
          <div className={`w-[300px] overflow-hidden rounded-lg h-fit bg-black ${episode ? 'mx-[100px]' : 'ml-[100px]'}`}>
            <img
              src={`${urls.baseUrl}${main_img}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70'
              alt=''
            />
          </div>
          <p className='text-xl font-semibold text-slate-300'>{episode_name}</p>
        </div>
        <div className=' flex flex-col justify-center items-start mr-20 ml-10'>
          <p className='text-white text-4xl font-bold mb-1'>
            {name}
            <span className='font-normal text-slate-300'>
              {' '}
              ({release_date?.split('-')[0]})
            </span>
          </p>
          <p className='text-slate-300'>
            {release_date?.replace(/[-]/g, '/')}
            <span className='mx-2'>
              {genres?.map((item, index) => {
                return (
                  <span>
                    {' '}
                    {item.name ? item.name : item}
                    {genres[index + 1] ? ',' : ''}
                  </span>
                )
              })}
            </span>
            <span>
              <Time runtime={runtime} />
            </span>
          </p>
          <div className='flex items-center justify-between w-[300px] my-4'>
            <div className='scale-90'>
              <NewCircular_svg percentage={percentage} />
            </div>
            <div
              className='flex w-[120px] justify-between items-center cursor-pointer'
              onClick={() =>
                handleGlobalPlayer({
                  setGlobalTrailer,
                  navigate,
                  localTrailer
                })
              }
            >
              <img src={play} className='w-8' alt='' />
              <span className='text-white font-semibold'>Play Trailer</span>
            </div>
          </div>
          <div className='flex justify-between items-center'>
            {season_name ? (
              <span className='text-slate-300 text-lg mr-4'>{season_name}</span>
            ) : null}
            {episode ? (
              <span className='text-slate-300'>
                Episode {episode_number} / {episode_count}
              </span>
            ) : episode_count ? (
              <p className='text-slate-300'>{episode_count} episodes</p>
            ) : null}
          </div>
          <i className='text-gray-300'>{tagline}</i>
          <div>
            <p className='text-lg font-semibold my-2 text-white'>Overview</p>
            <p className='text-white text-[15px] w-[844px]'>{overview}</p>
          </div>
        </div>
      </div>
      <div className='absolute w-full h-full opacity-20 z-[-1] top-0'>
        <img
          src={`${urls.baseUrl}${backdrop_img}`}
          className='w-full h-full object-cover'
          alt=''
        />
      </div>
    </div>
  )
}

export default PageHeader
