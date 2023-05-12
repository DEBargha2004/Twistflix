import right_arrow from '../assets/right-arrow.png'
import { fetcher } from '../functions/fetchMovieList'
import MovieContext from '../hooks/context'
import { useContext } from 'react'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'

function CallNewCard ({ id }) {
  const { setGenres, setCombined_list, combined_list, genres } =
    useContext(MovieContext)

  let index
  for (let i = 0; i < genres.length; i++) {
    if (genres[i].id === id) {
      index = i
    }
  }

  async function callNewMovies () {
    console.log(genres)
    let response = await fetcher(id, genres[index].currentPage + 1,'movies')
    setCombined_list(addIf_DoesNot_Exist(response, combined_list)) // adding in the combined_list and setting routes
    setGenres(prev => {
      console.log(index)
      if (!isNaN(index)) {
        prev[index].movieList = [...prev[index].movieList, ...response]
        prev[index].currentPage += 1
        console.log(prev)
        return [...prev]
      }
      return [...prev]
    })
    setPage(prev => prev + 1)
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
