import React, { useRef } from 'react'
import urls from '../assets/url';
import { apiKey } from '../assets/apiKey';
import Row from '../components/Row';
import { useState, useEffect, useContext } from 'react';
import MovieContext from '../hooks/context';
import genre from '../functions/genre';
import removeDup from '../functions/removeDup'
import { useNavigate } from 'react-router-dom';
import Percent_svg from '../components/Percent_svg';
import { handleGlobalPlayer } from '../functions/handleGlobalPlayer';

function MoviePage({ movieItem, row }) {
  const navigate = useNavigate()
  const { genre_ids } = movieItem
  const [similarMovies, setSimilarMovies] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [relatedVideos, setRelatedVideos] = useState([])
  const [movies_In_Series, setMovies_In_Series] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const { genres, setGlobalTrailer, combined_list, setCombined_list, collection, setCollection } = useContext(MovieContext)
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
    return Boolean(result)
  }
  function addIf_DoesNot_Exist(arr, combined_list, setCombined_list) {
    arr.forEach(item => {
      if (!existance_Checker(combined_list, item)) {
        setCombined_list(prev => [...prev, item])
      }
    })
  }

  async function callCast_Videos({ movieItem, setCast, setRelatedVideos, setLocalTrailer, setMovies_In_Series, addIf_DoesNot_Exist, combined_list, setCombined_list }) {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}/credits?api_key=${apiKey}`)
    response = await response.json()
    setCast(response.cast)
    response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}/videos?api_key=${apiKey}&language=en-US`)
    response = await response.json()
    setRelatedVideos(response.results)
    setLocalTrailer(response.results.find(item => item.type === 'Trailer'))
    response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}?api_key=cbcd1ac0703914747341f9a905931ef9&language=en-US`)
    response = await response.json()
    let collection_id = response.belongs_to_collection.id
    if (!collection[collection_id]) {
      response = await fetch(`https://api.themoviedb.org/3/collection/${collection_id}?api_key=${apiKey}&language=en-US`)
      response = await response.json()
      setMovies_In_Series(response.parts)
      setCollection(prev => ({ ...prev, [collection_id]: response.parts }))
      addIf_DoesNot_Exist(response.parts, combined_list, setCombined_list)
    } else {
      setMovies_In_Series(collection[collection_id])
      addIf_DoesNot_Exist(collection[collection_id], combined_list, setCombined_list)
    }
  }

  useEffect(() => {
    if (movieItem) {
      console.log('this is movieItem', movieItem);
      callCast_Videos({ movieItem, setCast, relatedVideos, setRelatedVideos, setLocalTrailer, setMovies_In_Series, addIf_DoesNot_Exist, combined_list, setCombined_list })
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
    }
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
              genreType.map((item, index) => (
                <span key={index} className='text-white mr-2 text-lg font-semibold'>{item}</span>
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
          <button className='bg-white mr-2 mt-12 text-lg uppercase px-5 py-2 font-semibold rounded-md transition-all hover:bg-[#ffffffaf]' onClick={() => handleGlobalPlayer({ setGlobalTrailer, navigate, localTrailer })}>Play</button>
        </div>
      </div>
      <div>
        <Row type='cast' List={cast} title='Cast' inside {...scrollReset} />
        <Row type='movie' List={movies_In_Series} title='Movies in series' inside {...scroller} />
        {/* <Row type='related' List={relatedVideos} title='Related Videos' inside  {...scroller} /> */}
        <Row type='movie' List={similarMovies} title='Similar Movies' inside {...scroller} />
      </div>
    </>
  )
}

export default MoviePage;

