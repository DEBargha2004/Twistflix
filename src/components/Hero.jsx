import { useContext, useEffect, useState } from 'react'
import MovieContext from '../hooks/context';
import { useNavigate } from 'react-router-dom';
import urls from '../assets/url';
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer'


function Hero() {
    const navigate = useNavigate()
    const { hero, trailer, setGlobalTrailer } = useContext(MovieContext)
    const [Index, setIndex] = useState(0)

    function changeBy(val) {
        let newIndex = Index + val
        if (newIndex < 0) {
            setIndex(hero.length - 1)
        } else if (newIndex > hero.length - 1) {
            setIndex(0)
        } else {
            setIndex(newIndex)
        }
    }
    return (
        <>
            <div className='relative w-full overflow-hidden'>
                <img src={urls.baseUrl + hero[Index]?.backdrop_path} className='object-cover w-full hover:scale-[1.03] transition-all duration-[600ms] opacity-60 bg-[#00000060] hover:opacity-50' style={{ height: `${window.innerHeight * 0.8}px` }} alt="" />
                <div className='absolute left-[50px] top-[50%]'>
                    <p className='font-semibold text-white text-[50px] line-clamp-1'>{hero[Index]?.original_title}</p>
                    <p className='text-white text-sm line-clamp-5 w-[400px]'>{hero[Index]?.overview}</p>
                    {
                        hero[Index] ?
                            <div className='w-[400px] mt-5'>
                                <button className='text-lg text-white px-4 py-2 rounded-sm bg-black mr-4' onClick={() => handleGlobalPlayer({ navigate, setGlobalTrailer, localTrailer: trailer[Index] })}>Play</button>
                                <button className='text-lg text-white px-4 py-2 rounded-sm hover:bg-[#00000080] transition-all' onClick={() => navigate(`/${hero[Index]?.id}/${hero[Index]?.original_title}`)}>Info</button>
                            </div> :
                            null
                    }
                </div>
            </div>
            <div className='relative h-8 py-2'>
                <span className='text-white mx-3 font-semibold uppercase hover:bg-slate-700 transition-all duration-500 ease-out active:scale-90 bg-slate-500 px-5 py-2 absolute left-4 cursor-pointer rounded-[25px]' onClick={() => changeBy(-1)}>Prev</span>
                <span className='text-white mx-3 font-semibold uppercase hover:bg-slate-700 transition-all duration-500 ease-out active:scale-90 bg-slate-500 px-5 py-2 absolute right-4 cursor-pointer rounded-[25px]' onClick={() => changeBy(1)}>Next</span>
            </div>
            <div className='w-full flex justify-center'>
                {
                    hero.map((item, index) => (
                        <div className={`h-2 w-2 rounded-full ${index === Index ? 'bg-white' : 'bg-slate-500'} mx-[6px] cursor-pointer`} onClick={() => setIndex(index)} key={index} />
                    ))
                }
            </div>
        </>
    )
}

export default Hero;

