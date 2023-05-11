import React, { useRef } from 'react'
import Youtube from 'react-youtube'

function Player ({ Item }) {
  const optins = {
    height: window.innerHeight,
    width: window.innerWidth
  }
  return Item ? (
    <Youtube videoId={Item?.key} opts={optins} />
  ) : (
    <div className='text-white h-[100vh] w-full flex items-center justify-center text-5xl font-semibold'>Video Not available</div>
  )
}

export default Player
