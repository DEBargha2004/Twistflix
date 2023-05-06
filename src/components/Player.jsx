import React,{useRef} from 'react'
import Youtube from 'react-youtube'

function Player({Item}) {
    const optins = {
        height : window.innerHeight,
        width : window.innerWidth
    }
  return (
    <Youtube videoId={Item?.key} opts={optins}  />
  )
}

export default Player