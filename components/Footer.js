import Link from 'next/link';
import { useRouter } from 'next/router';

import { useContext, useEffect, useState } from 'react';
import videosContext from '../context/videos/videosContext'
import MultiformatAds from './Ads/MultiFormatAds';


function Footer() {

    //Use Context
    const context = useContext(videosContext);
    const { spinnerLoading } = context;

    const [scrollable, setscrollable] = useState(false)
    useEffect(() => {
        const handleScroll = () => {
            const scrollable = document.body.scrollHeight > window.innerHeight;
            if (scrollable) {
                // Add your logic for when the page is scrollable
                console.log('Page is scrollable');
                setscrollable(true)
            } else {
                // Add your logic for when the page is not scrollable
                console.log('Page is not scrollable');
                setscrollable(false)
            }
        };

        // Attach the scroll listener when the component mounts
        window.addEventListener('scroll', handleScroll);

        // Clean up the listener when the component unmounts
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (

        <div className={`font-footer mx-auto bg-secondary ${scrollable == false ? "hidden" : ""}   mt-10 text-white`}>

            < div className=" w-4/5 mx-auto p-1 mt-1 flex items-center justify-between  ">
                <div className=" flex flex-wrap justify-between min-w-full">
                    <Link
                        passHref={true}
                        href={'/contact'}
                    >
                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">Contact / support</p>
                    </Link>


                    <Link
                        passHref={true}
                        href={'/faq'}
                    >
                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">FAQ</p>

                    </Link>
                    <Link
                        passHref={true}
                        href={'/parentalcontrol'}
                    >
                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">Parental control</p>

                    </Link>



                    <Link
                        passHref={true}
                        href={'/terms'}
                    >
                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">Terms of use</p>

                    </Link>
                    <Link
                        passHref={true}
                        href={'/privacy'}
                    >

                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">2257 Statement & Privacy Policy</p>
                    </Link>
                    <Link
                        passHref={true}
                        href={'/dmca'}
                    >
                        <p className="font-semibold  cursor-pointer text-sm sm:text-md md:text-lg hover:text-white   ">DMCA / Copyright Claims</p>

                    </Link>
                </div>

            </div>

            <div className='flex p-2 items-center justify-between  w-4/5 mx-auto'>
                <p className='text-sm sm:text-md md:text-lg font-poppins font-bold'>© 2022 FuckVideo.live IS A FREE PORN VIDEOS</p>

                <div className='p-2  rounded'>

                    {/* <img
                        src='./rta.png'
                        height={80}
                        width={80}
                        alt='fdsg'
                    ></img> */}
                </div>
            </div>
        </div>

    )

}

export default Footer
