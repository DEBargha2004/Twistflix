import React, { useEffect, useRef } from 'react'
import Card from './Card';
import Castcard from './Castcard'

function Row({ title, type, List: list, scrollReset, setScrollReset }) {
    console.log('type is',title);
    const row = useRef(null)
    function Backward() {
        row.current.scrollLeft += -400
    }
    function Forward() {
        row.current.scrollLeft += 400
    }
    useEffect(() => {
        if (scrollReset) {
            row.current.scrollLeft = 0
            console.log(row.current.scrollLeft);
            setScrollReset(false)
            console.log('scrollReset set to false');
        }
    }, [scrollReset])

    return (
        <div className="mx-4 relative">
            <p className="text-white font-semibold text-xl uppercase">{title}</p>
            <div className={`flex w-full overflow-x-scroll py-1 ml-2 my-3 scroll-smooth`}
                ref={row}
            >
                {
                    list.map((Item, index) => {
                        return (
                            type === 'movie' ?
                                <Card Item={Item} key={index} index={index} /> :
                                <Castcard Item={Item} key={index} />
                        )
                    })
                }
            </div>
            <div className={`h-[calc(100%-40px)] bg-[#00000091] w-10 absolute flex justify-center items-center left-[-16px] ${title ? 'top-[40px]' : 'top-0'} text-xl font-extrabold text-white hover:bg-[#000000b2] transition-all cursor-pointer`} onClick={() => Backward()}></div>
            <div className={`h-[calc(100%-40px)] bg-[#00000091] w-10 absolute flex justify-center items-center right-[-16px] ${title ? 'top-[40px]' : 'top-0'} text-xl font-extrabold text-white hover:bg-[#000000b2] transition-all cursor-pointer`} onClick={() => Forward()}></div>
        </div>
    )
}

export default Row