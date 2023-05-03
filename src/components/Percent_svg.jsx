import React from 'react'

function Percent_svg({percentage}) {
    return (
        <div className='mt-5 w-[100px]'>
            <svg viewBox="0 0 36 36" class="circular-chart orange">
                <path class="circle-bg"
                    d="M18 2.0845
  a 15.9155 15.9155 0 0 1 0 31.831
  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <path layout class="circle"
                    stroke-dasharray={`${percentage}`}
                    d="M18 2.0845
  a 15.9155 15.9155 0 0 1 0 31.831
  a 15.9155 15.9155 0 0 1 0 -31.831"
                />
                <text x="18" y="20.35" class="percentage">{percentage}%</text>
            </svg>
        </div>
    )
}

export default Percent_svg;