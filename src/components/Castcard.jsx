import React, { useContext } from 'react'
import urls from '../assets/url';
import MovieContext from '../hooks/context';
import { useNavigate } from 'react-router-dom';

function Castcard({ Item }) {
  const { setCombined_list } = useContext(MovieContext)
  const navigate = useNavigate()
  function CreateandRedirect(){
    console.log('current card clicked is',Item);
    setCombined_list(prev => [...prev,{...Item,card_type:'cast'}])
    navigate(`/${Item.id}/${Item.original_name}`)
  }
  return (
    <div className='mx-3 p-2 shadow-sm shadow-[#ffffff34] h-fit rounded-xl cursor-pointer' onClick={()=>CreateandRedirect()}>
      <div className='rounded-lg overflow-hidden w-[150px] h-[224.938px] mb-2'>
        <img src={`${urls.baseUrl}${Item?.profile_path}`} className='hover:opacity-80 hover:bg-[#00000091] hover:scale-105 transition-all ease-out duration-[400ms]' alt="" />
      </div>
      <div className='pb-6'>
        <p className='text-white font-semibold text-lg line-clamp-1'>
          {
            Item?.original_name
          }
        </p>
        <p className='text-white text-[14px] font-light line-clamp-1'>
          {
            Item?.character
          }
        </p>
      </div>
    </div>
  )
}

export default Castcard;