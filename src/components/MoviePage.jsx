import React, { useRef } from 'react'
import urls, { apikey } from '../assets/url';
import Row from './Row';
import { useState, useEffect, useContext } from 'react';
import MovieContext from '../hooks/context';
import genre from '../functions/genre';
import removeDup from '../functions/removeDup'
import { useNavigate } from 'react-router-dom';
import Percent_svg from './Percent_svg';

function MoviePage({ movieItem, row }) {
  const navigate = useNavigate()
  const { genre_ids } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [movies_In_Series, setMovies_In_Series] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const { genres, setGlobalTrailer, combined_list, setCombined_list } = useContext(MovieContext)
  const [localTrailer, setLocalTrailer] = useState([])
  const [percentage, setPercentage] = useState(Math.floor(movieItem.vote_average * 10))
  const MoviePageRef = useRef(null)
  const scroller = { scrollReset, setScrollReset }


  function ifIncludes(ids, compare) {
    const { genre_ids: comapre_ids } = compare
    for (let i = 0; i < ids.length; i++) {
      if (comapre_ids.includes(ids[i])) return true
    }
  }
  function existance_Checker(arr, movie) {
    let result = arr.find(item => {
      return item.id === movie.id
    })
    console.log('result is', result);
    if (result) {
      return true
    } else {
      return false
    }
  }
  function addIf_DoesNot_Exist(arr) {
    arr.forEach(item => {
      if (!existance_Checker(combined_list, item)) {
        console.log(item);
        setCombined_list(prev => [...prev, item])
      }
    })
  }

  async function callCast_Videos() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}/credits?api_key=${apikey}`)
    response = await response.json()
    setCast(response.cast)
    response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}/videos?api_key=${apikey}&language=en-US`)
    response = await response.json()
    setRelatedVideos(response.results)
    setLocalTrailer(relatedVideos.find(item => item.type === 'Trailer'))
    response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}?api_key=cbcd1ac0703914747341f9a905931ef9&language=en-US`)
    response = await response.json()
    let collection_id = response.belongs_to_collection.id
    console.log(collection_id);
    if (collection_id) {
      response = await fetch(`https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apikey}&language=en-US`)
      response = await response.json()
      console.log(response);
      setMovies_In_Series(response.parts)
      addIf_DoesNot_Exist(response.parts)
    }
  }

  function handleGlobalPlayer() {
    setGlobalTrailer(localTrailer)
    navigate('/player')
  }

  useEffect(() => {
    callCast_Videos()
    let movieContainer = []
    row.forEach(element => {
      if (!element.card_type) {
        if (ifIncludes(genre_ids, element)) {
          movieContainer.push(element)
        }
      }
    });
    setSimilarMovies(removeDup(movieContainer, movieItem))
    setScrollReset(true)
    setTimeout(() => {
      document.querySelector('html').scrollTo({
        behavior: 'smooth',
        top: 0
      })
    }, 500)
  }, [movieItem])
  useEffect(() => {
    setGenreType([])
    genre(genre_ids, setGenreType, genres)
  }, [])
  return (
    <>
      <div className='flex justify-around m-10' ref={MoviePageRef}>
        <div className='flex-1 flex justify-center'>
          <div className='w-[400px] overflow-hidden rounded-lg'>
            <img src={`${urls.baseUrl}${movieItem.poster_path}`} className='w-[400px] hover:scale-105 transition-all duration-[600ms] hover:opacity-70 hover:bg-[#00000070]' alt="" />
          </div>
        </div>
        <div className='flex-1'>
          <p className='text-white text-[50px] font-bold mb-10'>
            {
              movieItem.original_title
            }
          </p>
          <p className='text-white w-[80%]'>
            {
              movieItem.overview
            }
          </p>
          <p className='mt-10'>
            {
              genreType.map((item) => (
                <span className='text-white mr-2 text-lg font-semibold'>{item}</span>
              ))
            }
          </p>
          <p className='mt-5 text-white text-lg'>
            {
              `Release Date - `
            }
            <span className='font-semibold'>{movieItem.release_date}</span>
          </p>
          <Percent_svg percentage={percentage} />
          <button className='bg-white mr-2 mt-12 text-lg uppercase px-5 py-2 font-semibold rounded-md transition-all hover:bg-[#ffffffaf]' onClick={() => handleGlobalPlayer()}>Play</button>
        </div>
      </div>
      <div>
        <Row type='cast' List={cast} title='Cast' inside={true} {...scrollReset} />
        <Row type='movie' List={movies_In_Series} title='Movies in series' inside={true} {...scroller} />
        <Row type='related' List={relatedVideos} title='Related Videos' inside={true}  {...scroller} />
        <Row type='movie' List={similarMovies} title='Similar Movies' inside={true} {...scroller}></Row>
      </div>
    </>
  )
}

export default MoviePage;

