import React, { useEffect, useRef, useState, useContext } from 'react'
import MovieContext from '../hooks/context'
import urls from '../assets/url'
import play_button from '../assets/play-button.png'
import info from '../assets/info.png'
import fullscreen from '../assets/full-screen.png'
import { useNavigate, useLocation } from 'react-router-dom'
import genre from '../functions/genre'
import { motion } from 'framer-motion'

function Card ({ Item: movieItem, type, content_type }) {
  const { genres, seriesGenres } = useContext(MovieContext)
  const [isHovering, setIsHovering] = useState(false)
  const movieCard = useRef(null)
  const [cardPosition, setcardPosition] = useState({
    x: null,
    y: null,
    from: null
  })

  const [genre_type, setGenre_type] = useState([])
  const navigate = useNavigate()
  const location = useLocation()

  function handleNavigate () {
    const movieRoute = `/tv/${movieItem.id}`
    navigate(movieRoute)
  }
  function genreTypeSetter (content_type) {
    if (content_type === 'movie') {
      return genres
    } else if (content_type === 'series') {
      return seriesGenres
    }
  }

  useEffect(() => {
    if (isHovering) {
      //let { bottom, top, height } = hoveredDiv.current.getBoundingClientRect()
      let movieCardStyle = movieCard.current.getBoundingClientRect()
      let { left, right, bottom, top } = movieCardStyle
      const widndow_Width = window.innerWidth
      const widndow_Height = window.innerHeight
      if (left < 40) {
        // extreme left
        // setcardPosition(prev => ({
        //     ...prev, x: 40
        // }))
        if (widndow_Height - bottom < 59.55) {
          // extreme bottom-left
          setcardPosition(prev => ({
            y: bottom - widndow_Height,
            x: 40,
            from: 'bottom'
          }))
        } else if (top < 0) {
          setcardPosition(prev => ({
            // extreme top-left
            y: -top,
            x: 40,
            from: 'top'
          }))
        } else {
          setcardPosition(prev => ({
            // extreme left
            y: 0,
            x: 40,
            from: 'top'
          }))
        }
      } else if (widndow_Width - right < 40) {
        // extreme right
        // setcardPosition(prev => ({
        //     ...prev, x: widndow_Width - (314)
        // }))
        if (widndow_Height - bottom < 59.55) {
          // extreme bottom-right
          setcardPosition(prev => ({
            y: bottom - widndow_Height,
            x: widndow_Width - 314,
            from: 'bottom'
          }))
        } else if (top < 0) {
          // extreme top-right
          setcardPosition(prev => ({
            y: -top,
            x: widndow_Width - 314,
            from: 'top'
          }))
        } else {
          setcardPosition(prev => ({
            // extreme right
            y: 0,
            x: widndow_Width - 314,
            from: 'top'
          }))
        }
      } else {
        // normal
        // setcardPosition(prev => ({
        //     ...prev, x: left
        // }))
        if (widndow_Height - bottom < 59.55) {
          // normal bottom
          setcardPosition(prev => ({
            x: left,
            y: bottom - widndow_Height,
            from: 'bottom'
          }))
        } else if (top < 0) {
          // normal top
          setcardPosition(prev => ({
            x: left,
            y: -top,
            from: 'top'
          }))
        } else {
          setcardPosition(prev => ({
            // normal
            x: left,
            y: 0,
            from: 'top'
          }))
        }
      }
    }
  }, [isHovering])
  useEffect(() => {
    setGenre_type([])
    genre(movieItem.genre_ids, setGenre_type, genreTypeSetter(content_type))
  }, [])

  return (
    <div
      className='w-[250px] mx-1 rounded-md cursor-pointer'
      onMouseEnter={() => setIsHovering(true)}
      onMouseLeave={() => setIsHovering(false)}
      ref={movieCard}
    >
      <div className='overflow-hidden h-[141px] w-[250px] rounded-md'>
        <img
          src={`${urls.baseUrl}${movieItem.backdrop_path}`}
          className='w-full hover:scale-105 hover:bg-[#000000cb] transition-all duration-[400ms] hover:opacity-60 rounded-lg'
          alt={movieItem.title || movieItem.name}
        />
        {isHovering ? (
          <motion.div
            initial={{ opacity: 0, translateY: 40 }}
            whileInView={{ opacity: 1, translateY: 0 }}
            className={`absolute flex flex-col items-center z-10 border-[0.5px] border-slate-500 bg-black rounded-xl p-3 shadow-lg shadow-[#ffffff17]`}
            style={{
              left: `${cardPosition.x - 30}px`,
              [cardPosition.from === 'bottom'
                ? 'bottom'
                : 'top']: `${cardPosition.y}px`
            }}
          >
            <div className='w-[250px] overflow-hidden rounded-md'>
              <img
                src={`${urls.baseUrl}${movieItem.backdrop_path}`}
                alt={movieItem.original_title || movieItem.name}
                className='w-[250px] transition-all hover:scale-105 duration-[600ms] hover:opacity-70 hover:bg-[#00000091]'
              />
            </div>
            <div className='mt-3 flex items-center w-[250px]'>
              <img
                src={play_button}
                className='h-7 cursor-pointer mx-1'
                alt=''
              />
              <img
                src={info}
                className='h-7 cursor-pointer mx-1'
                onClick={() => handleNavigate()}
                alt=''
              />
              <img
                src={fullscreen}
                className='h-6 cursor-pointer mx-1'
                alt=''
              />
            </div>
            <div className='w-[250px] mt-2'>
              <p className='text-white  text-lg font-semibold'>
                {movieItem.original_title || movieItem.original_name}
              </p>
              <p className='text-sm h-[100px] overflow-clip text-slate-300  text-[13px]'>
                {movieItem.overview}
              </p>
              <p className='mt-2 font-semibold flex flex-wrap'>
                {genre_type.map((item, index) => (
                  <span className='text-white text-[14px] mr-2' key={index}>
                    {item}
                  </span>
                ))}
              </p>
            </div>
          </motion.div>
        ) : null}
      </div>
    </div>
  )
}

export default Card
