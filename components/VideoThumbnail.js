import { ClockIcon, ThumbUpIcon } from "@heroicons/react/outline";
import { EyeIcon } from "@heroicons/react/solid";
import Head from "next/head";
import { useEffect, useState } from "react";
import PopunderAds from "./Ads/Popunder";
import Link from "next/link";

function VideoThumbnail({ details }) {
  const [videoPage, setvideoPage] = useState(false);

  function abcd() {
    if (window.location.href.includes("/video")) {
      setvideoPage(true);
    }
  }
  useEffect(() => {
    setTimeout(() => {
        setpageLoaded(true)

    }, 2000);
    abcd();
  }, []);

  const [spinnerloader, setspinnerloader] = useState(false);

  const OnClickHandler = () => {
    const object = {
      Title: video.TitleArray,
      duration: video.durationArray,
      likedPercent: video.likedPercentArray,
      thumbnail: video.thumbnailArray,
      views: video.viewsArray,
    };

    localStorage.setItem("videoplayer", JSON.stringify(object));
  };

  const [isHovered, setIsHovered] = useState(false);
  const [currentScreenshotIndex, setCurrentScreenshotIndex] = useState(0);
  const [intervalId, setIntervalId] = useState(null);
  const [pageLoaded, setpageLoaded] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true);

    const id = setInterval(() => {
      setCurrentScreenshotIndex((prevIndex) =>
        prevIndex < details.screenshots.length - 1 ? prevIndex + 1 : 0
      );
    }, 500);

    setIntervalId(id);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
    setCurrentScreenshotIndex(0);

    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
    }
  };


  useEffect(() => {
    if (isHovered && currentScreenshotIndex === details.screenshots.length - 1) {
      setCurrentScreenshotIndex(0);
    }
  }, [currentScreenshotIndex, isHovered, details.screenshots.length]);


  return (
    <div className="">
      <Link
        href={`/video/${details.title}`}
        onClick={OnClickHandler}
        data-title={details.title}
      >
        <div
          className={`animate-fade flex  items-start  flex-col justify-center  cursor-pointer  shadow-md shadow-blue-200  rounded-lg overflow-hidden transform transition duration-150`}
        >
          <div
            className="relative group"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <img
              src={details.thumbnail}
              alt="Video Thumbnail"
              className="hoverable-image"
            />

            {pageLoaded && details.screenshots.map((url, index) => {
              return (
                <img
                  src={url}
                  alt="Hover Image"
                  className={`absolute top-0 left-0 ${
                    isHovered && index <= currentScreenshotIndex
                      ? 'opacity-100'
                      : 'opacity-0'
                  } transition-opacity duration-300`}                />
              );
            })}
          </div>

          <h2 className=" text-sm sm:text-md lg:text-lg  pl-1  lg:pl-4 pt-[1px] md:pt-1  whitespace-nowrap overflow-hidden font-inter  text-gray-800 ">
            {details.title}
          </h2>

          <div
            className="flex items-center justify-start space-x-2 md:justify-start lg:space-x-6 
                        overflow-hidden w-full pl-1 pb-[1.5px] pt-[1px] md:pt-1 md:pb-2 lg:pl-4  font-arial "
          >
            <div className="flex justify-center items-center ">
              <ClockIcon className="icon text-red-500" />
              <p className="text-sm md:text-md text-gray-700 font-light font-inter">
                {details.duration.replace("HD", "").trim()}
              </p>
            </div>
            <div className="flex justify-center items-center ">
              <EyeIcon className="icon text-yellow-400" />
              <p className="text-sm md:text-md text-gray-700 font-light font-inter">
                {details.views.length >4 ? details.views.substring(0,2)+"k":details.views}
              </p>
            </div>

            <div className="flex justify-center items-center ">
              <ThumbUpIcon className="icon text-green-500" />
              <p className="text-sm md:text-md text-gray-700 font-light font-inter">
                {details.likePercent}
              </p>
            </div>
          </div>
        </div>
      </Link>
      {/* </Link> */}

      {!videoPage && <PopunderAds />}
    </div>
  );
}

export default VideoThumbnail;
