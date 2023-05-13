import chroma from 'chroma-js'
import { useEffect, useState } from 'react'

function NewCircular_svg ({ percentage }) {
  const size = 100
  const strokeWidth = 7 // Width of the progress bar stroke
  const radius = size / 2 - strokeWidth / 2
  const circumference = 2 * Math.PI * radius // Circumference of the circle

  // Calculate the stroke-dashoffset value based on the percentage
  const strokeDashoffset = circumference - (percentage / 100) * circumference

  // Determine the color based on the percentage
  const color = `hsl(${percentage * 1.2}, 100%, 50%)`
  const darkColor = chroma(chroma(color).darken(5.4).hex())
    .luminance(0.01)
    .hex()

  return (
    <div className='flex items-center justify-center h-20 w-20 bg-gray-950 rounded-full p-1'>
      <svg className='h-full w-full' viewBox={`0 0 ${size} ${size}`}>
        <circle
          className={`stroke-current rounded-full`}
          r={size / 2 - strokeWidth / 2}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          fill='transparent'
          style={{ color: darkColor }}
        />
        <circle
          className='stroke-current transition-all ease-linear duration-300 rounded-full origin-center rotate-[-90deg]'
          r={size / 2 - strokeWidth / 2}
          cx={size / 2}
          cy={size / 2}
          strokeWidth={strokeWidth}
          strokeDasharray={circumference}
          strokeDashoffset={strokeDashoffset}
          style={{ stroke: color }}
          strokeLinecap='round'
          fill='transparent'
        />
        <text
          className='text-center text-gray-800 text-[40px] font-bold'
          x='45%'
          y='55%'
          dominantBaseline='middle'
          textAnchor='middle'
          fill='white'
        >
          {percentage}
        </text>
        <text
          className='text-center text-gray-800 text-xs font-bold'
          x='75%'
          y='45%'
          dominantBaseline='middle'
          textAnchor='middle'
          fill='white'
        >
          %
        </text>
      </svg>
    </div>
  )
}

export default NewCircular_svg
