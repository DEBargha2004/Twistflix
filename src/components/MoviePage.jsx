import React from 'react'
import urls from '../assets/url';
import Row from './Row';
import { useState, useEffect, useContext } from 'react';
import MovieContext from '../hooks/context';
import genre from '../functions/genre';
import removeDup from '../functions/removeDup'
import { apikey } from '../assets/url';

function MoviePage({ movieItem, row }) {
  const { genre_ids } = movieItem
  const [currentRow, setCurrentRow] = useState([])
  const [genreType, setGenreType] = useState([])
  const [cast, setCast] = useState([])
  const [scrollReset, setScrollReset] = useState(false)
  const { genres } = useContext(MovieContext)


  function ifIncludes(ids, compare) {
    const { genre_ids: comapre_ids } = compare
    for (let i = 0; i < ids.length; i++) {
      if (comapre_ids.includes(ids[i])) return true
    }
  }

  async function callCast() {
    let response = await fetch(`https://api.themoviedb.org/3/movie/${movieItem.id}/credits?api_key=${apikey}`)
    response = await response.json()
    setCast(response.cast)
  }

  useEffect(() => {
    callCast()
    let movieContainer = []
    row.forEach(element => {
      if (!element.card_type) {
        if (ifIncludes(genre_ids, element)) {
          movieContainer.push(element)
        }
      }
    });
    setCurrentRow(removeDup(movieContainer, movieItem))
    setScrollReset(true)
  }, [movieItem])
  useEffect(() => {
    setGenreType([])
    genre(genre_ids, setGenreType, genres)
  }, [])
  return (
    <>
      <div className='flex justify-around m-10'>
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
          <button className='bg-white mr-2 mt-12 text-lg uppercase px-5 py-2 font-semibold rounded-md transition-all hover:bg-[#ffffffaf]'>Play</button>
        </div>
      </div>
      <div>
        <Row scrollReset={scrollReset} type='cast' setScrollReset={setScrollReset} List={cast} title='Cast' />
        <Row scrollReset={scrollReset} type='movie' setScrollReset={setScrollReset} List={currentRow} title='Similar Movies'></Row>
      </div>
    </>
  )
}

export default MoviePage;

