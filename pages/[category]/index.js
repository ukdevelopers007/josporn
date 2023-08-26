import Head from "next/head";

import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import React from "react";
import videosContext from "../../context/videos/videosContext";
// import { uploadString, getDownloadURL, uploadBytes } from "firebase/storage";

import Category_slider from "../../components/category_slider";
import HomepageTitle from "../../components/HomepageTitle";
import InterstitialAds from "../../components/Ads/InterstitialAds";
import { useRouter } from "next/router";
import Outstreams from "../../components/Ads/Outstream";
import MultiformatAds from "../../components/Ads/MultiFormatAds";
import PopunderAds from "../../components/Ads/Popunder";
import Pagination from "../../components/Pagination";
import { BeatLoader } from "react-spinners";
import Header from "../../components/searchPage/Header";


export default function Home({
    finalDataArray,
    lastPage,
    currentPage,
}) {
    const router = useRouter();
    const { category } = router.query;
    if (router.isFallback) {
        return (
            <div className="flex justify-center mx-auto mt-10 ">
                <BeatLoader loading size={25} color={"red"} />
            </div>
        );
    }

    function capitalizeWord(input) {
        return input.charAt(0).toUpperCase() + input.slice(1);
    }

    function convertToName(input) {
        const words = input.split('-');

        if (words.length === 1) {
            return capitalizeWord(words[0]);
        } else {
            return words.map(word => capitalizeWord(word)).join(' ');
        }
    }



    return (
        <div className=" ">
            <Head>
                <title>{category}: Free Porn Videos and HD Sex Movies</title>
                <meta
                    name="description"
                    content="FuckVideo is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on FuckVideo!"
                />

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
            </Head>


            <PopunderAds />

            <main className="flex-row flex  md:space-x-3 space-x-2 pt-4 xl:pt-8">
                <Sidebar />
                <div>

                

                    <Header keyword={category} pageNumber="1"/>
                    <Videos data={finalDataArray} />

                    {/* PAGINATION */}
                    {lastPage != "0" &&
                        <Pagination data={{ currentPage: "1", lastPage: lastPage, previous: `/${category}/page/${parseInt("1") - 1}`, next: `/${category}/page/${parseInt("1") + 1}` }} />
                    }

                </div>
            </main>
        </div>
    );
}

export async function getStaticPaths() {
    return {
        paths: [{ params: { category: "Group" } }],
        fallback: true, // false or 'blocking'
    };
}

export async function getStaticProps(context) {

    const { category } = context.params;

    const data = { page: "1", category: category };
    const rawResponse = await fetch(

        `${process.env.BACKEND_URL}/jsoporn_videolist_category`,
        {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        }
    );

    const resData = await rawResponse.json();



    return {
        props: {
            finalDataArray: resData.finalDataArray,
            lastPage: resData.pages,
            currentPage: 1,
        },
    };
}
