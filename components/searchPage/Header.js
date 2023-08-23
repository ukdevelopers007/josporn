/* This example requires Tailwind CSS v2.0+ */
import { Fragment, useEffect, useState } from 'react'
import { Menu, Transition } from '@headlessui/react'
import { SearchIcon, ArrowRightIcon, CogIcon, ClockIcon, XCircleIcon, CalendarIcon } from '@heroicons/react/solid'
import { FilterIcon } from '@heroicons/react/outline'
import Link from 'next/link'

import { useContext } from 'react'
import videosContext from '../../context/videos/videosContext'
import Router from 'next/router'




export default function Header({ keyword, pageNumber }) {


    const context = useContext(videosContext);
    const { setSpinner, } = context;

    const [currentPage, setcurrentPage] = useState('')

    useEffect(() => {
        setcurrentPage(window.location.href.includes('/search/') ? "searchPage" : "categoryPage")
    }, [])





    return (

        <div>
            <div className='flex items-center md:pr-10 pt-2  sm:py-1  pr-4 relative'>
                <h1 className='text-xl md:text-2xl xl:text-3xl text-center  font-semibold text-theme font-inter my-1   w-full '>{keyword} porn videos</h1>

                <p className='absolute right-0 text-md md:text-xl flex-grow font-inter  text-right text-gray-900'>{`Page-${pageNumber}`}</p>
            </div>

        </div>


    )
}

