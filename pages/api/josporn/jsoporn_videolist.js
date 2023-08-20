
import dbConnect from "../lib/db";

import {
  checkVideoDetailsExist_DB,
  saveVideoItem,
  randomVideolist,
  getVideoItemByPage,
  VIDEOITEMS_DB_COUNT,
} from "../db_query/videoQuery";

await dbConnect();


export default async function handler(req, res) {
  
  let page = req.body.page;

  var finalDataArray = await getVideoItemByPage(page);

  var pagecount = await VIDEOITEMS_DB_COUNT();

  if (finalDataArray.length == 0) {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: pagecount,
      noVideos: true,
    });
  } else {
    res.status(200).json({
      finalDataArray: finalDataArray,
      pages: Math.round(pagecount/40),
      noVideos: false,
    });
  }
}


