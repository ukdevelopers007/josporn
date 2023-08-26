import { useEffect, useRef, useState } from "react";
import {
    ThumbUpIcon, ClockIcon, FilmIcon, EyeIcon, PlusIcon, MinusIcon, CogIcon, InformationCircleIcon, DownloadIcon
} from '@heroicons/react/solid';
import Router, { useRouter } from "next/router";
import { Fragment } from 'react'
import { Menu, Transition } from '@headlessui/react'
import Script from "next/script";
import { getCookie, setCookie } from "cookies-next";

function classNames(...classes) {
    return classes.filter(Boolean).join(' ')
}

const VideoPlayer = ({ video_details, Qualitys, videolink_qualities_screenshots, preloaded_video_qualityy, pornstar, loggedIn }) => {



    let uniquePornstars = pornstar.filter((element, index) => {
        return pornstar.indexOf(element) === index;
    });


    const videoPlayerRef = useRef(null)
    const playBtnRef = useRef(null)
    const router = useRouter()

    const [Quality, setQuality] = useState(Qualitys)
    const [VideoSrc, setVideoSrc] = useState(videolink_qualities_screenshots.default_video_src)
    const [tags, settags] = useState([]);
    const [screenshotlayoutToggle, setscreenshotlayoutToggle] = useState(false)
    const [PlusVisible, setPlusVisible] = useState('flex')
    const [MinusVisible, setMinusVisible] = useState('hidden')
    const [tagString, settagString] = useState('');


    //Quality Changer Onclick
    const menuItemOnClick = (quality) => {
        if (quality != Quality) {

            const currentTime = videoPlayerRef.current.currentTime;
            setQuality(quality);
            const index = videolink_qualities_screenshots.video_qualities_available.indexOf(quality)
            videoPlayerRef.current.load()
            videoPlayerRef.current.currentTime = currentTime
            videoPlayerRef.current.play();
            setVideoSrc(videolink_qualities_screenshots.video_qualities_available_withURL[index])
        }

    }

    const seekTimeOnclick = (obj) => {
        const time = obj.seekTime;

        const extractMinute = parseInt(time.substring(0, time.indexOf(":")))
        const extractSeconds = parseInt(time.substring(time.indexOf(":") + 1, time.length))

        console.log(`extractMinute:${extractMinute}`);
        console.log(`extractSeconds:${extractSeconds}`);

        //videotime will is set in seconds by default
        videoPlayerRef.current.currentTime = (extractMinute * 60) + extractSeconds
        videoPlayerRef.current.play();
        console.log((extractMinute * 60) + extractSeconds);

    }

    const openScreenShotLayout = () => {
        if (screenshotlayoutToggle) {
            setscreenshotlayoutToggle(false)
            setPlusVisible('flex')
            setMinusVisible('hidden')
        } else {

            setscreenshotlayoutToggle(true)
            setPlusVisible('hidden')
            setMinusVisible('flex')
        }
    }



    const download = () => {
        router.push(VideoSrc)
    }


    useEffect(() => {

        let uniqarray = [...new Set(videolink_qualities_screenshots.tagsArray)];
        settags(uniqarray)

        // Create single string of all tags using comma
        let tagsString = ''
        uniqarray.map((tag, index) => {
            if (index === 0) {
                tagsString = tag
            } else {
                tagsString = tagsString + ", " + tag
            }
        })
        settagString(tagsString);

    }, []);




    return (

        <div >

            <Script src="//imasdk.googleapis.com/js/sdkloader/ima3.js" strategy="beforeInteractive" />
            <Script onLoad={() => { initDesktopAutoplayExample() }} src="/vastAd.js" strategy="lazyOnload" />

        
            <div id="mainContainer" className={`relative w-full aspect-video object-contain  group  shadow-2xl`}>
                <video className={`w-full h-full cursor-pointer`} id="contentElement" onContextMenu={(e) => e.preventDefault()} ref={videoPlayerRef} poster={video_details.thumbnail} width="852" height="480" controls controlsList="nodownload"
                >
                    <source src={VideoSrc} type="video/mp4" />
                </video>
                <div className={`absolute top-0 left-0 `} id="adContainer"></div>
                <button className="hidden" id="playButton">Play</button>
            </div>



            <div className="flex justify-between py-2 text-sm md:text-lg   ">
                <div className="flex justify-around items-center space-x-2 md:space-x-4 md:text-lg ">

                    <div className='flex items-center space-x-1'>
                        <ClockIcon className='h-6 hover:scale-100 text-red-700 md:h-9' />
                        <p className=' font-bold'>{video_details.duration}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <EyeIcon className="h-6 text-blue-600  md:h-9" />
                        <p className=' font-bold'>{video_details.views.length > 1 ? video_details.views : "46513"}</p>
                    </div>
                    <div className='flex items-center space-x-1'>
                        <ThumbUpIcon className="h-6 text-green-500  md:h-9" />
                        <p className=' font-bold'>{video_details.likedPercent}</p>
                    </div>



                </div>
                <div className='flex items-center justify-end space-x-2 lg:space-x-4'>

                    {/* <DownloadIcon className='h-7 text-gray-700' /> */}

                    <button onClick={download} className='font-inter text-[12px] lg:text-lg px-2 lg:px-4 py-1 lg:py-1.5 bg-secondary rounded-md text-white text-center lg:mt-1'>Download</button>
                    <Menu as="div" className="relative  text-left">
                        <div className=' w-fit relative '>
                            <Menu.Button className="flex items-center space-x-1">
                                <CogIcon className="h-9 text-gray-600 m-1  duration-300" />
                                <p className={`${Quality === '720p' || Quality === '1080p' || Quality === '4k' ? "" : "hidden"} text-xs bg-red-500 rounded text-white absolute top-1 right-0`}>HD</p>
                            </Menu.Button>
                        </div>

                        <Transition
                            as={Fragment}
                            enter="transition ease-out duration-100"
                            enterFrom="transform opacity-0 scale-95"
                            enterTo="transform opacity-100 scale-100"
                            leave="transition ease-in duration-75"
                            leaveFrom="transform opacity-100 scale-100"
                            leaveTo="transform opacity-0 scale-95"
                        >
                            <Menu.Items className="z-50 origin-top-right absolute right-0 bottom-11 mt-2 w-[80px] rounded-md shadow-lg  bg-gray-200  ">
                                <div className=" rounded">

                                    {videolink_qualities_screenshots.video_qualities_available.map(quality => {
                                        return (
                                            <Menu.Item key={quality} onClick={() => { menuItemOnClick(quality) }}>
                                                {({ active }) => (
                                                    <div className='hover:bg-gray-300 hover:shadow-lg hover:rounded'>
                                                        <div className={`${quality === Quality ? "text-red-500" : ""} relative px-4  w-fit flex items-center justify-between`}>
                                                            <a
                                                                href="#"
                                                                className={classNames(
                                                                    active ? ' ' : '',
                                                                    'block   py-2 text-sm font-semibold  text-left '
                                                                )}
                                                            >
                                                                {quality}
                                                            </a>
                                                            <p className={`${quality === '720p' || quality === '1080p' || quality === '4k' ? "" : "hidden"} text-[10px] bg-red-500 rounded text-white absolute -right-[1px] bottom-3 px-[2px] scale-75 `}>HD</p>
                                                        </div>
                                                    </div>
                                                )}
                                            </Menu.Item>
                                        )
                                    })}
                                </div>
                            </Menu.Items>
                        </Transition>
                    </Menu>


                </div>

            </div>


            {/* Tags */}
            <div className='flex flex-wrap mb-2 '>
                {
                    tags.map(key => {
                        if (key.length >= 1) {

                            return (
                                <a key={key} href={`/search/${key.trim()}`}>
                                    <p className='text-xs md:text-sm mr-1  mt-1 cursor-pointer hover:bg-gray-900 rounded px-[5px] py-[2px]  font-inter text-white bg-yellow-600'>{key}</p>
                                </a>
                            )
                        }
                    })
                }
            </div>

            <div className='flex items-center justify-between'>

                {uniquePornstars.length >= 1 && <div className='flex items-center py-2 flex-wrap'>
                    <span className='font-semibold text-md '>Pornstar:</span>
                    {uniquePornstars.map(pornstars => {
                        return (

                            <a key={pornstars} href={`/search/${pornstars.trim().replace(" ", "+")}`}>
                                <p className='pl-1 pr-1 text-sm md:text-md ml-1 mt-1 bg-red-500 text-white cursor-pointer font-inter font-semibold rounded px-2 hover:bg-red-700'>
                                    {pornstars}
                                </p>
                            </a>


                        )
                    })}
                </div>
                }

                <div onClick={openScreenShotLayout} className='my-1 hidden lg:flex items-center bg-gray-600 text-white  justify-between py-0.5 px-2 pr-3  hover:bg-gray-700  rounded cursor-pointer   md:w-1/4 md:space-x-4'>

                    <p className='font-inter font-semibold text-lg md:text-2xl text-center px-3'>Screenshots</p>
                    <PlusIcon className={`icon hover:scale-100 ${PlusVisible}`} />
                    <MinusIcon className={`icon hover:scale-100 ${MinusVisible}`} />

                </div>

            </div>


            {/* ScreenShots  */}

            <div onClick={openScreenShotLayout} className='my-1 lg:hidden flex items-center bg-gray-600 text-white  justify-between py-0.5 px-2 pr-3  hover:bg-gray-700  rounded cursor-pointer   md:w-1/4 md:space-x-4'>

                <p className='font-inter font-semibold text-lg md:text-2xl text-center px-3'>Screenshots</p>
                <PlusIcon className={`icon hover:scale-100 ${PlusVisible}`} />
                <MinusIcon className={`icon hover:scale-100 ${MinusVisible}`} />

            </div>


            <div className={` grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5  ${screenshotlayoutToggle ? "grid scale-100" : "scale-0 h-0"}  transition-all duration-300 `}>
                {videolink_qualities_screenshots.screenshotsArray.map(shot => {
                    return (
                        <div onClick={() => { seekTimeOnclick(shot) }} className='p-1 relative' key={shot}>
                            <img
                                className='rounded'
                                alt='loading'
                                src={shot.url}

                            ></img>
                            <strong className='absolute bottom-0 right-0 text-white m-2 bg-transparent bg-black font-inter rounded  bg-opacity-50 text-sm px-1'>{shot.seekTime}</strong>
                        </div>
                    )
                })}

            </div>


        </div>


    )
};
export default VideoPlayer;