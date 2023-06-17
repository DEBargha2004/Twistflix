import { useState, useContext } from 'react'
import MovieContext from '../hooks/context'
import { useNavigate } from 'react-router-dom'

function Additional_Child ({ Title, id, route }) {
  const [mouseEnter, setMouseEnter] = useState(false)
  const { inView, setInView } = useContext(MovieContext)
  const navigate = useNavigate()
  return (
    <p
      className={`p-2 cursor-pointer flex flex-col items-center justify-between`}
      onMouseEnter={() => setMouseEnter(true)}
      onMouseLeave={() => setMouseEnter(false)}
      onClick={() => {
        setInView(id)
        navigate(route)
        setTimeout(() => {
          document.querySelector('html').scrollTo({
            top: 0,
            behavior: 'smooth'
          })
        }, 500)
      }}
    >
      <span
        className={`${
          mouseEnter || inView === id
            ? '-translate-y-2 opacity-100'
            : 'opacity-70'
        } transition-all duration-200 ease-out whitespace-nowrap`}
      >
        {Title}
      </span>
      <span
        className={`h-1 ${
          mouseEnter || inView === id ? 'w-full' : 'w-0'
        } rounded-md transition-all duration-200 bg-white`}
      />
    </p>
  )
}

export default Additional_Child
