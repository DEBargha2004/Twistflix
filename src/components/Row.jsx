import React, { useEffect, useRef } from 'react'
import { ItemCard } from './ItemCard'
import CallNew_Card from './CallNew_Card'

function Row ({
  title,
  type,
  List: list,
  scrollReset,
  setScrollReset,
  include_margin,
  id,
  content_type
}) {
  const row = useRef(null)
  function Backward () {
    row.current.scrollLeft += -400
  }
  function Forward () {
    row.current.scrollLeft += 400
  }
  useEffect(() => {
    if (scrollReset) {
      setTimeout(() => {
        row.current.scrollTo({
          behavior: 'smooth',
          left: 0
        })
        setScrollReset(false)
      }, 1000)
    }
  }, [scrollReset])

  return (
    <div className={`mx-4 relative ${include_margin && 'mb-[80px]'}`}>
      <p className='text-white font-semibold text-xl uppercase'>{title}</p>
      <div
        className={`flex w-full overflow-x-scroll py-1 ml-2 my-3 scroll-smooth`}
        ref={row}
      >
        {list
          ? list.map((Item, index) => {
              return (
                <ItemCard type={type} Item={Item} index={index} key={index} content_type={content_type} />
              )
            })
          : null}
        {id && <CallNew_Card id={id} />}
      </div>
      <div
        className={`h-[calc(100%-40px)] bg-[#00000091] w-10 absolute flex justify-center items-center left-[-16px] ${
          title ? 'top-[40px]' : 'top-0'
        } text-xl font-extrabold text-white hover:bg-[#000000b2] transition-all cursor-pointer`}
        onClick={() => Backward()}
      ></div>
      <div
        className={`h-[calc(100%-40px)] bg-[#00000091] w-10 absolute flex justify-center items-center right-[-16px] ${
          title ? 'top-[40px]' : 'top-0'
        } text-xl font-extrabold text-white hover:bg-[#000000b2] transition-all cursor-pointer`}
        onClick={() => Forward()}
      ></div>
    </div>
  )
}

export default Row
