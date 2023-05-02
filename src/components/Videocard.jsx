import React from 'react'
import YouTube from 'react-youtube'

function Videocard({ Item }) {
    const opts = {
        height: '200',
        width: String(16 / 9 * 200)
    }
    return (
        <div className={`mx-2 rounded-lg overflow-hidden flex-shrink-0`}>
            <YouTube videoId={Item.key} opts={opts} />
        </div>
    )
}

export default Videocard;