import { useRouter } from "next/router";
import Sidebar from '../../../../components/Sidebar';
import Videos from "../../../../components/Videos";
import Header from '../../../../components/searchPage/Header'
import RecommendedAds from '../../../../components/Ads/RecommendedAds';
import Head from 'next/head'
import Pagination from '../../../../components/Pagination';



function Category({ finalDataArray, lastPage, currentPage }) {

    const router = useRouter();
    const { searchkey, page } = router.query
    const currentPageNumberURL = page

    function capitalizeFirstLetter(string) {
        console.log(string.charAt(0).toUpperCase() + string.slice(1));
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    return (
        <>
            <Head>
                <title>{`${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} Porn Videos - ${currentPageNumberURL}`}</title>
                <meta name="description"
                    content={`Watch ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} porn videos for free, here on Chutlunds.com. Discover the growing collection of high quality Most Relevant XXX movies and clips. No other sex tube is more popular and features more ${capitalizeFirstLetter(searchkey.replace('+', " ").replace("+", " "))} scenes than Chutlunds! Browse through our impressive selection of porn videos in HD quality on any device you own.`} />
            </Head>

            <Header keyword={searchkey.replace("+", " ")} pageNumber={currentPageNumberURL} />
            <div className="flex">
                <Sidebar />
                <Videos data={finalDataArray} />

            </div>

            {parseInt(lastPage) != 0 &&
                <Pagination data={{ currentPage: currentPage, lastPage: lastPage, previous: `/search/${searchkey}/page/${parseInt(currentPage) - 1}`, next: `/search/${searchkey}/page/${parseInt(currentPage) + 1}` }} />
            }

            <RecommendedAds />
        </>
    )
}

export default Category




export async function getServerSideProps(context) {

    const { searchkey, page } = context.query;

    const data = { key: searchkey, page: page };

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
            currentPage: page,
        },
    };


}