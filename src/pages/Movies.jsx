import React, { useContext } from 'react'
import Row from '../components/Row'
import MovieContext from '../hooks/context'
import Hero from '../components/Hero'

function Home () {
  const { genres } = useContext(MovieContext)

  return (
    <div>
      <Hero />
      {genres.length
        ? genres.map((item, index) => (
            <div key={index} className='my-8'>
              {item.movieList ? (
                <Row
                  title={item.name}
                  type='long_horizontal'
                  List={item.movieList}
                  id={item.id}
                  content_type='movies'
                />
              ) : null}
            </div>
          ))
        : null}
    </div>
  )
}

export default Home
