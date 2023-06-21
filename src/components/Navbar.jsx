import React, { useEffect, useState } from 'react'
import urls from '../assets/url';
import Searchbar from './Searchbar';
import Additional from './Additional'
import { UserButton } from '@clerk/clerk-react';

function Navbar() {
  const [opacity, setOpacity] = useState(0)

  const scrollInfo = (e) => {
    const opac_val = (window.scrollY) / 200
    setOpacity(opac_val < 1 ? opac_val : 1)
  }
  useEffect(() => {
    window.addEventListener('scroll', scrollInfo)
    return () => window.removeEventListener('scroll', scrollInfo)
  }, [])
  return (
    <div className={`text-white h-[70px] px-10 flex justify-between items-center fixed top-0 w-full z-40 ${opacity === 1 && 'shadow-lg shadow-[#41414121]'}`}>
      <UserButton />
      <Searchbar />
      <Additional />
      <div className={`absolute top-0 left-0 w-full h-[70px] bg-black z-[-10]`} style={{ opacity }} />
    </div>
  )
}

export default Navbar;