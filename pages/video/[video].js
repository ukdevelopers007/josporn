import Head from "next/head";
import { useEffect, useState } from "react";
import Router, { useRouter } from "next/router";
import Videos from "../../components/Videos";
import {
  ThumbUpIcon,
  ClockIcon,
  FilmIcon,
  EyeIcon,
  PlusIcon,
  MinusIcon,
  CogIcon,
  InformationCircleIcon,
  DownloadIcon,
} from "@heroicons/react/solid";
// import { scrapeVideos } from '../../config/spangbang';
import { getCookie, setCookie } from "cookies-next";
import VideoPlayer from "../../components/VideoPlayer";
import InterstitialAds from "../../components/Ads/InterstitialAds";
import MultiformatAds from "../../components/Ads/MultiFormatAds";
import Outstreams from "../../components/Ads/Outstream";

function Videoplayer({ serverError, relatedVideos, videodetails, screenshots }) {
  const router = useRouter();

  const [Quality, setQuality] = useState("720P");


  //This is strategy to hide "This video is no longer available" message from google search results by displaying the message after certain time using setTimeout
  const [showNotAvailableMessage, setshowNotAvailableMessage] = useState(false);

  useEffect(() => {
    setTimeout(() => {
      setshowNotAvailableMessage(true);
    }, 3000);
  }, []);

  if (serverError) {
    return (
      <div className="my-72 flex flex-col items-center justify-center">
        <h1 className="text-center "> Something went wrong!</h1>
        <button
          onClick={() => {
            router.push("/");
          }}
          className="mx-auto my-4 bg-theme text-white rounded px-8 py-1 hover:bg-red-700"
        >
          Go to Home -&gt;
        </button>
      </div>
    );
  }
  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <div className="">
      <InterstitialAds />

      <Head>
        <title>
          {`${videodetails.title.trim().replace(/ /g, '-')}- | 720p Josporns`}
        </title>
        <meta
          name="description"
          content={`${capitalizeFirstLetter(
            videodetails.title
          )} , ${videodetails.catergories.toString()} sex videos.`}
        />
        <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
      </Head>

      <div>
        <div className="flex text-sm md:text-lg ">
          <div className="flex items-center mt-2 space-x-1 lg:space-x-2">
            <FilmIcon className="h-[20px] md:h-9 hover:scale-100 text-red-600" />
            <p className="font-poppins pr-1"> 1080P</p>
            <p className="font-poppins pr-1"> 720P</p>
            <p className="font-poppins pr-1"> 480P</p>
            <p className="font-poppins pr-1"> 360P</p>
          </div>
        </div>

        <h1 className="text-md sm:text-lg font-semibold my-1 text-wrap text-gray-700 md:text-2xl font-inter">
          {videodetails.title}
        </h1>

        <div className="py-1  rounded overflow-hidden sm:cursor-pointer md:w-4/5">
          <VideoPlayer
            video_details={videodetails}
            screenshots={screenshots}
          />
        </div>

        <MultiformatAds />

        <div className="flex flex-col p-1 px-3 space-x-2  items-center md:flex-row sm:justify-items-start">
          <p className="font-semibold text-button text-[18px] lg:text-[24px] font-manrope">
            Videos related to
          </p>
          <p className="font-semibold text-[15px] lg:text-[20px] pl-1 font-inter">
            {videodetails.title}
          </p>
        </div>
        <Videos data={relatedVideos} />

        <MultiformatAds />
        <Outstreams />
        <MultiformatAds />

      </div>


    </div>
  );
}

export default Videoplayer;

export async function getServerSideProps(context) {
  const { video } = context.query;
  const data = { title: video };

  var videodetails = {};
  var relatedVideos = [];
  var screenshots = [];
  var serverError = false;

  try {
    const rawResponse = await fetch(
      `${process.env.FRONTEND_URL}/api/josporn/jospornVideoPage`,
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



    relatedVideos = resData.suggestedVideoItems;
    screenshots = resData.screenshots;
    videodetails = resData.videoDetailsObj;
  } catch (error) {
    serverError = true;
  }


  return {
    props: {
      relatedVideos: relatedVideos,
      videodetails: videodetails,
      screenshots: screenshots,
      serverError: serverError,
    },
  };
}
