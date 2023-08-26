import { useRouter } from "next/router";
import Sidebar from "../../../components/Sidebar";
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import RecommendedAds from '../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import Pagination from '../../../components/Pagination';
import { useEffect } from 'react';
import { getCookie, setCookie } from "cookies-next";


function Category({ finalDataArray, lastPage }) {

  const router = useRouter();
  const { searchkey } = router.query
  const currentPageNumberURL = '1'

  async function updateKeywords_DB() {
    if (finalDataArray.length !== 0 && typeof getCookie('email') !== 'undefined') {


      const keywordsCookie = getCookie('keywords')
      if (typeof keywordsCookie !== 'undefined') {
        const parsedArray = JSON.parse(keywordsCookie)
        let newArray = []
        newArray.push(searchkey)
        parsedArray.forEach(key => {
          if (key !== searchkey) {
            newArray.push(key)
          }
        })
        setCookie('keywords', JSON.stringify(newArray), { maxAge: 900000 });

      } else {
        if (video_collection.length !== 0) {
          var json_str = JSON.stringify([searchkey]);
          setCookie('keywords', json_str, { maxAge: 900000 });
        }
      }


    }
  }

  useEffect(() => {
    updateKeywords_DB();
  }, []);


  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  return (
    <>


      <Head>
        <title>{`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - FuckVideo`}</title>
        <meta name="description"
          content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos for free, here on FuckVideo.live. Discover the growing collection of high quality Most Relevant XXX movies and clips. No other sex tube is more popular and features more ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} scenes than FuckVideo! Browse through our impressive selection of porn videos in HD quality on any device you own.`} />
      </Head>




      <Header keyword={searchkey.replace("+", " ")} pageNumber={currentPageNumberURL} />
      <div className="flex">
        <Sidebar />
        <Videos data={finalDataArray} />

      </div>

      {parseInt(lastPage) != 0 &&
        <Pagination data={{ currentPage: "1", lastPage: lastPage, previous: `/search/${searchkey}/page/${parseInt("1") - 1}`, next: `/search/${searchkey}/page/${parseInt("1") + 1}` }} />
      }

      <RecommendedAds />
    </>
  )
}

export default Category




export async function getServerSideProps(context) {

  const { searchkey } = context.query;


  const data = { key: searchkey, page: "1" };
  const rawResponse = await fetch(

    `${process.env.BACKEND_URL}/jsoporn_videolist_search`,
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
      lastPage: resData.lastPage,
      currentPage: 1,
    },
  };


}