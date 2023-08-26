import { useRouter } from "next/router";
import Sidebar from '../../../components/Sidebar';
import Videos from "../../../components/Videos";
import Header from '../../../components/searchPage/Header'
import RecommendedAds from '../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import Pagination from '../../../components/Pagination';
import { BeatLoader } from "react-spinners";



function Category({ finalDataArray, lastPage, currentPage }) {

    const router = useRouter();
    if (router.isFallback) {
      return (
        <div className="flex justify-center mx-auto mt-10 ">
          <BeatLoader loading size={25} color={"red"} />
        </div>
      );
    }
  
    const { category, page } = router.query
    const currentPageNumberURL = page



    return (
        <>
            <Head>
                <title>{category}: Free Porn Videos and HD Sex Movies</title>
                <meta
                    name="description"
                    content="FuckVideo is the hottest free porn site in the world! Cum like never before and explore millions of fresh and free porn videos! Get lit on FuckVideo!"
                />

                <meta httpEquiv="Content-Type" content="text/html; charset=utf-8" />
                <meta name="msvalidate.01" content="8A6530C78E46DD0011117B2ECB618480" />
            </Head>


            <Header keyword={category} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={finalDataArray} />

            </div>

            {parseInt(lastPage) != 0 &&
                <Pagination data={{ currentPage: currentPage, lastPage: lastPage, previous: `/${category}/page/${parseInt(currentPage) - 1}`, next: `/${category}/page/${parseInt(currentPage) + 1}` }} />
            }

            <RecommendedAds />
        </>
    )
}

export default Category

export async function getStaticPaths() {
    return {
        paths: [{ params: { category: "Group", page: "1" } }],
        fallback: true, // false or 'blocking'
    };
}



export async function getStaticProps(context) {

    const { category, page } = context.params;

    const data = { page: page, category: category };
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
            currentPage: page,
        },
    };

}