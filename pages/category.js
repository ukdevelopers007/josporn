import { useRouter } from 'next/router';
import React, { useEffect } from 'react';
import jsonData from "../JsonData/category.json"

import Link from 'next/link'
import RecommendedAds from '../components/Ads/RecommendedAds';
import BannerAds from '../components/Ads/BannerAds';
import Outstreams from '../components/Ads/Outstream';
import Head from 'next/head'
import InterstitialAds from '../components/Ads/InterstitialAds';
import MultiformatAds from '../components/Ads/MultiFormatAds';
import PopunderAds_2 from '../components/Ads/Popunder_2';


function shuffle(array) {
    let currentIndex = array.length,  randomIndex;
  
    // While there remain elements to shuffle.
    while (currentIndex != 0) {
  
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;
  
      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex], array[currentIndex]];
    }
  
    return array;
  }

function Index() {


    return (

        <div className="">
            <Head>
                <title>Josporn Categories: Find Your Favorite Free Hardcore Porn Videos</title>
                <meta name="description" content="Chutlunds has the best hardcore porn videos. Discover the newest XXX to stream in your favorite sex category. See the hottest amateurs and pornstars in action." />
            </Head>


            <div className='flex items-center py-2 my-1 justify-between  rounded-lg'>
                <h2 className='text-center lg:text-left  flex-grow text-3xl font-Dmsans'>Porn Categories</h2>
            </div>
            {/* <h1 className="text-center lg:text-left text-sm md:text-lg shadow-xl py-2 my-1 font-inter">
                Collections of free desi sex videos, desi mms, Indian sex videos, desi porn videos, devar bhabhi ki chudai, aunty ki chudai collection. full hd indian sex videos download free.
            </h1> */}

            <Outstreams />
            <PopunderAds_2 />
            <InterstitialAds />
            <MultiformatAds />

            <div className={`grid grid-cols-3 py-3 sm:grid-cols-3 gap-2 md:gap-3 lg:gap-4  md:grid-cols-4 lg:grid-cols-5`}>
                {shuffle(jsonData).map(category => {

                    return (
                        <Link key={category.title} href={`/${category.title.trim()}`}>
                                <div className='  relative hover:scale-105 transform transition duration-150 rounded   aspect-box  ' >
                                    <img
                                        className='object-cover w-full'
                                        alt={category.title}
                                        src={category.image}
                                        loading="lazy"
                                    ></img>
                                    <h2 className='font-inter rounded-b absolute text-sm sm:text-lg  px-1 bottom-0 w-full text-center  z-10 text-white bg-transparent bg-black bg-opacity-50'>{category.title}</h2>
                                </div>
                        </Link>
                        // items[i].charAt(0).toUpperCase() + items[i].substring(1);


                    )
                })}

            </div>

        </div>
    )
}


export default Index

