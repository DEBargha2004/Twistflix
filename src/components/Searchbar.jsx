import React, { useEffect, useState, useRef, useContext } from 'react'
import MovieContext from '../hooks/context'
import { motion } from 'framer-motion'
import { combineSeries } from '../functions/combineSeries'
import urls from '../assets/url'
import { addIf_DoesNot_Exist } from '../functions/addIf_DoesNot_Exist'
import { useNavigate, useLocation } from 'react-router-dom'

function Searchbar () {
  const delay = 400
  const navigate = useNavigate()
  const location = useLocation()
  const { setCombined_list, combined_list, setSeriesCombined_list } =
    useContext(MovieContext)
  const [isClicked, setIsClicked] = useState(false)
  const [parentPath, setParentPath] = useState('')
  const [isFocused, setIsFocused] = useState(false)
  const [query, setQuery] = useState(null)
  const [searchList, setSearchList] = useState([])
  const [kinematics, setKinematics] = useState({
    rotate: false
  })
  const inputRef = useRef(null)
  const searchRef = useRef(null)
  const searchListRef = useRef(null)
  const imageRef = useRef(null)
  function handleClick () {
    setIsClicked(prev => {
      inputRef.current.focus()
      return true
    })
    setIsFocused(true)
  }
  function handleBlur () {
    if (!query) {
      setIsClicked(false)
    }
    // setIsFocused(false)
  }
  async function callQuery () {
    let response = await fetch(urls.queryUrl(parentPath, query))
    response = await response.json()
    console.log(response)
    setSearchList(response.results)
  }
  function setMovieRoute (item) {
    console.log(parentPath)
    parentPath !== 'tv'
      ? parentPath === 'person' ? 
      setCombined_list(addIf_DoesNot_Exist([{...item,card_type:'person'}], combined_list)):
      setCombined_list(addIf_DoesNot_Exist([item], combined_list))
      : setSeriesCombined_list(prev => combineSeries(prev, [item]))
    parentPath === 'movie'
      ? navigate(`/${item.id}`)
      : navigate(
          `/${parentPath}/${item.id}`
        )
    setIsFocused(false)
  }
  useEffect(() => {
    if (isClicked) {
      setTimeout(() => {
        setKinematics(prev => ({
          ...prev,
          rotate: true
        }))
      }, delay)
    } else {
      setTimeout(() => {
        setKinematics(prev => ({
          ...prev,
          rotate: false
        }))
      }, delay)
    }
  }, [isClicked])
  useEffect(() => {
    if (query) {
      callQuery()
    } else {
      setSearchList([])
    }
  }, [query])
  useEffect(() => {
    window.addEventListener('click', e => {
      let bool = !(
        e.target === searchRef.current ||
        e.target === searchListRef.current ||
        e.target === imageRef.current ||
        e.target === inputRef.current
      )
      if (bool) {
        setIsFocused(false)
      }
    })
    return () =>
      window.removeEventListener('click', e => {
        if (bool) {
          console.log('not focused')
          setIsFocused(false)
        }
      })
  }, [])
  useEffect(() => {
    const relative = location.pathname.split('/')[1]
    if (relative === 'tv' || relative === 'person') {
      setParentPath(relative)
    } else {
      setParentPath('movie')
    }
  }, [location.pathname])
  return (
    <div className='relative flex flex-col items-center'>
      <div
        className='relative'
        onClick={() => handleClick()}
        onBlur={() => handleBlur()}
        ref={searchRef}
      >
        <motion.input
          ref={inputRef}
          layout
          type='text'
          style={{
            borderRadius: 40,
            borderWidth: 2,
            borderColor: '#ffffff9c'
          }}
          className={`${
            isClicked ? 'w-[250px]' : 'w-[60px] cursor-pointer'
          } text-lg px-4 py-6 h-[30px] outline-none bg-black text-[#ffffff8a]`}
          spellCheck='false'
          onChange={e => setQuery(e.target.value.trim())}
        />
        <motion.img
          layout
          src={urls.searchIcon}
          ref={imageRef}
          animate={{ rotate: kinematics.rotate ? 0 : 80, right: 16 }}
          transition={{ duration: 0.4 }}
          className='w-7 absolute top-2 cursor-pointer'
          alt=''
        />
      </div>
      {isFocused ? (
        <div
          ref={searchListRef}
          className={`absolute top-[52px] mt-2 w-[300px] bg-black max-h-[300px] overflow-y-scroll rounded-lg ${
            searchList.length && 'border-[2px]'
          } border-[#ffffff59] shadow-2xl shadow-[#6968683d]`}
        >
          {searchList.map((item, index) => (
            <div
              key={index}
              className='border-b-[1px] border-[#ffffffa9] px-2 py-3 flex items-center cursor-pointer hover:bg-[#131313] transition-all duration-20000 ease-out'
              onClick={() => setMovieRoute(item)}
            >
              <img
                src={`${urls.baseUrl}${item.backdrop_path || item.profile_path}`}
                className='w-8 mr-3 rounded-sm'
                alt=''
              />
              <p className='text-white text-lg truncate '>
                {item.original_title || item.original_name}
              </p>
            </div>
          ))}
        </div>
      ) : null}
    </div>
  )
}

export default Searchbar
