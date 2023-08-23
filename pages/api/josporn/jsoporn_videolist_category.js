
import dbConnect from "../lib/db";

import {
  checkVideoDetailsExist_DB,
  saveVideoItem,
  randomVideolist,
  getVideoItemByCategory,
  VIDEOITEMS_DB_COUNT_CATEGORY,
} from "../db_query/videoQuery";

await dbConnect();


export default async function handler(req, res) {

  let page = req.body.page;
  var category = req.body.category;
 


  var finalDataArray = await getVideoItemByCategory(page, category);

  var pagecount = await VIDEOITEMS_DB_COUNT_CATEGORY(category);




  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: pagecount,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: Math.round(pagecount / 40),
      noVideos: false,
    });
  }
}

