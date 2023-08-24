import { useRouter } from "next/router";

import Sidebar from "../../components/Sidebar";
import Videos from "../../components/Videos";
import RecommendedAds from "../../components/Ads/RecommendedAds";
import Head from "next/head";
import { BeatLoader } from "react-spinners";
import Pagination from "../../components/Pagination";

function Category({ currentPage, lastPage, finalDataArray }) {
  const router = useRouter();
  if (router.isFallback) {
    return (
      <div className="flex justify-center mx-auto mt-10 ">
        <BeatLoader loading size={25} color={"red"} />
      </div>
    );
  }

  const { page } = router.query;



  return (
    <>
      <Head>
        <title>Josporn: Free Porn Videos and HD Sex Movies</title>
        <meta
          name="description"
          content="Josporn is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on Josporn!"
        />
      </Head>

      <div className="flex">
        <Sidebar />
        <Videos data={finalDataArray} />
      </div>

      {/* PAGINATION */}
      <Pagination data={{ currentPage:currentPage, lastPage: lastPage, previous: `/page/${parseInt(currentPage) - 1}`, next: `/page/${parseInt(currentPage) + 1}` }} />


      <RecommendedAds />
    </>
  );
}

export default Category;

export async function getStaticPaths() {
  return {
    paths: [{ params: { page: "2" } }],
    fallback: true, // false or 'blocking'
  };
}

export async function getStaticProps(context) {
  const { page } = context.params;
  const data = { page: page };
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
      currentPage: page,
    },
  };
}
