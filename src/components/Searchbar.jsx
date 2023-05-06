import React, { useEffect, useState, useRef } from 'react'
import { motion } from 'framer-motion';
import urls from '../assets/url';

function Searchbar() {
    const delay = 400
    const [isClicked, setIsClicked] = useState(false)
    const [kinematics, setKinematics] = useState({
        rotate: false,
    })
    const inputRef = useRef(null)
    function handleClick() {
        setIsClicked(prev => {
            inputRef.current.focus()
            return true
        })

    }
    function handleBlur() {
        setIsClicked(false)
    }
    useEffect(() => {
        if (isClicked) {
            setTimeout(() => {
                setKinematics(prev => ({
                    ...prev, rotate: true
                }))
            }, delay)
        } else {
            setTimeout(() => {
                setKinematics(prev => ({
                    ...prev, rotate: false
                }))
            }, delay)
        }
    }, [isClicked])
    return (
        <div onClick={() => handleClick()} onBlur={() => handleBlur()} className='relative'>
            <motion.input ref={inputRef} layout type="text" style={{ borderRadius: 40 }} className={`${isClicked ? 'w-[250px]' : 'w-[60px] cursor-pointer'} text-lg px-4 py-6 h-[30px] outline-none bg-black border-[2px] border-[#ffffff9c] text-[#ffffff8a]`} autoCorrect='off' />
            <motion.img layout src={urls.searchIcon} animate={{ rotate: kinematics.rotate ? 0 : 80, right: 16 }} transition={{ duration: 0.4 }} className='w-7 absolute top-2 cursor-pointer' alt="" />
        </div>
    )
}

export default Searchbar;