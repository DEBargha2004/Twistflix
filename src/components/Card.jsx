import React, { useEffect, useRef, useState, useContext } from 'react'
import MovieContext from '../hooks/context'
import urls from '../assets/url'
import play_button from '../assets/play-button.png'
import info from '../assets/info.png'
import fullscreen from '../assets/full-screen.png'
import { useNavigate } from 'react-router-dom'
import genre from '../functions/genre'
import { motion } from 'framer-motion'

function Card({ index, Item:movieItem }) {
    const { genres } = useContext(MovieContext)
    const [isHovering, setIsHovering] = useState(false)
    const movieCard = useRef(null)
    const [cardPosition, setcardPosition] = useState({
        x: null,
        y: null,
        from: null
    })

    const [genre_type, setGenre_type] = useState([])
    const navigate = useNavigate()





    function handleNavigate() {
        const movieRoute = `/${movieItem.id}/${movieItem.original_title}`
        navigate(movieRoute)
    }


    useEffect(() => {
        if (isHovering) {
            //let { bottom, top, height } = hoveredDiv.current.getBoundingClientRect()
            let movieCardStyle = movieCard.current.getBoundingClientRect()
            console.log(movieCardStyle);
            //console.log('hovered', hoveredDiv.current.getBoundingClientRect());
            let { left, right, bottom, top } = movieCardStyle
            const widndow_Width = window.innerWidth
            const widndow_Height = window.innerHeight
            if (left < 40) {                          // extreme left
                // setcardPosition(prev => ({
                //     ...prev, x: 40
                // }))
                console.log('left');
                if (widndow_Height - bottom < 59.55) {        // extreme bottom-left
                    setcardPosition(prev => ({
                        y: bottom - widndow_Height, x: 40, from: 'bottom'
                    }))
                } else if (top < 0) {
                    setcardPosition(prev => ({        // extreme top-left
                        y: -top, x: 40, from: 'top'
                    }))
                } else {
                    setcardPosition(prev => ({        // extreme left
                        y: 0, x: 40, from: 'top'
                    }))
                }

            } else if (widndow_Width - right < 40) {  // extreme right
                // setcardPosition(prev => ({
                //     ...prev, x: widndow_Width - (314)
                // }))
                console.log('right');
                if (widndow_Height - bottom < 59.55) {        // extreme bottom-right
                    setcardPosition(prev => ({
                        y: bottom - widndow_Height, x: widndow_Width - (314), from: 'bottom'
                    }))
                } else if (top < 0) {                 // extreme top-right
                    setcardPosition(prev => ({
                        y: -top, x: widndow_Width - (314), from: 'top'
                    }))
                } else {
                    setcardPosition(prev => ({        // extreme right
                        y: 0, x: widndow_Width - (314), from: 'top'
                    }))
                }
            } else {                                  // normal
                // setcardPosition(prev => ({
                //     ...prev, x: left
                // }))
                console.log('normal');
                if (widndow_Height - bottom < 59.55) {
                    console.log('normal bottom');     // normal bottom
                    setcardPosition(prev => ({
                        x: left, y: bottom - widndow_Height, from: 'bottom'
                    }))
                } else if (top < 0) {
                    console.log('normal top');              // normal top
                    setcardPosition(prev => ({
                        x: left, y: -top, from: 'top'
                    }))
                } else {
                    setcardPosition(prev => ({        // normal
                        x: left, y: 0, from: 'top'
                    }))
                }
            }
        }
    }, [isHovering])
    useEffect(() => {
        setGenre_type([])
        genre(movieItem.genre_ids, setGenre_type, genres)
    }, [])

    return (
        <div
            key={index}
            className="w-[250px] mx-1 rounded-md cursor-pointer"
            onMouseEnter={() => setIsHovering(true)}
            onMouseLeave={() => setIsHovering(false)}
            ref={movieCard}
        >
            <div className='overflow-hidden h-[141px] w-[250px] rounded-md'>
                <img src={`${urls.baseUrl}${movieItem.backdrop_path}`} className="w-full hover:scale-105 hover:bg-[#000000cb] transition-all duration-[400ms] hover:opacity-60 rounded-lg" alt={movieItem.original_title} />
                {
                    isHovering ?
                        <motion.div initial={{opacity:0,translateY:40}} whileInView={{opacity:1,translateY:0}} className={`absolute flex flex-col items-center z-10 border-[0.5px] border-slate-500 bg-black rounded-xl p-3 shadow-lg shadow-[#ffffff17]`} style={{ left: `${cardPosition.x - 30}px`, [cardPosition.from === 'bottom' ? 'bottom' : 'top']: `${cardPosition.y}px` }}>
                            <div className='w-[250px] overflow-hidden rounded-md'>
                                <img src={`${urls.baseUrl}${movieItem.backdrop_path}`} alt={movieItem.original_title} className='w-[250px] transition-all hover:scale-105 duration-[600ms] hover:opacity-70 hover:bg-[#00000091]' />
                            </div>
                            <div className='mt-3 flex items-center w-[250px]'>
                                <img src={play_button} className='h-7 cursor-pointer mx-1' alt="" />
                                <img src={info} className='h-7 cursor-pointer mx-1' onClick={() => handleNavigate()} alt="" />
                                <img src={fullscreen} className='h-6 cursor-pointer mx-1' alt="" />
                            </div>
                            <div className='w-[250px] mt-2'>
                                <p className='text-white  text-lg font-semibold'>
                                    {
                                        movieItem.original_title
                                    }
                                </p>
                                <p className='text-sm h-[100px] overflow-clip text-slate-300  text-[13px]'>
                                    {
                                        movieItem.overview
                                    }
                                </p>
                                <p className='mt-2 font-semibold'>
                                    {
                                        genre_type.map(item => (
                                            <span className='text-white text-[14px]'> {item} </span>
                                        ))
                                    }
                                </p>
                            </div>
                        </motion.div> :
                        null
                }
            </div>
        </div>
    )
}

export default Card;