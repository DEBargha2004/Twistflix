import React, { useContext } from 'react'
import Row from '../components/Row'
import MovieContext from '../hooks/context'
import { useEffect } from 'react'
import { useState } from 'react'
import urls, { apikey } from '../assets/url'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { genres, combined_list, setGlobalTrailer } = useContext(MovieContext)
    const [localTrailer, setLocalTrailer] = useState([])
    const [current, setCurrent] = useState(null)
    const navigate = useNavigate()

    useEffect(() => {
        if (combined_list) {
            const len = combined_list.length
            setCurrent(
                combined_list[Math.floor(Math.random() * len)]
            )
        }
    }, [combined_list])

    async function callVideos_Set() {
        let response = await fetch(`https://api.themoviedb.org/3/movie/${current.id}/videos?api_key=${apikey}&language=en-US}`)
        response = await response.json()
        setLocalTrailer(response.results.find(item => item.type === 'Trailer'))
    }
    function handleGlobalPlayer() {
        setGlobalTrailer(localTrailer)
        navigate('/player')
    }
    useEffect(() => {
        if (current) {
            callVideos_Set()
        }
    }, [current])

    return (
        <div>
            <div className='relative w-full overflow-hidden'>
                <img src={current ? urls.baseUrl + current.backdrop_path : null} className='object-cover w-full hover:scale-[1.03] transition-all duration-[600ms] opacity-60 bg-[#00000060] hover:opacity-50' style={{ height: `${window.innerHeight * 0.8}px` }} alt="" />
                <div className='absolute left-[50px] top-[50%]'>
                    <p className='font-semibold text-white text-[50px]'>{current?.original_title}</p>
                    <p className='text-white text-sm line-clamp-5 w-[400px]'>{current?.overview}</p>
                    {
                        current ?
                            <div className='w-[400px] mt-5'>
                                <button className='text-lg text-white px-4 py-2 rounded-sm bg-black mr-4' onClick={() => handleGlobalPlayer()}>Play</button>
                                <button className='text-lg text-white px-4 py-2 rounded-sm hover:bg-[#00000080] transition-all' onClick={() => navigate(`/${current?.id}/${current?.original_title}`)}>Info</button>
                            </div> :
                            null
                    }
                </div>
            </div>
            {
                genres.length ?
                    genres.map((item, index) => (
                        <div key={index} className='my-8'>
                            {
                                item.movieList ?
                                    <Row title={item.name} type='movie' List={item.movieList} /> :
                                    null
                            }
                        </div>
                    )) :
                    null
            }
        </div>
    )
}

export default Home