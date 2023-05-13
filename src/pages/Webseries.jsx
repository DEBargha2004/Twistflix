import Row from '../components/Row'
import { useContext, useEffect } from 'react'
import MovieContext from '../hooks/context'
import Hero from '../components/Hero'

function WebSeriesPage () {
  const { seriesGenres,setInView } = useContext(MovieContext)
  useEffect(()=>{
    location.pathname.includes('/tv') && setInView(1)
  },[])
  return (
    <div>
      <Hero />
      {seriesGenres.length
        ? seriesGenres.map((item, index) => (
            <div key={index} className='my-8'>
              {item.movieList ? (
                <Row
                  title={item.name}
                  type='long_horizontal'
                  List={item.movieList}
                  id={item.id}
                  content_type='series'
                />
              ) : null}
            </div>
          ))
        : null}
    </div>
  )
}

export default WebSeriesPage
