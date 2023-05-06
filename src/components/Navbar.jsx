import React from 'react'
import urls from '../assets/url';
import Searchbar from './Searchbar';
import Additional from './Additional'

function Navbar() {
  return (
    <div className='text-white h-[70px] mx-10 flex justify-between items-center'>
        <img src={urls.appLogo} alt="App-logo" className='h-8' />
        <Searchbar />
        <Additional />
    </div>
  )
}

export default Navbar;