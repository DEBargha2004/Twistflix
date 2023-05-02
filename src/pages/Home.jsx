import React, { useContext } from 'react'
import Row from '../components/Row'
import MovieContext from '../hooks/context'
import { useEffect } from 'react'
import { useState } from 'react'
import urls from '../assets/url'
import { useNavigate } from 'react-router-dom'

function Home() {
    const { genres, combined_list } = useContext(MovieContext)
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

    return (
        <div>
            <div className='relative w-full overflow-hidden'>
                <img src={current ? urls.baseUrl + current.backdrop_path : null} className='object-cover w-full hover:scale-[1.03] transition-all duration-[600ms] opacity-60 bg-[#00000060] hover:opacity-50' style={{ height: `${window.innerHeight * 0.8}px` }} alt="" />
                <div className='absolute left-[50px] top-[50%]'>
                    <p className='font-semibold text-white text-[50px]'>{current?.original_title}</p>
                    <p className='text-white text-sm line-clamp-5 w-[400px]'>{current?.overview}</p>
                    <div className='w-[400px] mt-5'>
                        <button className='text-lg text-white px-4 py-2 rounded-sm bg-black mr-4'>Play</button>
                        <button className='text-lg text-white px-4 py-2 rounded-sm hover:bg-[#00000080] transition-all' onClick={()=>navigate(`/${current?.id}/${current?.original_title}`)}>Info</button>
                    </div>
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