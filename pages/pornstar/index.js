import { useRouter } from 'next/router';
import React, { useEffect, useState } from 'react';
import Link from 'next/link'
import Head from 'next/head'
import { listAll, ref, getDownloadURL } from "firebase/storage";
import { BeatLoader } from 'react-spinners';
import InfiniteScroll from 'react-infinite-scroll-component';
// import pornstarNameList from '../../JsonData/pornstarlist/AllpornstarNames.json'
import pornstarNameList from '../../JsonData/pornstarlist/alldata.json'
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon
} from '@heroicons/react/solid';
import InterstitialAds from '../../components/Ads/InterstitialAds';
import Outstreams from '../../components/Ads/Outstream';
import PopunderAds_2 from '../../components/Ads/Popunder_2';
import MultiformatAds from '../../components/Ads/MultiFormatAds';

function Index() {



    //Scroll to top
    const scrollTop = () => { window.scrollTo({ top: 0, behavior: 'smooth' }); };


    const router = useRouter();
    var pornstarlist = require(`../../JsonData/pornstarlist/page1.json`)



    const [data, setdata] = useState(pornstarlist)
    const [page, setpage] = useState(1)

    const [suggestedData, setsuggestedData] = useState([])


    const fetchMoreData = () => {

        setpage(page + 1)
        var json = require(`../../JsonData/pornstarlist/page${page}.json`)
        setdata(data.concat(json));

    }




    const onChangeHandler = (key) => {



        if (key.length === 0) {
            setsuggestedData([])

        }
        if (key.length > 1) {

            var array = []
            pornstarNameList.filter(name => {
                if (name.Name.toLowerCase().includes(key.trim().toLowerCase())) {
                    array.push(name)
                }
            })
            if (array) {
                if (array.length > 10) {
                    setsuggestedData(array.slice(0, 9))
                }
                else {
                    setsuggestedData(array)
                }
            }
        }

    }




    return (

        <div className="">
            <Head>
                <title>Top Pornstars and Models In Full-Length Free Sex Videos | FuckVideo</title>
                <meta name="description" content="Catch the most popular PORNSTARS and MODELS, right here on the biggest FREE PORN tube. FuckVideo.live has a bevy of luscious babes that are naked for you 24/7!" />
            </Head>



            {/* <div className=' items-center p-2 my-1 justify-between bg-gray-100 rounded-lg shadow-lg'>
                <h1 className='flex-grow text-lg'>Porn Categories

                </h1>

            </div> */}

            <Outstreams />
            <PopunderAds_2 />
            <MultiformatAds />
            <InterstitialAds/>

            <h2 className='flex-grow text-lg  my-1 p-2 font-semibold font-inter'>Trending Pornstars</h2>


            <div className='flex my-1 pr-2 md:w-3/5 md:mx-auto'  >
                <input className='focus:outline-none flex-grow mr-1 font-inter rounded p-1 px-2  bg-slate-100' type='text' onChange={(event) => { onChangeHandler(event.target.value) }} placeholder='Search pornstar...'></input>

            </div>

            <div className='my-1 mt-6 grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6'>
                {suggestedData.length != 0 && suggestedData.map(pornstar => {
                    return (

                        <Link key={pornstar.Name} href={`/search/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                                <div className='  relative hover:scale-105 transform transition duration-150 ' >
                                    <img
                                        className={`object-cover w-full rounded  `}
                                        src={pornstar.thumbnail}
                                        alt={pornstar.Name}
                                        loading='lazy'
                                    ></img>

                                    <h2 className='rounded-b absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-black bg-opacity-50'>{pornstar.Name}</h2>

                                  
                               
                                </div>
                        </Link>
                    )
                })}
            </div>


            {
                suggestedData.length == 0 &&
                <InfiniteScroll
                    dataLength={data.length}
                    next={fetchMoreData}
                    hasMore={data.length !== 6500}

                >
                    <div className={`grid grid-cols-3 p-1 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-5 lg:grid-cols-6 `}>
                        {data.map(pornstar => {

                            return (
                                <Link key={pornstar.Name} href={`/search/${pornstar.Name.trim().toLowerCase().replace(/ /g, "+")}`}>
                                        <div className='  relative hover:scale-105 transform transition duration-150 ' >
                                            <img
                                                className={`object-cover w-full rounded  `}
                                                src={pornstar.thumbnail}
                                                alt={pornstar.Name}
                                                loading='lazy'
                                            ></img>

                                            <h2 className='rounded-b absolute text-sm lg:text-lg font-inter p-1 bottom-0 w-full text-center  z-10 text-white bg-black bg-opacity-50'>{pornstar.Name}</h2>
                                        </div>
                                </Link>
                                // items[i].charAt(0).toUpperCase() + items[i].substring(1);
                            )
                        })}


                    </div>

                </InfiniteScroll>
            }



        </div>
    )
}


export default Index



