import right_arrow from '../assets/right-arrow.png'
import { fetcher } from '../functions/fetchMovieList'
import MovieContext from '../hooks/context'
import { useContext } from 'react'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'

function CallNewCard ({ id, content_type }) {
  const {
    setGenres,
    setCombined_list,
    combined_list,
    genres,
    setSeriesGenres,
    seriesGenres
  } = useContext(MovieContext)

  let movie = genres.find(item => item.id === id)
  let series = seriesGenres.find(item => item.id === id)
  async function callNewMovies () {
    let response = await fetcher(
      id,
      content_type === 'movies' ? movie.currentPage + 1 : series.currentPage + 1,
      content_type
    )
  
    content_type === 'movies'
      ? setGenres(prev => {
          if (movie) {
            movie = prev.find(item => item.id === id)
            movie.movieList = [...movie.movieList, ...response]
            movie.currentPage += 1
            return [...prev]
          }
          return [...prev]
        })
      : setSeriesGenres(prev => {
          if (series) {
            series = prev.find(item => item.id === id)
            series.movieList = [...series.movieList, ...response]
            series.currentPage += 1
            return [...prev]
          }
        })
  }
  return (
    <div className='w-[250px] h-[141px] bg-slate-500 shrink-0 rounded-lg flex items-center justify-center cursor-pointer'>
      <div className=' w-[70px] aspect-square rounded-full bg-gray-300 flex items-center justify-center shadow-lg shadow-gray-700 transition-all duration-300 ease-out hover:shadow-xl hover:scale-125'>
        <div
          className='w-[45px] aspect-square bg-white rounded-full flex justify-center items-center transition-all active:scale-75'
          onClick={() => callNewMovies()}
        >
          <img src={right_arrow} className='w-5' alt='' />
        </div>
      </div>
    </div>
  )
}

export default CallNewCard
