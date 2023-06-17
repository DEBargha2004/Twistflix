import React from 'react'
import Additional_Child from './Additional_Child'

function Additional() {
  return (
    <div className='flex justify-between w-fit text-lg font-semibold'>
      <Additional_Child Title="Movies" id={0} route='/' />
      <Additional_Child Title="Web Series" id={1} route='/tv' />
    </div>
  )
}

export default Additional