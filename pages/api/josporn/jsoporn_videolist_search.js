
import dbConnect from "../lib/db";

import {
  checkVideoDetailsExist_DB,
  saveVideoItem,
  randomVideolist,
  getVideoItemByCategory,
  VIDEOITEMS_DB_COUNT_CATEGORY,
} from "../db_query/videoQuery";

import {videolist_Scrape_search} from "../lib/videolist_Scrape_search"

await dbConnect();



export default async function handler(req, res) {

  let key = req.body.key;
  let page = req.body.page;
 


  const {finalDataArray,lastpage} = await videolist_Scrape_search(`https://josporn.club/search/${key}/page-${page}/`);

  // var pagecount = await VIDEOITEMS_DB_COUNT_CATEGORY(category);

  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      lastPage: lastpage,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      lastPage: lastpage,
      noVideos: false,
    });
  }
}


