import { Banner } from "exoclick-react";
import { useContext, useEffect, useState } from 'react';
import videosContext from '../../context/videos/videosContext';
import Script from "next/script";
import { Outstream, Placeholder } from "exoclick-react";
import Head from "next/head";


function InstantMessageAds() {

    useEffect(() => {
        if (window.AdProvider) {
            window.AdProvider.push({ serve: {} });
        }
    }, []);

    //Outstream Ads is replaced in place of banner ads

    const context = useContext(videosContext);


    return (

        <div className={`max-w-full`}>


            <Head>
                {/* <script type="application/javascript" src="https://syndication.realsrv.com/splash.php?idzone=4580188&capping=0"></script>

 */}


                {/* <script type="application/javascript" src="https://syndication.realsrv.com/splash.php?idzone=4813390"></script> */}

            </Head >

            <Script async src="https://a.magsrv.com/ad-provider.js" />
            <ins className="eas6a97888e" data-zoneid="5063204"></ins>




            {/* Mobile   */}

            {/* <div className='lg:hidden'>

                <Script
                    id="instantMessageMobile"
                    strategy="beforeInteractive"
                    src="https://syndication.realsrv.com/splash.php?idzone=4580188&capping=0"
                />


            </div> */}


            {/* Web  */}

            {/* <div className='hidden lg:flex'>

                <Script
                    id="instantMessageWeb"
                    strategy="beforeInteractive"
                    src="https://syndication.realsrv.com/splash.php?idzone=4813390"
                />
            </div> */}


        </div >
    )
}

export default InstantMessageAds;
