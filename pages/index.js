
import Head from "next/head";

import Sidebar from "../components/Sidebar";
import Videos from "../components/Videos";
import React from "react";
import videosContext from "../context/videos/videosContext";

import Category_slider from "../components/category_slider";
import HomepageTitle from "../components/HomepageTitle";
import InterstitialAds from "../components/Ads/InterstitialAds";
import { useRouter } from "next/router";
import Outstreams from "../components/Ads/Outstream";
import MultiformatAds from "../components/Ads/MultiFormatAds";
import PopunderAds from "../components/Ads/Popunder";
import Pagination from "../components/Pagination";
 
export default function Home({
  finalDataArray,
  lastPage,
  currentPage,
}) {
  const router = useRouter();

  return (
    <div className=" ">
      <Head>
        <title>FuckVideo: Free Porn Videos and HD Sex Movies</title>
        <meta
          name="description"
          content="FuckVideo is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on FuckVideo!"
        />

        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
        <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
      </Head>

      <Category_slider />

      {/* <MultiformatAds /> */}
      <PopunderAds />

      <main className="flex-row flex  mt-1 md:mt-3 md:space-x-3 space-x-2 xl:pt-8 pt-4">
        <Sidebar />
        <div>

        

          <HomepageTitle title='Popular Porn Videos' />

          <Videos data={finalDataArray} />

          {/* PAGINATION */}


          <Pagination data={{ currentPage: "1", lastPage: lastPage, previous: `/page/${parseInt("1") - 1}`, next: `/page/${parseInt("1") + 1}` }} />


        </div>
      </main>

      <footer>
        <MultiformatAds />
        <MultiformatAds />
        <Outstreams />
        <footer >
        <a className='' href="https://www.fuckvideo.live/">.</a>
        <a className='' href="https://www.chutlunds.com/">.</a>
        <a className='' href="https://www.desikahaniya.in/">.</a>
      </footer>
      </footer>
    </div>
  );
}

export async function getStaticProps({ req, res }) {
  const data = { page: "1" };
  const rawResponse = await fetch(
    `${process.env.BACKEND_URL}/jsoporn_videolist`,
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
