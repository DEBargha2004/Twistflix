import React, { useEffect, useState, useContext } from 'react'
import { apiKey } from '../assets/apiKey'
import urls from '../assets/url'
import MovieContext from '../hooks/context'
import Row from '../components/Row'

function CastPage ({ Cast }) {
  const { setCombined_list,setSeriesCombined_list } = useContext(MovieContext)
  const [scrollReset, setScrollReset] = useState(false)
  const [currentCast, setCurrentCast] = useState({})
  const [currentCastMovies, setCurrentCastMovies] = useState([])
  const [currentCastSeries, setCurrentCastSeries] = useState([])
  const [seeFull, setseeFull] = useState(false)
  async function callSpecificCast () {
    let response = await fetch(
      `https://api.themoviedb.org/3/person/${Cast.id}?api_key=${apiKey}`
    )
    response = await response.json()
    setCurrentCast(response)
    response = await fetch(
      `https://api.themoviedb.org/3/person/${Cast.id}/movie_credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setCombined_list(prev => [...prev, ...response.cast, ...response.crew])
    setCurrentCastMovies([...response.cast, ...response.crew])
    response = await fetch(
      `https://api.themoviedb.org/3/person/${Cast.id}/tv_credits?api_key=${apiKey}&language=en-US`
    )
    response = await response.json()
    setCurrentCastSeries([...response.cast, ...response.crew])
    setSeriesCombined_list(prev => [...prev, ...response.cast, ...response.crew])
  }
  useEffect(() => {
    callSpecificCast()
    setScrollReset(true)
    setTimeout(() => {
      document.querySelector('html').scrollTo({
        behavior: 'smooth',
        top: 0
      })
    }, 500)
  }, [Cast])
  return (
    <>
      <div className='flex justify-around m-10 mt-[100px]'>
        <div className='flex-1 flex justify-center'>
          <div className='w-[400px] h-fit overflow-hidden rounded-lg'>
            <img
              src={`${urls.baseUrl}${Cast.profile_path}`}
              className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]'
              alt=''
            />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-10'>
            {currentCast?.name}
          </p>
          <p
            className={`text-white w-[80%] ${seeFull ? '' : 'line-clamp-[13]'}`}
            onClick={() => setseeFull(prev => !prev)}
          >
            {currentCast.biography
              ? currentCast.biography
              : 'There is no biography'}
          </p>
          <div className='my-10'>
            <p className='text-white text-lg font-semibold'>
              {currentCast?.birthday}-
              {currentCast?.deathday ? currentCast.deathday : 'current'}
            </p>
          </div>
        </div>
      </div>
      <div>
        <Row
          type='long_horizontal'
          content_type='movie'
          title='Related Movies'
          include_margin
          List={currentCastMovies}
          setScrollReset={setScrollReset}
          scrollReset={scrollReset}
        />
        <Row
          type='long_horizontal'
          content_type='series'
          title='Related Web series'
          include_margin
          List={currentCastSeries}
          setScrollReset={setScrollReset}
          scrollReset={scrollReset}
        />
      </div>
    </>
  )
}

export default CastPage
